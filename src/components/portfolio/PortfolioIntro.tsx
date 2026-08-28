import { useEffect, useState } from "react";

const SESSION_KEY = "portfolioIntroPlayed";

export function PortfolioIntro() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"entering" | "floating" | "exiting" | "ended">("entering");

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const hasPlayed = sessionStorage.getItem(SESSION_KEY);
      if (hasPlayed) {
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(true);
    } catch {
      // In case sessionStorage is blocked / private browsing sandbox
      return;
    }

    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = originalOverflow;
      }, 500);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    }

    // Sequence timing:
    // 0ms - 800ms: Entrance (fade in, blur 10px -> 0, scale 0.95 -> 1, translateY 12px -> 0)
    // 800ms - 2200ms: Gentle subtle floating oscillation (±5px)
    // 2200ms - 2900ms: Cinematic fade out of name & dark overlay
    // 2900ms: Complete removal from DOM & restore scrolling
    const floatTimer = setTimeout(() => setPhase("floating"), 800);
    const exitTimer = setTimeout(() => setPhase("exiting"), 2200);
    const finishTimer = setTimeout(() => {
      setPhase("ended");
      setVisible(false);
      document.body.style.overflow = originalOverflow;
    }, 2900);

    // Fail-safe safety timer to guarantee user access under any circumstance
    const safetyTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = originalOverflow;
    }, 3600);

    return () => {
      clearTimeout(floatTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      clearTimeout(safetyTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!visible || phase === "ended") {
    return null;
  }

  return (
    <div
      id="portfolio-intro-overlay"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        backgroundColor: "#07090b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
        userSelect: "none",
        opacity: phase === "exiting" ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.65, 0, 0.35, 1)",
      }}
    >
      <style>{`
        @keyframes introEntrance {
          0% {
            opacity: 0;
            filter: blur(10px);
            transform: translateY(12px) scale(0.95);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes introFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          opacity: phase === "exiting" ? 0 : 1,
          filter: phase === "exiting" ? "blur(4px)" : "blur(0px)",
          transform: phase === "exiting" ? "translateY(-4px) scale(0.98)" : undefined,
          animation:
            phase === "entering"
              ? "introEntrance 0.8s cubic-bezier(0.22, 0.8, 0.2, 1) forwards"
              : phase === "floating"
              ? "introFloat 2.6s ease-in-out infinite"
              : undefined,
          transition: phase === "exiting" ? "all 0.6s cubic-bezier(0.65, 0, 0.35, 1)" : undefined,
        }}
      >
        <h1
          style={{
            fontFamily: '"Space Grotesk", system-ui, sans-serif',
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 7vw, 4.75rem)",
            letterSpacing: "-0.03em",
            color: "#f1f6f7",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          DARSH <span style={{ color: "#b7ff3c" }}>SOAM</span>
        </h1>
      </div>
    </div>
  );
}

export default PortfolioIntro;
