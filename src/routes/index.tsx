import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

function PortfolioPage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

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
  );
}
