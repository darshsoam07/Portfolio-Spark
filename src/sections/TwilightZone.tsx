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
              Infrastructure & <span className="display-serif italic font-medium text-brass-300">Orchestration</span>
            </>
          }
          blurb="Multi-tier cloud topology, declarative infrastructure as code, and automated CI/CD release engineering."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {layers.map((cat, ci) => (
            <Reveal key={cat.id} delay={ci * 0.1} className="h-full">
              <div
                style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
                className="panel-glass-deep flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-brass-400/30 md:p-8"
              >
                <div className="eyebrow mb-3 text-brass-300/80">{cat.eyebrow}</div>
                <h3 className="font-display text-2xl font-bold text-paper md:text-3xl">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">{cat.description}</p>

                <div className="mt-6 flex flex-col gap-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-brass-400/35 hover:bg-brass-400/[0.04]"
                    >
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-display text-[15px] font-semibold text-paper">
                          {skill.name}
                        </span>
                        <span className="rounded-full border border-brass-400/30 bg-brass-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-brass-200">
                          {skill.badge}
                        </span>
                      </div>
                      <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-fog">
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
          <p className="sonar-note inline-block rounded-lg border border-dashed border-brass-400/30 bg-brass-400/[0.04] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brass-200/80">
            ◈ TELEMETRY NOTE: Distributed workload engines and deep container networks initialized below
          </p>
        </Reveal>
      </div>
    </section>
  );
}
