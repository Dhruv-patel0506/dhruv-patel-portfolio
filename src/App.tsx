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
    label: "What I built",
    number: "02",
    kicker: "SHIPPED IN 2026",
    title: "Three products, built end to end.",
    copy: "Hojaiga, a desktop AI agent released as open research; DS ConQuest, a data science academy that runs real Python in the browser; and Crestfall, a forecasting web app on AWS.",
    tags: ["Hojaiga", "DS ConQuest", "Crestfall"],
    status: "BUILD / 320K+ LINES OF CODE",
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
    items: ["LLM APIs (Claude, Gemini, Groq)", "RAG, LangChain, CrewAI", "QLoRA fine-tuning & evaluation", "Windows UI Automation"],
  },
  {
    title: "Product & software",
    items: ["Python, FastAPI, Django", "React, TypeScript, Node.js", "Pyodide (Python in the browser)", "AWS EC2, Docker, Vercel"],
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
    kind: "education",
    role: "B.S. Computer Science — Cybersecurity",
    organization: "University of Tennessee at Chattanooga",
    dates: "Aug 2022 — Dec 2025",
    description:
      "Completed a Bachelor of Computer Science with a cybersecurity concentration. GPA: 3.52 / 4.0.",
  },
  {
    kind: "experience",
    role: "Membership Service Assistant",
    organization: "Ignite, University of Tennessee at Chattanooga",
    dates: "Oct 2022 — Jan 2024",
    description:
      "Supported members at the front desk and main office, answered questions in person and by phone, handled facility access, and assisted with memberships and equipment rentals.",
  },
  {
    kind: "experience",
    role: "Lead Makerspace Manager",
    organization: "Hatch It! Lab, University of Tennessee at Chattanooga",
    dates: "Jan 2023 — Dec 2025",
    description:
      "Led makerspace operations and student workers across five equipment areas. Trained 500+ students, faculty, and staff, supported lab users, and maintained equipment and safety standards.",
  },
  {
    kind: "community",
    role: "Advisory Committee Member",
    organization: "Ignite, University of Tennessee at Chattanooga",
    dates: "Feb 2023 — Aug 2023",
    description:
      "Contributed member feedback and ideas to improve the facility, programs, services, and member experience.",
  },
  {
    kind: "experience",
    role: "Recreation Supervisor · Promoted",
    organization: "Ignite, University of Tennessee at Chattanooga",
    dates: "Feb 2023 — Jan 2024",
    description:
      "Led facility operations and equipment upkeep, conducted tours for 500+ visitors, and handled membership sales exceeding $500.",
  },
  {
    kind: "experience",
    role: "Project Management Intern",
    organization: "Swaroop AI",
    dates: "Apr 2024 — Jun 2024",
    description:
      "Coordinated AI/ML, data science, DevOps, project management, and media teams, acting as a central communication point and tracking timelines, resources, and deliverables.",
  },
  {
    kind: "competition",
    role: "SECCDC Blue Team",
    organization: "2025 Southeast Collegiate Cyber Defense Competition",
    dates: "Feb 2025",
    description:
      "Worked on a six-person blue team to keep critical services running during active attacks in a field of 38 competing teams.",
  },
  {
    kind: "education",
    role: "Data Science studies",
    organization: "Weltec Institute of Technology",
    dates: "May 2026",
    description:
      "Data Science education listed on my profile and résumé.",
  },
  {
    kind: "project",
    role: "AI Automation Engineer · Hojaiga",
    organization: "Independent project · open-source research release",
    dates: "Aug 2026 — Nov 2026",
    description:
      "Built a Windows AI agent (230k+ lines of Python, 60+ modules, 29 test suites) that learns desktop apps from their files and screens, works in hidden windows, and proves each result before reporting done.",
  },
  {
    kind: "project",
    role: "Full-Stack Developer · Crestfall",
    organization: "Hackathon project · Vercel + AWS EC2",
    dates: "Oct 2026",
    description:
      "Built a FastAPI forecasting engine for 49 companies (2 GB of history, walk-forward validation) and a React front end, deployed on Vercel with a Dockerized backend on AWS EC2.",
  },
  {
    kind: "project",
    role: "Founder & Full-Stack Engineer · DS ConQuest",
    organization: "Data science learning platform",
    dates: "Oct 2026 — Present",
    description:
      "Launched a browser academy with 49 modules, 171 lessons and 700+ graded exercises that run real Python in the browser, offline-first, with 1,500+ automated checks.",
  },
];

