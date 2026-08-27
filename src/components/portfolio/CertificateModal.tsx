import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Credential } from "@/data/portfolioData";
import { MOTION } from "@/lib/motion";

interface CertificateModalProps {
  credential: Credential | null;
  onClose: () => void;
}

export function CertificateModal({ credential, onClose }: CertificateModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!credential) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    closeRef.current?.focus();

    // Prevent body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [credential, onClose]);

  return (
    <AnimatePresence>
      {credential && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${credential.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MOTION.interaction.duration }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[rgba(230,240,245,0.15)] bg-[#0e1317] shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: MOTION.component.duration, ease: MOTION.component.ease as unknown as number[] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(230,240,245,0.08)]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#b7ff3c]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b7ff3c]">
                  Verified Credential
                </span>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close certificate preview"
                className="p-2 rounded border border-[rgba(230,240,245,0.1)] bg-[#07090b] text-[#b3c0c4] hover:text-[#f1f6f7] hover:border-[#b7ff3c] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Certificate Image */}
            {credential.certificateImage && (
              <div className="px-6 pt-6">
                <div className="rounded-lg border border-[rgba(230,240,245,0.08)] bg-[#07090b] overflow-hidden">
                  <img
                    src={credential.certificateImage}
                    alt={`${credential.title} certificate`}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Details */}
            <div className="px-6 py-6 flex flex-col gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-[#b7ff3c]/10 text-[#b7ff3c] border border-[#b7ff3c]/20 font-mono text-[10px] font-semibold uppercase">
                  {credential.issuer}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#f1f6f7] leading-snug">
                {credential.title}
              </h3>

              <p className="text-sm text-[#b3c0c4] leading-relaxed font-sans">
                {credential.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded border border-[rgba(230,240,245,0.06)] bg-[#07090b]">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#73848b]">Issued</div>
                  <div className="font-mono text-xs text-[#f1f6f7] font-semibold mt-1">{credential.issuedDate}</div>
                </div>
                <div className="p-3 rounded border border-[rgba(230,240,245,0.06)] bg-[#07090b]">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#73848b]">Category</div>
                  <div className="font-mono text-xs text-[#38bdf8] font-semibold mt-1">{credential.category}</div>
                </div>
                {credential.provider && (
                  <div className="col-span-2 p-3 rounded border border-[rgba(230,240,245,0.06)] bg-[#07090b]">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#73848b]">Provider</div>
                    <div className="font-mono text-xs text-[#f1f6f7] font-semibold mt-1">{credential.provider}</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
