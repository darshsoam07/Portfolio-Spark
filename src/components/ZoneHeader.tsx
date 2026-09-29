import type { ReactNode } from "react";
import { ZONES } from "@/data/zones";
import { Reveal } from "./Reveal";

interface ZoneHeaderProps {
  zoneId: string;
  title: ReactNode;
  blurb?: string;
}

export function ZoneHeader({ zoneId, title, blurb }: ZoneHeaderProps) {
  const zone = ZONES.find((z) => z.id === zoneId) ?? ZONES[0];
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 eyebrow text-fog mb-6">
        <span className="text-brass-300">{"//"} {zone.label}</span>
        <span className="text-faint">{zone.subsystem}</span>
        <span className="uppercase tracking-[0.3em]">{zone.name}</span>
        <span className="hidden sm:inline-block h-px flex-1 min-w-12 bg-gradient-to-r from-brass-400/40 to-transparent" />
      </div>
      <h2 className="font-display font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl text-paper">
        {title}
      </h2>
      {blurb && (
        <p className="mt-5 max-w-2xl text-fog text-sm md:text-base leading-relaxed">
          {blurb}
        </p>
      )}
    </Reveal>
  );
}
