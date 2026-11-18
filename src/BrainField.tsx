import { useEffect, useRef } from "react";

/*
  One set of nodes, three shapes:
  - in the hero they form a BRAIN made of wires, with packets running along the wires (AI)
  - in the security section the same nodes fly over and form a SHIELD (cybersecurity)
  - everywhere else they drift around as loose data packets
  The page theme (cream -> dark green) follows the shield's weight.
*/

type P = { x: number; y: number };
type N = P & { brain: P; shield: P; free: P; fv: P; contour: boolean };
type Pkt = { e: number; t: number; v: number };

const rnd = (() => {
  let s = 11;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
})();

/* ---------- shapes in unit space ---------- */

// brain, side view: cerebrum with gyri bumps + cerebellum + stem. x in [-1,1], y in [-0.8,0.9]
function brainR(theta: number) {
  // radius of the cerebrum outline at angle theta (bumpy ellipse)
  const bump = 0.045 * Math.sin(9 * theta) + 0.025 * Math.sin(17 * theta + 1.3);
  const rx = 1;
  const ry = 0.7;
  const r = 1 / Math.sqrt((Math.cos(theta) / rx) ** 2 + (Math.sin(theta) / ry) ** 2);
  return r * (1 + bump);
}

function insideBrain(x: number, y: number) {
  const th = Math.atan2(y, x);
  const inCerebrum = Math.hypot(x, y) < brainR(th) * 0.97 && y < 0.5;
  const inCerebellum = ((x - 0.48) / 0.32) ** 2 + ((y - 0.5) / 0.2) ** 2 < 1;
  const inStem = x > 0.05 && x < 0.27 && y > 0.35 && y < 0.95;
  return inCerebrum || inCerebellum || inStem;
}

function brainContour(k: number, n: number): P {
  const th = (k / n) * Math.PI * 2;
  const r = brainR(th);
  const x = Math.cos(th) * r;
  let y = Math.sin(th) * r;
  if (y > 0.5) y = 0.5 + (y - 0.5) * 0.3; // flatten the underside
  return { x, y: y - 0.05 };
}

// shield outline as a polygon (flat top with a notch, sides tapering to a point)
const SHIELD: P[] = [
  { x: -0.72, y: -0.62 },
  { x: -0.25, y: -0.72 },
  { x: 0, y: -0.86 },
  { x: 0.25, y: -0.72 },
  { x: 0.72, y: -0.62 },
  { x: 0.7, y: 0.05 },
  { x: 0.5, y: 0.5 },
  { x: 0, y: 0.95 },
  { x: -0.5, y: 0.5 },
  { x: -0.7, y: 0.05 },
];

// distance from the centre to the shield edge in direction (dx, dy)
function shieldR(dx: number, dy: number) {
  let best = Infinity;
  for (let i = 0; i < SHIELD.length; i++) {
    const a = SHIELD[i];
    const b = SHIELD[(i + 1) % SHIELD.length];
    const ex = b.x - a.x;
    const ey = b.y - a.y;
    const den = dx * ey - dy * ex;
    if (Math.abs(den) < 1e-9) continue;
    const t = (a.x * ey - a.y * ex) / den;
    const u = (a.x * dy - a.y * dx) / den;
    if (t > 0 && u >= 0 && u <= 1) best = Math.min(best, t);
  }
  return Number.isFinite(best) ? best : 0.7;
}

// the same direction from the centre, scaled from the brain outline onto the shield outline
function toShield(p: P, onEdge: boolean): P {
  const th = Math.atan2(p.y + 0.05, p.x);
  const dx = Math.cos(th);
  const dy = Math.sin(th);
  const ratio = onEdge ? 1 : Math.min(0.92, Math.hypot(p.x, p.y + 0.05) / Math.max(0.2, brainR(th)));
  const r = shieldR(dx, dy) * ratio;
  return { x: dx * r, y: dy * r };
}

