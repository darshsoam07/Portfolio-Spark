import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ArrivalTunnel } from "@/components/portfolio/ArrivalTunnel";
import {
  cancelIntroFailsafe,
  clearIntroPending,
  isIntroGateActive,
  shouldPlayIntro,
} from "@/lib/intro-gate";
import { Navbar } from "@/components/portfolio/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { SystemsTopology } from "@/components/portfolio/SystemsTopology";
import { ProjectCaseStudies } from "@/components/portfolio/ProjectCaseStudies";
import { TechStackSection } from "@/components/portfolio/TechStackSection";
import { ExperienceAndEducation } from "@/components/portfolio/ExperienceAndEducation";
import { CertificationsSection } from "@/components/portfolio/CertificationsSection";
import { InteractiveTerminal } from "@/components/portfolio/InteractiveTerminal";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { CommandPaletteModal } from "@/components/portfolio/CommandPaletteModal";
import {
  Boxes,
  Cloud,
  Container,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Terminal,
  Activity,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
});

const MARQUEE_ITEMS = [
  { label: "AWS Cloud", icon: Cloud },
  { label: "Kubernetes", icon: Boxes },
  { label: "Docker", icon: Container },
  { label: "Terraform IaC", icon: Layers },
  { label: "GitHub Actions CI/CD", icon: GitBranch },
  { label: "Agentic AI", icon: Cpu },
  { label: "Linux Administration", icon: Terminal },
  { label: "Python & REST APIs", icon: Activity },
  { label: "DevSecOps", icon: ShieldCheck },
  { label: "SQLite & Oracle DB", icon: Database },
];

// useLayoutEffect logs a warning when run during SSR, so fall back to useEffect
// on the server. On the client we need the layout-effect timing: the skip
// decision has to be applied before the browser paints.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function PortfolioPage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // The server and the client both start with the intro active, unconditionally.
  // That makes the first render byte-identical in both environments, so there is
  // no hydration mismatch and nothing for React to discard and re-render.
  const [introActive, setIntroActive] = useState<boolean>(true);

  const handleIntroComplete = useCallback(() => {
    clearIntroPending();
    cancelIntroFailsafe();
    setIntroActive(false);
    window.scrollTo(0, 0);
  }, []);

  // Runs on hydration, before the browser paints. Reaching this proves the
  // bundle booted, so the application now owns revealing the portfolio and the
  // boot fail-safe must be cancelled — otherwise it could fire mid-intro on a
  // slow connection and cut the animation short.
  useIsomorphicLayoutEffect(() => {
    cancelIntroFailsafe();
    // If the gate is already gone, either the head script opted out (reduced
    // motion) or the boot fail-safe already revealed the portfolio. Do not start
    // the intro in that case: the visitor can already read the page, and
    // mounting the overlay now would lock scrolling while a display:none
    // animation runs invisibly.
    if (!isIntroGateActive() || !shouldPlayIntro()) {
      clearIntroPending();
      setIntroActive(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative bg-[#07080a] text-[#f1f6f7] min-h-screen font-sans selection:bg-[#b7ff3c] selection:text-[#07080a] grid-bg">
      {/* 1. Intro Animation Layer (Controls viewport from frame 0 until finished) */}
      {introActive && <ArrivalTunnel onFinish={handleIntroComplete} />}

      {/* 2. Existing Portfolio (Completely hidden until intro finishes, then smoothly revealed once) */}
      <div
        id="portfolio-root"
        style={{ transition: "opacity 0.6s cubic-bezier(0.22, 0.8, 0.2, 1)" }}
      >
        {/* Top Navbar */}
        <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        {/* Main Experience */}
        <main className="relative z-10">
          {/* 01. Hero Section */}
          <HeroSection />

          {/* Continuous Tech Stream Marquee */}
          <div className="relative py-4 border-y border-[rgba(230,240,245,0.08)] bg-[#0f1216]/60 overflow-hidden">
            <div className="marquee-continuous flex items-center gap-6">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(230,240,245,0.08)] bg-[#07080a] font-mono text-[11px] uppercase tracking-wider text-[#b3c0c4] shrink-0"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#b7ff3c]" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 02. Signature Systems Topology */}
          <SystemsTopology />

          {/* 03. Selected Work / Case Studies */}
          <ProjectCaseStudies />

          {/* 04. Layered Engineering Stack */}
          <TechStackSection />

          {/* 05. Academic Journey & Applied Experience */}
          <ExperienceAndEducation />

          {/* 06. Verified Certifications */}
          <CertificationsSection />

          {/* 07. Interactive System Terminal */}
          <InteractiveTerminal />

          {/* 08. Contact & Connect */}
          <ContactSection />
        </main>

        {/* Footer */}
        <SiteFooter />

        {/* Command Palette Modal (Cmd+K) */}
        <CommandPaletteModal
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
      </div>
    </div>
  );
}
