import { useState } from "react";
import "./App.css";

const storyTabs = [
  {
    id: "builder",
    label: "The builder",
    number: "01",
    kicker: "MY STORY",
    title: "Welcome to my story.",
    copy: "I'm Dhruv Patel — an AI and automation enthusiast who likes turning ideas into useful, working tools.",
    tags: ["AI enthusiast", "Automation builder", "Curious by default"],
    status: "NOW / EXPLORING WHAT'S POSSIBLE",
  },
  {
    id: "automation",
    label: "In progress",
    number: "02",
    kicker: "ON THE WORKBENCH",
    title: "Making the repetitive feel effortless.",
    copy: "Hojaiga.com is my AI-powered automation project in development: an ongoing experiment in making everyday digital workflows smarter.",
    tags: ["Hojaiga.com", "AI-powered", "Under development"],
    status: "BUILD / HOJAIGA.COM",
  },
  {
    id: "security",
    label: "Security roots",
    number: "03",
    kicker: "A FOUNDATION I BUILD ON",
    title: "Thoughtful tech earns trust.",
    copy: "My cybersecurity education adds a security-minded perspective to the systems I explore: understand the risks, protect the people, and build responsibly.",
    tags: ["B.S. Cybersecurity", "SECCDC blue team", "Responsible systems"],
    status: "FOUNDATION / COMPUTER SCIENCE",
  },
] as const;

const skills = [
  {
    title: "AI & automation",
    items: ["AI-powered workflows", "Workflow automation", "Python scripting", "API integration"],
  },
  {
    title: "Product & software",
    items: ["Turning ideas into tools", "Backend APIs", "Data processing", "Project coordination"],
  },
  {
    title: "Cybersecurity foundation",
    items: ["Blue-team operations", "Incident response", "Security log analysis", "System hardening"],
  },
  {
    title: "Ways of working",
    items: ["Incident documentation", "Risk mitigation", "Team collaboration", "Technical training"],
  },
];

const experience = [
  {
    role: "Lead Makerspace Manager",
    organization: "Hatch It! Lab, University of Tennessee at Chattanooga",
    dates: "Jan 2023 — Dec 2025",
    description:
      "Led day-to-day makerspace operations, trained more than 500 students and staff, and helped maintain clear operating and safety standards.",
  },
  {
    role: "Project Management Intern",
    organization: "Swaroop AI",
    dates: "Apr 2024 — Jun 2024",
    description:
      "Coordinated AI/ML, data science, DevOps, and media teams; tracked project timelines, resources, and deliverables.",
  },
  {
    role: "SECCDC Blue Team",
    organization: "Collegiate Cyber Defense Competition",
    dates: "Competition",
    description:
      "Worked in a six-person blue team defending industrial networks against active red-team activity in a 38-team competition.",
  },
];

