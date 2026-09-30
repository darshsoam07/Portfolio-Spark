import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Terminal, Zap } from "lucide-react";
import { PROFILE } from "@/data/portfolioData";
import darshPortrait from "@/assets/darsh.jpeg";
import { MOTION, STAGGER_CONTAINER, STAGGER_ITEM } from "@/lib/motion";

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMousePos({ x, y });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="signal"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative min-h-screen w-full pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-10 max-w-[1440px] mx-auto flex flex-col justify-between overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none radial-glow opacity-70" />

      {/* Top Telemetry Strip — entrance choreography */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: MOTION.component.duration, delay: 0.1 }}
        className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#73848b] pb-6 border-b border-[rgba(230,240,245,0.08)]"
      >
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#b7ff3c] animate-pulse" />
          <span className="text-[#f1f6f7] font-semibold">[ SYSTEM READY ]</span>
          <span className="hidden sm:inline text-[#73848b]">::</span>
          <span className="hidden sm:inline">AWS · K8S · TERRAFORM · AGENTIC AI</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#38bdf8] font-medium">MEERUT, IN [{PROFILE.location.coords}]</span>
          <span className="hidden md:inline">MIET CS 2024–2028</span>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center py-10 my-auto">
        {/* Left Column — staggered entrance */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={STAGGER_ITEM}
            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-[10px] uppercase tracking-[0.2em] mb-6 w-max"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>INFRASTRUCTURE &amp; AUTOMATION // DEV-OPS</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={STAGGER_ITEM}
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#f1f6f7] leading-[0.95] mb-6"
          >
            DARSH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f1f6f7] via-[#cbd5e1] to-[#b7ff3c]">
              SOAM
            </span>
          </motion.h1>

          {/* Role */}
          <motion.h2
            variants={STAGGER_ITEM}
            className="font-mono text-base sm:text-lg text-[#b7ff3c] font-medium tracking-wide mb-4"
          >
            Cloud & DevOps Engineer <span className="text-[#73848b]">|</span> Infrastructure &
            Automation Enthusiast
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={STAGGER_ITEM}
            className="text-[#b3c0c4] text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-sans font-normal"
          >
            Architecting deterministic AWS environments, production GitOps delivery pipelines, and resilient Kubernetes clusters at the intersection of infrastructure and intelligent systems.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={STAGGER_ITEM} className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={() => scrollTo("systems")}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded bg-[#b7ff3c] text-[#07080a] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#b7ff3c]/90 transition-all shadow-[0_0_20px_-5px_rgba(183,255,60,0.4)]"
            >
              <span>Explore Systems Map</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("work")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded border border-[rgba(230,240,245,0.15)] bg-[#0f1216] text-[#f1f6f7] font-mono text-xs uppercase tracking-widest hover:border-[#b7ff3c] hover:text-[#b7ff3c] transition-all"
            >
              <span>View Case Studies</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => scrollTo("terminal")}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded border border-[rgba(230,240,245,0.1)] bg-[#07080a] text-[#73848b] font-mono text-xs uppercase tracking-widest hover:text-[#38bdf8] hover:border-[#38bdf8]/40 transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>CLI</span>
            </button>
          </motion.div>

          {/* Spec Grid */}
          <motion.div
            variants={STAGGER_ITEM}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[rgba(230,240,245,0.08)]"
          >
            <div className="p-3 rounded border border-[rgba(230,240,245,0.06)] bg-[#0f1216]/50">
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#73848b]">
                Education
              </div>
              <div className="font-mono text-xs text-[#f1f6f7] font-semibold mt-1">
                B.Tech CSE @ MIET
              </div>
              <div className="font-mono text-[9px] text-[#38bdf8] mt-0.5">2024 — 2028</div>
            </div>
            <div className="p-3 rounded border border-[rgba(230,240,245,0.06)] bg-[#0f1216]/50">
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#73848b]">
                Cloud & IaC
              </div>
              <div className="font-mono text-xs text-[#f1f6f7] font-semibold mt-1">
                AWS & Terraform
              </div>
              <div className="font-mono text-[9px] text-[#b7ff3c] mt-0.5">Docker · K8s · Linux</div>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 rounded border border-[rgba(230,240,245,0.06)] bg-[#0f1216]/50">
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#73848b]">
                Certifications
              </div>
              <div className="font-mono text-xs text-[#f1f6f7] font-semibold mt-1">
                Oracle & OpenAI
              </div>
              <div className="font-mono text-[9px] text-[#38bdf8] mt-0.5">Agentic AI Certified</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Engineering Specimen Frame */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: MOTION.cinematic.duration, delay: 0.3 }}
        >
          <div
            className="group relative w-full max-w-[420px] aspect-[4/5] rounded-2xl bg-[#080c14]/90 border border-amber-500/20 p-3 shadow-2xl overflow-hidden transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
              backgroundImage:
                "radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.15), transparent 70%)",
            }}
          >
            {/* Corner Reticle Brackets */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-500/60 z-20 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-500/60 z-20 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-500/60 z-20 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-500/60 z-20 pointer-events-none" />

            {/* Specimen HUD Top Labels */}
            <div className="absolute top-3 left-4 font-mono text-[9px] uppercase tracking-wider text-zinc-500 z-20">
              SPECIMEN // NODE-01
            </div>
            <div className="absolute top-3 right-4 font-mono text-[9px] uppercase tracking-wider text-amber-400 z-20">
              SYS.STATUS: HEALTHY
            </div>

            {/* Engineering Specimen Portrait Container */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#05070a]">
              <img
                src={darshPortrait}
                alt="Darsh Soam"
                className="h-full w-full object-cover object-center rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Bottom Diagnostic Pill */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-amber-400 bg-black/75 px-3 py-1.5 rounded border border-amber-500/30 backdrop-blur-md z-30">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DARSH SOAM // B.TECH CSE
                </span>
                <span className="text-zinc-400">ACTIVE NODE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lifecycle Strip — scroll reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: MOTION.section.duration }}
        className="pt-8 border-t border-[rgba(230,240,245,0.08)]"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#73848b]">
            SYSTEM LIFECYCLE PARADIGM
          </span>
          <span className="font-mono text-[10px] text-[#b7ff3c] uppercase tracking-wider">
            7 STAGES OF ENGINEERING
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {PROFILE.philosophy.map((item) => (
            <div
              key={item.step}
              className="p-2.5 rounded border border-[rgba(230,240,245,0.06)] bg-[#0f1216]/60 hover:border-[#b7ff3c]/40 transition-colors"
            >
              <div className="font-mono text-[9px] text-[#b7ff3c]">{item.step}</div>
              <div className="font-display font-semibold text-xs text-[#f1f6f7] mt-0.5">
                {item.name}
              </div>
              <div className="font-mono text-[8px] text-[#73848b] truncate mt-0.5">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
