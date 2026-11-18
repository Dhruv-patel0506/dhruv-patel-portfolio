export const links = {
  email: "dhruv15.dapatel@gmail.com",
  linkedin: "https://www.linkedin.com/in/dhruv-d-patel0506/",
  github: "https://github.com/Dhruv-patel0506",
  phone: "+919274364241",
  phoneLabel: "+91 92743 64241",
  resume: "/Dhruv-Patel-Resume.pdf",
  hojaigaPost: "https://www.linkedin.com/feed/update/urn:li:share:7528661945844113408/",
  // DS ConQuest social pages: fill these in and the buttons appear automatically
  dsqInstagram: "https://www.instagram.com/ds.conquest/",
  dsqLinkedIn: "https://www.linkedin.com/company/ds-conquest/",
};

export const stats = [
  { value: "3", label: "products shipped with AI in 2026" },
  { value: "320k+", label: "lines written by AI, directed and reviewed by me" },
  { value: "1,500+", label: "automated checks" },
  { value: "500+", label: "people trained" },
];

/* Skills are grouped by how deep they really go: strongest first, honest labels on every group. */
export const skills = [
  {
    id: "ai",
    title: "Working with AI",
    note: "my strongest skill",
    items: [
      "Claude Code: directing multi-session builds",
      "Running parallel and forked sessions",
      "Prompt & context engineering",
      "Writing and uploading Claude Skills",
      "MCP servers & connectors",
      "Brainstorming & system design with AI",
      "Breaking big goals into pipelines",
      "Reviewing and testing AI-written code",
      "Voice-first briefs with Wispr Flow",
      "Honest evaluation of AI output",
    ],
  },
  {
    id: "hands",
    title: "Hands-on",
    note: "I can work in these myself",
    items: ["Python (fundamentals, data processing)", "FastAPI (basics)", "React (basics)", "REST APIs", "Git & GitHub", "Vercel deploys", "Linux & Windows admin"],
  },
  {
    id: "concept",
    title: "Understand, AI wrote the code",
    note: "I can explain the design and review the code",
    items: ["LLM APIs", "RAG", "LangChain", "CrewAI", "QLoRA fine-tuning", "UI Automation", "JavaScript / TypeScript", "Pyodide", "Django", "Redis", "Docker", "AWS EC2"],
  },
  {
    id: "sec",
    title: "Cybersecurity",
    note: "my foundation",
    items: ["Incident response", "System hardening", "SIEM & log analysis", "Reverse engineering", "OWASP Top 10", "Secrets management"],
  },
];

