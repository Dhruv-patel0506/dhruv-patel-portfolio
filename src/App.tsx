import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Loader from "./Loader";
import NetCanvas from "./NetCanvas";
import PacketReveal from "./PacketReveal";
import Terminal from "./Terminal";
import { credentials, journey, links, projects, skills, stats, type Project } from "./data";

const SECTIONS = ["about", "skills", "work", "journey", "badges", "contact"];

const FORCE_MOTION = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("motion");

function usePrefersReducedMotion() {
  const get = () =>
    typeof window !== "undefined" && !FORCE_MOTION && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [reduced, setReduced] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(!FORCE_MOTION && mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function ProjectArt({ kind }: { kind: Project["art"] }) {
  if (kind === "agent")
    return (
      <div className="art art-agent" aria-hidden="true">
        <div className="agent-window">
          <div className="agent-titlebar">
            <i />
            <i />
            <i />
            <span>hidden window</span>
          </div>
          <div className="agent-ribbon">
            {Array.from({ length: 8 }, (_, i) => (
              <b key={i} />
            ))}
          </div>
          <div className="agent-doc">
            <i />
            <i />
            <i />
          </div>
          <span className="agent-cursor" />
          <span className="agent-proof">✓ proven</span>
        </div>
      </div>
    );
  if (kind === "academy")
    return (
      <div className="art art-academy" aria-hidden="true">
        <code>
          <span className="c-key">import</span> numpy <span className="c-key">as</span> np
          <br />
          x = np.array([<span className="c-num">2</span>, <span className="c-num">4</span>, <span className="c-num">6</span>])
          <br />
          print(x.mean())
          <br />
          <span className="c-out">» 4.0</span>
          <span className="academy-caret" />
        </code>
        <span className="academy-badge">Python · in your browser</span>
      </div>
    );
  if (kind === "forecast")
    return (
      <div className="art art-forecast" aria-hidden="true">
        <svg viewBox="0 0 200 90" preserveAspectRatio="none">
          <polyline className="fc-grid" points="0,30 200,30" />
          <polyline className="fc-grid" points="0,60 200,60" />
          <polyline className="fc-line" points="0,78 25,70 45,73 70,52 95,36 118,22 132,18 150,28 170,46 200,62" />
        </svg>
        <span className="fc-peak">peak</span>
        <span className="fc-risk">crash risk ↑</span>
      </div>
    );
  if (kind === "gauge")
    return (
      <div className="art art-gauge" aria-hidden="true">
        <div className="gauge">
          <span className="gauge-needle" />
          <span className="gauge-hub" />
        </div>
        <span className="gauge-label">reliability score</span>
      </div>
    );
  return (
    <div className="art art-shield" aria-hidden="true">
      <svg viewBox="0 0 64 72">
        <path d="M32 4 58 14v20c0 17-11 29-26 34C17 63 6 51 6 34V14Z" />
        <path className="shield-check" d="m20 36 9 9 16-18" />
      </svg>
      <span className="shield-scan" />
    </div>
  );
}

export default function App() {
  const systemReduced = usePrefersReducedMotion();
  const [replay, setReplay] = useState(false);
  const reduced = systemReduced && !replay;
  const [booting, setBooting] = useState(() => !systemReduced);
  const [arrived, setArrived] = useState<string[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduced);
  }, [reduced]);

  const replayIntro = () => {
    setReplay(true);
    window.scrollTo({ top: 0 });
    setBooting(true);
  };

  const onArrive = useCallback((id: string) => {
    setArrived((a) => (a.includes(id) ? a : [...a, id]));
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-booting", booting);
  }, [booting]);

  return (
    <>
      {booting && <Loader onDone={() => setBooting(false)} />}

      <header className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="#home" aria-label="Dhruv Patel home">
            <span className="brand-chip">DP</span>
            <span>Dhruv Patel</span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#work">Work</a>
            <a href="#journey">Journey</a>
            <a href="#contact">Contact</a>
          </nav>
          <span className="nav-status" title="Sections received so far">
            <span className="nav-led" /> rx {arrived.length}/{SECTIONS.length}
          </span>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <NetCanvas reduced={reduced} />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="kicker">
                <span className="kicker-ai">AI engineer</span> · <span className="kicker-sec">security-minded</span>
              </p>
              <h1>
                I build AI that <span className="grad">does the work</span>
                <br />
                and <span className="grad-sec">proves it.</span>
              </h1>
              <p className="hero-lede">
                I&apos;m Dhruv Patel. I build AI agents, automation and full-stack products, with a cybersecurity
                background that keeps them safe. In 2026 I shipped three of them end to end.
              </p>
              <div className="hero-actions">
                <a className="btn btn-ai" href="#work">
                  See the work <span aria-hidden="true">↓</span>
                </a>
                <a className="btn btn-ghost" href={links.resume} download="Dhruv-Patel-Resume.pdf">
                  Download résumé <span aria-hidden="true">↗</span>
                </a>
              </div>
              <ul className="stats">
                {stats.map((s) => (
                  <li key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Terminal start={!booting} reduced={reduced} />
          </div>
        </section>

        <PacketReveal id="about" label="about" reduced={reduced} armed={!booting} onArrive={onArrive} className="band">
          <div className="shell split">
            <div>
              <p className="eyebrow">01 · about</p>
              <h2>Curious about AI, careful about trust.</h2>
            </div>
            <div className="prose">
              <p>
                I&apos;m a Computer Science graduate (cybersecurity concentration, UTC) who learns by building. My main
                focus is AI: agents that operate real software, LLM apps with retrieval, and models I can measure
                honestly instead of guessing.
              </p>
              <p>
                In 2026 I built <strong>Hojaiga</strong>, a desktop AI agent; <strong>DS ConQuest</strong>, a data
                science academy that runs Python in the browser; and <strong>Crestfall</strong>, a forecasting web
                app on AWS. The security side shows up in everything: least privilege, safe defaults, and checking
                results before calling anything done.
              </p>
            </div>
          </div>
        </PacketReveal>

        <PacketReveal id="skills" label="skills" reduced={reduced} armed={!booting} onArrive={onArrive}>
          <div className="shell">
            <div className="head-row">
              <div>
                <p className="eyebrow">02 · skills</p>
                <h2>The model weights.</h2>
              </div>
              <p className="aside">AI leads; software, cloud and security keep it running in the real world.</p>
            </div>
            <div className="skill-grid">
              {skills.map((g) => (
                <article className={`skill skill--${g.id}`} key={g.id}>
                  <div className="skill-top">
                    <h3>{g.title}</h3>
                    <span>{g.note}</span>
                  </div>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </PacketReveal>

        <PacketReveal id="work" label="work" reduced={reduced} armed={!booting} onArrive={onArrive} className="band">
          <div className="shell">
            <div className="head-row">
              <div>
                <p className="eyebrow">03 · work</p>
                <h2>Packets I&apos;ve shipped.</h2>
              </div>
              <p className="aside">Three products from 2026 plus earlier work. Every live link opens the real thing.</p>
            </div>
            <div className="work-grid">
              {projects.map((p, i) => (
                <article className={`card card--${p.id} ${i === 0 ? "card--feature" : ""}`} key={p.id}>
                  <div className="card-head">
                    <span>PKT {String(i + 1).padStart(2, "0")}</span>
                    <span>src={p.id}</span>
                    <span className="card-ok">✓ {p.status}</span>
                  </div>
                  <ProjectArt kind={p.art} />
                  <div className="card-body">
                    <p className="card-role">{p.role}</p>
                    <h3>{p.name}</h3>
                    <p className="card-blurb">{p.blurb}</p>
                    <ul className="card-facts">
                      {p.facts.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <div className="tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    {p.links.length > 0 && (
                      <div className="card-links">
                        {p.links.map((l) => (
                          <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                            {l.label} <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </PacketReveal>

        <PacketReveal id="journey" label="journey" reduced={reduced} armed={!booting} onArrive={onArrive}>
          <div className="shell">
            <div className="head-row">
              <div>
                <p className="eyebrow">04 · journey</p>
                <h2>traceroute dhruv --since 2022</h2>
              </div>
              <p className="aside">Every hop on the way here: study, work, competitions and builds.</p>
            </div>
            <ol className="trace">
              {journey.map((j, i) => (
                <li className={`hop hop--${j.kind}`} key={j.role + j.dates}>
                  <span className="hop-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hop-dot" aria-hidden="true" />
                  <div className="hop-card">
                    <div className="hop-top">
                      <span className="hop-kind">{j.kind === "ai" ? "build" : j.kind === "sec" ? "security" : j.kind === "edu" ? "education" : "work"}</span>
                      <time>{j.dates}</time>
                    </div>
                    <h3>{j.role}</h3>
                    <p className="hop-org">{j.org}</p>
                    <p className="hop-text">{j.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </PacketReveal>

        <PacketReveal id="badges" label="badges" reduced={reduced} armed={!booting} onArrive={onArrive} className="band">
          <div className="shell">
            <div className="head-row">
              <div>
                <p className="eyebrow">05 · badges</p>
                <h2>Signatures verified.</h2>
              </div>
              <p className="aside">Certificates and training, each one linked to the original.</p>
            </div>
            <div className="badge-grid">
              {credentials.map((c) => (
                <article className={`badge badge--${c.id}`} key={c.id}>
                  {c.image ? (
                    <img src={c.image} alt={`${c.issuer} badge: ${c.title}`} />
                  ) : (
                    <span className="badge-mark" aria-hidden="true">
                      {c.issuer.slice(0, 1)}
                    </span>
                  )}
                  <div>
                    <p className="badge-issuer">{c.issuer}</p>
                    <h3>{c.title}</h3>
                    <p className="badge-detail">{c.detail}</p>
                    <p className="badge-sig">sig: valid ✓</p>
                    <a href={c.href} target="_blank" rel="noreferrer">
                      {c.label} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </PacketReveal>

        <PacketReveal id="contact" label="contact" reduced={reduced} armed={!booting} onArrive={onArrive}>
          <div className="shell contact">
            <div>
              <p className="eyebrow">06 · contact</p>
              <h2>
                Open a <span className="grad">connection.</span>
              </h2>
              <p className="aside">
                Working on AI, automation or anything that has to be both smart and safe? I&apos;d be glad to talk.
              </p>
            </div>
            <div className="contact-term">
              <p>
                <span className="term-prompt">$</span> connect --to dhruv
              </p>
              <a href={`mailto:${links.email}`}>
                <span>email</span> {links.email}
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer">
                <span>linkedin</span> in/dhruv-d-patel0506 ↗
              </a>
              <a href={links.github} target="_blank" rel="noreferrer">
                <span>github</span> Dhruv-patel0506 ↗
              </a>
              <a href={`tel:${links.phone}`}>
                <span>phone</span> {links.phoneLabel}
              </a>
              <a href={links.resume} download="Dhruv-Patel-Resume.pdf">
                <span>résumé</span> Dhruv-Patel-Resume.pdf ↓
              </a>
              <p className="contact-ok">connection established ✓</p>
            </div>
          </div>
        </PacketReveal>
      </main>

      <footer className="foot">
        <div className="shell foot-inner">
          <span className="brand">
            <span className="brand-chip">DP</span>
            <span>Dhruv Patel</span>
          </span>
          <span>AI · automation · security-minded building</span>
          <button type="button" className="replay" onClick={replayIntro}>
            ↻ replay intro
          </button>
          <span>© 2026 · 0 packets lost</span>
        </div>
      </footer>
    </>
  );
}
