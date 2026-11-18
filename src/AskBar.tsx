import { useEffect, useRef, useState, type FormEvent } from "react";
import { links } from "./data";

/*
  The search bar Dhruv is holding. A small scripted assistant (no API key, nothing
  leaves the page) that can TALK (speech synthesis) and LISTEN (speech recognition,
  where the browser supports it). It greets visitors, answers by keyword, and links
  to the right place on the site.
*/

type Answer = { text: string; href?: string; cta?: string };

const GREETING: Answer = {
  text: "Hi, I'm Dhruv's AI. Ask me about his projects, his AI work, his security background, or how to reach him. You can type, or tap the mic and talk.",
};

const RULES: { keys: string[]; a: Answer }[] = [
  {
    keys: ["hojaiga", "agent", "report", "desktop"],
    a: { text: "Hojaiga is the Windows AI agent Dhruv built: it learns any app, works in a hidden window, and proves the result. The full research report is right here on the site.", href: "#/report", cta: "Open the report" },
  },
  {
    keys: ["ds conquest", "conquest", "academy", "course", "learn", "instagram"],
    a: { text: "DS ConQuest is his data science academy: 49 modules and 171 lessons, with real Python running in your browser, even offline. It's on Instagram as @ds.conquest and has a LinkedIn page too.", href: "https://ds-quest-silk.vercel.app/", cta: "Visit DS ConQuest" },
  },
  {
    keys: ["crestfall", "forecast", "stock", "company"],
    a: { text: "Crestfall forecasts a company's growth phase, peak year and crash risk from its own history. FastAPI on AWS, React on Vercel.", href: "https://crestfall-frontend.vercel.app/", cta: "Visit Crestfall" },
  },
  {
    keys: ["workflow", "organ", "diagram", "architecture", "drawing", "design"],
    a: { text: "He designed Hojaiga as organs wired together, like a brain and a nervous system. Scroll to the workflow to see every drawing.", href: "#workflow", cta: "See the workflow" },
  },
  {
    keys: ["build", "built", "project", "work", "made", "ship", "portfolio"],
    a: { text: "Three products in 2026: Hojaiga, a desktop AI agent; DS ConQuest, a data science academy; and Crestfall, a forecasting web app.", href: "#work", cta: "See the work" },
  },
  {
    keys: ["ai", "llm", "rag", "model", "machine", "skill", "stack", "python"],
    a: { text: "His strongest skill is working with AI: directing Claude Code across many sessions, Claude Skills, MCP connectors, and designing systems like Hojaiga. He understands RAG, LLM APIs and QLoRA at the design level; the code itself was written by AI under his direction.", href: "#skills", cta: "See the toolkit" },
  },
  {
    keys: ["vibe", "coding", "coded", "javascript", "engineer", "claude", "whiteboard"],
    a: { text: "Straight answer: his three products were built with AI. He designs the system, writes the brief, runs the Claude Code sessions, and reviews and tests the result. He hand-codes basic Python and knows FastAPI and React at a basic level. The whiteboard shows the full split.", href: "#whiteboard", cta: "See the whiteboard" },
  },
  {
    keys: ["security", "cyber", "secure", "hack", "blue team", "seccdc"],
    a: { text: "Security is his foundation: a cybersecurity degree, a SECCDC blue team, and safe defaults in everything he builds.", href: "#security", cta: "Security side" },
  },
  {
    keys: ["resume", "résumé", "cv"],
    a: { text: "Here's his one-page résumé.", href: links.resume, cta: "Download résumé" },
  },
  {
    keys: ["linkedin", "contact", "email", "hire", "reach", "talk", "connect", "job"],
    a: { text: "He's open to AI and automation roles. Connect on LinkedIn or email dhruv15.dapatel@gmail.com.", href: links.linkedin, cta: "Open LinkedIn" },
  },
  {
    keys: ["hello", "hi", "hey", "who"],
    a: { text: "Hello! I'm the AI on Dhruv's portfolio. He's an AI builder with a cybersecurity background. What would you like to know?" },
  },
];

const CHIPS = ["What did he build?", "Hojaiga report", "Vibe-coded?", "AI skills", "Security", "Hire him"];

type SR = { lang: string; interimResults: boolean; onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null; onend: (() => void) | null; onerror: (() => void) | null; start: () => void; stop: () => void };

