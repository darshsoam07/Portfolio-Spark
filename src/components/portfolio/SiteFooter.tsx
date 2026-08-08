import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export function SiteFooter({ onNav }: { onNav?: () => void }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-border px-6 md:px-12 py-10"
    >
      <div className="max-w-[1400px] mx-auto grid gap-8 md:grid-cols-3 items-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          © 2026 Darsh Soam. Built for shipping, not scrolling.
        </p>

        <nav className="flex flex-wrap justify-start md:justify-center gap-5">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={onNav}
              className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex md:justify-end items-center gap-5">
          {[
            { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { Icon: Github, href: "https://github.com", label: "GitHub" },
            { Icon: Mail, href: "mailto:darsh@example.com", label: "Email" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
