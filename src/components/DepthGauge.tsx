import { Radio } from "lucide-react";
import { ZONES, formatMeters } from "@/data/zones";
import type { DepthState } from "@/hooks/useDepth";

interface DepthGaugeProps {
  depth: DepthState;
  onPing: () => void;
}

function scrollToZone(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function DepthGauge({ depth, onPing }: DepthGaugeProps) {
  const zone = ZONES[depth.zoneIndex] ?? ZONES[0];

  return (
    <>
      {/* Desktop rail */}
      <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <div className="pointer-events-auto flex flex-col items-center rounded-full border border-cyan-200/15 bg-[#010409]/70 px-2.5 py-4 backdrop-blur-md">
          <div className="font-mono text-[10px] font-semibold tracking-widest text-cyan-200">
            {formatMeters(depth.meters)}
          </div>
          <div className="relative my-3 h-56 w-px bg-cyan-100/15">
            {ZONES.map((z, i) => (
              <button
                key={z.id}
                onClick={() => scrollToZone(z.id)}
                title={`${z.name} — ${formatMeters(z.meters)}`}
                aria-label={`Dive to ${z.name}`}
                className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5"
                style={{ top: `${(i / (ZONES.length - 1)) * 100}%` }}
              >
                <span
                  className={`block h-1.5 w-1.5 rounded-full transition-all ${
                    i === depth.zoneIndex
                      ? "scale-125 bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                      : "bg-cyan-100/30 group-hover:bg-cyan-200/80"
                  }`}
                />
              </button>
            ))}
            {/* Current position marker */}
            <div
              className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,1)]"
              style={{ top: `${depth.progress * 100}%` }}
            />
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 [writing-mode:vertical-rl]">
            {zone.name}
          </div>
        </div>
        <button
          onClick={onPing}
          className="pointer-events-auto group flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/30 bg-[#010409]/70 text-cyan-200 backdrop-blur-md transition-all hover:border-cyan-300 hover:text-cyan-100 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          title="Send sonar ping"
          aria-label="Send sonar ping"
        >
          <Radio className="h-5 w-5 transition-transform group-active:scale-90" />
        </button>
        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-slate-500">
          Ping
        </span>
      </div>

      {/* Mobile slim bar */}
      <div className="fixed inset-x-0 top-0 z-40 lg:hidden">
        <div className="flex items-center justify-between bg-[#010409]/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200 backdrop-blur-md">
          <span>{formatMeters(depth.meters)}</span>
          <span className="text-slate-400">{zone.name}</span>
          <button
            onClick={onPing}
            className="flex items-center gap-1.5 text-cyan-200"
            aria-label="Send sonar ping"
          >
            <Radio className="h-3.5 w-3.5" />
            <span>Ping</span>
          </button>
        </div>
        <div className="h-0.5 bg-cyan-100/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-cyan-200 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            style={{ width: `${depth.progress * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}