const credentials = [
  {
    kind: "cisco",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    detail: "Verified digital badge",
    image: "/credentials/cisco-introduction-to-cybersecurity.png",
    imageAlt: "Cisco Networking Academy Verified Introduction to Cybersecurity badge",
    mark: null,
    href: "/credentials/cisco-introduction-to-cybersecurity.png",
    linkLabel: "View badge",
  },
  {
    kind: "internshala",
    title: "Cyber Security with AI",
    issuer: "Internshala Trainings",
    detail: "8-week training · 92% · Top performer · Jun 20, 2026",
    image: null,
    imageAlt: "",
    mark: "IST",
    href: "/credentials/internshala-cyber-security-with-ai-certificate.pdf",
    linkLabel: "View certificate",
  },
  {
    kind: "weltec",
    title: "Data Science",
    issuer: "Weltec Institute of Technology",
    detail: "Education entry · May 2026",
    image: null,
    imageAlt: "",
    mark: "W",
    href: "/credentials/weltec-internshala-linkedin-badges.png",
    linkLabel: "View profile badge",
  },
  {
    kind: "google",
    title: "Connect and Protect: Networks and Network Security",
    issuer: "Google · Coursera",
    detail: "Completed Jul 31, 2025",
    image: null,
    imageAlt: "",
    mark: null,
    href: "/credentials/google-network-security-certificate.pdf",
    linkLabel: "View certificate",
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
            <a href="#experience">Journey</a>
            <a href="#work">Work</a>
            <a href="#credentials">Badges</a>
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
              <a className="stage-project-note" href="#work">
                <span className="project-note-spark">✳</span>
                <span><strong>Shipped in 2026</strong><small>Hojaiga · DS ConQuest · Crestfall</small></span>
                <span className="project-note-arrow" aria-hidden="true">↗</span>
              </a>
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
                In 2026 I built three products end to end: Hojaiga, a desktop
                AI agent; DS ConQuest, a data science academy in the browser;
                and Crestfall, a forecasting web app. My cybersecurity
                background brings a second lens to that work: build with care,
                think about trust, and understand the systems underneath.
              </p>
              <div className="fact-row">
                <div><strong>3</strong><span>Products shipped</span></div>
                <div><strong>320k+</strong><span>Lines of code</span></div>
                <div><strong>500+</strong><span>People trained</span></div>
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
          <div className="page-shell">
            <div className="section-title-row journey-heading">
              <div>
                <p className="eyebrow">03 / MY JOURNEY</p>
                <h2>Work, study, and learning along the way.</h2>
              </div>
              <p className="section-aside">
                An experience timeline across education, work, community, and
                hands-on learning.
              </p>
            </div>
            <div className="timeline-list">
              {experience.map((item, index) => (
                <article className={`timeline-item timeline-item--${item.kind}`} key={`${item.role}-${item.dates}`}>
                  <div className="timeline-marker" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-card-top">
                      <span className="timeline-kind">{item.kind}</span>
                      <time>{item.dates}</time>
                    </div>
                    <h3>{item.role}</h3>
                    <p className="timeline-organization">{item.organization}</p>
                    <p className="timeline-description">{item.description}</p>
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
                Three products I built in 2026, plus earlier project and
                team work. Every live link opens the real thing.
              </p>
            </div>
            <div className="projects-grid">
              <article className="project-card project-featured">
                <div className="project-meta"><span>01 / OPEN-SOURCE RELEASE</span><span>AI · AUTOMATION</span></div>
                <div className="project-art car-art" aria-hidden="true">
                  <div className="data-line data-line-one" />
                  <div className="data-line data-line-two" />
                  <div className="data-node node-one" />
                  <div className="data-node node-two" />
                  <div className="car-glyph">HJ<span>↗</span></div>
                  <span className="art-caption">LEARN THE APP / ACT / PROVE</span>
                </div>
                <div className="project-body">
                  <p className="eyebrow">DESKTOP AI AGENT · AUG–NOV 2026</p>
                  <h3>Hojaiga</h3>
                  <p>
                    A Windows assistant that learns any app from its program
                    files and live screen, does the task in a hidden window,
                    and only reports done when it can prove the result.
                    230k+ lines of Python, 60+ modules and 29 test suites; it
                    mapped PowerPoint&apos;s 360 controls and 980 menu items in
                    5 minutes. The write-up covers what worked, what failed
                    (fine-tuned 4B model: 39% vs 53% for the base model on 630
                    held-out items) and how it ended.
                  </p>
                  <div className="tag-list"><span>Python</span><span>UI Automation</span><span>QLoRA</span><span>LLM APIs</span><span>RAG</span></div>
                  <div className="link-row">
                    <a className="text-link" href="https://github.com/Dhruv-patel0506/Hojaiga.com" target="_blank" rel="noreferrer">
                      View code <span aria-hidden="true">↗</span>
                    </a>
                    <a className="text-link" href="https://github.com/Dhruv-patel0506/Hojaiga.com/blob/main/reports/hojaiga_closing/HOJAIGA_REPORT.pdf" target="_blank" rel="noreferrer">
                      Read the report <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>

              <article className="project-card">
                <div className="project-meta"><span>02 / LIVE PRODUCT</span><span>EDTECH · PYTHON</span></div>
                <div className="project-art academy-art" aria-hidden="true">
                  <div className="academy-code"><i /><i /><i /><i /></div>
                  <div className="academy-core">DS</div>
                  <span className="art-caption">DS CONQUEST / 171 LESSONS</span>
                </div>
                <div className="project-body">
                  <p className="eyebrow">FOUNDER · FULL-STACK</p>
                  <h3>DS ConQuest</h3>
                  <p>
                    A data science academy that runs real Python in the
                    browser: 49 modules, 171 lessons, 700+ graded exercises,
                    offline-first, with 1,500+ automated checks.
                  </p>
                  <div className="tag-list"><span>JavaScript</span><span>Pyodide</span><span>Django</span><span>Redis</span></div>
                  <div className="link-row">
                    <a className="text-link" href="https://ds-quest-silk.vercel.app/" target="_blank" rel="noreferrer">
                      Visit live site <span aria-hidden="true">↗</span>
                    </a>
                    <a className="text-link" href="https://github.com/Dhruv-patel0506/DS-Quest-TOUR" target="_blank" rel="noreferrer">
                      Showcase code <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>

              <article className="project-card">
                <div className="project-meta"><span>03 / LIVE PRODUCT</span><span>DATA · FORECASTING</span></div>
                <div className="project-art forecast-art" aria-hidden="true">
                  <svg className="forecast-line" viewBox="0 0 200 80" preserveAspectRatio="none">
                    <polyline points="0,70 30,58 55,62 85,38 110,22 130,18 150,30 175,52 200,66" />
                  </svg>
                  <span className="forecast-peak">PEAK</span>
                  <span className="art-caption">CRESTFALL / RISE AND FALL</span>
                </div>
                <div className="project-body">
                  <p className="eyebrow">HACKATHON · FULL-STACK</p>
                  <h3>Crestfall</h3>
                  <p>
                    Forecasts a company&apos;s growth phase, peak year and crash
                    risk for 49 companies from 2 GB of dated history. FastAPI
                    on AWS EC2 with Docker, React on Vercel.
                  </p>
                  <div className="tag-list"><span>FastAPI</span><span>React</span><span>AWS EC2</span><span>Docker</span></div>
                  <div className="link-row">
                    <a className="text-link" href="https://crestfall-frontend.vercel.app/" target="_blank" rel="noreferrer">
                      Visit live site <span aria-hidden="true">↗</span>
                    </a>
                    <a className="text-link" href="https://github.com/Dhruv-patel0506/CrestFall" target="_blank" rel="noreferrer">
                      View code <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>

              <article className="project-card">
                <div className="project-meta"><span>04 / LIVE PROJECT</span><span>DATA · API</span></div>
                <div className="project-art automation-art" aria-hidden="true">
                  <div className="automation-orbit orbit-one" />
                  <div className="automation-orbit orbit-two" />
                  <div className="automation-core">CR</div>
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
                  <div className="link-row">
                    <a className="text-link" href="https://git-car-reliability-analyzer-live.vercel.app/" target="_blank" rel="noreferrer">
                      Visit live project <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>

              <article className="project-card competition-card">
                <div className="project-meta"><span>05 / TEAM EXPERIENCE</span><span>BLUE TEAM</span></div>
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

        <section className="credentials-section" id="credentials">
          <div className="page-shell">
            <div className="credentials-heading">
              <div>
                <p className="eyebrow">05 / BADGES &amp; CERTIFICATES</p>
                <h2>Proof of learning, collected along the way.</h2>
              </div>
              <img
                className="provider-badges-reference"
                src="/credentials/weltec-internshala-linkedin-badges.png"
                alt="Weltec Institute and Internshala Trainings badges displayed on LinkedIn"
              />
            </div>
            <div className="credential-grid">
              {credentials.map((credential) => (
                <article className={`credential-card credential-card--${credential.kind}`} key={credential.kind}>
                  {credential.image ? (
                    <div className="credential-badge-image">
                      <img src={credential.image} alt={credential.imageAlt} />
                    </div>
                  ) : credential.mark ? (
                    <div className={`credential-provider-mark credential-provider-mark--${credential.kind}`}>
                      {credential.mark}
                    </div>
                  ) : (
                    <div className="credential-google-mark" aria-hidden="true">G</div>
                  )}
                  <div className="credential-card-copy">
                    <span className="credential-kind">{credential.issuer}</span>
                    <h3>{credential.title}</h3>
                    <p>{credential.detail}</p>
                    <a href={credential.href} target="_blank" rel="noreferrer">
                      {credential.linkLabel} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
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
                <a href="https://github.com/Dhruv-patel0506" target="_blank" rel="noreferrer">GitHub ↗</a>
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
