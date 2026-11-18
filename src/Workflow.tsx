import { useEffect, useState } from "react";
import { pipelines } from "./data";

/*
  Dhruv's hand-drawn Hojaiga blueprint: 20 organ pipelines. For each one you can see the
  new organ before it is wired in, after it is wired, and the whole system built so far.
*/

const STAGES = [
  { id: "before", label: "1 · Before wiring", note: "the new organ, unconnected" },
  { id: "after", label: "2 · Wired in", note: "pipeline and socket connected" },
  { id: "system", label: "3 · System so far", note: "every organ built up to this point" },
] as const;

export default function Workflow({ reduced }: { reduced: boolean }) {
  // one counter: pipeline = pos / 3, stage = pos % 3 (starts on pipeline 01, "system so far")
  const [pos, setPos] = useState(2);
  const [playing, setPlaying] = useState(false);
  const N = pipelines.length;
  const i = Math.floor(pos / 3);
  const stage = STAGES[pos % 3].id;
  const p = pipelines[i];
  const setI = (k: number | ((k: number) => number)) =>
    setPos((v) => {
      const cur = Math.floor(v / 3);
      const next = typeof k === "function" ? k(cur) : k;
      return next * 3 + (v % 3);
    });
  const setStage = (id: (typeof STAGES)[number]["id"]) =>
    setPos((v) => Math.floor(v / 3) * 3 + STAGES.findIndex((s) => s.id === id));

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setPos((v) => (v + 1) % (N * 3)), reduced ? 2600 : 1700);
    return () => window.clearInterval(id);
  }, [playing, reduced, N]);

  // preload the neighbours so stepping feels instant
  useEffect(() => {
    [i, i + 1, i - 1].forEach((k) => {
      const q = pipelines[(k + pipelines.length) % pipelines.length];
      STAGES.forEach((s) => {
        const img = new Image();
        img.src = `/workflow/p${q.n}_${s.id}.webp`;
      });
    });
  }, [i]);

  const go = (d: number) => {
    setPlaying(false);
    setI((k) => (k + d + pipelines.length) % pipelines.length);
  };

  return (
    <div className="shell wf">
      <div className="head">
        <p className="kicker">04 — the workflow I drew</p>
        <h2 className="display">
          How the <span className="script-inline">organs</span> connect
        </h2>
        <p className="lede wf-lede">
          Before writing Hojaiga, I drew it as a body: a brain, a central nervous system, and organs wired in one
          pipeline at a time. Pipelines 1–8 are my original blueprint drawings; 9–20 are drawn from each organ's own
          code in the same style, so every part you see is a real class in that organ.
        </p>
      </div>

      <div className="wf-stage">
        <div className="wf-frame">
          <img
            key={`${p.n}-${stage}`}
            src={`/workflow/p${p.n}_${stage}.webp`}
            alt={`Pipeline ${p.n}, ${p.name}: ${STAGES.find((s) => s.id === stage)?.note}`}
            width={820}
            height={820}
          />
          <span className="wf-stamp">
            PIPELINE {p.n} / {pipelines.length}
          </span>
        </div>

        <div className="wf-side">
          <p className="meta">pipeline {p.n}</p>
          <h3>{p.name}</h3>
          <div className="wf-tabs" role="tablist" aria-label="Drawing stage">
            {STAGES.map((s) => (
              <button
                type="button"
                role="tab"
                key={s.id}
                aria-selected={stage === s.id}
                className={stage === s.id ? "is-on" : ""}
                onClick={() => {
                  setPlaying(false);
                  setStage(s.id);
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className="wf-note">{STAGES.find((s) => s.id === stage)?.note}</p>

          <div className="wf-controls">
            <button type="button" onClick={() => go(-1)} aria-label="Previous pipeline">
              ←
            </button>
            <button type="button" className="wf-play" onClick={() => setPlaying((v) => !v)}>
              {playing ? "❚❚ pause" : "▶ play the build"}
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next pipeline">
              →
            </button>
          </div>
          <input
            className="wf-range"
            type="range"
            min={0}
            max={pipelines.length - 1}
            value={i}
            onChange={(e) => {
              setPlaying(false);
              setI(Number(e.target.value));
            }}
            aria-label="Pipeline"
          />
          <ol className="wf-list">
            {pipelines.map((q, k) => (
              <li key={q.n}>
                <button
                  type="button"
                  className={k === i ? "is-on" : k < i ? "is-done" : ""}
                  onClick={() => {
                    setPlaying(false);
                    setI(k);
                  }}
                  title={q.name}
                >
                  {q.n}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
