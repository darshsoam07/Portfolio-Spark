import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrivalTunnel } from "@/components/portfolio/ArrivalTunnel";
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

function isIntroRequired(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem("portfolioIntroPlayed")) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function PortfolioPage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Deterministic state:
  // On fresh sessions: intro is active, portfolio is hidden.
  // On repeat sessions: intro is skipped, portfolio is immediately visible.
  const [introActive, setIntroActive] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return isIntroRequired();
    }
    return true; // SSR renders with intro active (portfolio protected)
  });

  const [portfolioRevealed, setPortfolioRevealed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !isIntroRequired();
    }
    return false; // SSR renders portfolio hidden
  });

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem("portfolioIntroPlayed", "true");
      document.documentElement.classList.remove("intro-pending");
    } catch {
      // Ignore private browsing restrictions
    }
    setPortfolioRevealed(true);
    setIntroActive(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

    // If client session already played intro, ensure class cleanup and immediate display
    if (!isIntroRequired()) {
      document.documentElement.classList.remove("intro-pending");
      setPortfolioRevealed(true);
      setIntroActive(false);
    }
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
    <div className="relative bg-[#07090b] text-[#f1f6f7] min-h-screen font-sans selection:bg-[#b7ff3c] selection:text-[#07090b] grid-bg">
      {/* 1. Intro Animation Layer (Controls viewport from frame 0 until finished) */}
      {introActive && (
        <ArrivalTunnel onFinish={handleIntroComplete} />
      )}

      {/* 2. Existing Portfolio (Completely hidden until intro finishes, then smoothly revealed once) */}
      <div
        id="portfolio-root"
        style={{
          opacity: portfolioRevealed ? 1 : 0,
          visibility: portfolioRevealed ? "visible" : "hidden",
          transition: "opacity 0.6s cubic-bezier(0.22, 0.8, 0.2, 1)",
        }}
      >
        {/* Top Navbar */}
        <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        {/* Main Experience */}
        <main className="relative z-10">
          {/* 01. Hero Section */}
          <HeroSection />

          {/* Continuous Tech Stream Marquee */}
          <div className="relative py-4 border-y border-[rgba(230,240,245,0.08)] bg-[#0e1317]/60 overflow-hidden">
            <div className="marquee-continuous flex items-center gap-6">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(230,240,245,0.08)] bg-[#07090b] font-mono text-[11px] uppercase tracking-wider text-[#b3c0c4] shrink-0"
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
