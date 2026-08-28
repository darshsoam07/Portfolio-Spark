import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cpu } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { MOTION, SECTION_REVEAL, STAGGER_CONTAINER, STAGGER_ITEM, VIEWPORT_REVEAL } from "@/lib/motion";

export function TechStackSection() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(SKILL_CATEGORIES[0].id);

  const activeCategory =
    SKILL_CATEGORIES.find((cat) => cat.id === activeCategoryId) || SKILL_CATEGORIES[0];

  return (
    <motion.section
      id="stack"
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
            <Cpu className="w-3.5 h-3.5" />
            <span>Layered Systems Architecture</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#f1f6f7] tracking-tight">
            ENGINEERING <span className="text-[#b7ff3c]">STACK.</span>
          </h2>
          <p className="text-[#b3c0c4] text-sm md:text-base max-w-2xl mt-4 font-sans leading-relaxed">
            Organized hierarchically across system tiers — from cloud primitives and declarative infrastructure
            code to container orchestration, backend APIs, and agentic workflows.
          </p>
        </div>
      </div>

      {/* Layer Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
        {SKILL_CATEGORIES.map((category) => {
          const isSelected = activeCategory.id === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategoryId(category.id)}
              aria-pressed={isSelected}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                isSelected
                  ? "bg-[#151d23] border-[#b7ff3c] shadow-[0_0_20px_-6px_rgba(183,255,60,0.25)]"
                  : "bg-[#0e1317] border-[rgba(230,240,245,0.08)] hover:border-[rgba(230,240,245,0.2)] hover:bg-[#12181e]"
              }`}
            >
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#73848b]">
                {category.eyebrow.split("//")[0]}
              </div>
              <div className="font-display font-bold text-sm sm:text-base text-[#f1f6f7] mt-1">
                {category.title}
              </div>
              <div className="font-mono text-[10px] text-[#b7ff3c] mt-2">
                {category.skills.length} primitives
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: MOTION.component.duration }}
          className="p-6 sm:p-10 rounded-2xl border border-[rgba(230,240,245,0.1)] bg-[#0e1317]/80 backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[rgba(230,240,245,0.08)]">
            <div>
              <div className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest mb-1">
                {activeCategory.eyebrow}
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f1f6f7]">
                {activeCategory.title}
              </h3>
            </div>
            <p className="text-sm text-[#b3c0c4] max-w-md font-sans">
              {activeCategory.description}
            </p>
          </div>

          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 gap-4"
          >
            {activeCategory.skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={STAGGER_ITEM}
                className="p-5 rounded-xl border border-[rgba(230,240,245,0.06)] bg-[#07090b] hover:border-[#b7ff3c]/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-display font-bold text-base text-[#f1f6f7]">
                    {skill.name}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded bg-[#b7ff3c]/10 text-[#b7ff3c] border border-[#b7ff3c]/20 font-mono text-[9px] uppercase tracking-wider font-semibold">
                    {skill.badge}
                  </span>
                </div>
                <p className="font-mono text-xs text-[#73848b] leading-relaxed">
                  {skill.details}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
