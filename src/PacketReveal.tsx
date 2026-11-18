import { useEffect, useRef, useState, type ReactNode } from "react";

/*
  A section arrives as packets: a grid of small byte tiles streams in from
  the cable on the left, lands in place, gets "decoded" (a scan line), and
  dissolves into the real content.
*/

const COLS = 8;
const ROWS = 4;
const HEX = "0123456789ABCDEF";

function byte(i: number, salt: number) {
  const n = (i * 37 + salt * 11) % 256;
  return "0x" + HEX[n >> 4] + HEX[n & 15];
}

export default function PacketReveal({
  id,
  label,
  className,
  reduced,
  armed = true,
  onArrive,
  children,
}: {
  id: string;
  label: string;
  className?: string;
  reduced: boolean;
  armed?: boolean;
  onArrive?: (id: string) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<"wait" | "stream" | "done">(reduced ? "done" : "wait");
  const salt = label.length;

  useEffect(() => {
    if (reduced) {
      setPhase("done");
      onArrive?.(id);
      return;
    }
    const el = ref.current;
    if (!el || !armed) return;
    let t = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          setPhase("stream");
          onArrive?.(id);
          t = window.setTimeout(() => setPhase("done"), 1250);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, armed]);

  return (
    <section ref={ref} id={id} className={`pkt-section pkt-section--${phase} ${className ?? ""}`}>
      {phase === "stream" && (
        <div className="pkt-overlay" aria-hidden="true">
          <div className="pkt-label">
            <span>RX</span> {label}.pkt · {COLS * ROWS} packets · decoding…
          </div>
          <div className="pkt-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
            {Array.from({ length: COLS * ROWS }, (_, i) => {
              const col = i % COLS;
              const row = Math.floor(i / COLS);
              return (
                <span
                  key={i}
                  className="pkt-tile"
                  style={{ animationDelay: `${col * 0.045 + row * 0.07 + ((i * 7) % 5) * 0.02}s` }}
                >
                  {byte(i, salt)}
                </span>
              );
            })}
          </div>
          <span className="pkt-scan" />
        </div>
      )}
      <div className="pkt-content">{children}</div>
    </section>
  );
}
