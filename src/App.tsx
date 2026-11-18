import { useCallback, useEffect, useState } from "react";
import "./App.css";
import AskBar from "./AskBar";
import BrainField from "./BrainField";
import Loader from "./Loader";
import PacketReveal from "./PacketReveal";
import { credentials, journey, links, projects, skills, stats, type Project } from "./data";

const SECTIONS = ["about", "work", "skills", "security", "journey", "contact"];
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

/* A framed print, like the gallery wall in the reference photo. */
function Print({ kind }: { kind: Project["art"] }) {
  if (kind === "agent")
    return (
      <span className="print print--type">
        <b>H</b>
        <i>J</i>
        <small>agent · 2026</small>
      </span>
    );
  if (kind === "academy")
    return (
      <span className="print print--type print--ds">
        <b>D</b>
        <i>S</i>
        <small>learn · python</small>
      </span>
    );
  if (kind === "forecast")
    return (
      <span className="print print--chart">
        <svg viewBox="0 0 100 60" preserveAspectRatio="none">
          <polyline points="0,52 15,46 28,48 42,30 56,18 66,14 76,22 88,38 100,46" />
        </svg>
        <small>rise · fall</small>
      </span>
    );
  if (kind === "gauge")
    return (
      <span className="print print--gauge">
        <span />
        <small>reliability</small>
      </span>
    );
  return (
    <span className="print print--shield">
      <svg viewBox="0 0 64 72">
        <path d="M32 4 58 14v20c0 17-11 29-26 34C17 63 6 51 6 34V14Z" />
        <path d="m20 36 9 9 16-18" />
      </svg>
      <small>blue team</small>
    </span>
  );
}

/* Placeholder figure: no face, to be replaced with the real photo. */
function Figure() {
  return (
    <figure className="me" aria-label="Portrait placeholder">
      <svg viewBox="0 0 400 600" className="me-svg" aria-hidden="true">
        <defs>
          <linearGradient id="sweater" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a332e" />
            <stop offset="0.55" stopColor="#221d1a" />
            <stop offset="1" stopColor="#141110" />
          </linearGradient>
          <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8a6a55" />
            <stop offset="1" stopColor="#5d4436" />
          </linearGradient>
          <radialGradient id="rim" cx="0.2" cy="0.3" r="0.9">
            <stop offset="0" stopColor="#fff3e0" stopOpacity="0.22" />
            <stop offset="1" stopColor="#fff3e0" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* neck + head (no face) */}
        <path d="M178 150h44v46c0 10-10 18-22 18s-22-8-22-18Z" fill="url(#skin)" />
        <ellipse cx="200" cy="104" rx="56" ry="66" fill="url(#skin)" />
        <path d="M144 96c2-44 30-66 58-66 32 0 56 22 56 62-8-18-26-30-56-30-30 0-48 14-58 34Z" fill="#1d1714" />
        {/* body */}
        <path
          d="M200 196c-40 0-78 10-104 30-22 18-32 52-38 96l-18 150c-2 18 10 30 28 30h264c18 0 30-12 28-30l-18-150c-6-44-16-78-38-96-26-20-64-30-104-30Z"
          fill="url(#sweater)"
        />
        <path d="M168 200c8 14 20 22 32 22s24-8 32-22" fill="none" stroke="#2f2925" strokeWidth="6" />
        <path
          d="M200 196c-40 0-78 10-104 30-22 18-32 52-38 96l-18 150c-2 18 10 30 28 30h264c18 0 30-12 28-30l-18-150c-6-44-16-78-38-96-26-20-64-30-104-30Z"
          fill="url(#rim)"
        />
      </svg>
      <figcaption className="me-tag">your photo goes here</figcaption>
    </figure>
  );
}

