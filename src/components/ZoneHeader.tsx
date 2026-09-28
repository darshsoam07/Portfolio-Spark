import type { ReactNode } from "react";
import { ZONES, formatMeters } from "@/data/zones";
import { Reveal } from "./Reveal";

interface ZoneHeaderProps {
  zoneId: string;
  title: ReactNode;
  blurb?: string;
}

export function ZoneHeader({ zoneId, title, blurb }: ZoneHeaderProps) {
  const zone = ZONES.find((z) => z.id === zoneId)!;
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 eyebrow text-cyan-200/70 mb-5">
        <span className="text-cyan-300">{"//"} {zone.label}</span>
        <span className="text-slate-400">{formatMeters(zone.meters)}</span>
        <span className="uppercase tracking-[0.3em]">{zone.name}</span>
        <span className="hidden sm:inline-block h-px flex-1 min-w-12 bg-gradient-to-r from-cyan-300/40 to-transparent" />
      </div>
      <h2 className="font-display font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl text-slate-50">
        {title}
      </h2>
      {blurb && (
        <p className="mt-4 max-w-2xl text-slate-300/80 text-sm md:text-base leading-relaxed">
          {blurb}
        </p>
      )}
    </Reveal>
  );
}
