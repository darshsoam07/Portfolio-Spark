import { useEffect, useRef, useState } from "react";
import "./HomepageArrival.css";

export function HomepageArrival() {
  const [finished, setFinished] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLElement>(null);
  useEffect(() => {
    const gate = window.__homepageArrival;
    const done = () => setFinished(true);
    if (!gate?.pending) {
      done();
      return;
    }
    const siblings = [...(overlay.current?.parentElement?.children ?? [])].filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== overlay.current,
    );
    siblings.forEach((element) => {
      element.inert = true;
      element.setAttribute("data-arrival-inert", "");
    });
    document.addEventListener("homepage-arrival-done", done);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const value = Math.min(100, Math.round((now - start) / 12));
      if (counter.current) counter.current.textContent = `${String(value).padStart(3, "0")}%`;
      if (value < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const timeout = window.setTimeout(gate.finish, 2400);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      document.removeEventListener("homepage-arrival-done", done);
      siblings.forEach((element) => {
        element.inert = false;
        element.removeAttribute("data-arrival-inert");
      });
    };
  }, []);
  if (finished) return null;
  return (
    <div
      ref={overlay}
      className="welcome-wash arrival-overlay"
      role="region"
      aria-label="Welcome to Darsh Soam’s portfolio"
    >
      <span className="arrival-signature">
        DARSH SOAM
        <br />
        FROM CODE TO CLOUD
      </span>
      <span className="arrival-greeting">GLAD YOU DROPPED BY</span>
      <svg className="arrival-mark" viewBox="0 0 1000 400" aria-hidden="true">
        <g className="arrival-guides" fill="none" stroke="currentColor">
          <path pathLength="1" d="M35 270H965 M65 182H930 M100 318H850 M100 100V340 M865 120V340" />
          <circle cx="880" cy="252" r="26" pathLength="1" />
        </g>
        <g className="arrival-specs" fill="currentColor">
          <text x="35" y="261">
            BASELINE
          </text>
          <text x="65" y="173">
            X-HEIGHT
          </text>
        </g>
        <text
          className="arrival-outline"
          x="100"
          y="270"
          textLength="740"
          lengthAdjust="spacingAndGlyphs"
        >
          Darsh Soam
        </text>
        <text
          className="arrival-fill"
          x="100"
          y="270"
          textLength="740"
          lengthAdjust="spacingAndGlyphs"
        >
          Darsh Soam
        </text>
        <circle className="arrival-dot" cx="880" cy="252" r="20" fill="currentColor" />
      </svg>
      <strong ref={counter} className="arrival-count" aria-hidden="true">
        000%
      </strong>
      <span className="arrival-role">CLOUD & DEVOPS ENGINEER</span>
      <button type="button" data-skip-arrival className="arrival-skip">
        Skip intro ↗
      </button>
    </div>
  );
}
