import { useEffect, useState } from "react";
import { ZONES } from "@/data/zones";

export interface DepthState {
  /** 0..1 across the whole page */
  progress: number;
  /** index into ZONES of the active zone */
  zoneIndex: number;
  /** 0..1 blend from active zone toward the next */
  zoneBlend: number;
  /** interpolated depth in meters */
  meters: number;
}

const INITIAL: DepthState = { progress: 0, zoneIndex: 0, zoneBlend: 0, meters: 0 };

export function useDepth(): DepthState {
  const [depth, setDepth] = useState<DepthState>(INITIAL);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
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
      const meters = Math.round(m0 + (m1 - m0) * blend);

      setDepth((prev) =>
        prev.progress === progress &&
        prev.zoneIndex === idx &&
        prev.zoneBlend === blend &&
        prev.meters === meters
          ? prev
          : { progress, zoneIndex: idx, zoneBlend: blend, meters }
      );
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return depth;
}
