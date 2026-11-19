import { useEffect, useState } from "react";

/*
  Entry cover: the portfolio's thumbnail poster, shown once per visit.
  Tap / click / Enter opens the portfolio (then the packet boot sequence plays).
*/
export default function Cover({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onEnter, 450);
  };

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        enter();
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaving]);

  return (
    <div className={`cover ${leaving ? "cover--leaving" : ""}`}>
      <div className="cover-blur" aria-hidden="true" />
      <button type="button" className="cover-card" onClick={enter} aria-label="Enter Dhruv Patel's portfolio" autoFocus>
        <img src="/cover-portrait.jpg" alt="AI builder's Portfolio: Dhruv Patel. Tap to enter." width={1080} height={1920} />
      </button>
      <p className="cover-hint">click the poster or press Enter</p>
    </div>
  );
}
