import { ArrowUp, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { PROFILE, SOCIALS } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";

const INK = "text-[#03283f]";
const INK_SOFT = "text-[#0c4a6e]";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function AscentContact() {
  const socialIcons: Record<string, typeof Github> = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
  };

  return (
    <section id="ascent" className="relative pt-24 md:pt-32">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Reveal className="mb-12 text-center">
          <div className="eyebrow mb-5 text-[#075985]">
            {"//"} Ascent — returning to surface
          </div>
          <h2 className={`font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${INK}`}>
            Transmit to the{" "}
            <span className="bg-gradient-to-r from-[#0369a1] to-[#0e7490] bg-clip-text text-transparent">
              Surface.
            </span>
          </h2>
          <p className={`mx-auto mt-4 max-w-xl text-sm leading-relaxed md:text-base ${INK_SOFT}`}>
            The dive is complete — every layer inspected, the black box recovered. If you
            have a mission, a role, or an idea worth building, send a signal up.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-[#075985]/25 bg-white/45 p-8 shadow-[0_30px_80px_-30px_rgba(3,40,63,0.4)] backdrop-blur-md md:p-12">
            <div className="grid gap-4 sm:grid-cols-3">
              {SOCIALS.map((s) => {
                const Icon = socialIcons[s.key] ?? Mail;
                return (
                  <a
                    key={s.key}
                    href={s.href}
                    target={s.key === "email" ? undefined : "_blank"}
                    rel="noreferrer"
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-[#075985]/20 bg-white/60 px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#0e7490]/60 hover:shadow-[0_16px_36px_-14px_rgba(14,116,144,0.5)]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#03283f] text-cyan-100 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className={`font-display text-sm font-semibold ${INK}`}>{s.label}</span>
                    <span className="break-all font-mono text-[10px] text-[#075985]">
                      {s.handle}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 border-t border-[#075985]/20 pt-8">
              <a
                href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Expedition inquiry — from the portfolio")}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#03283f] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100 shadow-[0_14px_36px_-10px_rgba(3,40,63,0.65)] transition-all hover:bg-[#0a3a56]"
              >
                <Mail className="h-4 w-4" />
                Send a signal
              </a>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] text-[#075985]">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {PROFILE.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {PROFILE.location.coords}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Footer */}
        <footer className="mt-20 border-t border-[#075985]/20 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className={`font-mono text-[11px] uppercase tracking-[0.25em] ${INK}`}>
              DS <span className="text-[#0e7490]">◈</span> Descent Log
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#075985]/80">
              28.9845°N 77.7064°E — Meerut, IN
            </div>
            <div className="flex items-center gap-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#075985]/80">
                © 2026 {PROFILE.name}
              </span>
              <button
                onClick={() => scrollTo("surface")}
                className="group flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0e7490] transition-colors hover:text-[#03283f]"
              >
                Resurface
                <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
          <div className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] text-[#075985]/60">
            Surfaced safely — hull integrity 100%
          </div>
          <div className="h-10" />
        </footer>
      </div>
    </section>
  );
}
