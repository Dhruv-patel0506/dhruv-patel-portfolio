import { useCallback, useEffect, useState } from "react";
import "./App.css";
import "./extra.css";
import AskBar from "./AskBar";
import BrainField from "./BrainField";
import Cover from "./Cover";
import Loader from "./Loader";
import PacketReveal from "./PacketReveal";
import ReportView from "./ReportView";
import Workflow from "./Workflow";
import Whiteboard from "./Whiteboard";
import { credentials, journey, links, projects, skills, stats, type Project } from "./data";

const SECTIONS = ["about", "work", "whiteboard", "workflow", "skills", "security", "journey", "contact"];
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

/* Dhruv, seated behind the AI search bar (photo cut-out, suit recoloured). */
function Figure({ speaking }: { speaking: boolean }) {
  return (
    <figure className={`me ${speaking ? "is-speaking" : ""}`}>
      <span className="me-halo" aria-hidden="true" />
      <img src="/me.webp" alt="Dhruv Patel" width={760} height={609} />
      <span className="me-wave" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </figure>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  const internal = href.startsWith("#");
  return (
    <a href={href} {...(internal ? {} : { target: "_blank", rel: "noreferrer" })}>
      {label} {internal ? "→" : "↗"}
    </a>
  );
}

export default function App() {
  const systemReduced = usePrefersReducedMotion();
  const [replay, setReplay] = useState(false);
  const reduced = systemReduced && !replay;
  const [booting, setBooting] = useState(() => !systemReduced);
  const [entered, setEntered] = useState(() => {
    if (typeof window === "undefined") return true;
    if (new URLSearchParams(window.location.search).has("nocover")) return true;
    if (window.location.hash && window.location.hash !== "#home") return true; // deep links skip the cover
    try {
      return sessionStorage.getItem("dp-entered") === "1";
    } catch {
      return false;
    }
  });
  const enter = useCallback(() => {
    try {
      sessionStorage.setItem("dp-entered", "1");
    } catch {
      /* private mode: cover just shows again next visit */
    }
    setEntered(true);
  }, []);
  const [arrived, setArrived] = useState<string[]>([]);
  const [cyber, setCyber] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [route, setRoute] = useState(() => (typeof window !== "undefined" ? window.location.hash : ""));

  useEffect(() => {
    const on = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const reportOpen = route === "#/report";
  useEffect(() => {
    if (reportOpen) setBooting(false);
  }, [reportOpen]);
  const closeReport = useCallback(() => {
    window.location.hash = "#work";
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduced);
  }, [reduced]);
  useEffect(() => {
    document.body.classList.toggle("is-booting", booting || !entered);
  }, [booting, entered]);
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
      {!entered && !reportOpen && <Cover onEnter={enter} />}
      {entered && booting && !reportOpen && <Loader onDone={() => setBooting(false)} />}
      {reportOpen && <ReportView reduced={reduced} onClose={closeReport} />}
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
            <a href="#whiteboard">How I build</a>
            <a href="#workflow">Workflow</a>
            <a href="#/report">Report</a>
            <a href="#skills">Toolkit</a>
            <a href="#security">Security</a>
            <a href="#journey">Journey</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="nav-in" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            in
          </a>
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
            <p className="script script--left">AI builder&apos;s</p>
            <h1 className="mega">
              Portfolio<span className="sr-only">: Dhruv Patel, AI builder</span>
            </h1>
            <p className="script script--right">made of data packets</p>
          </div>

          <div className="brain-anchor" aria-hidden="true" />
          <Figure speaking={speaking} />
          <div className="hero-ask">
            <AskBar onSpeaking={setSpeaking} />
          </div>

          <div className="hero-foot shell">
            <p className="hero-intro">
              <strong>Dhruv Patel.</strong> I design AI agents and products and build them by directing AI, with a
              cybersecurity background that keeps them safe.
            </p>
            <div className="hero-actions">
              <a className="btn btn-dark" href="#work">
                See the work ↓
              </a>
              <a className="btn btn-light" href={links.resume} download="Dhruv-Patel-Resume.pdf">
                Résumé ↓
              </a>
              <a className="btn btn-light" href={links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </div>
          <div className="desk" aria-hidden="true" />
        </section>

        {/* ---------------- ABOUT ---------------- */}
        <PacketReveal id="about" label="about" reduced={reduced} armed={!booting && entered} onArrive={onArrive}>
          <div className="shell about">
            <p className="kicker">01 — about</p>
            <h2 className="statement">
              I build <em>AI that does the work</em>, and I don&apos;t call anything done until it&apos;s{" "}
              <em className="em-sec">proven.</em>
            </h2>
            <div className="about-row">
              <p>
                Computer Science graduate (cybersecurity concentration, UTC). In 2026 I shipped three products by designing
                them myself and directing Claude Code to write the code: a desktop AI agent, a data science academy that
                runs Python in the browser, and a forecasting web app on AWS.
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
        <PacketReveal id="work" label="work" reduced={reduced} armed={!booting && entered} onArrive={onArrive}>
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
                <p className="built">{feature.built}</p>
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
                    <ProjectLink key={l.href} href={l.href} label={l.label} />
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
                  <p className="built">{p.built}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {p.links.length > 0 && (
                    <div className="links">
                      {p.links.map((l) => (
                        <ProjectLink key={l.href} href={l.href} label={l.label} />
                      ))}
                      {p.id === "dsconquest" && links.dsqInstagram && <ProjectLink href={links.dsqInstagram} label="Instagram" />}
                      {p.id === "dsconquest" && links.dsqLinkedIn && <ProjectLink href={links.dsqLinkedIn} label="LinkedIn page" />}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </PacketReveal>

        {/* ---------------- WHITEBOARD (how I build with AI) ---------------- */}
        <PacketReveal id="whiteboard" label="whiteboard" reduced={reduced} armed={!booting && entered} onArrive={onArrive}>
          <Whiteboard />
        </PacketReveal>

        {/* ---------------- WORKFLOW (hand-drawn organ pipelines) ---------------- */}
        <PacketReveal id="workflow" label="workflow" reduced={reduced} armed={!booting && entered} onArrive={onArrive}>
          <Workflow reduced={reduced} />
        </PacketReveal>

        {/* ---------------- SKILLS ---------------- */}
        <PacketReveal id="skills" label="toolkit" reduced={reduced} armed={!booting && entered} onArrive={onArrive}>
          <div className="shell">
            <div className="head">
              <p className="kicker">05 — toolkit</p>
              <h2 className="display">
                The <span className="script-inline">model weights</span>
              </h2>
              <p className="lede skill-legend">
                Sorted by how deep each one really goes. The first group is what I&apos;m strongest at; the last group I
                understand and can discuss, but the code was written by AI under my direction.
              </p>
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
        <PacketReveal id="security" label="security" reduced={reduced} armed={!booting && entered} onArrive={onArrive} className="security">
          <div className="shell sec-grid">
            <div>
              <p className="kicker">06 — security mode</p>
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
        <PacketReveal id="journey" label="journey" reduced={reduced} armed={!booting && entered} onArrive={onArrive}>
          <div className="shell">
            <div className="head">
              <p className="kicker">07 — journey</p>
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
        <PacketReveal id="contact" label="contact" reduced={reduced} armed={!booting && entered} onArrive={onArrive}>
          <div className="shell contact">
            <p className="kicker">08 — contact</p>
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
