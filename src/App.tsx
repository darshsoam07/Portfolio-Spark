import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import SmoothScroll from "@/components/SmoothScroll";
import OceanDepthCanvas from "@/components/OceanDepthCanvas";
import { OceanBackground } from "@/components/OceanBackground";
import { Navbar } from "@/components/Navbar";
import { DepthGauge } from "@/components/DepthGauge";
import ArrivalTunnel from "@/components/ArrivalTunnel";
import { HeroSection } from "@/sections/HeroSection";
import { SunlightZone } from "@/sections/SunlightZone";
import { TwilightZone } from "@/sections/TwilightZone";
import { MidnightZone } from "@/sections/MidnightZone";
import { AbyssalZone } from "@/sections/AbyssalZone";
import { HadalZone } from "@/sections/HadalZone";
import { AscentContact } from "@/sections/AscentContact";

function TelemetryPulse() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
      <div className="h-[150vmax] w-[150vmax] animate-sonar-ring rounded-full border border-brass-300/40" />
    </div>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // When a diagnostic pulse is triggered, reveal any hidden telemetry notes currently in view
  useEffect(() => {
    if (pulseKey === 0) return;
    const t = window.setTimeout(() => {
      document.querySelectorAll(".sonar-note:not(.revealed)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > window.innerHeight * 0.04) {
          el.classList.add("revealed");
        }
      });
    }, 600);
    return () => window.clearTimeout(t);
  }, [pulseKey]);

  const sections = useMemo(
    () => (
      <>
        <SunlightZone />
        <TwilightZone />
        <MidnightZone />
        <AbyssalZone />
        <HadalZone />
        <AscentContact />
      </>
    ),
    []
  );

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <div className="relative min-h-screen overflow-x-clip bg-[#04070d] text-paper">
          {!introDone && <ArrivalTunnel onComplete={() => setIntroDone(true)} />}
          <OceanDepthCanvas />
          <OceanBackground />
          <div className="grain-overlay" aria-hidden />
          <Navbar />

          {/* Architecture Rail - Zero React State Thrashing */}
          <DepthGauge onPing={() => setPulseKey((k) => k + 1)} />
          {pulseKey > 0 && <TelemetryPulse key={pulseKey} />}

          <main className="relative z-10">
            <HeroSection isTriggered={introDone} />
            {sections}
          </main>
        </div>
      </SmoothScroll>
    </MotionConfig>
  );
}
