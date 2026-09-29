import { useEffect, useRef } from "react";
import { Activity } from "lucide-react";
import { ZONES, formatMeters } from "@/data/zones";

interface DepthGaugeProps {
  onPing: () => void;
}

function scrollToZone(id: string) {
  if (window.__lenis) {
    window.__lenis.scrollTo(`#${id}`, { duration: 1.5 });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function DepthGauge({ onPing }: DepthGaugeProps) {
  const desktopMetricRef = useRef<HTMLDivElement>(null);
  const desktopLayerNameRef = useRef<HTMLDivElement>(null);
  const desktopMarkerRef = useRef<HTMLDivElement>(null);
  const mobileMetricRef = useRef<HTMLSpanElement>(null);
  const mobileLayerNameRef = useRef<HTMLSpanElement>(null);
  const mobileProgressBarRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;

    const updateTelemetry = () => {
      const y = window.scrollY;
      const doc = document.documentElement.scrollHeight - window.innerHeight;
      const progress = doc > 0 ? Math.min(1, Math.max(0, y / doc)) : 0;

      const anchors = ZONES.map((z) => document.getElementById(z.id)?.offsetTop ?? 0);
      const probe = y + window.innerHeight * 0.35;
      let idx = 0;
      anchors.forEach((a, i) => {
        if (probe >= a) idx = i;
      });

      const a0 = anchors[idx] ?? 0;
      const a1 = anchors[idx + 1] ?? a0 + window.innerHeight;
      const blend = a1 > a0 ? Math.min(1, Math.max(0, (probe - a0) / (a1 - a0))) : 0;

      const m0 = ZONES[idx].meters;
      const m1 = ZONES[Math.min(idx + 1, ZONES.length - 1)].meters;
      const interpolatedMetric = Math.round(m0 + (m1 - m0) * blend);
      const activeZone = ZONES[idx] ?? ZONES[0];
      const metricText = formatMeters(interpolatedMetric);

      // Direct DOM mutations: Zero React State Thrashing
      if (desktopMetricRef.current) {
        desktopMetricRef.current.textContent = metricText;
      }
      if (desktopLayerNameRef.current) {
        desktopLayerNameRef.current.textContent = activeZone.name;
      }
      if (desktopMarkerRef.current) {
        desktopMarkerRef.current.style.top = `${progress * 100}%`;
      }
      if (mobileMetricRef.current) {
        mobileMetricRef.current.textContent = metricText;
      }
      if (mobileLayerNameRef.current) {
        mobileLayerNameRef.current.textContent = activeZone.name;
      }
      if (mobileProgressBarRef.current) {
        mobileProgressBarRef.current.style.width = `${progress * 100}%`;
      }

      // Update dot active styling
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        if (i === idx) {
          dot.className = "block h-1.5 w-1.5 rounded-full transition-all scale-125 bg-brass-300 shadow-[0_0_10px_rgba(201,163,95,0.9)]";
        } else {
          dot.className = "block h-1.5 w-1.5 rounded-full transition-all bg-white/25 group-hover:bg-brass-300/70";
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

  return (
    <>
      {/* Desktop Architecture Rail - Solid sleek compositing without backdrop-blur */}
      <div
        style={{ transform: "translate3d(0,-50%,0)", willChange: "transform" }}
        className="pointer-events-none fixed right-5 top-1/2 z-40 hidden flex-col items-center gap-3 lg:flex"
      >
        <div className="pointer-events-auto flex flex-col items-center rounded-full border border-white/10 bg-[#060910]/95 px-2.5 py-4 shadow-xl">
          <div
            ref={desktopMetricRef}
            className="font-mono text-[10px] font-semibold tracking-widest text-brass-300"
          >
            LAYER 00
          </div>
          <div className="relative my-3 h-56 w-px bg-white/15">
            {ZONES.map((z, i) => (
              <button
                key={z.id}
                onClick={() => scrollToZone(z.id)}
                title={`${z.name} — ${z.label}`}
                aria-label={`Inspect ${z.name}`}
                className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5"
                style={{ top: `${(i / (ZONES.length - 1)) * 100}%` }}
              >
                <span
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  className={`block h-1.5 w-1.5 rounded-full transition-all ${
                    i === 0
                      ? "scale-125 bg-brass-300 shadow-[0_0_10px_rgba(201,163,95,0.9)]"
                      : "bg-white/25 group-hover:bg-brass-300/70"
                  }`}
                />
              </button>
            ))}
            {/* Current position marker */}
            <div
              ref={desktopMarkerRef}
              className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-300 shadow-[0_0_14px_rgba(201,163,95,0.9)]"
              style={{ top: "0%" }}
            />
          </div>
          <div
            ref={desktopLayerNameRef}
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog [writing-mode:vertical-rl]"
          >
            Gateway Ingress
          </div>
        </div>

        {/* Pulse Telemetry Button */}
        <button
          onClick={onPing}
          className="pointer-events-auto group flex h-12 w-12 items-center justify-center rounded-full border border-brass-400/30 bg-[#060910]/95 text-brass-300 shadow-lg transition-all hover:border-brass-300 hover:text-brass-200 hover:shadow-[0_0_20px_rgba(201,163,95,0.35)]"
          title="Trigger diagnostic pulse"
          aria-label="Trigger diagnostic pulse"
        >
          <Activity className="h-5 w-5 transition-transform group-active:scale-90" />
        </button>
        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-faint">
          Pulse
        </span>
      </div>

      {/* Mobile slim bar - Solid sleek compositing */}
      <div className="fixed inset-x-0 top-0 z-40 lg:hidden">
        <div className="flex items-center justify-between bg-[#060910]/95 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper shadow-md">
          <span ref={mobileMetricRef} className="text-brass-300">LAYER 00</span>
          <span ref={mobileLayerNameRef} className="text-fog">Gateway Ingress</span>
          <button
            onClick={onPing}
            className="flex items-center gap-1.5 text-brass-300"
            aria-label="Trigger diagnostic pulse"
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Pulse</span>
          </button>
        </div>
        <div className="h-0.5 bg-white/10">
          <div
            ref={mobileProgressBarRef}
            className="h-full bg-gradient-to-r from-brass-500 to-brass-300 shadow-[0_0_8px_rgba(201,163,95,0.8)]"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </>
  );
}
