import { useState } from "react";
import { motion } from "motion/react";
import { Award, CheckCircle2, ShieldCheck } from "lucide-react";
import { CERTIFICATIONS, type Credential } from "@/data/portfolioData";
import { CertificateModal } from "./CertificateModal";
import { SECTION_REVEAL, STAGGER_CONTAINER, STAGGER_ITEM, VIEWPORT_REVEAL } from "@/lib/motion";

/* Staggered spatial offsets — gives a constellation feel without random chaos */
const SPATIAL_OFFSETS = [
  { x: 0, y: 0, float: "credential-float-1" },
  { x: 20, y: 8, float: "credential-float-2" },
  { x: -12, y: 4, float: "credential-float-3" },
  { x: 16, y: -4, float: "credential-float-1" },
  { x: -8, y: 10, float: "credential-float-2" },
  { x: 10, y: -6, float: "credential-float-3" },
];

export function CertificationsSection() {
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);

  return (
    <section
      id="credentials"
      className="relative py-24 md:py-32 px-6 md:px-10 max-w-[1440px] mx-auto border-t border-[rgba(230,240,245,0.08)]"
    >
      {/* Section Header */}
      <motion.div
        variants={SECTION_REVEAL}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_REVEAL}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#b7ff3c] mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Industry Accreditations</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#f1f6f7] tracking-tight">
            CERTIFIED <span className="text-[#b7ff3c]">CREDENTIALS.</span>
          </h2>
          <p className="text-[#b3c0c4] text-sm md:text-base max-w-2xl mt-4 font-sans leading-relaxed">
            Formally accredited competencies spanning Agentic AI, cloud engineering, data analytics,
            and applied foundation model workflows.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-3.5 py-1.5 rounded">
          <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
          <span>{CERTIFICATIONS.length} Verified Credentials</span>
        </div>
      </motion.div>

      {/* Credential Constellation */}
      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_REVEAL}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {CERTIFICATIONS.map((cert, i) => {
          const offset = SPATIAL_OFFSETS[i % SPATIAL_OFFSETS.length];
          return (
            <motion.button
              key={cert.id}
              variants={STAGGER_ITEM}
              onClick={() => setSelectedCredential(cert)}
              className={`${offset.float} text-left p-6 rounded-xl border border-[rgba(230,240,245,0.1)] bg-[#0e1317]/80 backdrop-blur-md flex flex-col justify-between hover:border-[#b7ff3c]/40 transition-all duration-300 hover:shadow-[0_0_24px_-6px_rgba(183,255,60,0.12)] hover:-translate-y-1 group`}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
              }}
              aria-label={`View ${cert.title} certificate from ${cert.issuer}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded bg-[#b7ff3c]/10 text-[#b7ff3c] border border-[#b7ff3c]/20 font-mono text-[9px] font-semibold uppercase">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-[10px] text-[#73848b]">
                    {cert.year}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#f1f6f7] group-hover:text-[#b7ff3c] transition-colors leading-snug">
                  {cert.title}
                </h3>

                <div className="font-mono text-[10px] text-[#38bdf8] uppercase tracking-wider mt-1 mb-3">
                  {cert.category}
                </div>

                <p className="text-xs text-[#b3c0c4] leading-relaxed font-sans">
                  {cert.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(230,240,245,0.06)] flex items-center justify-between text-[#73848b] font-mono text-[10px]">
                <span className="flex items-center gap-1 text-[#b7ff3c]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
                <span className="uppercase group-hover:text-[#b7ff3c] transition-colors">
                  {cert.certificateImage ? "View Certificate →" : cert.issuer}
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Certificate Detail Modal */}
      <CertificateModal
        credential={selectedCredential}
        onClose={() => setSelectedCredential(null)}
      />
    </section>
  );
}
