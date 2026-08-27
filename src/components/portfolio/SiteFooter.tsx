import { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck, Terminal } from "lucide-react";
import { PROFILE, SOCIALS } from "@/data/portfolioData";

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
        })
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
    <footer className="border-t border-[rgba(230,240,245,0.08)] bg-[#07090b] py-12 px-6 md:px-10">
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

        {/* Center: Philosophy */}
        <div className="text-center font-mono text-[11px] text-[#b3c0c4]">
          Built with curiosity. Engineered with intention. <br />
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
              className="p-2 rounded bg-[#0e1317] border border-[rgba(230,240,245,0.08)] text-[#b3c0c4] hover:text-[#b7ff3c] hover:border-[#b7ff3c] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded bg-[#0e1317] border border-[rgba(230,240,245,0.08)] text-[#b3c0c4] hover:text-[#b7ff3c] hover:border-[#b7ff3c] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email Contact"
              className="p-2 rounded bg-[#0e1317] border border-[rgba(230,240,245,0.08)] text-[#b3c0c4] hover:text-[#b7ff3c] hover:border-[#b7ff3c] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#0e1317] border border-[rgba(230,240,245,0.1)] font-mono text-[10px] uppercase text-[#73848b] hover:text-[#f1f6f7] hover:border-[#b7ff3c] transition-colors"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