function App() {
  const [activeStory, setActiveStory] = useState<(typeof storyTabs)[number]["id"]>("builder");
  const [storyWindowOpen, setStoryWindowOpen] = useState(true);
  const selectedStory = storyTabs.find((tab) => tab.id === activeStory) ?? storyTabs[0];

  return (
    <>
      <header className="site-header">
        <div className="page-shell header-inner">
          <a className="wordmark" href="#home" aria-label="Dhruv Patel home">
            <span className="wordmark-mark">DP</span>
            <span>Dhruv Patel</span>
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
          </nav>
          <a className="header-contact" href="#contact">
            Contact <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="page-shell hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> AI · AUTOMATION · IDEAS INTO ACTION</p>
              <h1>
                Building a little
                <br />
                <span>more possibility.</span>
              </h1>
              <p className="hero-intro">
                I&apos;m Dhruv Patel — an AI and automation enthusiast turning
                curious ideas into useful experiences. Cybersecurity is the
                thoughtful foundation behind how I build.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  Explore my work <span aria-hidden="true">↓</span>
                </a>
                <a
                  className="button button-outline"
                  href="/Dhruv-Patel-Resume.pdf"
                  download="Dhruv-Patel-Resume.pdf"
                >
                  Download résumé <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="hero-stage" aria-label="Dhruv Patel on stage, welcoming visitors to his portfolio">
              <div className="stage-curtain stage-curtain-left" />
              <div className="stage-curtain stage-curtain-right" />
              <div className="stage-light stage-light-left" />
              <div className="stage-light stage-light-right" />
              <div className="stage-beam" />
              <div className="stage-audience" aria-hidden="true">
                <i /><i /><i /><i /><i /><i /><i /><i /><i />
              </div>
              <div className="stage-floor" />
              <div className="stage-person" aria-label="Stylized illustration of Dhruv Patel">
                <div className="stage-person-head"><span>DP</span></div>
                <div className="stage-person-neck" />
                <div className="stage-person-body" />
                <div className="stage-person-arm stage-person-arm-left" />
                <div className="stage-person-arm stage-person-arm-right" />
                <div className="stage-person-leg stage-person-leg-left" />
                <div className="stage-person-leg stage-person-leg-right" />
              </div>
              <div className="stage-mic" aria-hidden="true">
                <span className="mic-head" />
                <span className="mic-stand" />
                <span className="mic-base" />
              </div>
              <div className="stage-intro">
                <span>ACT I · THE BEGINNING</span>
                <strong>Welcome to my story.</strong>
                <small>AI · AUTOMATION · A LITTLE CYBERSECURITY</small>
              </div>
              {storyWindowOpen ? (
                <aside className="story-window" aria-label="Interactive introduction">
                  <div className="story-window-bar">
                    <div className="window-controls" aria-hidden="true"><i /><i /><i /></div>
                    <span>dhruv / my-story.exe</span>
                    <button
                      type="button"
                      aria-label="Minimize story panel"
                      onClick={() => setStoryWindowOpen(false)}
                    >
                      −
                    </button>
                  </div>
                  <div className="story-tabs" role="tablist" aria-label="Explore my story">
                    {storyTabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activeStory === tab.id}
                        aria-controls="story-tab-panel"
                        id={`story-tab-${tab.id}`}
                        onClick={() => setActiveStory(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div
                    className="story-panel"
                    id="story-tab-panel"
                    role="tabpanel"
                    aria-labelledby={`story-tab-${selectedStory.id}`}
                    key={selectedStory.id}
                  >
                    <div className="story-kicker">
                      <span>{selectedStory.kicker}</span><span>{selectedStory.number} / 03</span>
                    </div>
                    <h2>{selectedStory.title}</h2>
                    <p>{selectedStory.copy}</p>
                    <div className="story-tags">
                      {selectedStory.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="story-status"><span />{selectedStory.status}</div>
                  </div>
                  <div className="story-window-footer">
                    <span>INTERACTIVE INTRODUCTION</span>
                    <span>SELECT A CHAPTER</span>
                  </div>
                </aside>
              ) : (
                <button
                  className="story-restore"
                  type="button"
                  onClick={() => setStoryWindowOpen(true)}
                >
                  <span aria-hidden="true">▣</span> Open my story
                </button>
              )}
              <div className="stage-project-note">
                <span className="project-note-spark">✳</span>
                <span><strong>On the workbench</strong><small>Hojaiga.com · AI automation</small></span>
                <span className="project-note-arrow" aria-hidden="true">↗</span>
              </div>
            </div>
          </div>
          <div className="hero-bottom page-shell">
            <span>Ideas into action. Thoughtful tech, built for people.</span>
            <a href="#about">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="content-section about-section" id="about">
          <div className="page-shell section-grid">
            <div className="section-heading">
              <p className="eyebrow">01 / A LITTLE ABOUT ME</p>
              <h2>Curiosity is where the next useful thing begins.</h2>
            </div>
            <div className="section-copy">
              <p>
                I&apos;m a Computer Science graduate excited by AI, automation,
                and the process of turning a promising idea into something
                people can use. I like exploring how tools fit together,
                simplifying repetitive work, and learning by building.
              </p>
              <p>
                I&apos;m currently developing Hojaiga.com, an AI-powered
                automation project. My cybersecurity background brings a
                second lens to that work: build with care, think about trust,
                and understand the systems underneath.
              </p>
              <div className="fact-row">
                <div><strong>3.52</strong><span>GPA / 4.0</span></div>
                <div><strong>500+</strong><span>People trained</span></div>
                <div><strong>UTC</strong><span>Computer Science</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section skills-section" id="skills">
          <div className="page-shell">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">02 / CAPABILITIES</p>
                <h2>Skills I bring to the table</h2>
              </div>
              <p className="section-aside">
                AI and automation lead the way; software skills and security
                awareness make the foundation.
              </p>
            </div>
            <div className="skills-grid">
              {skills.map((group, index) => (
                <article className="skill-card" key={group.title}>
                  <span className="card-index">0{index + 1}</span>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section experience-section" id="experience">
          <div className="page-shell section-grid">
            <div className="section-heading">
              <p className="eyebrow">03 / EXPERIENCE</p>
              <h2>Learning by doing, working with people.</h2>
            </div>
            <div className="experience-list">
              {experience.map((item, index) => (
                <article className="experience-item" key={item.role}>
                  <span className="experience-number">0{index + 1}</span>
                  <div>
                    <div className="experience-title-row">
                      <h3>{item.role}</h3>
                      <span>{item.dates}</span>
                    </div>
                    <p className="experience-org">{item.organization}</p>
                    <p className="experience-description">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section work-section" id="work">
          <div className="page-shell">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">04 / SELECTED WORK</p>
                <h2>Projects & initiatives</h2>
              </div>
              <p className="section-aside">
                A mix of shipped work, team experience, and a project in
                progress.
              </p>
            </div>
            <div className="projects-grid">
              <article className="project-card project-featured">
                <div className="project-meta"><span>01 / LIVE PROJECT</span><span>DATA · API</span></div>
                <div className="project-art car-art" aria-hidden="true">
                  <div className="data-line data-line-one" />
                  <div className="data-line data-line-two" />
                  <div className="data-node node-one" />
                  <div className="data-node node-two" />
                  <div className="car-glyph">CR<span>↗</span></div>
                  <span className="art-caption">VEHICLE RELIABILITY / DATA</span>
                </div>
                <div className="project-body">
                  <p className="eyebrow">BACKEND ENGINEERING</p>
                  <h3>Car Reliability Analyzer</h3>
                  <p>
                    Connects NHTSA vehicle data through APIs and normalizes
                    records for reliability scoring and analysis.
                  </p>
                  <div className="tag-list"><span>Python</span><span>NHTSA API</span><span>Data processing</span></div>
                  <a
                    className="text-link"
                    href="https://git-car-reliability-analyzer-live.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit live project <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>

              <article className="project-card">
                <div className="project-meta"><span>02 / IN PROGRESS</span><span>AI · AUTOMATION</span></div>
                <div className="project-art automation-art" aria-hidden="true">
                  <div className="automation-orbit orbit-one" />
                  <div className="automation-orbit orbit-two" />
                  <div className="automation-core">AI</div>
                  <span className="art-caption">HOJAIGA.COM / BUILDING</span>
                </div>
                <div className="project-body">
                  <p className="eyebrow">PRIVATE BUILD</p>
                  <h3>Hojaiga.com</h3>
                  <p>
                    An AI-powered automation project currently under
                    development. The source repository is private.
                  </p>
                  <div className="tag-list"><span>AI</span><span>Automation</span><span>In development</span></div>
                  <span className="text-link text-link-muted">Project in progress</span>
                </div>
              </article>

              <article className="project-card competition-card">
                <div className="project-meta"><span>03 / TEAM EXPERIENCE</span><span>BLUE TEAM</span></div>
                <div className="project-art defense-art" aria-hidden="true">
                  <div className="defense-grid" />
                  <div className="defense-center"><span>SECCDC</span><strong>DEFEND</strong></div>
                  <span className="art-caption">MONITOR / TRIAGE / RESPOND</span>
                </div>
                <div className="project-body">
                  <p className="eyebrow">COLLEGIATE CYBER DEFENSE</p>
                  <h3>SECCDC Blue Team</h3>
                  <p>
                    Team-based defense exercise focused on monitoring,
                    hardening, incident reporting, and service uptime under
                    active red-team pressure.
                  </p>
                  <div className="tag-list"><span>Incident response</span><span>Linux</span><span>Team of 6</span></div>
                  <span className="text-link text-link-muted">38-team competition</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="credentials-section">
          <div className="page-shell credentials-layout">
            <div>
              <p className="eyebrow">05 / CREDENTIALS</p>
              <h2>Always learning.<br />Always improving.</h2>
            </div>
            <div className="credential-list">
              <article><span>01</span><div><h3>Google Cybersecurity Certificate</h3><p>Google</p></div><span className="credential-status">COMPLETED</span></article>
              <article><span>02</span><div><h3>Cybersecurity Certificate</h3><p>Internshala</p></div><span className="credential-status">COMPLETED</span></article>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-shell contact-layout">
            <div>
              <p className="eyebrow">06 / GET IN TOUCH</p>
              <h2>Let&apos;s make<br />good things happen.</h2>
            </div>
            <div className="contact-details">
              <p>
                Interested in practical AI, automation, or thoughtful
                technology? I&apos;d be glad to connect.
              </p>
              <a className="contact-email" href="mailto:dhruv15.dapatel@gmail.com">
                dhruv15.dapatel@gmail.com <span aria-hidden="true">↗</span>
              </a>
              <div className="contact-links">
                <a href="https://www.linkedin.com/in/dhruv-d-patel0506/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="tel:+919274364241">+91 92743 64241</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <a className="wordmark footer-wordmark" href="#home">
            <span className="wordmark-mark">DP</span><span>Dhruv Patel</span>
          </a>
          <span>AI · Automation · Security-minded building</span>
          <span>© 2026 Dhruv Patel</span>
        </div>
      </footer>
    </>
  );
}

export default App;
