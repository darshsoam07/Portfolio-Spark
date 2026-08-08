import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  MapPin,
  Download,
  FileText,
  FolderGit2,
  Menu,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import darshAsset from "@/assets/darsh.jpeg.asset.json";
import { TypeCycle } from "@/components/portfolio/TypeCycle";
import { TechMarquee } from "@/components/portfolio/TechMarquee";
import { StatStrip } from "@/components/portfolio/StatStrip";
import { GithubActivity } from "@/components/portfolio/GithubActivity";
import { Certifications } from "@/components/portfolio/Certifications";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { SectionLabel } from "@/components/portfolio/SectionLabel";
import { blip, setSoundEnabled } from "@/components/portfolio/sound";


export const Route = createFileRoute("/")({
  component: Portfolio,
});

const PORTRAIT = darshAsset.url;

const SKILLS = [
  { name: "AWS", level: 88 },
  { name: "Kubernetes", level: 80 },
  { name: "Docker", level: 85 },
  { name: "Terraform", level: 78 },
  { name: "CI/CD", level: 82 },
  { name: "Linux", level: 90 },
  { name: "Ansible", level: 72 },
  { name: "Python", level: 75 },
  { name: "Bash", level: 85 },
  { name: "GitHub Actions", level: 80 },
];

const EXPERIENCE = [
  {
    year: "2026 — Present",
    company: "PERSONAL DEVOPS LAB",
    role: "DevOps Engineer",
    desc: "Building cloud infrastructure projects and deployment systems.",
  },
  {
    year: "2025 — Present",
    company: "CLOUDDEPLOYX",
    role: "Project Lead",
    desc: "Cloud-native deployment platform.",
  },
  {
    year: "2025 — Present",
    company: "EXPENSE TRACKER ANALYTICS",
    role: "Developer",
    desc: "Full stack analytics project.",
  },
];

const CAPABILITIES = [
  "Infrastructure as Code",
  "Terraform Automation",
  "Kubernetes Operations",
  "Docker Platform Engineering",
  "Cloud Architecture",
  "AWS Deployments",
  "CI/CD Automation",
  "Monitoring Systems",
  "Linux Administration",
  "Security Hardening",
];

const DEVOPS_SKILLS = ["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Linux", "Bash", "Python"];
const INTERESTS = ["Open Source", "Cloud Native", "GitOps", "Platform Engineering", "FinOps"];

const PROJECTS = [
  {
    name: "Cloud Infra Automation",
    desc: "Automated AWS infrastructure deployment using Terraform.",
    tags: ["AWS", "Terraform", "GitHub Actions"],
    github: "#",
    live: "#",
  },
  {
    name: "K8s Monitoring Stack",
    desc: "Production monitoring using Prometheus and Grafana.",
    tags: ["Kubernetes", "Prometheus", "Grafana"],
    github: "#",
    live: "#",
  },
  {
    name: "CI/CD Pipeline Builder",
    desc: "Automated deployment pipeline with Docker and GitHub Actions.",
    tags: ["Docker", "GitHub Actions", "AWS"],
    github: "#",
    live: "#",
  },
  {
    name: "Multi-Cloud Terraform Module",
    desc: "Reusable infrastructure modules across cloud providers.",
    tags: ["Terraform", "AWS", "Cloud"],
    github: "#",
    live: "#",
  },
];

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];


function useCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let rx = 0, ry = 0, x = 0, y = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
    };
    const loop = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ring.current) ring.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return { dot, ring };
}

