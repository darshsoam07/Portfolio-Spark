import { useEffect, useState } from "react";
import { Anchor } from "lucide-react";

interface SubmersionIntroProps {
  onDone: () => void;
}

const PHASES = ["PRESSURIZING HULL", "FLOODING BALLAST", "DESCENT INITIATED"];

export function SubmersionIntro({ onDone }: SubmersionIntroProps) {
  const [phase, setPhase] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }
    document.body.style.overflow = "hidden";
    const timers = [
      window.setTimeout(() => setPhase(1), 800),
      window.setTimeout(() => setPhase(2), 1600),
      window.setTimeout(() => setLeaving(true), 2300),
      window.setTimeout(() => {
        document.body.style.overflow = "";
        onDone();
      }, 2900),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <div
      onClick={() => {
        document.body.style.overflow = "";
        onDone();
      }}
      className={`fixed inset-0 z-[60] flex cursor-pointer flex-col items-center justify-center bg-[#04070d] transition-opacity duration-700 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Submersion intro — click to skip"
    >
      {/* Expanding sonar rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((n) => (
          <div
            key={n}
            className="absolute h-[90vmin] w-[90vmin] rounded-full border border-brass-400/40 animate-sonar-ring"
            style={{ animationDelay: `${n * 0.7}s`, animationIterationCount: "infinite", animationDuration: "2.8s" }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brass-400/40 bg-brass-400/10">
          <Anchor className="h-7 w-7 text-brass-200" />
        </div>
        <div className="eyebrow mb-4 text-brass-300/70">DS-01 // Dive Bell</div>
        <h1 className="display-serif text-5xl font-light tracking-tight text-paper sm:text-7xl">
          The <span className="text-glow-brass font-medium italic text-brass-300">Descent</span>
        </h1>
        <p className="mt-4 max-w-md font-mono text-xs leading-relaxed text-fog">
          A scroll-driven dive through the stack — from open water to the black box,
          six thousand meters down.
        </p>
        <div className="mt-8 h-1 w-56 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brass-600 to-brass-300 transition-all duration-700"
            style={{ width: `${((phase + 1) / PHASES.length) * 100}%` }}
          />
        </div>
        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-brass-200">
          {PHASES[phase]}
          <span className="animate-blink">_</span>
        </div>
        <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          Click anywhere to skip
        </div>
      </div>
    </div>
  );
}