function sampleInside(test: (x: number, y: number) => boolean, w: number, h: number): P {
  for (let i = 0; i < 400; i++) {
    const x = (rnd() * 2 - 1) * w;
    const y = (rnd() * 2 - 1) * h;
    if (test(x, y)) return { x, y };
  }
  return { x: 0, y: 0 };
}

/* ---------- colours ---------- */
const AI = { wire: [120, 72, 42], pkt: [226, 121, 58], node: [92, 52, 30], free: [150, 110, 80] };
const SEC = { wire: [70, 210, 130], pkt: [140, 255, 180], node: [120, 240, 170], free: [80, 160, 120] };
const mix = (a: number[], b: number[], f: number) => a.map((v, i) => Math.round(v + (b[i] - v) * f));
const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

function visibility(el: Element | null, vh: number) {
  if (!el) return 0;
  const r = el.getBoundingClientRect();
  const overlap = Math.min(r.bottom, vh) - Math.max(r.top, 0);
  return Math.max(0, Math.min(1, overlap / Math.min(r.height, vh)));
}

export default function BrainField({
  reduced,
  brainAnchor,
  shieldAnchor,
  onCyber,
}: {
  reduced: boolean;
  brainAnchor: string;
  shieldAnchor: string;
  onCyber: (on: boolean) => void;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let cyber = false;
    let last = performance.now();
    const small = window.innerWidth < 720;
    const COUNT = small ? 110 : 190;
    const CONTOUR = Math.round(COUNT * 0.5);

    const nodes: N[] = [];
    for (let i = 0; i < COUNT; i++) {
      const contour = i < CONTOUR;
      const brain = contour ? brainContour(i, CONTOUR) : sampleInside(insideBrain, 1, 0.95);
      // every node keeps its direction and relative distance from the centre, so wires stay tidy in both shapes
      const shield = toShield(brain, contour);
      const free = { x: rnd(), y: rnd() };
      nodes.push({ x: free.x, y: free.y, brain, shield, free, fv: { x: (rnd() - 0.5) * 0.00004, y: (rnd() - 0.5) * 0.00004 }, contour });
    }

    // wires: contour ring + each inner node to its 2 nearest (in brain space)
    const edges: [number, number][] = [];
    for (let i = 0; i < CONTOUR; i++) edges.push([i, (i + 1) % CONTOUR]);
    for (let i = CONTOUR; i < COUNT; i++) {
      const near = nodes
        .map((n, j) => ({ j, d: Math.hypot(n.brain.x - nodes[i].brain.x, n.brain.y - nodes[i].brain.y) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      near.forEach((o) => edges.push([i, o.j]));
    }
    const packets: Pkt[] = [];
    // screen positions start scattered
    let first = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      const bEl = document.querySelector(brainAnchor);
      const sEl = document.querySelector(shieldAnchor);
      const wb = Math.pow(visibility(bEl?.closest("section") ?? null, h), 1.6);
      const ws = Math.pow(visibility(sEl?.closest("section") ?? null, h), 1.6);
      const isCyber = ws > 0.4;
      if (isCyber !== cyber) {
        cyber = isCyber;
        onCyber(cyber);
      }

      const br = bEl?.getBoundingClientRect();
      const sr = sEl?.getBoundingClientRect();
      const bs = br ? Math.min(br.width, br.height) / 2 : 0;
      const ss = sr ? Math.min(sr.width, sr.height) / 2 : 0;
      const free = Math.max(0, 1 - wb - ws);
      const sum = wb + ws + free || 1;

      for (const n of nodes) {
        if (!reduced) {
          n.free.x += n.fv.x * dt;
          n.free.y += n.fv.y * dt;
          if (n.free.x < 0 || n.free.x > 1) n.fv.x *= -1;
          if (n.free.y < 0 || n.free.y > 1) n.fv.y *= -1;
        }
        let tx = n.free.x * w * free;
        let ty = n.free.y * h * free;
        if (br) {
          tx += (br.left + br.width / 2 + n.brain.x * bs) * wb;
          ty += (br.top + br.height / 2 + n.brain.y * bs) * wb;
        }
        if (sr) {
          tx += (sr.left + sr.width / 2 + n.shield.x * ss) * ws;
          ty += (sr.top + sr.height / 2 + n.shield.y * ss) * ws;
        }
        tx /= sum;
        ty /= sum;
        if (first || reduced) {
          n.x = tx;
          n.y = ty;
        } else {
          const k = 1 - Math.pow(0.0025, dt / 1000);
          n.x += (tx - n.x) * k;
          n.y += (ty - n.y) * k;
        }
      }
      first = false;

      const pal = { wire: mix(AI.wire, SEC.wire, ws), pkt: mix(AI.pkt, SEC.pkt, ws), node: mix(AI.node, SEC.node, ws), free: mix(AI.free, SEC.free, ws) };
      const shape = Math.max(wb, ws);
      ctx.clearRect(0, 0, w, h);

      // wires
      if (shape > 0.02) {
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = rgba(pal.wire, 0.75 * shape);
        ctx.beginPath();
        for (const [a, b] of edges) {
          const A = nodes[a];
          const B = nodes[b];
          const mx = (A.x + B.x) / 2 + (B.y - A.y) * 0.12;
          const my = (A.y + B.y) / 2 - (B.x - A.x) * 0.12;
          ctx.moveTo(A.x, A.y);
          ctx.quadraticCurveTo(mx, my, B.x, B.y);
        }
        ctx.stroke();
      }

      // check mark inside the shield once it has formed
      if (sr && ws > 0.55) {
        const cx = sr.left + sr.width / 2;
        const cy = sr.top + sr.height / 2;
        const a = Math.min(1, (ws - 0.55) / 0.3);
        ctx.strokeStyle = rgba(pal.pkt, 0.9 * a);
        ctx.lineWidth = Math.max(4, ss * 0.045);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = 18;
        ctx.shadowColor = rgba(pal.pkt, a);
        ctx.beginPath();
        ctx.moveTo(cx - ss * 0.26, cy + ss * 0.02);
        ctx.lineTo(cx - ss * 0.06, cy + ss * 0.24);
        ctx.lineTo(cx + ss * 0.3, cy - ss * 0.2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // nodes / loose packets
      for (const n of nodes) {
        if (shape > 0.5) {
          ctx.fillStyle = rgba(pal.node, 0.85);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.contour ? 2.1 : 1.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = rgba(pal.free, 0.35 + 0.4 * shape);
          ctx.fillRect(n.x - 3, n.y - 2, 6, 4);
        }
      }

      // packets running along the wires
      if (!reduced && shape > 0.3) {
        if (packets.length < (small ? 18 : 30) && Math.random() < dt / 70) {
          packets.push({ e: Math.floor(Math.random() * edges.length), t: 0, v: 0.8 + Math.random() * 1.2 });
        }
        ctx.shadowBlur = 12;
        ctx.shadowColor = rgba(pal.pkt, 1);
        ctx.fillStyle = rgba(pal.pkt, shape);
        for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i];
          p.t += (p.v * dt) / 1000;
          if (p.t >= 1) {
            // hop to a connected wire so packets travel through the network
            const [, b] = edges[p.e];
            const next = edges.map((e, k) => (e[0] === b ? k : -1)).filter((k) => k >= 0);
            if (next.length && Math.random() < 0.75) {
              p.e = next[Math.floor(Math.random() * next.length)];
              p.t = 0;
            } else {
              packets.splice(i, 1);
              continue;
            }
          }
          const [a, b] = edges[p.e];
          const A = nodes[a];
          const B = nodes[b];
          const mx = (A.x + B.x) / 2 + (B.y - A.y) * 0.12;
          const my = (A.y + B.y) / 2 - (B.x - A.x) * 0.12;
          const u = 1 - p.t;
          const x = u * u * A.x + 2 * u * p.t * mx + p.t * p.t * B.x;
          const y = u * u * A.y + 2 * u * p.t * my + p.t * p.t * B.y;
          ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
        }
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return <canvas ref={ref} className="brain-field" aria-hidden="true" />;
}
