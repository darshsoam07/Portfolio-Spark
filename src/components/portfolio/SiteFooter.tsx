import { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck, Terminal } from "lucide-react";
import { PROFILE, SOCIALS } from "@/data/portfolioData";
import { MagneticButton } from "./MagneticButton";

export function SiteFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[rgba(230,240,245,0.08)] bg-[#07080a] py-12 px-6 md:px-10">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Identity */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="font-display font-bold text-sm tracking-wider uppercase text-[#f1f6f7]">
            DARSH<span className="text-[#b7ff3c]">.</span>SOAM
          </div>
          <p className="font-mono text-[10px] text-[#73848b] tracking-wider">
            Cloud · DevOps · Automation · Agentic AI
          </p>
        </div>

        {/* Center: System Status & Philosophy */}
        <div className="text-center font-mono text-[11px] text-[#b3c0c4]">
          <div className="text-amber-400 font-semibold mb-1 flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational // Continuous Deployment Active
          </div>
          <span className="text-[#73848b] text-[10px]">
            © {new Date().getFullYear()} {PROFILE.name} · MEERUT, IN · UTC+05:30 [{time}]
          </span>
        </div>

        {/* Right: Socials & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded bg-[#0f1216] border border-[rgba(230,240,245,0.08)] text-[#b3c0c4] hover:text-amber-400 hover:border-amber-400 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded bg-[#0f1216] border border-[rgba(230,240,245,0.08)] text-[#b3c0c4] hover:text-amber-400 hover:border-amber-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email Contact"
              className="p-2 rounded bg-[#0f1216] border border-[rgba(230,240,245,0.08)] text-[#b3c0c4] hover:text-amber-400 hover:border-amber-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <MagneticButton
            onClick={scrollToTop}
            ariaLabel="Return to top"
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#0f1216] border border-[rgba(230,240,245,0.1)] font-mono text-[10px] uppercase text-[#b3c0c4] hover:text-amber-300 hover:border-amber-400 transition-colors cursor-pointer"
          >
            <span>RETURN TO TOP ↑</span>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
