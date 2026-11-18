/*
  The whiteboard: an honest picture of how Dhruv builds. His part on the left, the AI's part
  on the right, and sticky notes that say plainly what he does and does not hand-code.
*/

const MINE = [
  ["Find the problem", "and brainstorm it out loud with AI"],
  ["Design the system", "organs, pipelines, data flow, safety rules"],
  ["Write the brief", "by voice with Wispr Flow, plus skills, links and docs as context"],
  ["Run the sessions", "parallel, forked and handed-off Claude Code sessions"],
  ["Review & test", "read the diff, run the checks, reject anything unproven"],
  ["Ship & explain", "deploy it, measure it, write up what worked and what didn't"],
];

const AI = [
  "Types the syntax (Python, JavaScript, TypeScript)",
  "Framework code (React, FastAPI, Django)",
  "Config & deploy steps (Docker, AWS, Vercel)",
  "First drafts of tests",
  "Searches docs faster than I can",
];

const KIT = ["Claude Code", "Claude Skills", "MCP connectors", "Wispr Flow", "Parallel sessions", "Artifacts & reports"];

export default function Whiteboard() {
  return (
    <div className="shell wb">
      <div className="head">
        <p className="kicker">03 — whiteboard</p>
        <h2 className="display">
          How I <span className="script-inline">actually</span> build
        </h2>
        <p className="lede wb-lede">
          All three products were built with AI. Here is the honest split of who does what.
        </p>
      </div>

      <div className="board">
        <div className="board-surface">
          <div className="board-col">
            <h3 className="marker marker--blue">My part</h3>
            <ol className="board-steps">
              {MINE.map(([t, d]) => (
                <li key={t}>
                  <strong>{t}</strong>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="board-arrow" aria-hidden="true">
            <svg viewBox="0 0 120 60">
              <path d="M6 22 C40 6 78 6 108 22" />
              <path d="M98 12 108 22 95 28" />
              <path d="M114 40 C80 56 42 56 12 40" />
              <path d="M22 50 12 40 25 34" />
            </svg>
            <span>brief →</span>
            <span>← code</span>
          </div>

          <div className="board-col">
            <h3 className="marker marker--red">AI&apos;s part</h3>
            <ul className="board-ai">
              {AI.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="board-kit-label">my AI kit</p>
            <ul className="board-kit">
              {KIT.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="board-tray" aria-hidden="true">
          <i className="pen pen--blue" />
          <i className="pen pen--red" />
          <i className="pen pen--black" />
          <i className="eraser" />
        </div>
      </div>

      <div className="stickies">
        <article className="sticky sticky--yellow">
          <h4>Honest note</h4>
          <p>
            I&apos;m not a syntax-first software engineer. I know what each framework is for and how the pieces connect,
            and I can read and review the code, but I haven&apos;t hand-written JavaScript, Django or Redis. AI types; I
            design, direct and verify.
          </p>
        </article>
        <article className="sticky sticky--pink">
          <h4>Why it works</h4>
          <p>
            With AI, the hard part is no longer typing. It&apos;s knowing what to build, how the parts connect, and
            spotting when the output is wrong. That&apos;s the part I practise every day.
          </p>
        </article>
        <article className="sticky sticky--green">
          <h4>Proof</h4>
          <p>
            Hojaiga: 230k+ lines across 60+ modules, all from my organ design and 20 planned pipelines, with an honest
            report of what failed. Read it in the work section above.
          </p>
        </article>
      </div>
    </div>
  );
}
