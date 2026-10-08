import "./App.css";

const skills = [
  {
    title: "Security operations",
    items: ["Incident response", "Security log analysis", "SOC workflows", "Threat research"],
  },
  {
    title: "Network & systems",
    items: ["Linux", "System hardening", "Firewall fundamentals", "IDS/IPS concepts"],
  },
  {
    title: "Tools & development",
    items: ["Python", "SIEM tools", "API integration", "Data processing"],
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
              <p className="eyebrow"><span className="status-dot" /> Cybersecurity · Systems · Automation</p>
              <h1>
                Curious by nature.
                <br />
                <span>Focused on defense.</span>
              </h1>
              <p className="hero-intro">
                I&apos;m Dhruv Patel, a cybersecurity graduate interested in
                security operations, resilient systems, and practical
                automation.
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

            <aside className="profile-panel" aria-label="Professional focus">
              <div className="panel-topline">
                <span>PROFILE / 01</span>
                <span className="panel-indicator">OPEN TO OPPORTUNITY</span>
              </div>
              <div className="panel-monogram" aria-hidden="true">DP</div>
              <p className="panel-name">Dhruv Patel</p>
              <p className="panel-role">Cybersecurity · Blue Team</p>
              <div className="panel-rule" />
              <div className="panel-detail">
                <span>EDUCATION</span>
                <strong>B.S. Computer Science</strong>
                <span>Cybersecurity · UTC</span>
              </div>
              <div className="panel-detail">
                <span>INTERESTS</span>
                <strong>Detection / Response</strong>
                <span>Security automation</span>
              </div>
              <div className="panel-footer">
                <span>VADODARA, INDIA</span>
                <span>01 — 04</span>
              </div>
            </aside>
          </div>
          <div className="hero-bottom page-shell">
            <span>Building a safer digital world, one system at a time.</span>
            <a href="#about">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="content-section about-section" id="about">
          <div className="page-shell section-grid">
            <div className="section-heading">
              <p className="eyebrow">01 / A LITTLE ABOUT ME</p>
              <h2>Security is a practice of paying attention.</h2>
            </div>
            <div className="section-copy">
              <p>
                I&apos;m a Computer Science graduate with a cybersecurity focus
                and hands-on experience in team-based defense, project
                coordination, and technical operations. I enjoy understanding
                how systems work, spotting what feels out of place, and
                communicating clearly when it matters.
              </p>
              <p>
                My experience ranges from defending services during a
                collegiate cyber defense competition to helping teams deliver
                projects and supporting a busy university makerspace.
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
                A practical foundation across security, systems, and
                collaboration.
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
                Interested in cybersecurity, security operations, or
                automation? I&apos;d be glad to connect.
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
          <span>Cybersecurity · Systems · Automation</span>
          <span>© 2026 Dhruv Patel</span>
        </div>
      </footer>
    </>
  );
}

export default App;
