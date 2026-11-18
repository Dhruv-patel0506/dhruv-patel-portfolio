import { useEffect, useRef, useState } from "react";
import { terminalExtra, terminalScript } from "./data";

/* Hero terminal: plays a short script, then lets visitors run a few commands. */

type Line = { kind: "cmd" | "out"; text: string };

const ALL: Record<string, string[]> = {
  ...Object.fromEntries(terminalScript.map((s) => [s.cmd, s.out])),
  ...terminalExtra,
};

export default function Terminal({ start, reduced }: { start: boolean; reduced: boolean }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [busy, setBusy] = useState(false);
  const body = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const run = (cmd: string, then?: () => void) => {
    setBusy(true);
    const out = ALL[cmd] ?? [`command not found: ${cmd}`];
    if (reduced) {
      setLines((l) => [...l, { kind: "cmd", text: cmd }, ...out.map((t) => ({ kind: "out" as const, text: t }))]);
      setBusy(false);
      then?.();
      return;
    }
    let i = 0;
    const step = () => {
      i += 1;
      setTyping(cmd.slice(0, i));
      if (i < cmd.length) later(step, 38 + Math.random() * 40);
      else
        later(() => {
          setTyping("");
          setLines((l) => [...l, { kind: "cmd", text: cmd }]);
          out.forEach((t, k) => later(() => setLines((l) => [...l, { kind: "out", text: t }]), 140 + k * 120));
          later(() => {
            setBusy(false);
            if (cmd === "hire --me") document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            then?.();
          }, 200 + out.length * 120);
        }, 160);
    };
    step();
  };

  useEffect(() => {
    if (!start) return;
    let k = 0;
    const next = () => {
      if (k >= terminalScript.length) return;
      const c = terminalScript[k++].cmd;
      later(() => run(c, next), 260);
    };
    next();
    const t = timers.current;
    return () => t.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  useEffect(() => {
    if (body.current) body.current.scrollTop = body.current.scrollHeight;
  }, [lines, typing]);

  return (
    <div className="term" aria-label="Interactive terminal introduction">
      <div className="term-bar">
        <span className="term-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>dhruv@portfolio: ~</span>
        <span className="term-secure">● encrypted</span>
      </div>
      <div className="term-body" ref={body} aria-live="polite">
        {lines.map((l, i) =>
          l.kind === "cmd" ? (
            <div className="term-line" key={i}>
              <span className="term-prompt">$</span> {l.text}
            </div>
          ) : (
            <div className="term-out" key={i}>
              {l.text}
            </div>
          )
        )}
        <div className="term-line">
          <span className="term-prompt">$</span> {typing}
          <span className="term-caret" />
        </div>
      </div>
      <div className="term-chips">
        <span>try:</span>
        {["ping ai", "hire --me", "sudo make coffee", "whoami"].map((c) => (
          <button type="button" key={c} disabled={busy} onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
