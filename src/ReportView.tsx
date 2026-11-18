import { useEffect, useState } from "react";
import Loader, { type BootLine } from "./Loader";
import { links } from "./data";

/* The full Hojaiga research report, opened inside the portfolio with its own packet boot sequence. */

const REPORT_LOG: BootLine[] = [
  { t: 150, text: "GET /hojaiga/report.pkt", tag: "" },
  { t: 520, text: "integrity check: sha-256", tag: "ok" },
  { t: 900, text: "unpacking 11 sections, 7 figures, 2 videos", tag: "" },
  { t: 1350, text: "redacting private notes", tag: "ok" },
  { t: 1800, text: "AI router: rendering research report", tag: "" },
  { t: 2300, text: "report ready", tag: "100%" },
];

export default function ReportView({ reduced, onClose }: { reduced: boolean; onClose: () => void }) {
  const [booting, setBooting] = useState(!reduced);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = "Hojaiga · research report · Dhruv Patel";
    document.body.classList.add("report-open");
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !booting) onClose();
    };
    window.addEventListener("keydown", esc);
    return () => {
      document.title = prev;
      document.body.classList.remove("report-open");
      window.removeEventListener("keydown", esc);
    };
  }, [booting, onClose]);

  return (
    <div className="report">
      {booting && (
        <Loader
          onDone={() => setBooting(false)}
          log={REPORT_LOG}
          prompt="open hojaiga/report --full"
          inbound={["HDR", "abstract", "0x7E", "fig.png", "TLS", "results", "0xB2", "video", "ACK", "tables"]}
          outbound={["intro", "methods", "results", "failures", "ending"]}
        />
      )}
      <div className="report-bar">
        <button type="button" className="report-back" onClick={onClose}>
          ← Portfolio
        </button>
        <div className="report-title">
          <strong>Hojaiga</strong>
          <span>research report · Aug–Nov 2026</span>
        </div>
        <div className="report-actions">
          <a href="/hojaiga/Hojaiga-Report.pdf" download="Hojaiga-Report.pdf">
            PDF ↓
          </a>
          <a href="https://github.com/Dhruv-patel0506/Hojaiga.com" target="_blank" rel="noreferrer">
            Code ↗
          </a>
          <a href={links.hojaigaPost} target="_blank" rel="noreferrer">
            LinkedIn post ↗
          </a>
        </div>
      </div>
      {!loaded && <div className="report-wait">decoding report…</div>}
      <iframe
        className={`report-frame ${loaded ? "is-loaded" : ""}`}
        src="/hojaiga/report.html"
        title="Hojaiga research report"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