function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-12 border-b border-border backdrop-blur-xl bg-background/70">
      <div className="h-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="font-display font-bold text-sm tracking-[0.2em]">
          DARSH<span className="text-primary">.</span>SOAM
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`text-[11px] font-mono uppercase tracking-[0.18em] transition-colors ${
                active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-5">
          <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
            <MapPin className="w-3 h-3" /> Meerut, India
          </span>
          <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
            Open to Work
          </span>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-6 flex flex-col gap-4">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="text-sm font-mono uppercase tracking-[0.18em]">
              {n.label}
            </a>
          ))}
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-foreground pt-4 border-t border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" /> Open to Work · Meerut, India
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const name = "DARSH SOAM";
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg grid-bg-fade" />
      {/* Ambient portrait ghost */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-screen pointer-events-none">
        <img src={PORTRAIT} alt="" className="w-full h-full object-cover grayscale contrast-125" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />

      <div className="relative min-h-screen max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col">
        {/* Top meta bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-24 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
        >
          <span>[ Portfolio / 2026 ]</span>
          <span className="hidden md:inline">v.01 — DevOps · Cloud · Infra</span>
          <span>N 28.98° · E 77.70°</span>
        </motion.div>

        {/* Giant name */}
        <div className="flex-1 flex flex-col justify-center py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-primary" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.35em] text-primary uppercase">
              <TypeCycle />
            </span>
          </motion.div>


          <h1
            className="font-display font-bold leading-[0.82] tracking-tight text-[clamp(3.5rem,15vw,16rem)] whitespace-nowrap"
            aria-label={name}
          >
            {name.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <p className="font-display text-xl md:text-2xl text-foreground/85 max-w-md leading-tight">
              Infrastructure that scales.
              <br />
              Pipelines that ship.
            </p>

            <div className="flex gap-3">
              <a
                href="#resume"
                className="group px-6 py-3 border border-border rounded-full text-xs font-mono uppercase tracking-[0.2em] transition-colors hover:border-primary hover:text-primary flex items-center gap-2"
              >
                Resume <FileText className="w-3 h-3" />
              </a>
              <a
                href="#portfolio"
                className="group px-6 py-3 border border-primary/50 bg-primary/5 rounded-full text-xs font-mono uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
              >
                Selected Work <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom row: socials + scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="pb-10 flex items-end justify-between"
        >
          <div className="flex items-center gap-5">
            {[
              { Icon: Linkedin, href: "https://linkedin.com" },
              { Icon: Github, href: "https://github.com" },
              { Icon: Mail, href: "mailto:darsh@example.com" },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            <span>Scroll</span>
            <motion.span
              animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-primary origin-top block"
            />
          </div>

          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase hidden md:inline">
            IND · 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
}


function About() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel num="001" title="About" />
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display font-bold text-6xl md:text-7xl mb-4">ABOUT</h2>
            <a href="mailto:darsh@example.com" className="font-mono text-sm text-primary hover:underline">
              darsh@example.com
            </a>

            <div className="mt-10 space-y-5 text-foreground/75 leading-relaxed max-w-xl">
              <p>
                I'm Darsh Soam, a DevOps & Cloud Engineer focused on building scalable
                infrastructure, cloud-native systems, and automation pipelines.
              </p>
              <p>
                My work revolves around AWS, Kubernetes, Docker, Terraform, Linux, and modern
                CI/CD practices.
              </p>
              <p>
                I enjoy transforming manual operations into automated systems and designing
                platforms that are reliable, secure, and scalable.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 max-w-md">
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">Location</div>
                <div className="font-display text-base">Meerut, Uttar Pradesh<br/>India</div>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">Availability</div>
                <div className="font-display text-base flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
                  Open to Opportunities
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-card">
              <img
                src={PORTRAIT}
                alt="Darsh Soam portrait"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(0.6) brightness(0.45) contrast(1.1)" }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-border" />
              <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                · 2026
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                D.S / IND
              </div>
            </div>

            {/* Find me here — floating social cluster */}
            <span className="absolute -top-4 left-4 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              Find me here
            </span>
            {[
              { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", pos: "-left-5 top-[12%]" },
              { Icon: Github, href: "https://github.com", label: "GitHub", pos: "-right-5 top-[34%]" },
              { Icon: Mail, href: "mailto:darsh@example.com", label: "Email", pos: "-left-5 top-[58%]" },
            ].map(({ Icon, href, label, pos }, i) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={blip}
                animate={reduceMotion ? undefined : { y: [0, -8, 0], x: [0, i % 2 === 0 ? 4 : -4, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                whileHover={{ scale: 1.15 }}
                className={`absolute ${pos} w-11 h-11 rounded-full bg-card border border-border backdrop-blur flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors`}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.15em] uppercase">{name}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="skill-bar-dot" />
        </motion.div>
      </div>
    </div>
  );
}

function Resume() {
  return (
    <section id="resume" className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border bg-card/30">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel num="002" title="Resume" />
        <div className="grid lg:grid-cols-3 gap-16">
          {/* COL 1 — Skills */}
          <div>
            <h3 className="font-display font-bold text-sm tracking-[0.25em] text-primary uppercase mb-8 pb-3 border-b border-border">
              Software Skills
            </h3>
            <div className="space-y-5">
              {SKILLS.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>
          </div>

          {/* COL 2 — Experience */}
          <div>
            <h3 className="font-display font-bold text-sm tracking-[0.25em] text-primary uppercase mb-8 pb-3 border-b border-border">
              Experience
            </h3>
            <div className="relative pl-6 space-y-8">
              <span className="absolute left-[3px] top-2 bottom-2 w-px bg-primary/30" />
              {EXPERIENCE.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative"
                >
                  <span className="absolute -left-[23px] top-2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                  <div className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase mb-1">{e.year}</div>
                  <div className="font-display font-semibold text-base tracking-wide">{e.company}</div>
                  <div className="font-mono text-[11px] text-muted-foreground mt-1">{e.role}</div>
                  <p className="text-sm text-foreground/65 mt-2 leading-relaxed">{e.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="font-display font-bold text-sm tracking-[0.25em] text-primary uppercase mb-6 pb-3 border-b border-border">
                Education
              </h3>
              <div className="font-display font-semibold text-base">B.Tech Computer Science</div>
              <div className="font-mono text-[11px] text-muted-foreground mt-1">
                Meerut Institute of Engineering and Technology
              </div>
            </div>
          </div>

          {/* COL 3 — Capabilities */}
          <div>
            <h3 className="font-display font-bold text-sm tracking-[0.25em] text-primary uppercase mb-8 pb-3 border-b border-border">
              What Can I Do?
            </h3>
            <ul className="space-y-2.5 text-sm text-foreground/80">
              {CAPABILITIES.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                  {c}
                </li>
              ))}
            </ul>

            <h4 className="font-display font-bold text-sm tracking-[0.25em] text-primary uppercase mt-12 mb-6 pb-3 border-b border-border">
              DevOps Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {DEVOPS_SKILLS.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>

            <h4 className="font-display font-bold text-sm tracking-[0.25em] text-primary uppercase mt-12 mb-6 pb-3 border-b border-border">
              Interests
            </h4>
            <div className="space-y-1.5 font-mono text-xs text-foreground/70">
              {INTERESTS.map((i) => (
                <div key={i}>· {i}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i }: { p: typeof PROJECTS[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: i * 0.1 }}
      className="spotlight-card group bg-card border border-border p-8 md:p-10 flex flex-col min-h-[340px]"
    >
      <div className="flex items-start justify-between mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">/ 0{i + 1}</span>
        <FolderGit2 className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
      </div>

      <h3 className="font-display font-bold text-2xl md:text-3xl tracking-wide mb-3 group-hover:text-primary transition-colors">
        {p.name}
      </h3>
      <p className="text-sm text-foreground/65 leading-relaxed mb-6 flex-1">{p.desc}</p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {p.tags.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-6 border-t border-border">
        <a href={p.github} className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
          <Github className="w-3.5 h-3.5" /> Code
        </a>
        <span className="text-border">|</span>
        <a href={p.live} className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary hover:underline">
          Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

function Portfolio_() {
  return (
    <section id="portfolio" className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel num="004" title="Portfolio" />
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <h2 className="font-display font-bold text-5xl md:text-6xl">
            Selected<br/><span className="text-primary">Work</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            A curated set of infrastructure, automation, and cloud-native engineering projects.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-40 px-6 md:px-12 border-t border-border overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px]" />
      </div>
      <div className="relative max-w-[1400px] mx-auto text-center">
        <SectionLabel num="006" title="Contact" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl mx-auto"
        >
          GET IN <span className="text-primary">TOUCH</span>
        </motion.h2>

        <p className="text-muted-foreground max-w-xl mx-auto mt-6 mb-12 text-sm leading-relaxed">
          Have a project, role, or idea in mind? Drop a message and I'll respond as soon as possible.
        </p>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:darsh@example.com" onMouseEnter={blip} className="px-7 py-4 bg-primary text-primary-foreground rounded-full text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Mail className="w-4 h-4" /> Email Me
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" onMouseEnter={blip} className="px-7 py-4 border border-border rounded-full text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 hover:border-primary hover:text-primary transition-colors">
            <Linkedin className="w-4 h-4" /> Connect on LinkedIn
          </a>
          <a href="#" onMouseEnter={blip} className="px-7 py-4 border border-border rounded-full text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 hover:border-primary hover:text-primary transition-colors">
            <Download className="w-4 h-4" /> Download Resume
          </a>
        </div>

        <div className="mt-20">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const width = useTransform(w, (v) => `${v * 100}%`);
  return <motion.div style={{ width }} className="fixed top-0 left-0 h-px bg-primary z-[60]" />;
}

function SoundToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => {
        const next = !on;
        setOn(next);
        setSoundEnabled(next);
        if (next) blip();
      }}
      aria-pressed={on}
      aria-label={on ? "Disable interface sounds" : "Enable interface sounds"}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full border border-border bg-card/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
    >
      {on ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4" />}
    </button>
  );
}

function Portfolio() {
  const { dot, ring } = useCursor();
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", "about", "resume", "portfolio", "github", "certifications", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="noise relative bg-background text-foreground min-h-screen">
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
      <ScrollProgress />
      <Navbar active={active} />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <StatStrip />
        <Resume />
        <GithubActivity />
        <Portfolio_ />
        <Certifications label={<SectionLabel num="005" title="Certifications" />} />
        <Contact />
      </main>
      <SiteFooter />
      <SoundToggle />
    </div>
  );
}

