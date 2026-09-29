import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import { useDepth } from "@/hooks/useDepth";
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

function SonarRipple() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
      <div className="h-[150vmax] w-[150vmax] animate-sonar-ring rounded-full border-2 border-brass-300/60" />
    </div>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [pingKey, setPingKey] = useState(0);
  const depth = useDepth();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // After a sonar ping's ring has had time to expand, reveal any
  // hidden annotations currently in view.
  useEffect(() => {
    if (pingKey === 0) return;
    const t = window.setTimeout(() => {
      document.querySelectorAll(".sonar-note:not(.revealed)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > window.innerHeight * 0.04) {
          el.classList.add("revealed");
        }
      });
    }, 700);
    return () => window.clearTimeout(t);
  }, [pingKey]);

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
          <OceanBackground zoneIndex={depth.zoneIndex} zoneBlend={depth.zoneBlend} />
          <div className="grain-overlay" aria-hidden />
          <Navbar />

          <DepthGauge depth={depth} onPing={() => setPingKey((k) => k + 1)} />
          {pingKey > 0 && <SonarRipple key={pingKey} />}
          <main className="relative z-10">
            <HeroSection isTriggered={introDone} />
            {sections}
          </main>
        </div>
      </SmoothScroll>
    </MotionConfig>
  );
}
