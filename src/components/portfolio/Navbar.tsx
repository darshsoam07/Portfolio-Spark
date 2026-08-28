import { useEffect, useState } from "react";
import { Command as CommandIcon, Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";
import { PROFILE } from "@/data/portfolioData";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

const NAV_LINKS = [
  { id: "signal", label: "Signal" },
  { id: "systems", label: "Systems" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "journey", label: "Journey" },
  { id: "credentials", label: "Credentials" },
  { id: "terminal", label: "Terminal" },
  { id: "connect", label: "Connect" },
];

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("signal");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const measure = () => {
      rafId = null;
      setScrolled(window.scrollY > 40);

      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0);

      // Active section detection
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(id);
          break;
        }
      }
    };

    // Coalesce bursts of scroll events into one measurement per frame —
    // getBoundingClientRect() on every section per event forces layout.
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(measure);
    };

    measure(); // sync state when the page loads already scrolled
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Mobile drawer: lock body scroll and close on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#07090b]/85 backdrop-blur-md border-b border-[rgba(230,240,245,0.08)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#signal"
            onClick={(e) => { e.preventDefault(); scrollToSection("signal"); }}
            className="group flex items-center gap-3 font-display text-sm tracking-widest font-bold uppercase text-[#f1f6f7]"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b7ff3c] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b7ff3c]" />
            </span>
            <span>
              DARSH<span className="text-[#b7ff3c]">.</span>SOAM
            </span>
            <span className="hidden xl:inline-block font-mono text-[9px] px-2 py-0.5 border border-[#b7ff3c]/30 text-[#b7ff3c] rounded bg-[#b7ff3c]/5 tracking-wider">
              SYS ONLINE
            </span>
          </a>

          {/* Desktop Nav */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full border border-[rgba(230,240,245,0.08)] bg-[#0e1317]/60 backdrop-blur-sm"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider transition-all rounded-full ${
                    isActive
                      ? "bg-[#b7ff3c] text-[#07090b] font-semibold"
                      : "text-[#b3c0c4] hover:text-[#f1f6f7] hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              aria-label="Open command palette"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 border border-[rgba(230,240,245,0.1)] rounded bg-[#0e1317]/60 font-mono text-[10px] uppercase tracking-wider text-[#b3c0c4] hover:border-[#b7ff3c]/50 hover:text-[#b7ff3c] transition-colors"
            >
              <CommandIcon className="w-3 h-3 text-[#b7ff3c]" />
              <span>Menu</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">⌘K</kbd>
            </button>

            <a
              href="#connect"
              onClick={(e) => { e.preventDefault(); scrollToSection("connect"); }}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#b7ff3c] bg-[#b7ff3c]/10 text-[#b7ff3c] font-mono text-[11px] uppercase tracking-wider rounded hover:bg-[#b7ff3c] hover:text-[#07090b] transition-all"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              className="lg:hidden p-2 text-[#f1f6f7] border border-[rgba(230,240,245,0.1)] rounded bg-[#0e1317] hover:border-[#b7ff3c]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#0e1317] border-l border-[rgba(230,240,245,0.1)] p-6 flex flex-col justify-between transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[rgba(230,240,245,0.08)]">
              <span className="font-display font-bold text-sm tracking-wider uppercase text-[#f1f6f7]">
                DARSH<span className="text-[#b7ff3c]">.</span>SOAM
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation"
                className="p-1.5 text-[#b3c0c4] hover:text-[#f1f6f7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#73848b] mt-6 mb-3">
              NAVIGATION
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-3 py-2.5 rounded font-mono text-xs uppercase tracking-wider transition-colors ${
                    activeSection === item.id
                      ? "bg-[#b7ff3c]/10 text-[#b7ff3c] border-l-2 border-[#b7ff3c]"
                      : "text-[#b3c0c4] hover:text-[#f1f6f7] hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[rgba(230,240,245,0.08)]">
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#73848b] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b7ff3c]" />
              <span>AWS & DevOps Infrastructure</span>
            </div>
            <a
              href={`mailto:${PROFILE.email}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#b7ff3c] text-[#07090b] font-mono text-xs uppercase tracking-wider font-semibold rounded"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
