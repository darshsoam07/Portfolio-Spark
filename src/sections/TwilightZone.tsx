import { SKILL_CATEGORIES } from "@/data/portfolio";
import { ZoneHeader } from "@/components/ZoneHeader";
import { Reveal } from "@/components/Reveal";

export function TwilightZone() {
  const layers = SKILL_CATEGORIES.slice(0, 2);

  return (
    <section id="twilight" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <ZoneHeader
          zoneId="twilight"
          title={
            <>
              The Twilight <span className="text-cyan-300 text-glow-bio">Zone</span>
            </>
          }
          blurb="Five hundred meters down, the light thins — and the foundation layers come into focus. Every layer you pass here is load-bearing."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {layers.map((cat, ci) => (
            <Reveal key={cat.id} delay={ci * 0.1} className="h-full">
              <div className="panel-glass-deep flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-cyan-300/25 md:p-8">
                <div className="eyebrow mb-3 text-cyan-300/80">{cat.eyebrow}</div>
                <h3 className="font-display text-2xl font-bold text-slate-50 md:text-3xl">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{cat.description}</p>

                <div className="mt-6 flex flex-col gap-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group rounded-xl border border-cyan-100/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-cyan-300/35 hover:bg-cyan-300/[0.04]"
                    >
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-display text-[15px] font-semibold text-slate-100">
                          {skill.name}
                        </span>
                        <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200">
                          {skill.badge}
                        </span>
                      </div>
                      <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-slate-400">
                        {skill.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-8">
          <p className="sonar-note inline-block rounded-lg border border-dashed border-cyan-300/30 bg-cyan-300/[0.04] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200/80">
            ◈ Sonar note: layers 03–05 wait below — the intelligence deck is next
          </p>
        </Reveal>
      </div>
    </section>
  );
}
