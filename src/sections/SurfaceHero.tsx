import { motion } from "motion/react";
import { ArrowDown, ChevronDown, Fish, Radar, Ship } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import portrait from "@/assets-portrait.jpg";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const MANIFEST = [
  { label: "Education", value: "B.Tech CSE @ MIET", sub: "2024 — 2028" },
  { label: "Cloud & IaC", value: "AWS · Terraform", sub: "Docker · K8s · Linux" },
  { label: "Certifications", value: "Oracle & OpenAI", sub: "Agentic AI Certified" },
];

export function SurfaceHero() {
  return (
    <section id="surface" className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 pb-16 pt-28 md:px-10 md:pt-32">
        {/* Telemetry strip */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-faint"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-brass-400 opacity-60" />
              <span className="h-2 w-2 rounded-full bg-brass-400" />
            </span>
            <span className="font-semibold text-brass-300">[ Surface — 0 M ]</span>
            <span className="hidden sm:inline">::</span>
            <span className="hidden sm:inline">AWS · K8S · TERRAFORM · AGENTIC AI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">Meerut, IN [{PROFILE.location.coords}]</span>
            <span className="hidden md:inline">MIET CS 2024–2028</span>
          </div>
        </motion.div>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-12 lg:gap-8">
          {/* Left — identity */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } }}
            className="lg:col-span-7"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-brass-400/25 bg-brass-400/[0.06] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-brass-300 backdrop-blur-sm"
            >
              <Ship className="h-3 w-3" />
              <span>Expedition Log // DS-01</span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } }}
              className="display-serif text-6xl font-light leading-[0.95] sm:text-7xl md:text-8xl text-paper"
            >
              Darsh
              <br />
              <span className="bg-gradient-to-r from-brass-200 via-brass-300 to-brass-500 bg-clip-text font-medium italic text-transparent">
                Soam
              </span>
            </motion.h1>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              className="mt-6 flex items-center gap-4"
            >
              <span className="h-px w-10 bg-brass-400/50" />
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper-dim sm:text-sm">
                Cloud & DevOps Engineer
              </p>
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              className="mt-5 max-w-xl text-base leading-relaxed text-fog sm:text-lg"
            >
              {PROFILE.subheadline} This is the descent — scroll to dive through every layer
              of the stack, down to the black box.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => scrollTo("sunlight")}
                className="group inline-flex items-center gap-2.5 rounded-full bg-brass-400 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0805] shadow-[0_10px_36px_-10px_rgba(201,163,95,0.55)] transition-all hover:bg-brass-300 hover:shadow-[0_10px_44px_-8px_rgba(201,163,95,0.7)]"
              >
                <span>Begin descent</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </button>
              <button
                onClick={() => scrollTo("midnight")}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper-dim backdrop-blur-sm transition-all hover:border-brass-400/50 hover:text-paper"
              >
                <Fish className="h-3.5 w-3.5" />
                <span>View discoveries</span>
              </button>
              <button
                onClick={() => scrollTo("hadal")}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-fog transition-all hover:border-white/25 hover:text-paper"
              >
                <Radar className="h-3.5 w-3.5" />
                <span>Black box</span>
              </button>
            </motion.div>

            {/* Dive manifest */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              className="mt-10 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3"
            >
              {MANIFEST.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 backdrop-blur-sm transition-colors hover:border-brass-400/35"
                >
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                    {m.label}
                  </div>
                  <div className="mt-1 font-mono text-xs font-semibold text-paper">
                    {m.value}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-fog">{m.sub}</div>
                </div>
              ))}
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="sonar-note mt-6 inline-block rounded-lg border border-dashed border-brass-400/30 bg-brass-400/[0.04] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brass-300/80 backdrop-blur-sm"
            >
              ◈ Sonar note: the water gets darker from here — ping anytime (right rail)
            </motion.p>
          </motion.div>

          {/* Right — porthole portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
            className="flex flex-col items-center lg:col-span-5"
          >
            <div className="animate-float-slow">
              <div className="porthole-ring rounded-full p-3 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)]">
                <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-[#0a0d14] sm:h-80 sm:w-80">
                  <img
                    src={portrait}
                    alt="Darsh Soam"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#04070d]/45 via-transparent to-white/[0.06]" />
                </div>
              </div>
            </div>
            <div className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
              Expedition lead — Darsh Soam
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
              Status: submerged
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => scrollTo("sunlight")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mx-auto flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-faint"
          aria-label="Scroll to descend"
        >
          <span>Scroll to descend</span>
          <ChevronDown className="h-4 w-4 animate-descend-hint" />
        </motion.button>
      </div>
    </section>
  );
}
