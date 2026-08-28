import { useEffect, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Briefcase,
  Command,
  FileText,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Search,
  Sparkles,
  Terminal,
  Workflow,
  X,
} from "lucide-react";
import { PROFILE } from "@/data/portfolioData";

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOption {
  id: string;
  category: "Navigation" | "Projects" | "Actions";
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function CommandPaletteModal({ isOpen, onClose }: CommandPaletteModalProps) {
  const [query, setQuery] = useState("");

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const options: CommandOption[] = [
    {
      id: "nav-signal",
      category: "Navigation",
      title: "Signal // Top of System",
      subtitle: "Hero, Overview & Positioning",
      icon: Sparkles,
      action: () => scrollTo("signal"),
    },
    {
      id: "nav-systems",
      category: "Navigation",
      title: "Systems // Interactive Topology",
      subtitle: "End-to-End Infrastructure Flow",
      icon: Workflow,
      action: () => scrollTo("systems"),
    },
    {
      id: "nav-work",
      category: "Navigation",
      title: "Selected Work // Case Studies",
      subtitle: "AWS Deployment & Expense Tracker",
      icon: Layers,
      action: () => scrollTo("work"),
    },
    {
      id: "nav-stack",
      category: "Navigation",
      title: "Engineering Stack",
      subtitle: "Cloud, Containers, AI & Backend",
      icon: Boxes,
      action: () => scrollTo("stack"),
    },
    {
      id: "nav-journey",
      category: "Navigation",
      title: "Academic & Career Journey",
      subtitle: "MIET B.Tech & Virtual Internship",
      icon: GraduationCap,
      action: () => scrollTo("journey"),
    },
    {
      id: "nav-credentials",
      category: "Navigation",
      title: "Certified Credentials",
      subtitle: "Oracle & OpenAI AI Accreditations",
      icon: Briefcase,
      action: () => scrollTo("credentials"),
    },
    {
      id: "nav-terminal",
      category: "Navigation",
      title: "System CLI Terminal",
      subtitle: "Interactive Bash/Zsh Emulator",
      icon: Terminal,
      action: () => scrollTo("terminal"),
    },
    {
      id: "nav-connect",
      category: "Navigation",
      title: "Connect // Transmit Message",
      subtitle: "Email, Socials & Contact Form",
      icon: Mail,
      action: () => scrollTo("connect"),
    },
    {
      id: "act-email",
      category: "Actions",
      title: "Email Darsh Soam",
      subtitle: PROFILE.email,
      icon: Mail,
      action: () => {
        onClose();
        window.location.href = `mailto:${PROFILE.email}`;
      },
    },
    {
      id: "act-linkedin",
      category: "Actions",
      title: "Open LinkedIn Profile",
      subtitle: "linkedin.com/in/darsh-soam",
      icon: Linkedin,
      action: () => {
        onClose();
        window.open(PROFILE.linkedin, "_blank");
      },
    },
    {
      id: "act-github",
      category: "Actions",
      title: "Open GitHub Profile",
      subtitle: "github.com/darshsoam07",
      icon: Github,
      action: () => {
        onClose();
        window.open(PROFILE.github, "_blank");
      },
    },
  ];

  const filtered = options.filter(
    (opt) =>
      opt.title.toLowerCase().includes(query.toLowerCase()) ||
      opt.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
      opt.category.toLowerCase().includes(query.toLowerCase())
  );

  // Escape only. The ⌘K/Ctrl+K toggle is owned by the parent route
  // (src/routes/index.tsx) — handling it here too made the two listeners
  // fight, so ⌘K could never close the palette.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-[rgba(230,240,245,0.15)] bg-[#0e1317] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[rgba(230,240,245,0.08)] bg-[#07090b]">
          <Search className="w-4 h-4 text-[#73848b]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search commands and sections"
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent border-none outline-none font-sans text-sm text-[#f1f6f7] placeholder-[#73848b]"
          />
          <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[9px] text-[#73848b]">
            ESC
          </kbd>
        </div>

        {/* List of Options */}
        <div className="max-h-[380px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs text-[#73848b]">
              No system commands match '{query}'.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#07090b] border border-[rgba(230,240,245,0.08)] text-[#b7ff3c] group-hover:border-[#b7ff3c]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm text-[#f1f6f7] group-hover:text-[#b7ff3c] transition-colors">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="font-mono text-[11px] text-[#73848b]">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#73848b] group-hover:text-[#b7ff3c] group-hover:translate-x-1 transition-all" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#07090b] border-t border-[rgba(230,240,245,0.06)] font-mono text-[10px] text-[#73848b]">
          <span>Navigation & Actions</span>
          <span>Darsh Soam Portfolio CLI</span>
        </div>
      </div>
    </div>
  );
}