export default function App() {
  const systemReduced = usePrefersReducedMotion();
  const [replay, setReplay] = useState(false);
  const reduced = systemReduced && !replay;
  const [booting, setBooting] = useState(() => !systemReduced);
  const [arrived, setArrived] = useState<string[]>([]);
  const [cyber, setCyber] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduced);
  }, [reduced]);
  useEffect(() => {
    document.body.classList.toggle("is-booting", booting);
  }, [booting]);
  useEffect(() => {
    document.body.classList.toggle("theme-cyber", cyber);
  }, [cyber]);

  const onArrive = useCallback((id: string) => setArrived((a) => (a.includes(id) ? a : [...a, id])), []);
  const replayIntro = () => {
    setReplay(true);
    window.scrollTo({ top: 0 });
    setBooting(true);
  };

  const feature = projects[0];
  const rest = projects.slice(1);

  return (
    <>
      {booting && <Loader onDone={() => setBooting(false)} />}
      <BrainField reduced={reduced} brainAnchor=".brain-anchor" shieldAnchor=".shield-anchor" onCyber={setCyber} />
      <div className="grain" aria-hidden="true" />

      <header className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="#home">
            <span className="brand-chip">dp</span>
            <span>dhruv.patel</span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#skills">Toolkit</a>
            <a href="#security">Security</a>
            <a href="#journey">Journey</a>
            <a href="#contact">Contact</a>
          </nav>
          <span className="nav-status">
            <span className="nav-led" /> {cyber ? "secure mode" : "ai mode"} · rx {arrived.length}/{SECTIONS.length}
          </span>
        </div>
      </header>

      <main>
        {/* ---------------- HERO ---------------- */}
        <section className="hero" id="home">
          <div className="hero-light" aria-hidden="true" />

          <div className="frames frames--left" aria-hidden="true">
            <span className="frame"><Print kind="agent" /></span>
            <span className="frame frame--tall"><Print kind="forecast" /></span>
          </div>
          <div className="frames frames--right" aria-hidden="true">
            <span className="frame frame--tall"><Print kind="academy" /></span>
            <span className="frame"><Print kind="shield" /></span>
          </div>

          <div className="hero-head">
            <p className="hero-tag">#AI · #AUTOMATION · #SECURITY · #BUILDINPUBLIC</p>
            <p className="script script--left">AI engineer&apos;s</p>
            <h1 className="mega">
              Portfolio<span className="sr-only">: Dhruv Patel, AI engineer</span>
            </h1>
            <p className="script script--right">made of data packets</p>
          </div>

          <div className="brain-anchor" aria-hidden="true" />
          <Figure />
          <div className="hero-ask">
            <AskBar />
          </div>

          <div className="hero-foot shell">
            <p className="hero-intro">
              <strong>Dhruv Patel.</strong> I build AI agents, automation and full-stack products, with a
              cybersecurity background that keeps them safe.
            </p>
            <div className="hero-actions">
              <a className="btn btn-dark" href="#work">
                See the work ↓
              </a>
              <a className="btn btn-light" href={links.resume} download="Dhruv-Patel-Resume.pdf">
                Résumé ↗
              </a>
            </div>
          </div>
          <div className="desk" aria-hidden="true" />
        </section>

        {/* ---------------- ABOUT ---------------- */}
        <PacketReveal id="about" label="about" reduced={reduced} armed={!booting} onArrive={onArrive}>
          <div className="shell about">
            <p className="kicker">01 — about</p>
            <h2 className="statement">
              I build <em>AI that does the work</em>, and I don&apos;t call anything done until it&apos;s{" "}
              <em className="em-sec">proven.</em>
            </h2>
            <div className="about-row">
              <p>
                Computer Science graduate (cybersecurity concentration, UTC). In 2026 I shipped three products end to
                end: a desktop AI agent, a data science academy that runs Python in the browser, and a forecasting web
                app on AWS.
              </p>
              <ul className="stats">
                {stats.map((s) => (
                  <li key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PacketReveal>

        {/* ---------------- WORK ---------------- */}
        <PacketReveal id="work" label="work" reduced={reduced} armed={!booting} onArrive={onArrive}>
          <div className="shell">
            <div className="head">
              <p className="kicker">02 — selected work</p>
              <h2 className="display">
                Things I <span className="script-inline">shipped</span>
              </h2>
            </div>

            <article className="feature">
              <span className="frame frame--big">
                <Print kind={feature.art} />
              </span>
              <div className="feature-copy">
                <p className="meta">{feature.role}</p>
                <h3>{feature.name}</h3>
                <p className="lede">{feature.blurb}</p>
                <ul className="facts">
                  {feature.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="tags">
                  {feature.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="links">
                  {feature.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </article>

            <div className="work-grid">
              {rest.map((p, i) => (
                <article className="work" key={p.id}>
                  <span className="frame frame--card">
                    <Print kind={p.art} />
                  </span>
                  <p className="meta">
                    {String(i + 2).padStart(2, "0")} · {p.role}
                  </p>
                  <h3>{p.name}</h3>
                  <p className="lede">{p.blurb}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {p.links.length > 0 && (
                    <div className="links">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </PacketReveal>

        {/* ---------------- SKILLS ---------------- */}
        <PacketReveal id="skills" label="toolkit" reduced={reduced} armed={!booting} onArrive={onArrive}>
          <div className="shell">
            <div className="head">
              <p className="kicker">03 — toolkit</p>
              <h2 className="display">
                The <span className="script-inline">model weights</span>
              </h2>
            </div>
            <div className="skill-grid">
              {skills
                .filter((g) => g.id !== "sec")
                .map((g) => (
                  <article className={`skill skill--${g.id}`} key={g.id}>
                    <p className="meta">{g.note}</p>
                    <h3>{g.title}</h3>
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

        {/* ---------------- SECURITY (theme shift) ---------------- */}
        <PacketReveal id="security" label="security" reduced={reduced} armed={!booting} onArrive={onArrive} className="security">
          <div className="shell sec-grid">
            <div>
              <p className="kicker">04 — security mode</p>
              <h2 className="display">
                Secure by <span className="script-inline">default</span>
              </h2>
              <p className="lede">
                My degree is in cybersecurity, so the same brain switches into defence: least privilege, safe
                defaults, logged actions, and a human in the loop before anything risky.
              </p>
              <div className="sec-card">
                <p className="meta">SECCDC 2025 · blue team</p>
                <p>Six-person team keeping critical services up against a live red team, among 38 teams: hardening, monitoring and incident reports.</p>
              </div>
              <ul className="sec-skills">
                {skills.find((g) => g.id === "sec")?.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="shield-wrap">
              <div className="shield-anchor" aria-hidden="true" />
              <p className="shield-caption">same nodes · new shape · threats blocked</p>
            </div>
          </div>
          <div className="shell certs">
            {credentials.map((c) => (
              <a className="cert" key={c.id} href={c.href} target="_blank" rel="noreferrer">
                <span className="cert-sig">sig ✓</span>
                <span className="cert-issuer">{c.issuer}</span>
                <span className="cert-title">{c.title}</span>
                <span className="cert-detail">{c.detail}</span>
              </a>
            ))}
          </div>
        </PacketReveal>

        {/* ---------------- JOURNEY ---------------- */}
        <PacketReveal id="journey" label="journey" reduced={reduced} armed={!booting} onArrive={onArrive}>
          <div className="shell">
            <div className="head">
              <p className="kicker">05 — journey</p>
              <h2 className="display">
                Every <span className="script-inline">hop</span> so far
              </h2>
            </div>
            <ol className="trace">
              {[...journey].reverse().map((j) => (
                <li className={`hop hop--${j.kind}`} key={j.role + j.dates}>
                  <time>{j.dates}</time>
                  <div>
                    <h3>{j.role}</h3>
                    <p className="hop-org">{j.org}</p>
                    <p className="hop-text">{j.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </PacketReveal>

        {/* ---------------- CONTACT ---------------- */}
        <PacketReveal id="contact" label="contact" reduced={reduced} armed={!booting} onArrive={onArrive}>
          <div className="shell contact">
            <p className="kicker">06 — contact</p>
            <h2 className="mega mega--contact">Let&apos;s talk</h2>
            <p className="script script--center">open a connection</p>
            <div className="contact-links">
              <a href={`mailto:${links.email}`}>{links.email}</a>
              <a href={links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href={links.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href={`tel:${links.phone}`}>{links.phoneLabel}</a>
              <a href={links.resume} download="Dhruv-Patel-Resume.pdf">
                Résumé ↓
              </a>
            </div>
          </div>
        </PacketReveal>
      </main>

      <footer className="foot">
        <div className="shell foot-inner">
          <span>© 2026 Dhruv Patel</span>
          <button type="button" className="replay" onClick={replayIntro}>
            ↻ replay intro
          </button>
          <span>0 packets lost</span>
        </div>
      </footer>
    </>
  );
}
