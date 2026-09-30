import { useEffect, useRef } from "react";
import { Activity } from "lucide-react";

interface SectionMeta {
  id: string;
  name: string;
}

const SECTIONS: SectionMeta[] = [
  { id: "signal", name: "// 01: OVERVIEW" },
  { id: "systems", name: "// 02: ARCHITECTURE" },
  { id: "work", name: "// 03: PIPELINES" },
  { id: "stack", name: "// 04: TECH STACK" },
  { id: "journey", name: "// 05: JOURNEY" },
  { id: "credentials", name: "// 06: CREDENTIALS" },
  { id: "terminal", name: "// 07: SYSTEM TERMINAL" },
  { id: "connect", name: "// 08: CONNECT" },
];

export function ViewportTelemetryRail() {
  const sectionTextRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;

    const updateTelemetry = () => {
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0;
      const percentStr = `${Math.round(progress * 100)}%`;

      // Determine active section via probe line (35% from viewport top)
      const probe = y + window.innerHeight * 0.35;
      let activeIndex = 0;

      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (probe >= top) {
            activeIndex = i;
          }
        }
      }

      const activeSection = SECTIONS[activeIndex] || SECTIONS[0];

      // Direct DOM mutations: zero React state thrashing
      if (sectionTextRef.current && sectionTextRef.current.textContent !== activeSection.name) {
        sectionTextRef.current.textContent = activeSection.name;
      }
      if (percentTextRef.current && percentTextRef.current.textContent !== percentStr) {
        percentTextRef.current.textContent = percentStr;
      }
      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleY(${progress})`;
      }
      if (markerRef.current) {
        markerRef.current.style.top = `${progress * 100}%`;
      }

      // Update dot active highlight
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        if (i === activeIndex) {
          dot.className =
            "block h-1.5 w-1.5 rounded-full transition-all scale-125 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]";
        } else {
          dot.className =
            "block h-1.5 w-1.5 rounded-full transition-all bg-white/20 group-hover:bg-amber-400/60";
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateTelemetry);
    };

    updateTelemetry();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Viewport Telemetry Rail"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden lg:flex flex-col items-center gap-3 select-none"
      style={{
        transform: "translate3d(0, -50%, 0)",
        willChange: "transform",
      }}
    >
      <div className="pointer-events-auto flex flex-col items-center rounded-2xl border border-amber-500/20 bg-[#080c14]/90 px-2.5 py-4 shadow-2xl backdrop-blur-md">
        {/* Real-time reading */}
        <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-amber-400 font-semibold mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYS.STATUS: HEALTHY</span>
        </div>

        {/* Ultra-thin scroll progress rail */}
        <div className="relative my-2.5 h-44 w-[2px] bg-white/10 rounded-full overflow-visible">
          {/* Progress fill */}
          <div
            ref={progressFillRef}
            className="absolute inset-0 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full origin-top shadow-[0_0_8px_rgba(245,158,11,0.7)]"
            style={{ transform: "scaleY(0)" }}
          />

          {/* Section Dots */}
          {SECTIONS.map((sec, i) => (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              title={sec.name}
              aria-label={`Jump to ${sec.name}`}
              className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 cursor-pointer"
              style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%` }}
            >
              <span
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className={`block h-1.5 w-1.5 rounded-full transition-all ${
                  i === 0
                    ? "scale-125 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]"
                    : "bg-white/20 group-hover:bg-amber-400/60"
                }`}
              />
            </button>
          ))}

          {/* Real-time scroll indicator marker */}
          <div
            ref={markerRef}
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,1)] pointer-events-none"
            style={{ top: "0%" }}
          />
        </div>

        {/* Current Section Name */}
        <div
          ref={sectionTextRef}
          className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#b3c0c4] [writing-mode:vertical-rl] my-2 rotate-180 transition-colors"
        >
          // 01: OVERVIEW
        </div>

        {/* Ultra-thin scroll progress percent readout */}
        <div className="pt-2 border-t border-white/10 font-mono text-[9px] text-amber-400 font-bold tracking-wider">
          <span ref={percentTextRef}>0%</span>
        </div>
      </div>
    </aside>
  );
}