export type Project = {
  id: string;
  art: "agent" | "academy" | "forecast" | "gauge" | "shield";
  status: string;
  name: string;
  role: string;
  blurb: string;
  facts: string[];
  tags: string[];
  built: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "hojaiga",
    art: "agent",
    status: "open-source release",
    name: "Hojaiga",
    role: "Desktop AI agent · Aug–Nov 2026",
    blurb:
      "A Windows assistant that learns any app from its program files and live screen, does the task in a hidden window, and only says done when it can prove the result.",
    facts: ["230k+ lines of Python", "60+ modules · 29 test suites", "PowerPoint: 360 controls mapped in 5 min", "Fine-tuned 4B: 39% vs 53% base (630 held-out)"],
    tags: ["Python", "UI Automation", "QLoRA", "LLM APIs", "RAG"],
    built: "Built with Claude Code. I designed the organ architecture and all 20 pipelines, directed the sessions, and tested every claim; Claude wrote the code.",
    links: [
      { label: "Read the full report", href: "#/report" },
      { label: "GitHub repo", href: "https://github.com/Dhruv-patel0506/Hojaiga.com" },
      { label: "LinkedIn post", href: "https://www.linkedin.com/feed/update/urn:li:share:7528661945844113408/" },
    ],
  },
  {
    id: "dsconquest",
    art: "academy",
    status: "live product",
    name: "DS ConQuest",
    role: "Founder · Oct 2026 – now",
    blurb: "A data science academy that runs real Python in the browser, works offline, and checks every exercise automatically.",
    facts: ["49 modules · 171 lessons", "700+ graded exercises", "1,500+ automated checks", "74 MB Python runtime cached offline"],
    tags: ["JavaScript", "Pyodide", "Django", "Redis"],
    built: "Built with Claude Code. I planned the curriculum, the game flow and the offline design; Claude wrote the JavaScript and Django code.",
    links: [
      { label: "Visit live site", href: "https://ds-quest-silk.vercel.app/" },
      { label: "GitHub repo (showcase)", href: "https://github.com/Dhruv-patel0506/DS-Quest-TOUR" },
    ],
  },
  {
    id: "crestfall",
    art: "forecast",
    status: "live product",
    name: "Crestfall",
    role: "Hackathon · Oct 2026",
    blurb: "Forecasts a company's growth phase, peak year and crash risk from its own dated history.",
    facts: ["49 companies · 2 GB of history", "Walk-forward model selection", "FastAPI on AWS EC2 + Docker", "React on Vercel"],
    tags: ["FastAPI", "React", "AWS EC2", "Docker"],
    built: "Built with Claude Code. I shaped the forecasting idea and checked the results; Claude wrote the FastAPI and React code and the AWS steps.",
    links: [
      { label: "Visit live site", href: "https://crestfall-frontend.vercel.app/" },
      { label: "GitHub repo", href: "https://github.com/Dhruv-patel0506/CrestFall" },
    ],
  },
  {
    id: "car",
    art: "gauge",
    status: "live project",
    name: "Car Reliability Analyzer",
    role: "Backend · my own code",
    blurb: "Pulls NHTSA vehicle data through its public API and normalizes it for reliability scoring and analysis.",
    facts: ["NHTSA public API", "Data normalization", "Reliability scoring"],
    tags: ["Python", "REST API", "Data processing"],
    built: "Hands-on. I wrote the Python data processing for this one myself.",
    links: [
      { label: "Visit live project", href: "https://git-car-reliability-analyzer-live.vercel.app/" },
      { label: "GitHub repo", href: "https://github.com/Dhruv-patel0506/git-project1-live" },
    ],
  },
  {
    id: "seccdc",
    art: "shield",
    status: "team experience",
    name: "SECCDC Blue Team",
    role: "Collegiate cyber defense · Feb 2025",
    blurb: "Kept critical services running against a live red team: hardening, monitoring, incident reports.",
    facts: ["6-person blue team", "38 competing teams"],
    tags: ["Incident response", "Linux", "Hardening"],
    built: "Hands-on. Live defense with my team, no AI involved.",
    links: [{ label: "GitHub repo", href: "https://github.com/Dhruv-patel0506/ccdc-utc" }],
  },
];

export const journey = [
  { kind: "edu", role: "B.S. Computer Science, Cybersecurity", org: "University of Tennessee at Chattanooga", dates: "Aug 2022 – Dec 2025", text: "Computer Science with a cybersecurity concentration. GPA 3.52 / 4.0, Dean's List Fall 2023." },
  { kind: "work", role: "Membership Service Assistant → Recreation Supervisor", org: "Ignite, UTC", dates: "Oct 2022 – Jan 2024", text: "Front desk and facility operations; led tours for 500+ visitors; promoted to Recreation Supervisor." },
  { kind: "work", role: "Lead Makerspace Manager", org: "Hatch It! Lab, UTC", dates: "Jan 2023 – Dec 2025", text: "Ran the makerspace and its student staff; trained 500+ students, faculty and staff on 5 fabrication systems." },
  { kind: "work", role: "Advisory Committee Member", org: "Ignite, UTC", dates: "Feb 2023 – Aug 2023", text: "Brought member feedback and ideas to improve the facility and its programs." },
  { kind: "work", role: "Project Management Intern", org: "Swaroop AI", dates: "Apr 2024 – Jun 2024", text: "Coordinated 5 teams (AI/ML, data science, DevOps, media, PM); tracked timelines and deliverables." },
  { kind: "sec", role: "SECCDC Blue Team", org: "Southeast Collegiate Cyber Defense Competition", dates: "Feb 2025", text: "Six-person blue team keeping critical services up under active attack, among 38 teams." },
  { kind: "edu", role: "Data Science studies", org: "Weltec Institute of Technology", dates: "May 2026", text: "Data science education." },
  { kind: "ai", role: "AI Builder · Hojaiga", org: "Independent project, open-source research release", dates: "Aug 2026 – Nov 2026", text: "Designed a Windows AI agent as organs and pipelines, then built it by directing Claude Code: it learns apps, works in hidden windows and proves each result." },
  { kind: "ai", role: "AI Builder · Crestfall", org: "Hackathon project", dates: "Oct 2026", text: "Shaped a company-forecasting idea and shipped it with Claude Code: FastAPI engine, React front end, Vercel + AWS." },
  { kind: "ai", role: "Founder · DS ConQuest", org: "Data science learning platform", dates: "Oct 2026 – now", text: "Planned a game-like data science academy and built it with Claude Code: real Python in the browser, offline-first, 1,500+ automated checks." },
];

