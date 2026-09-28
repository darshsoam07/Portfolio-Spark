import { Check, ExternalLink, Github, Sparkles } from "lucide-react";
import { PROJECTS, SKILL_CATEGORIES, type ProjectItem } from "@/data/portfolio";
import { ZoneHeader } from "@/components/ZoneHeader";
import { Reveal } from "@/components/Reveal";

function SpecimenCard({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="panel-glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-cyan-300/30 hover:shadow-[0_24px_70px_-24px_rgba(34,211,238,0.4)] md:p-10">
        {/* Bioluminescent corner glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl transition-opacity duration-500 group-hover:bg-cyan-400/20" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
            <span className="text-cyan-300">Specimen {project.number}</span>
            {project.featured && (
              <span className="flex items-center gap-1.5 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-2.5 py-1 text-cyan-200">
                <Sparkles className="h-3 w-3" />
                Featured discovery
              </span>
            )}
          </div>

          <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-slate-50 md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan-200/90 md:text-sm">
            {project.tagline}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-100/15 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-rose-300/15 bg-rose-950/20 p-5">
              <div className="eyebrow mb-2 text-rose-300/90">The problem</div>
              <p className="text-sm leading-relaxed text-slate-300">{project.problem}</p>
            </div>
            <div className="rounded-xl border border-cyan-300/20 bg-cyan-950/20 p-5">
              <div className="eyebrow mb-2 text-cyan-300">The solution</div>
              <p className="text-sm leading-relaxed text-slate-200">{project.solution}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="eyebrow mb-4 text-slate-400">Anatomy — system architecture</div>
            <ol className="grid gap-2 sm:grid-cols-2">
              {project.architecture.map((node, i) => (
                <li
                  key={node}
                  className="flex items-center gap-3 rounded-lg border border-cyan-100/10 bg-[#04121f]/60 px-3.5 py-2.5 font-mono text-[11px] text-slate-300"
                >
                  <span className="text-cyan-300">{String(i + 1).padStart(2, "0")}</span>
                  <span>{node}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <div className="eyebrow mb-4 text-slate-400">Expedition log — build pipeline</div>
            <div className="relative ml-2 border-l border-cyan-300/20 pl-6">
              {project.pipelineSteps.map((step) => (
                <div key={step.phase} className="relative pb-6 last:pb-0">
                  <span className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full border border-cyan-300 bg-[#04121f] shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                    {step.phase}
                  </div>
                  <div className="mt-1 font-display text-[15px] font-semibold text-slate-100">
                    {step.action}
                  </div>
                  <div className="mt-1 inline-block rounded border border-cyan-300/25 bg-cyan-300/[0.07] px-2 py-0.5 font-mono text-[10px] text-cyan-200">
                    {step.tech}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{step.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <div className="eyebrow mb-3 text-slate-400">Tech stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow mb-3 text-slate-400">Field highlights</div>
              <ul className="flex flex-col gap-2">
                {project.highlights.map((hl) => (
                  <li key={hl} className="flex items-start gap-2 text-[13px] text-slate-300">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-cyan-100/10 pt-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#010409] transition-all hover:bg-cyan-200 hover:shadow-[0_0_24px_rgba(34,211,238,0.5)]"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-100/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-200 transition-all hover:border-cyan-300/60 hover:text-cyan-200"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live site
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function MidnightZone() {
  const intelligence = SKILL_CATEGORIES[2];

  return (
    <section id="midnight" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <ZoneHeader
          zoneId="midnight"
          title={
            <>
              The Midnight <span className="text-cyan-300 text-glow-bio">Zone</span>
            </>
          }
          blurb="A thousand meters down, sunlight is a rumor. What glows here glows on its own — intelligence, and the two flagship builds of the expedition."
        />

        {/* Layer 03 — intelligence deck */}
        <Reveal className="mb-14">
          <div className="panel-glass-deep rounded-2xl p-6 md:p-8">
            <div className="eyebrow mb-3 text-cyan-300/80">{intelligence.eyebrow}</div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-display text-2xl font-bold text-slate-50 md:text-3xl">
                {intelligence.title}
              </h3>
              <p className="max-w-xl text-sm text-slate-400">{intelligence.description}</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {intelligence.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group rounded-xl border border-cyan-100/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
                >
                  <div className="font-display text-sm font-semibold text-slate-100">
                    {skill.name}
                  </div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300">
                    {skill.badge}
                  </div>
                  <p className="mt-2 font-mono text-[10px] leading-relaxed text-slate-400">
                    {skill.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mb-8 flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Discoveries — selected work
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            {PROJECTS.length} specimens catalogued
          </span>
        </Reveal>

        <div className="flex flex-col gap-8">
          {PROJECTS.map((p, i) => (
            <SpecimenCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <p className="sonar-note inline-block rounded-lg border border-dashed border-cyan-300/30 bg-cyan-300/[0.04] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200/80">
            ◈ Sonar note: the expense tracker runs its analytics entirely in-process — no
            external services, just Python and SQL
          </p>
        </Reveal>
      </div>
    </section>
  );
}
