import { useEffect, useState, type FormEvent } from "react";

/*
  The search bar the figure holds (like the reference photo). It is a small
  scripted assistant: it matches keywords and answers from the portfolio
  content. No API key and no data leaves the page.
*/

const HINTS = ["what did Dhruv build?", "is he into AI or security?", "how do I contact him?", "where's the résumé?"];

const ANSWERS: { keys: string[]; text: string; href?: string; cta?: string }[] = [
  {
    keys: ["build", "built", "project", "work", "made", "ship"],
    text: "Three products in 2026: Hojaiga (a desktop AI agent), DS ConQuest (a data science academy that runs Python in the browser) and Crestfall (a forecasting web app on AWS).",
    href: "#work",
    cta: "See the work",
  },
  {
    keys: ["ai", "llm", "agent", "rag", "model", "machine"],
    text: "AI is the main focus: agents that operate real apps, LLM apps with retrieval, QLoRA fine-tuning and honest evaluation.",
    href: "#skills",
    cta: "See the toolkit",
  },
  {
    keys: ["security", "cyber", "secure", "hack", "blue"],
    text: "Security is the foundation: a B.S. with a cybersecurity concentration, a SECCDC blue team, and safe defaults in everything he builds.",
    href: "#security",
    cta: "Security side",
  },
  {
    keys: ["contact", "email", "hire", "reach", "talk", "linkedin"],
    text: "Email dhruv15.dapatel@gmail.com or connect on LinkedIn. He's open to AI and automation roles.",
    href: "#contact",
    cta: "Contact",
  },
  {
    keys: ["resume", "résumé", "cv"],
    text: "Here's the one-page résumé.",
    href: "/Dhruv-Patel-Resume.pdf",
    cta: "Download résumé",
  },
];

export default function AskBar() {
  const [q, setQ] = useState("");
  const [hint, setHint] = useState(0);
  const [typed, setTyped] = useState("");
  const [answer, setAnswer] = useState<(typeof ANSWERS)[number] | null>(null);
  const [miss, setMiss] = useState(false);

  // typewriter placeholder
  useEffect(() => {
    if (q) return;
    const target = HINTS[hint];
    let i = 0;
    let back = false;
    const id = window.setInterval(() => {
      if (!back) {
        i += 1;
        setTyped(target.slice(0, i));
        if (i >= target.length) back = true;
      } else {
        i -= 1;
        if (i < -18) {
          window.clearInterval(id);
          setHint((h) => (h + 1) % HINTS.length);
          return;
        }
        if (i >= 0) setTyped(target.slice(0, i));
      }
    }, 70);
    return () => window.clearInterval(id);
  }, [hint, q]);

  const ask = (text: string) => {
    const t = text.toLowerCase();
    const hit = ANSWERS.find((a) => a.keys.some((k) => t.includes(k)));
    setAnswer(hit ?? null);
    setMiss(!hit);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(q || HINTS[hint]);
  };

  return (
    <div className="ask">
      {(answer || miss) && (
        <div className="ask-bubble" role="status">
          <span className="ask-who">dhruv.ai</span>
          {answer ? (
            <>
              <p>{answer.text}</p>
              {answer.href && (
                <a href={answer.href} {...(answer.href.endsWith(".pdf") ? { download: "Dhruv-Patel-Resume.pdf" } : {})}>
                  {answer.cta} →
                </a>
              )}
            </>
          ) : (
            <p>I&apos;m a small scripted helper. Try asking about his projects, AI, security, the résumé or how to contact him.</p>
          )}
          <button type="button" className="ask-close" aria-label="Close answer" onClick={() => { setAnswer(null); setMiss(false); }}>
            ×
          </button>
        </div>
      )}
      <form className="ask-bar" onSubmit={submit}>
        <svg className="ask-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 5 5" />
        </svg>
        <label className="sr-only" htmlFor="ask-input">
          Ask about Dhruv
        </label>
        <input
          id="ask-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Ask my AI: ${typed}`}
          autoComplete="off"
        />
        <button type="submit" className="ask-go">
          Ask
        </button>
      </form>
    </div>
  );
}
