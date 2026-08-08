import { useState } from "react";
import { motion } from "motion/react";
import { Check, Send } from "lucide-react";

// [PLACEHOLDER] contact form destination — UI stub only, no backend wired yet
export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="max-w-2xl mx-auto text-left space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Name</span>
          <input
            required
            name="name"
            className="mt-2 w-full bg-card border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</span>
          <input
            required
            type="email"
            name="email"
            className="mt-2 w-full bg-card border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Message</span>
        <textarea
          required
          name="message"
          rows={5}
          className="mt-2 w-full bg-card border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
          placeholder="What are you building?"
        />
      </label>

      <button
        type="submit"
        disabled={sent}
        className="px-7 py-4 bg-primary text-primary-foreground rounded-full text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-80"
      >
        {sent ? (
          <>
            <Check className="w-4 h-4" /> Message received
          </>
        ) : (
          <>
            <Send className="w-4 h-4" /> Send message
          </>
        )}
      </button>
      {sent && (
        <p className="font-mono text-[11px] text-success">
          Thanks — I'll get back to you shortly.
        </p>
      )}
    </motion.form>
  );
}
