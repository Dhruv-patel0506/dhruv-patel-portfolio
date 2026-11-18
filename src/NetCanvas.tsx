import { useEffect, useRef } from "react";

/*
  Hero background: a small neural/network graph. Cyan packets travel along
  the edges; every few seconds a red packet tries to get through and is
  stopped by a green shield ring. Nodes near the cursor light up.
*/

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Packet = { a: number; b: number; t: number; speed: number; bad: boolean };
type Burst = { x: number; y: number; t: number };

export default function NetCanvas({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    const packets: Packet[] = [];
    const bursts: Burst[] = [];
    const mouse = { x: -999, y: -999 };
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let badClock = 0;

    // deterministic random so the layout is stable between loads
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed = 7;
      const count = Math.max(18, Math.min(46, Math.round((w * h) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: rand() * w,
        y: rand() * h,
        vx: (rand() - 0.5) * 0.12,
        vy: (rand() - 0.5) * 0.12,
        r: 1.6 + rand() * 1.8,
      }));
      edges = [];
      const maxD = Math.min(220, Math.max(140, w / 6));
      for (let i = 0; i < nodes.length; i++) {
        const near = nodes
          .map((n, j) => ({ j, d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y) }))
          .filter((o) => o.j !== i && o.d < maxD)
          .sort((p, q) => p.d - q.d)
          .slice(0, 3);
        near.forEach((o) => {
          if (!edges.some(([a, b]) => (a === i && b === o.j) || (a === o.j && b === i))) edges.push([i, o.j]);
        });
      }
      packets.length = 0;
    };

    const spawn = (bad: boolean) => {
      if (!edges.length) return;
      const [a, b] = edges[Math.floor(Math.random() * edges.length)];
      packets.push({ a, b, t: 0, speed: bad ? 0.28 : 0.35 + Math.random() * 0.35, bad });
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      // drift nodes slightly
      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx * dt * 0.06;
          n.y += n.vy * dt * 0.06;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      // edges
      for (const [a, b] of edges) {
        const A = nodes[a];
        const B = nodes[b];
        const near = Math.min(Math.hypot(A.x - mouse.x, A.y - mouse.y), Math.hypot(B.x - mouse.x, B.y - mouse.y));
        const glow = near < 150 ? 1 - near / 150 : 0;
        ctx.strokeStyle = `rgba(77, 226, 255, ${0.09 + glow * 0.35})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }
      // cursor links
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(167, 139, 250, ${0.4 * (1 - d / 130)})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      // nodes
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const g = d < 150 ? 1 - d / 150 : 0;
        ctx.fillStyle = g > 0 ? `rgba(124, 255, 155, ${0.5 + g * 0.5})` : "rgba(140, 170, 210, 0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + g * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      // packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += (p.speed * dt) / 1000;
        const A = nodes[p.a];
        const B = nodes[p.b];
        const limit = p.bad ? 0.62 : 1;
        if (p.t >= limit) {
          if (p.bad) bursts.push({ x: A.x + (B.x - A.x) * limit, y: A.y + (B.y - A.y) * limit, t: 0 });
          packets.splice(i, 1);
          continue;
        }
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        ctx.fillStyle = p.bad ? "#ff5c7a" : "#4de2ff";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.fillRect(x - 3, y - 2, 6, 4);
        ctx.shadowBlur = 0;
      }
      // blocked-threat bursts: shield ring
      for (let i = bursts.length - 1; i >= 0; i--) {
        const s = bursts[i];
        s.t += dt / 900;
        if (s.t >= 1) {
          bursts.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(124, 255, 155, ${1 - s.t})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 6 + s.t * 26, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(255, 92, 122, ${0.9 * (1 - s.t)})`;
        ctx.font = "600 10px 'JetBrains Mono', monospace";
        ctx.fillText("blocked", s.x + 10, s.y - 10 - s.t * 10);
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      if (visible) {
        if (packets.length < 14 && Math.random() < dt / 160) spawn(false);
        badClock += dt;
        if (badClock > 3800) {
          badClock = 0;
          spawn(true);
        }
        draw(dt);
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    build();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    if (reduced) {
      draw(16);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return <canvas ref={ref} className="net-canvas" aria-hidden="true" />;
}
