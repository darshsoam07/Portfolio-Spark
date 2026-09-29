import { useEffect, useRef } from "react";
import { ZONES } from "@/data/zones";

interface Stop {
  top: string;
  mid: string;
  bot: string;
}

// Enterprise Cloud Infrastructure architectural gradient stops per system layer:
// Layer 00 (Gateway Ingress): Deep obsidian blue with subtle warm edge ambient
// Layer 01 (Compute Runtime): High-density slate & graphite runtime core
// Layer 02 (Orchestration): Dark topology navy & structural midnight
// Layer 03 (Distributed Workloads): Rich cyan/bio accent ambient glow
// Layer 04 (Security & Governance): Hardened vault obsidian
// Layer 05 (Root Diagnostics): Kernel black box deep amber shadow
// Layer 06 (Network Dispatch): Network egress deep telemetry obsidian
const SYSTEM_STOPS: Stop[] = [
  { top: "#0a1020", mid: "#060913", bot: "#03050a" }, // Gateway Ingress
  { top: "#070c18", mid: "#050810", bot: "#020408" }, // Compute Runtime
  { top: "#050912", mid: "#04070e", bot: "#020306" }, // Orchestration
  { top: "#040a16", mid: "#030710", bot: "#020408" }, // Distributed Workloads
  { top: "#03060d", mid: "#020409", bot: "#010204" }, // Security & Governance
  { top: "#060402", mid: "#040201", bot: "#020101" }, // Root Diagnostics
  { top: "#080c18", mid: "#050812", bot: "#03050a" }, // Network Dispatch
];

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function mix(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const c = ca.map((v, i) => Math.round(v + (cb[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

interface OceanBackgroundProps {
  zoneIndex?: number;
  zoneBlend?: number;
}

export function OceanBackground({ zoneIndex: _zi, zoneBlend: _zb }: OceanBackgroundProps) {
  const gradientRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const updateGradient = () => {
      const y = window.scrollY;
      const anchors = ZONES.map((z) => document.getElementById(z.id)?.offsetTop ?? 0);
      const probe = y + window.innerHeight * 0.35;
      let idx = 0;
      anchors.forEach((a, i) => {
        if (probe >= a) idx = i;
      });

      const a0 = anchors[idx] ?? 0;
      const a1 = anchors[idx + 1] ?? a0 + window.innerHeight;
      const blend = a1 > a0 ? Math.min(1, Math.max(0, (probe - a0) / (a1 - a0))) : 0;

      const i = Math.max(0, Math.min(SYSTEM_STOPS.length - 2, idx));
      const t = Math.max(0, Math.min(1, blend));
      const s0 = SYSTEM_STOPS[i];
      const s1 = SYSTEM_STOPS[i + 1];

      const top = mix(s0.top, s1.top, t);
      const mid = mix(s0.mid, s1.mid, t);
      const bot = mix(s0.bot, s1.bot, t);

      // Direct DOM mutation for background: Zero React State Thrashing
      if (gradientRef.current) {
        gradientRef.current.style.background = `linear-gradient(180deg, ${top} 0%, ${mid} 52%, ${bot} 100%)`;
      }

      if (ambientGlowRef.current) {
        // Subtle ambient accent for workloads (idx 3) or gateway (idx 0)
        let glowOpacity = 0.12;
        if (idx === 0) glowOpacity = 0.22 * (1 - blend);
        else if (idx === 3) glowOpacity = 0.18;
        ambientGlowRef.current.style.opacity = glowOpacity.toString();
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateGradient);
    };

    updateGradient();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Dynamic Enterprise Systems Gradient */}
      <div
        ref={gradientRef}
        className="absolute inset-0 transition-colors duration-150"
        style={{
          background: `linear-gradient(180deg, ${SYSTEM_STOPS[0].top} 0%, ${SYSTEM_STOPS[0].mid} 52%, ${SYSTEM_STOPS[0].bot} 100%)`,
        }}
      />

      {/* Enterprise Architecture Subtle Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ece7d9 1px, transparent 1px), linear-gradient(to bottom, #ece7d9 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient Top Glow */}
      <div
        ref={ambientGlowRef}
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[90%] h-[50%] rounded-full transition-opacity duration-300"
        style={{
          opacity: 0.2,
          background: "radial-gradient(ellipse, rgba(201,163,95,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Sleek Edge Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(2,3,6,0.85) 100%)",
        }}
      />
    </div>
  );
}
