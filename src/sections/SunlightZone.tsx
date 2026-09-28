import {
  Activity,
  Boxes,
  Cloud,
  Container,
  Cpu,
  Database,
  GitBranch,
  Layers,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { ZoneHeader } from "@/components/ZoneHeader";
import { Reveal } from "@/components/Reveal";

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

export function SunlightZone() {
  return (
    <section id="sunlight" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <ZoneHeader
          zoneId="sunlight"
          title={
            <>
              The Sunlight <span className="text-cyan-300 text-glow-bio">Zone</span>
            </>
          }
          blurb="The top two hundred meters — where the tools of the trade drift past in the current, and every expedition begins with a checklist."
        />
      </div>

      {/* Drifting tech stream */}
      <Reveal className="relative overflow-hidden border-y border-cyan-100/10 bg-[#04121f]/50 py-5 backdrop-blur-sm">
        <div className="flex w-max animate-marquee items-center gap-5">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-cyan-100/15 bg-[#071526]/80 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-100/80"
              >
                <Icon className="h-3.5 w-3.5 text-cyan-300" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#04121f] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#04121f] to-transparent" />
      </Reveal>

      {/* Descent checkpoints — the 7-stage lifecycle */}
      <div className="mx-auto mt-16 max-w-[1440px] px-6 md:px-10">
        <Reveal className="mb-8 flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Descent checkpoints
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
            7 stages of engineering
          </span>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {PROFILE.philosophy.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.06}>
              <div className="group h-full rounded-xl border border-cyan-100/10 bg-[#071526]/60 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300/40 hover:shadow-[0_12px_30px_-10px_rgba(34,211,238,0.35)]">
                <div className="flex items-center justify-between font-mono text-[10px] text-cyan-300">
                  <span>{item.step}</span>
                  <span className="text-slate-500">{i * 28}M</span>
                </div>
                <div className="mt-2 font-display text-sm font-semibold text-slate-50">
                  {item.name}
                </div>
                <div className="mt-1 font-mono text-[10px] leading-relaxed text-slate-400">
                  {item.detail}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