export default function AskBar({ onSpeaking }: { onSpeaking?: (on: boolean) => void }) {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState<Answer>(GREETING);
  const [shown, setShown] = useState("");
  const [voice, setVoice] = useState(false);
  const [listening, setListening] = useState(false);
  const recRef = useRef<SR | null>(null);

  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
  const SRCtor =
    typeof window !== "undefined"
      ? ((window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR }).SpeechRecognition ??
        (window as unknown as { webkitSpeechRecognition?: new () => SR }).webkitSpeechRecognition)
      : undefined;

  // type the answer out like a chat reply
  useEffect(() => {
    let i = 0;
    setShown("");
    const id = window.setInterval(() => {
      i += 2;
      setShown(answer.text.slice(0, i));
      if (i >= answer.text.length) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [answer]);

  const speak = (text: string) => {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.02;
    u.pitch = 1;
    const v = window.speechSynthesis.getVoices().find((x) => /en-(US|GB|IN)/.test(x.lang));
    if (v) u.voice = v;
    u.onstart = () => onSpeaking?.(true);
    u.onend = () => onSpeaking?.(false);
    u.onerror = () => onSpeaking?.(false);
    window.speechSynthesis.speak(u);
  };

  const respond = (text: string) => {
    const t = ` ${text.toLowerCase()} `;
    const hit = RULES.find((r) => r.keys.some((k) => (k.length <= 3 ? new RegExp(`\\b${k}\\b`).test(t) : t.includes(k))));
    const a = hit?.a ?? {
      text: "I'm a small scripted helper, so I only know this portfolio. Try asking about Hojaiga, DS ConQuest, Crestfall, his AI skills, security, the résumé, or how to contact him.",
    };
    setAnswer(a);
    if (voice) speak(a.text);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    respond(q);
    setQ("");
  };

  const toggleVoice = () => {
    const next = !voice;
    setVoice(next);
    if (next) speak(answer.text);
    else if (canSpeak) {
      window.speechSynthesis.cancel();
      onSpeaking?.(false);
    }
  };

  const listen = () => {
    if (!SRCtor) {
      setAnswer({ text: "Your browser doesn't support voice input. Try Chrome or Edge, or just type your question." });
      return;
    }
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const rec = new SRCtor();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const said = e.results[0][0].transcript;
      setQ(said);
      respond(said);
      setQ("");
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    if (!voice) setVoice(true); // talking to it means you want it to talk back
    rec.start();
  };

  useEffect(() => () => {
    if (canSpeak) window.speechSynthesis.cancel();
  }, [canSpeak]);

  const external = answer.href?.startsWith("http");
  return (
    <div className="ask">
      <div className="ask-bubble" role="status" aria-live="polite">
        <div className="ask-head">
          <span className="ask-who">dhruv.ai</span>
          <button type="button" className={`ask-voice ${voice ? "is-on" : ""}`} onClick={toggleVoice} disabled={!canSpeak} aria-pressed={voice}>
            {voice ? "🔊 voice on" : "🔈 hear me"}
          </button>
        </div>
        <p>
          {shown}
          {shown.length < answer.text.length && <span className="ask-caret" />}
        </p>
        {answer.href && shown.length >= answer.text.length && (
          <a
            href={answer.href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            {...(answer.href.endsWith(".pdf") ? { download: "Dhruv-Patel-Resume.pdf" } : {})}
          >
            {answer.cta} →
          </a>
        )}
        <div className="ask-chips">
          {CHIPS.map((c) => (
            <button type="button" key={c} onClick={() => respond(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <form className="ask-bar" onSubmit={submit}>
        <svg className="ask-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 5 5" />
        </svg>
        <label className="sr-only" htmlFor="ask-input">
          Ask Dhruv's AI a question
        </label>
        <input
          id="ask-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={listening ? "listening…" : "ASK MY AI ANYTHING"}
          autoComplete="off"
        />
        <button type="button" className={`ask-mic ${listening ? "is-on" : ""}`} onClick={listen} aria-label={listening ? "Stop listening" : "Ask with your voice"}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
          </svg>
        </button>
        <button type="submit" className="ask-go">
          Ask
        </button>
      </form>
    </div>
  );
}
