import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, GraduationCap, ScrollText, X } from "lucide-react";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE_TRAINING, type Credential } from "@/data/portfolio";
import { ZoneHeader } from "@/components/ZoneHeader";
import { Reveal } from "@/components/Reveal";

function ArtifactLightbox({ cert, onClose }: { cert: Credential | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-label={`Certificate: ${cert.title}`}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="panel-glass max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="eyebrow text-brass-300">Recovered artifact // {cert.year}</div>
              <button
                onClick={onClose}
                className="rounded-full border border-white/15 p-1.5 text-paper-dim transition-colors hover:border-brass-300/60 hover:text-brass-200"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {cert.certificateImage && (
              <img
                src={cert.certificateImage}
                alt={cert.title}
                className="mt-4 w-full rounded-xl border border-white/15 object-cover"
              />
            )}
            <h3 className="mt-5 font-display text-xl font-bold text-paper md:text-2xl">
              {cert.title}
            </h3>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brass-200">
              {cert.issuer} · {cert.issuedDate}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-paper-dim">{cert.description}</p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-emerald-300">
              <BadgeCheck className="h-4 w-4" />
              Verified credential
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AbyssalZone() {
  const [active, setActive] = useState<Credential | null>(null);

  return (
    <section id="abyssal" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <ZoneHeader
          zoneId="abyssal"
          title={
            <>
              The Abyssal <span className="display-serif italic font-medium text-brass-300">Plain</span>
            </>
          }
          blurb="Four thousand meters. Crushing pressure, near-freezing water — and the most stable ground on the expedition. Training, education, and verified credentials, recovered intact."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Descent log — experience */}
          <div>
            <Reveal className="mb-6 flex items-center gap-2.5">
              <ScrollText className="h-4 w-4 text-brass-300" />
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-brass-200/80">
                Descent log — applied experience
              </h3>
            </Reveal>
            <div className="flex flex-col gap-5">
              {EXPERIENCE_TRAINING.map((exp) => (
                <Reveal key={exp.title}>
                  <div className="panel-glass-deep rounded-2xl p-6 transition-colors hover:border-brass-400/30 md:p-7">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded bg-brass-400/15 px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.15em] text-brass-200">
                        {exp.year}
                      </span>
                      <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-paper-dim">
                        {exp.badge}
                      </span>
                    </div>
                    <h4 className="mt-3 font-display text-xl font-bold text-paper">
                      {exp.title}
                    </h4>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
                      {exp.issuer}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-paper-dim">{exp.summary}</p>
                    <ul className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                      {exp.keyPoints.map((kp) => (
                        <li key={kp} className="flex items-start gap-2.5 text-[13px] text-fog">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-400/70" />
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Academic record */}
            <Reveal className="mb-6 mt-10 flex items-center gap-2.5">
              <GraduationCap className="h-4 w-4 text-brass-300" />
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-brass-200/80">
                Academic record
              </h3>
            </Reveal>
            <div className="flex flex-col gap-5">
              {EDUCATION.map((edu) => (
                <Reveal key={edu.institution}>
                  <div className="panel-glass-deep rounded-2xl p-6 md:p-7">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-300">
                      {edu.period} · {edu.status}
                    </div>
                    <h4 className="mt-2 font-display text-lg font-bold text-paper">
                      {edu.degree}
                    </h4>
                    <div className="mt-1 text-sm text-paper-dim">{edu.institution}</div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {edu.coursework.map((c) => (
                        <span
                          key={c}
                          className="rounded bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-fog"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Recovered artifacts — certifications */}
          <div>
            <Reveal className="mb-6 flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-brass-200/80">
                Recovered artifacts — certifications
              </h3>
              <span className="font-mono text-[10px] text-paper0">
                click to inspect
              </span>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {CERTIFICATIONS.map((cert, i) => (
                <Reveal key={cert.id} delay={(i % 2) * 0.08} className="h-full">
                  <button
                    onClick={() => setActive(cert)}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#04070d]/80 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brass-400/40 hover:shadow-[0_18px_44px_-16px_rgba(201,163,95,0.3)]"
                  >
                    {cert.certificateImage ? (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={cert.certificateImage}
                          alt={cert.title}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[#0a1220] to-[#04070d]">
                        <BadgeCheck className="h-12 w-12 text-brass-300/50" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-300">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified · {cert.year}
                      </div>
                      <div className="mt-2 font-display text-[15px] font-semibold leading-snug text-paper">
                        {cert.title}
                      </div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper0">
                        {cert.issuer}
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ArtifactLightbox cert={active} onClose={() => setActive(null)} />
    </section>
  );
}
