import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Github,
  Layers,
  Shield,
  Workflow,
  Zap,
} from "lucide-react";
import { PROJECTS } from "@/data/portfolioData";
import { MOTION, SECTION_REVEAL, VIEWPORT_REVEAL } from "@/lib/motion";

export function ProjectCaseStudies() {
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0];

  return (
    <motion.section
      id="work"
      variants={SECTION_REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_REVEAL}
      className="relative py-24 md:py-32 px-6 md:px-10 max-w-[1440px] mx-auto border-t border-[rgba(230,240,245,0.08)]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#b7ff3c] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Case Studies & Systems In Action</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#f1f6f7] tracking-tight">
            SELECTED <span className="text-[#b7ff3c]">WORK.</span>
          </h2>
          <p className="text-[#b3c0c4] text-sm md:text-base max-w-2xl mt-4 font-sans leading-relaxed">
            Detailed engineering deep-dives demonstrating Infrastructure as Code, container orchestration, CI/CD
            delivery pipelines, and full-stack software systems.
          </p>
        </div>

        {/* Project Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-lg border border-[rgba(230,240,245,0.1)] bg-[#0e1317]">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              onClick={() => {
                setActiveProjectId(project.id);
                setActiveStepIndex(0);
              }}
              aria-pressed={activeProject.id === project.id}
              className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-wider transition-all ${
                activeProject.id === project.id
                  ? "bg-[#b7ff3c] text-[#07090b] font-bold shadow-sm"
                  : "text-[#b3c0c4] hover:text-[#f1f6f7] hover:bg-white/5"
              }`}
            >
              <span>{project.number} // {project.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Case Study Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: MOTION.component.duration }}
          className="rounded-2xl border border-[rgba(230,240,245,0.12)] bg-[#0e1317]/90 backdrop-blur-md p-6 sm:p-10 shadow-2xl"
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-[rgba(230,240,245,0.08)]">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs text-[#b7ff3c] uppercase tracking-widest mb-2">
                <span>PROJECT {activeProject.number}</span>
                <span>·</span>
                <span className="text-[#38bdf8]">{activeProject.tagline}</span>
              </div>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#f1f6f7] tracking-tight">
                {activeProject.title}
              </h3>
            </div>

            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[rgba(230,240,245,0.15)] bg-[#07090b] font-mono text-xs text-[#f1f6f7] hover:border-[#b7ff3c] hover:text-[#b7ff3c] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Problem / Solution */}
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="p-5 rounded-xl border border-[rgba(230,240,245,0.06)] bg-[#07090b]">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#ff5a5f] mb-2">
                <Shield className="w-3.5 h-3.5" />
                <span>01 // THE CHALLENGE</span>
              </div>
              <p className="text-sm sm:text-base text-[#b3c0c4] leading-relaxed font-sans">
                {activeProject.problem}
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[rgba(230,240,245,0.06)] bg-[#07090b]">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#b7ff3c] mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>02 // THE ARCHITECTURAL SOLUTION</span>
              </div>
              <p className="text-sm sm:text-base text-[#b3c0c4] leading-relaxed font-sans">
                {activeProject.solution}
              </p>
            </div>
          </div>

          {/* Pipeline Runner */}
          <div className="my-10 p-6 rounded-xl border border-[#b7ff3c]/30 bg-[#07090b]/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-[rgba(230,240,245,0.08)]">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#b7ff3c]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#f1f6f7] font-semibold">
                  SYSTEM EXECUTION PIPELINE
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#73848b]">
                Click any stage to inspect
              </span>
            </div>

            {/* Pipeline Step Progress */}
            <div className="hidden sm:flex items-center justify-between mb-6 px-2">
              {activeProject.pipelineSteps.map((step, idx) => (
                <div key={step.phase} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => setActiveStepIndex(idx)}
                    aria-label={`Jump to pipeline stage ${step.phase}`}
                    aria-pressed={activeStepIndex === idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 shrink-0 ${
                      activeStepIndex === idx
                        ? "bg-[#b7ff3c] shadow-[0_0_8px_rgba(183,255,60,0.5)]"
                        : activeStepIndex > idx
                        ? "bg-[#b7ff3c]/40"
                        : "bg-[#1a2028] border border-[rgba(230,240,245,0.15)]"
                    }`}
                  />
                  {idx < activeProject.pipelineSteps.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-1 transition-colors duration-300 ${
                        activeStepIndex > idx ? "bg-[#b7ff3c]/40" : "bg-[rgba(230,240,245,0.08)]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Stage Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
              {activeProject.pipelineSteps.map((step, idx) => (
                <button
                  key={step.phase}
                  onClick={() => setActiveStepIndex(idx)}
                  aria-pressed={activeStepIndex === idx}
                  className={`p-3 rounded border text-left transition-all ${
                    activeStepIndex === idx
                      ? "bg-[#151d23] border-[#b7ff3c] shadow-[0_0_15px_-4px_rgba(183,255,60,0.3)]"
                      : "bg-[#0e1317] border-[rgba(230,240,245,0.06)] hover:border-[rgba(230,240,245,0.2)]"
                  }`}
                >
                  <div className="font-mono text-[9px] text-[#b7ff3c]">{step.phase.split("/")[0]}</div>
                  <div className="font-display font-semibold text-xs text-[#f1f6f7] mt-1 truncate">{step.tech}</div>
                </button>
              ))}
            </div>

            {/* Active Step Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIndex}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: MOTION.interaction.duration }}
                className="p-5 rounded-lg border border-[rgba(230,240,245,0.08)] bg-[#0e1317]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs text-[#38bdf8] uppercase tracking-wider font-semibold">
                    {activeProject.pipelineSteps[activeStepIndex]?.phase}
                  </span>
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-[#b7ff3c]/10 text-[#b7ff3c] border border-[#b7ff3c]/20">
                    TECH: {activeProject.pipelineSteps[activeStepIndex]?.tech}
                  </span>
                </div>
                <h4 className="font-display font-bold text-lg text-[#f1f6f7] mb-2">
                  {activeProject.pipelineSteps[activeStepIndex]?.action}
                </h4>
                <p className="text-sm text-[#b3c0c4] leading-relaxed font-sans">
                  {activeProject.pipelineSteps[activeStepIndex]?.details}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Highlights & Tech */}
          <div className="grid lg:grid-cols-12 gap-8 pt-6 border-t border-[rgba(230,240,245,0.08)]">
            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#73848b] mb-4">
                VERIFIED ENGINEERING HIGHLIGHTS
              </div>
              <div className="flex flex-col gap-2.5">
                {activeProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#b7ff3c] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#cbd5e1] leading-relaxed font-sans">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#73848b] mb-4">
                TECHNOLOGY STACK
              </div>
              <div className="flex flex-wrap gap-2">
                {activeProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded bg-[#07090b] border border-[rgba(230,240,245,0.08)] font-mono text-[10px] text-[#b3c0c4]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
