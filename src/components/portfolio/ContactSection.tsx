import { useState } from "react";
import { motion } from "motion/react";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Send,
} from "lucide-react";
import { PROFILE } from "@/data/portfolioData";
import { SECTION_REVEAL, STAGGER_CONTAINER, STAGGER_ITEM, VIEWPORT_REVEAL } from "@/lib/motion";

/**
 * Formspree form ID — set VITE_FORMSPREE_FORM_ID in .env to activate delivery.
 * Without it the form reports an honest error instead of faking success.
 */
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined;

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const loading = status === "sending";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    if (!FORMSPREE_FORM_ID) {
      setStatus("error");
      setErrorMessage(
        "This form isn't connected to a delivery endpoint yet. Please email me directly instead."
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `Portfolio contact from ${formState.name || formState.email}`,
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { errors?: { message: string }[] }
          | null;
        throw new Error(body?.errors?.[0]?.message ?? `Delivery failed (HTTP ${res.status}).`);
      }

      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Network error — the message was not sent."
      );
    }
  };

  return (
    <motion.section
      id="connect"
      variants={SECTION_REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_REVEAL}
      className="relative py-24 md:py-36 px-6 md:px-10 max-w-[1440px] mx-auto border-t border-[rgba(230,240,245,0.08)]"
    >
      <div className="absolute inset-0 pointer-events-none radial-glow opacity-50" />

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#b7ff3c] mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Pipeline Complete // Initiate Conversation</span>
            </div>

            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#f1f6f7] tracking-tight leading-[0.95] mb-6">
              SYSTEM READY. <br />
              <span className="text-[#b7ff3c]">LET'S CONNECT.</span>
            </h2>

            <p className="text-[#b3c0c4] text-base leading-relaxed font-sans max-w-lg mb-8">
              Open to entry-level Cloud Engineer, DevOps Engineer, Platform Engineer, or SRE opportunities.
              Whether you want to discuss AWS infrastructure, CI/CD automation, or Agentic AI systems, let's talk.
            </p>
          </div>

          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_REVEAL}
            className="grid sm:grid-cols-2 gap-3 mt-4"
          >
            <motion.a
              variants={STAGGER_ITEM}
              href={`mailto:${PROFILE.email}`}
              className="p-4 rounded-xl border border-[rgba(230,240,245,0.1)] bg-[#0e1317]/80 hover:border-[#b7ff3c] transition-all group"
            >
              <div className="flex items-center justify-between text-[#73848b] font-mono text-[10px] mb-2">
                <span>EMAIL DIRECT</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#b7ff3c] transition-colors" />
              </div>
              <div className="font-display font-bold text-sm text-[#f1f6f7] truncate group-hover:text-[#b7ff3c] transition-colors">
                {PROFILE.email}
              </div>
            </motion.a>

            <motion.a
              variants={STAGGER_ITEM}
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl border border-[rgba(230,240,245,0.1)] bg-[#0e1317]/80 hover:border-[#b7ff3c] transition-all group"
            >
              <div className="flex items-center justify-between text-[#73848b] font-mono text-[10px] mb-2">
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#b7ff3c] transition-colors" />
              </div>
              <div className="font-display font-bold text-sm text-[#f1f6f7] group-hover:text-[#b7ff3c] transition-colors">
                darsh-soam
              </div>
            </motion.a>

            <motion.a
              variants={STAGGER_ITEM}
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl border border-[rgba(230,240,245,0.1)] bg-[#0e1317]/80 hover:border-[#b7ff3c] transition-all group"
            >
              <div className="flex items-center justify-between text-[#73848b] font-mono text-[10px] mb-2">
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#b7ff3c] transition-colors" />
              </div>
              <div className="font-display font-bold text-sm text-[#f1f6f7] group-hover:text-[#b7ff3c] transition-colors">
                @darshsoam07
              </div>
            </motion.a>

            <motion.div
              variants={STAGGER_ITEM}
              className="p-4 rounded-xl border border-[rgba(230,240,245,0.1)] bg-[#0e1317]/80"
            >
              <div className="flex items-center justify-between text-[#73848b] font-mono text-[10px] mb-2">
                <span>LOCATION</span>
                <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
              </div>
              <div className="font-display font-bold text-sm text-[#f1f6f7]">
                {PROFILE.location.short}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-6">
          <div className="p-6 sm:p-8 rounded-2xl border border-[rgba(230,240,245,0.12)] bg-[#0e1317]/90 backdrop-blur-md shadow-2xl">
            <div className="font-mono text-xs uppercase tracking-wider text-[#b7ff3c] mb-6 flex items-center gap-2">
              <Send className="w-3.5 h-3.5" />
              <span>Transmit Secure Message</span>
            </div>

            {status === "sent" ? (
              <div className="p-6 rounded-xl border border-[#b7ff3c]/40 bg-[#b7ff3c]/10 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-[#b7ff3c]" />
                <h4 className="font-display font-bold text-lg text-[#f1f6f7]">Message Transmitted</h4>
                <p className="text-xs text-[#b3c0c4] font-sans">
                  Thank you! Your communication has been dispatched. I will respond shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 px-4 py-2 rounded bg-[#07090b] border border-[rgba(230,240,245,0.1)] font-mono text-xs text-[#f1f6f7] hover:border-[#b7ff3c]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#73848b] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Engineering Leader / Recruiter"
                    className="w-full px-4 py-3 rounded-lg bg-[#07090b] border border-[rgba(230,240,245,0.1)] font-sans text-sm text-[#f1f6f7] placeholder-[#73848b]/50 focus:outline-none focus:border-[#b7ff3c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#73848b] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="contact@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#07090b] border border-[rgba(230,240,245,0.1)] font-sans text-sm text-[#f1f6f7] placeholder-[#73848b]/50 focus:outline-none focus:border-[#b7ff3c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#73848b] mb-1.5">
                    Transmission Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your project, role, or collaboration idea..."
                    className="w-full px-4 py-3 rounded-lg bg-[#07090b] border border-[rgba(230,240,245,0.1)] font-sans text-sm text-[#f1f6f7] placeholder-[#73848b]/50 focus:outline-none focus:border-[#b7ff3c] transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-[#ff5a5f]/40 bg-[#ff5a5f]/10"
                  >
                    <AlertTriangle className="w-4 h-4 text-[#ff5a5f] shrink-0 mt-0.5" />
                    <div className="font-sans text-xs text-[#f1f6f7] leading-relaxed">
                      {errorMessage}{" "}
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="font-mono text-[#b7ff3c] underline underline-offset-2 hover:no-underline"
                      >
                        {PROFILE.email}
                      </a>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 rounded bg-[#b7ff3c] text-[#07090b] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#b7ff3c]/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_-4px_rgba(183,255,60,0.3)] disabled:opacity-50"
                >
                  {loading ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
