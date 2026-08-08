import { motion } from "motion/react";
import {
  Cloud,
  Boxes,
  Container,
  Layers,
  Terminal,
  Settings2,
  Code2,
  SquareTerminal,
  GitBranch,
  Activity,
  LineChart,
  GitCommitHorizontal,
} from "lucide-react";

const TOOLS = [
  { label: "AWS", Icon: Cloud },
  { label: "Kubernetes", Icon: Boxes },
  { label: "Docker", Icon: Container },
  { label: "Terraform", Icon: Layers },
  { label: "Linux", Icon: Terminal },
  { label: "Ansible", Icon: Settings2 },
  { label: "Python", Icon: Code2 },
  { label: "Bash", Icon: SquareTerminal },
  { label: "GitHub Actions", Icon: GitBranch },
  { label: "Prometheus", Icon: Activity },
  { label: "Grafana", Icon: LineChart },
  { label: "Git", Icon: GitCommitHorizontal },
];

export function TechMarquee() {
  const row = [...TOOLS, ...TOOLS];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-y border-border bg-card/30 py-5 overflow-hidden marquee-mask group"
    >
      <div className="marquee-track flex w-max gap-4 group-hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-full bg-background/60 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70 whitespace-nowrap"
          >
            <t.Icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            {t.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