export const credentials = [
  { id: "cisco", title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", detail: "Verified digital badge", image: "/credentials/cisco-introduction-to-cybersecurity.png", href: "/credentials/cisco-introduction-to-cybersecurity.png", label: "View badge" },
  { id: "internshala", title: "Cyber Security with AI", issuer: "Internshala Trainings", detail: "8-week training · 92% · top performer", image: null, href: "/credentials/internshala-cyber-security-with-ai-certificate.pdf", label: "View certificate" },
  { id: "google", title: "Connect and Protect: Networks and Network Security", issuer: "Google · Coursera", detail: "Completed Jul 31, 2025", image: null, href: "/credentials/google-network-security-certificate.pdf", label: "View certificate" },
  { id: "weltec", title: "Data Science", issuer: "Weltec Institute of Technology", detail: "Education entry · May 2026", image: null, href: "/credentials/weltec-internshala-linkedin-badges.png", label: "View badge" },
];

export const terminalScript = [
  { cmd: "whoami", out: ["dhruv_patel: AI builder, security-minded"] },
  { cmd: "ls ~/projects", out: ["hojaiga/   ds-conquest/   crestfall/   car-reliability/"] },
  { cmd: "cat focus.txt", out: ["AI agents · LLMs · RAG · automation that proves its work"] },
  { cmd: "scan --self", out: ["blue team: SECCDC 2025 ✓", "defaults: hardened, logged, least privilege ✓"] },
];

export const terminalExtra: Record<string, string[]> = {
  "hire --me": ["opening a connection… scroll to Contact ↓"],
  "sudo make coffee": ["permission granted. ☕ brewing…"],
  "ping ai": ["64 bytes from ai: model=thinking time=0.2ms"],
};

/* Hand-drawn organ pipelines from the Hojaiga blueprint (diagrams/): each shows the
   new organ before it is wired, after it is wired, and the whole system so far. */
export const pipelines = [
  { n: "01", name: "Brain → Central Nervous System" },
  { n: "02", name: "Memory" },
  { n: "03", name: "Knowledge" },
  { n: "04", name: "Controllers" },
  { n: "05", name: "Automation" },
  { n: "06", name: "Security" },
  { n: "07", name: "Learning" },
  { n: "08", name: "Infrastructure" },
  { n: "09", name: "Agents" },
  { n: "10", name: "Interface" },
  { n: "11", name: "Integration" },
  { n: "12", name: "Interface layer" },
  { n: "13", name: "LLM runtime" },
  { n: "14", name: "External connectors" },
  { n: "15", name: "Audit system" },
  { n: "16", name: "Backup manager" },
  { n: "17", name: "Capability registry" },
  { n: "18", name: "Chrome CDP runtime" },
  { n: "19", name: "Configuration manager" },
  { n: "20", name: "Configuration schema" },
];
