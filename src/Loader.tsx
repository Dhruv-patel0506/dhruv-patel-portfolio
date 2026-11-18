import { useEffect, useRef, useState } from "react";

/*
  Boot sequence: packets travel down a cable into an AI core, a malicious
  packet is dropped at the firewall, decoded page packets leave on the
  other side, then the core opens and the portfolio appears.
*/

const INBOUND = ["SYN", "HDR", "ai.pkt", "0x3F", "rag", "TLS", "llm", "0xA1", "ACK", "ui.pkt"];
const OUTBOUND = ["about", "skills", "work", "journey", "contact"];

const LOG = [
  { t: 150, text: "connecting to dhruv.portfolio:443", tag: "" },
  { t: 520, text: "TLS 1.3 handshake", tag: "ok" },
  { t: 900, text: "inbound stream: 24 packets", tag: "" },
  { t: 1350, text: "threat scan: 1 malicious packet dropped", tag: "blocked" },
  { t: 1800, text: "AI router: decoding payload into pages", tag: "" },
  { t: 2300, text: "assembling portfolio", tag: "100%" },
];

const TOTAL_MS = 2900;

export default function Loader({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setLeaving(true);
    window.setTimeout(onDone, 650);
  };

  useEffect(() => {
    const timers = LOG.map((line, i) => window.setTimeout(() => setShown(i + 1), line.t));
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / TOTAL_MS);
      setPct(Math.round(100 * (1 - Math.pow(1 - p, 2))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(finish, 180);
    };
    raf = requestAnimationFrame(tick);
    const skip = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", skip);
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`boot ${leaving ? "boot--leaving" : ""}`} role="status" aria-label="Loading portfolio">
      <div className="boot-grid" aria-hidden="true" />

      <div className="boot-stage" aria-hidden="true">
        <div className="boot-cable boot-cable--in">
          {INBOUND.map((label, i) => (
            <span className="boot-packet" style={{ animationDelay: `${i * 0.21}s` }} key={label + i}>
              {label}
            </span>
          ))}
          <span className="boot-packet boot-packet--bad" style={{ animationDelay: "0.85s" }}>
            MALWARE
          </span>
          <span className="boot-firewall">
            <i />
          </span>
        </div>

        <div className="boot-core">
          <span className="boot-ring boot-ring--1" />
          <span className="boot-ring boot-ring--2" />
          <span className="boot-ring boot-ring--3" />
          <span className="boot-core-face">
            <svg viewBox="0 0 64 64">
              <g className="boot-net">
                <line x1="14" y1="20" x2="32" y2="14" />
                <line x1="14" y1="20" x2="32" y2="32" />
                <line x1="14" y1="44" x2="32" y2="32" />
                <line x1="14" y1="44" x2="32" y2="50" />
                <line x1="32" y1="14" x2="50" y2="32" />
                <line x1="32" y1="32" x2="50" y2="32" />
                <line x1="32" y1="50" x2="50" y2="32" />
              </g>
              <circle cx="14" cy="20" r="3.4" />
              <circle cx="14" cy="44" r="3.4" />
              <circle cx="32" cy="14" r="3.4" />
              <circle cx="32" cy="32" r="3.4" />
              <circle cx="32" cy="50" r="3.4" />
              <circle cx="50" cy="32" r="4.4" className="boot-out-node" />
            </svg>
          </span>
        </div>

        <div className="boot-cable boot-cable--out">
          {OUTBOUND.map((label, i) => (
            <span className="boot-packet boot-packet--page" style={{ animationDelay: `${1.6 + i * 0.22}s` }} key={label}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="boot-console">
        <div className="boot-console-top">
          <span>dhruv@portfolio:~$ ./boot --ai</span>
          <button type="button" className="boot-skip" onClick={finish}>
            skip ›
          </button>
        </div>
        <ol>
          {LOG.slice(0, shown).map((line) => (
            <li key={line.text}>
              <span className="boot-arrow">›</span> {line.text}
              {line.tag && <span className={`boot-tag boot-tag--${line.tag === "blocked" ? "bad" : "ok"}`}>{line.tag}</span>}
            </li>
          ))}
        </ol>
        <div className="boot-bar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="boot-pct">{pct}%</div>
      </div>
    </div>
  );
}
