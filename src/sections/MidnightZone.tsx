import { Check, ExternalLink, Github, Sparkles } from "lucide-react";
import { PROJECTS, SKILL_CATEGORIES, type ProjectItem } from "@/data/portfolio";
import { ZoneHeader } from "@/components/ZoneHeader";
import { Reveal } from "@/components/Reveal";
import PipelineTopology from "@/components/PipelineTopology";

function SystemCard({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <article
        style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
        className="panel-glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-brass-400/30 hover:shadow-[0_24px_70px_-24px_rgba(201,163,95,0.3)] md:p-10"
      >
        {/* Subtle accent corner glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-bio-500/[0.07] blur-3xl transition-opacity duration-500 group-hover:bg-bio-500/[0.12]" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
            <span className="text-bio-400/90">System Architecture {project.number}</span>
            {project.featured && (
              <span className="flex items-center gap-1.5 rounded-full border border-brass-400/35 bg-brass-400/[0.08] px-2.5 py-1 text-brass-200">
                <Sparkles className="h-3 w-3" />
                Flagship Deployment
              </span>
            )}
          </div>

          <h3 className="display-serif mt-4 text-3xl font-medium leading-tight text-paper md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-bio-400/70 md:text-sm">
            {project.tagline}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-paper-dim"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div className="eyebrow mb-2 text-fog">Problem Statement</div>
              <p className="text-sm leading-relaxed text-paper-dim">{project.problem}</p>
            </div>
            <div className="rounded-xl border border-bio-400/20 bg-bio-500/[0.05] p-5">
              <div className="eyebrow mb-2 text-bio-400/90">Engineered Solution</div>
              <p className="text-sm leading-relaxed text-paper-dim">{project.solution}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="eyebrow mb-4 text-faint">Architecture & Infrastructure Topology</div>
            {project.number === "01" ? (
              <PipelineTopology />
            ) : (
              <ol className="grid gap-2 sm:grid-cols-2">
                {project.architecture.map((node, i) => (
                  <li
                    key={node}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#060b14]/90 px-3.5 py-2.5 font-mono text-[11px] text-paper-dim"
                  >
                    <span className="text-bio-400/80">{String(i + 1).padStart(2, "0")}</span>
                    <span>{node}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="mt-8">
            <div className="eyebrow mb-4 text-faint">Deployment Pipeline Execution</div>
            <div className="relative ml-2 border-l border-white/15 pl-6">
              {project.pipelineSteps.map((step) => (
                <div key={step.phase} className="relative pb-6 last:pb-0">
                  <span className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full border border-bio-400 bg-[#04070d] shadow-[0_0_10px_rgba(79,210,232,0.7)]" />
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bio-400/90">
                    {step.phase}
                  </div>
                  <div className="mt-1 font-display text-[15px] font-semibold text-paper">
                    {step.action}
                  </div>
                  <div className="mt-1 inline-block rounded border border-bio-400/25 bg-bio-500/[0.07] px-2 py-0.5 font-mono text-[10px] text-bio-300">
                    {step.tech}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-fog">{step.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <div className="eyebrow mb-3 text-faint">Tech stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-paper-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow mb-3 text-faint">Production Highlights</div>
              <ul className="flex flex-col gap-2">
                {project.highlights.map((hl) => (
                  <li key={hl} className="flex items-start gap-2 text-[13px] text-paper-dim">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass-400" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brass-400 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0805] transition-all hover:bg-brass-300 hover:shadow-[0_0_24px_rgba(201,163,95,0.45)]"
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
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-dim transition-all hover:border-brass-400/60 hover:text-brass-200"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Architecture
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
              Distributed Systems & <span className="display-serif italic font-medium text-brass-300">Workloads</span>
            </>
          }
          blurb="Production architectures, high-throughput financial analytics, and intelligent autonomous workflows engineered for resilience."
        />

        {/* Layer 03 — Agentic & AI Deck */}
        <Reveal className="mb-14">
          <div
            style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
            className="panel-glass-deep rounded-2xl p-6 md:p-8"
          >
            <div className="eyebrow mb-3 text-brass-300/80">{intelligence.eyebrow}</div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="display-serif text-2xl font-medium text-paper md:text-3xl">
                {intelligence.title}
              </h3>
              <p className="max-w-xl text-sm text-fog">{intelligence.description}</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {intelligence.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-bio-400/40 hover:shadow-[0_0_24px_rgba(79,210,232,0.18)]"
                >
                  <div className="font-display text-sm font-semibold text-paper">
                    {skill.name}
                  </div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-bio-400/80">
                    {skill.badge}
                  </div>
                  <p className="mt-2 font-mono text-[10px] leading-relaxed text-fog">
                    {skill.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mb-8 flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-brass-300/80">
            Production Systems // Flagship Deployments
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            {PROJECTS.length} systems in production
          </span>
        </Reveal>

        <div className="flex flex-col gap-8">
          {PROJECTS.map((p, i) => (
            <SystemCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <p className="sonar-note inline-block rounded-lg border border-dashed border-brass-400/30 bg-brass-400/[0.04] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brass-300/80">
            ◈ SYSTEM NOTE: The financial analytics engine computes ledger aggregations in-process with zero external API dependencies
          </p>
        </Reveal>
      </div>
    </section>
  );
}
