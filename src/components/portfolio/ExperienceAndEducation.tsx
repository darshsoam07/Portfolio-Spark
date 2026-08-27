import { motion } from "motion/react";
import { GraduationCap, Briefcase, MapPin, CheckCircle } from "lucide-react";
import { EDUCATION, EXPERIENCE_TRAINING } from "@/data/portfolioData";
import { SECTION_REVEAL, STAGGER_CONTAINER, STAGGER_ITEM, VIEWPORT_REVEAL } from "@/lib/motion";

export function ExperienceAndEducation() {
  return (
    <motion.section
      id="journey"
      variants={SECTION_REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_REVEAL}
      className="relative py-24 md:py-32 px-6 md:px-10 max-w-[1440px] mx-auto border-t border-[rgba(230,240,245,0.08)]"
    >
      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#b7ff3c] mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic & Applied Trajectory</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#f1f6f7] tracking-tight">
          JOURNEY & <span className="text-[#b7ff3c]">EDUCATION.</span>
        </h2>
        <p className="text-[#b3c0c4] text-sm md:text-base max-w-2xl mt-4 font-sans leading-relaxed">
          Grounding theoretical computer science fundamentals into hands-on cloud systems, automation pipelines,
          and virtual engineering experiences.
        </p>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Education */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_REVEAL}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#38bdf8] pb-3 border-b border-[rgba(230,240,245,0.08)]">
            <GraduationCap className="w-4 h-4" />
            <span>Formal Education</span>
          </div>

          {EDUCATION.map((edu) => (
            <motion.div
              key={edu.institution}
              variants={STAGGER_ITEM}
              className="p-6 rounded-xl border border-[rgba(230,240,245,0.1)] bg-[#0e1317]/80 backdrop-blur-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[#b7ff3c]/10 text-[#b7ff3c] border border-[#b7ff3c]/20 font-mono text-[10px] font-semibold uppercase">
                  {edu.period}
                </span>
                <span className="font-mono text-[10px] text-[#73848b] uppercase">{edu.status}</span>
              </div>

              <h3 className="font-display font-bold text-xl text-[#f1f6f7] mt-2">{edu.degree}</h3>
              <div className="font-sans text-sm text-[#38bdf8] font-medium mt-1">{edu.institution}</div>

              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#73848b] mt-2">
                <MapPin className="w-3 h-3" />
                <span>{edu.location}</span>
              </div>

              <div className="mt-5 pt-4 border-t border-[rgba(230,240,245,0.06)]">
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#73848b] mb-2">
                  Key Coursework & Focus Areas
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-0.5 rounded bg-[#07090b] border border-[rgba(230,240,245,0.08)] font-mono text-[10px] text-[#b3c0c4]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_REVEAL}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#b7ff3c] pb-3 border-b border-[rgba(230,240,245,0.08)]">
            <Briefcase className="w-4 h-4" />
            <span>Applied Experience & Training</span>
          </div>

          {EXPERIENCE_TRAINING.map((exp) => (
            <motion.div
              key={exp.title}
              variants={STAGGER_ITEM}
              className="p-6 rounded-xl border border-[rgba(230,240,245,0.1)] bg-[#0e1317]/80 backdrop-blur-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 font-mono text-[10px] font-semibold uppercase">
                  {exp.year}
                </span>
                <span className="font-mono text-[10px] text-[#b7ff3c] uppercase">{exp.badge}</span>
              </div>

              <h3 className="font-display font-bold text-xl text-[#f1f6f7] mt-2">{exp.title}</h3>
              <div className="font-sans text-sm text-[#73848b] font-medium mt-1">{exp.issuer}</div>

              <p className="text-sm text-[#b3c0c4] leading-relaxed font-sans mt-4">{exp.summary}</p>

              <div className="mt-5 pt-4 border-t border-[rgba(230,240,245,0.06)] flex flex-col gap-2">
                {exp.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#b7ff3c] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#cbd5e1] leading-relaxed font-sans">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
