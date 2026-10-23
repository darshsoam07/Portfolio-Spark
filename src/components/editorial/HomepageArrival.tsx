import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import "./HomepageArrival.css";

const nodePositions = [190, 310, 430];

export function HomepageArrival() {
  const [finished, setFinished] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const maskId = `arrival-mask-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    if (finished) return;
    const gate = window.__homepageArrival;
    if (!gate?.pending || !overlay.current) {
      setFinished(true);
      return;
    }
    const element = overlay.current;
    let disposed = false;
    let fontTimer = 0;
    let timeline: gsap.core.Timeline | undefined;
    const context = gsap.context(() => {}, element);
    const siblings = [...(element.parentElement?.children ?? [])].filter(
      (child): child is HTMLElement => child instanceof HTMLElement && child !== element,
    );
    siblings.forEach((child) => {
      child.inert = true;
      child.setAttribute("data-arrival-inert", "");
    });
    const done = () => {
      timeline?.kill();
      setFinished(true);
    };
    document.addEventListener("homepage-arrival-done", done);
    const setPhase = (phase: string) => {
      element.dataset.phase = phase;
    };

    // The outline and fill use one preloaded local face. If it is unavailable,
    // bypass instead of swapping the letter shapes halfway through the drawing.
    const fontReady = document.fonts.load('600 170px "Arrival Sans"', "Darsh Soam").then(
      () => true,
      () => false,
    );
    const fontBudget = new Promise<boolean>((resolve) => {
      fontTimer = window.setTimeout(() => resolve(false), 300);
    });
    void Promise.race([fontReady, fontBudget])
      .then((ready) => {
        clearTimeout(fontTimer);
        if (disposed || !gate.pending) return;
        const remaining = (gate.deadline ?? performance.now() + 4000) - performance.now();
        if (!ready || remaining < 1100) {
          gate.finish();
          return;
        }
        context.add(() => {
          const progress = { value: 0 };
          timeline = gsap.timeline({ onComplete: gate.finish });
          timeline
            .to(
              ".arrival-label",
              { opacity: 1, y: 0, duration: 0.35, stagger: 0.035, ease: "power2.out" },
              0,
            )
            .to(
              progress,
              {
                value: 100,
                duration: 2.2,
                ease: "power2.inOut",
                onUpdate: () => {
                  if (counter.current)
                    counter.current.textContent = `${String(Math.round(progress.value)).padStart(3, "0")}%`;
                },
              },
              0,
            )
            .call(() => setPhase("construction"), [], 0.3)
            .to(
              ".arrival-route",
              {
                strokeDashoffset: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.07,
                ease: "power2.inOut",
              },
              0.3,
            )
            .to(
              ".arrival-node",
              {
                opacity: 1,
                scale: 1,
                duration: 0.35,
                stagger: 0.1,
                ease: "power2.out",
                transformOrigin: "50% 50%",
              },
              0.75,
            )
            .to(
              ".arrival-outline",
              {
                opacity: 0.85,
                strokeDashoffset: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power2.inOut",
              },
              0.5,
            )
            .to(".arrival-annotation", { opacity: 0.65, duration: 0.4, stagger: 0.06 }, 0.8)
            .call(() => setPhase("identity"), [], 1.25)
            .to(
              ".arrival-mask",
              { attr: { width: 710 }, duration: 0.85, ease: "power3.inOut" },
              1.25,
            )
            .to(
              ".arrival-dot",
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.4,
                ease: "back.out(1.5)",
                transformOrigin: "50% 50%",
              },
              1.8,
            )
            .to(".arrival-routing", { opacity: 0.35, duration: 0.4 }, 1.95)
            .call(
              () => {
                setPhase("exit");
                document.dispatchEvent(new Event("homepage-arrival-reveal"));
              },
              [],
              2.3,
            )
            .to(".arrival-mark", { y: -28, opacity: 0, duration: 0.5, ease: "power2.in" }, 2.3)
            .to(element, { yPercent: -101, duration: 0.9, ease: "power3.inOut" }, 2.3);
          // Keep the existing four-second document watchdog authoritative on slow loads.
          timeline.timeScale(3.2 / Math.min(3.2, (remaining - 100) / 1000));
        });
      })
      .catch(() => {
        if (!disposed) gate.finish();
      });
    return () => {
      disposed = true;
      clearTimeout(fontTimer);
      timeline?.kill();
      context.revert();
      document.removeEventListener("homepage-arrival-done", done);
      siblings.forEach((child) => {
        child.inert = false;
        child.removeAttribute("data-arrival-inert");
      });
    };
  }, [finished]);

  if (finished) return null;
  return (
    <div
      ref={overlay}
      className="arrival-overlay"
      data-phase="initialization"
      role="region"
      aria-label="Darsh Soam portfolio introduction"
    >
      <div className="arrival-signature arrival-label">
        DARSH SOAM / PORTFOLIO<span>SYSTEM INITIALIZATION</span>
      </div>
      <div className="arrival-greeting arrival-label">
        INITIALIZING EXPERIENCE<span>ENGINEERING WITH INTENT</span>
      </div>
      <svg className="arrival-mark" viewBox="0 0 1120 620" aria-hidden="true">
        <defs>
          <clipPath id={maskId}>
            <rect className="arrival-mask" x="145" y="105" width="0" height="380" />
          </clipPath>
        </defs>
        <g className="arrival-routing" fill="none" stroke="currentColor" strokeWidth="1">
          <path className="arrival-route" pathLength="1" d="M150 126H725V460H150V126" />
          <path className="arrival-route" pathLength="1" d="M725 190H870V430H725" />
          <path
            className="arrival-route"
            pathLength="1"
            d="M725 310H870 M150 310H110 M110 126V460"
          />
          <path className="arrival-route" pathLength="1" d="M150 94H440 M485 94H725 M150 495H500" />
          {nodePositions.map((y, i) => (
            <g className="arrival-node" key={y}>
              <rect x="859" y={y - 11} width="22" height="22" rx="3" fill="#e75b35" />
              <circle cx="870" cy={y} r="3" fill="currentColor" stroke="none" />
              <path d={`M896 ${y}H930`} />
              <text
                className="arrival-node-label"
                x="942"
                y={y + 4}
                stroke="none"
                fill="currentColor"
              >
                {["BUILD", "DEPLOY", "OBSERVE"][i]}
              </text>
            </g>
          ))}
        </g>
        <g className="arrival-annotation" fill="currentColor">
          <text x="150" y="78">
            01 / IDENTITY
          </text>
          <text x="150" y="520">
            CLOUD · SYSTEMS · DELIVERY
          </text>
          <text x="870" y="136" textAnchor="middle">
            CONNECTED
          </text>
        </g>
        <g className="arrival-type">
          <text className="arrival-outline" x="170" y="278">
            Darsh
          </text>
          <text className="arrival-outline" x="170" y="430">
            Soam
          </text>
          <g clipPath={`url(#${maskId})`} fill="currentColor">
            <text x="170" y="278">
              Darsh
            </text>
            <text x="170" y="430">
              Soam
            </text>
          </g>
        </g>
        <circle className="arrival-dot" cx="640" cy="416" r="13" fill="currentColor" />
      </svg>
      <div className="arrival-progress">
        <span ref={counter} className="arrival-count" aria-hidden="true">
          000%
        </span>
        <span className="arrival-progress-note arrival-label">INTRO SEQUENCE</span>
      </div>
      <div className="arrival-role arrival-label">ENGINEERING · CLOUD · AUTOMATION</div>
      <button type="button" data-skip-arrival className="arrival-skip">
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
