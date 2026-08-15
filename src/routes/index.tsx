import { createFileRoute } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import darshAsset from "@/assets/darsh.jpeg.asset.json";
import { ArrivalSequence } from "@/components/portfolio/ArrivalSequence";
import { CapabilityMap } from "@/components/portfolio/CapabilityMap";
import { InfrastructureCore } from "@/components/portfolio/InfrastructureCore";
import { MOTION, VIEWPORT, cinematicDelay } from "@/lib/motion";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const PORTRAIT = darshAsset.url;

const MISSION_STAGES = [
  { id: "home", label: "Arrival" },
  { id: "identity", label: "Identity" },
  { id: "systems", label: "Systems" },
  { id: "proof", label: "Proof" },
  { id: "experience", label: "Experience" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Transmission" },
] as const;

const PROJECTS = [
  {
    name: "Cloud Infra Automation",
    code: "SYS / 01",
    category: "Cloud infrastructure",
    status: "Live system",
    desc: "A repeatable AWS provisioning system that turns manual setup into reviewed infrastructure changes.",
    problem: "Manual AWS provisioning was slow, inconsistent, and error-prone across environments.",
    architecture: ["Developer", "GitHub", "Actions", "Terraform", "AWS"],
    implementation:
      "Reusable Terraform modules per environment, triggered by GitHub Actions on merge to main, with remote state locking and plan review gating apply.",
    outcome: "A documented deployment path with safer change review and repeatable environment construction.",
    tags: ["AWS", "Terraform", "GitHub Actions"],
  },
  {
    name: "K8s Monitoring Stack",
    code: "SYS / 02",
    category: "Observability",
    status: "Live system",
    desc: "A focused visibility layer for cluster health and application performance in production.",
    problem: "No visibility into cluster health or application performance in production.",
    architecture: ["Workloads", "Prometheus", "Alertmanager", "Grafana"],
    implementation:
      "Prometheus scrapes cluster and app metrics, Alertmanager routes threshold breaches, and Grafana provides a coherent visual operating surface.",
    outcome: "Clearer service health signals and an operational foundation for quicker incident investigation.",
    tags: ["Kubernetes", "Prometheus", "Grafana"],
  },
  {
    name: "CI/CD Pipeline Builder",
    code: "SYS / 03",
    category: "Delivery automation",
    status: "Live system",
    desc: "A standardized delivery flow that converts source changes into a predictable deployment sequence.",
    problem: "Deployments were manual, inconsistent, and required tribal knowledge to run.",
    architecture: ["Developer", "GitHub", "Actions", "Docker", "AWS"],
    implementation:
      "Reusable GitHub Actions workflow templates build, test, containerize, push, and deploy services using one coherent deployment contract.",
    outcome: "A clearer path from merge to release, with operational steps expressed as versioned automation.",
    tags: ["Docker", "GitHub Actions", "AWS"],
  },
  {
    name: "Multi-Cloud Terraform Module",
    code: "SYS / 04",
    category: "Infrastructure abstraction",
    status: "In development",
    desc: "A provider-agnostic infrastructure module system that unifies provisioning across AWS, GCP, and Azure.",
    problem: "Infrastructure code was duplicated per cloud provider with no shared abstraction.",
    architecture: ["Terraform Core", "AWS Provider", "GCP Provider", "Azure Provider"],
    implementation:
      "Provider-agnostic module interface with per-cloud implementations behind a common variable contract.",
    outcome: "A shared infrastructure language that reduces duplication and enables multi-cloud portability.",
    tags: ["Terraform", "AWS", "Cloud"],
  },
] as const;

type Project = (typeof PROJECTS)[number];

const EXPERIENCE = [
  {
    year: "2026 / NOW",
    title: "Personal DevOps Lab",
    role: "DevOps Engineer",
    summary: "Building cloud infrastructure projects and deployment systems through hands-on systems practice.",
  },
  {
    year: "2025 / NOW",
    title: "CloudDeployX",
    role: "Project Lead",
    summary: "Directing a cloud-native deployment platform around reliable, repeatable delivery.",
  },
  {
    year: "2025 / NOW",
    title: "Expense Tracker Analytics",
    role: "Developer",
    summary: "Engineering a full-stack analytics project with practical data and delivery concerns.",
  },
] as const;

const PRINCIPLES = [
  ["01", "Design for the recovery path", "Reliable systems make failure observable, contained, and recoverable."],
  ["02", "Automate with intent", "The best automation removes ambiguity, not simply clicks."],
  ["03", "Keep the interface honest", "Infrastructure should make its operational state legible to people."],
] as const;

const SYSTEMS = ["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Linux", "Bash", "Python"];

function useCursorInstrument() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const move = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.current?.style.setProperty("transform", `translate3d(${targetX}px, ${targetY}px, 0)`);
    };
    const hover = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const mode = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "default";
      document.documentElement.dataset.cursor = mode;
    };
    const leave = () => {
      document.documentElement.dataset.cursor = "default";
    };
    const follow = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      ring.current?.style.setProperty("transform", `translate3d(${currentX}px, ${currentY}px, 0)`);
      frame = requestAnimationFrame(follow);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", hover, { passive: true });
    document.addEventListener("mouseleave", leave);
    follow();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", hover);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return { dot, ring };
}

function MissionNavigation({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="mission-navigation">
      <a href="#home" className="mission-mark" data-cursor="link">
        DARSH<span>.SOAM</span>
      </a>
      <nav className="mission-navigation__links" aria-label="Mission sections">
        {MISSION_STAGES.slice(1).map((stage, index) => (
          <a
            key={stage.id}
            href={`#${stage.id}`}
            aria-current={active === stage.id ? "page" : undefined}
            className={active === stage.id ? "is-active" : ""}
            data-cursor="link"
          >
            <span>0{index + 2}</span>
            {stage.label}
          </a>
        ))}
      </nav>
      <div className="mission-navigation__status">
        <span className="signal-dot" />
        Available for opportunities
      </div>
      <button
        type="button"
        className="mission-navigation__toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={MOTION.standard}
            className="mission-navigation__mobile"
            aria-label="Mission sections"
          >
            {MISSION_STAGES.map((stage, index) => (
              <a key={stage.id} href={`#${stage.id}`} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {stage.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ arrived }: { arrived: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <section id="home" className="hero-mission" aria-label="Introduction">
      <div className="hero-mission__grid" aria-hidden="true" />
      <div className="hero-mission__traces" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="hero-mission__atmosphere" aria-hidden="true" />
      <div className="hero-mission__telemetry hero-mission__telemetry--top">REGION / IN · STATUS / AVAILABLE</div>
      <div className="hero-mission__telemetry hero-mission__telemetry--bottom">CLOUD / AWS · K8S / READY · CI/CD / ACTIVE</div>

      <div className="hero-mission__content">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: -16 }}
          animate={arrived ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ ...MOTION.standard, delay: 0.12 }}
          className="hero-mission__eyebrow"
        >
          <span>MISSION / 2026</span>
          <span>N 28.98° / E 77.70°</span>
        </motion.div>

        <div className="hero-mission__headline">
          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, x: -30, filter: "blur(8px)" }}
            animate={arrived ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0 }}
            transition={{ ...MOTION.cinematic, delay: 0.28 }}
          >
            DevOps / Cloud Engineer
          </motion.p>
          <h1 aria-label="Darsh Soam">
            {[
              ["DARSH", "first"],
              ["SOAM", "second"],
            ].map(([word, position], wordIndex) => (
              <span key={word} className={`hero-mission__word hero-mission__word--${position}`}>
                {word.split("").map((character, index) => (
                  <motion.i
                    key={`${character}-${index}`}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 64, scale: 1.04, filter: "blur(10px)" }}
                    animate={arrived ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0 }}
                    transition={{ ...MOTION.cinematic, delay: 0.42 + wordIndex * 0.2 + index * 0.055 }}
                  >
                    {character}
                  </motion.i>
                ))}
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
          animate={arrived ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ ...MOTION.cinematic, delay: 1.15 }}
          className="hero-mission__footer"
        >
          <p>
            I build infrastructure that is ready to <em>scale, ship,</em> and recover.
          </p>
          <div className="hero-mission__actions">
            <a href="#proof" className="text-action" data-cursor="project">
              Explore systems <ArrowDownRight size={16} />
            </a>
            <a href="mailto:darsh@example.com" className="text-action text-action--quiet" data-cursor="link">
              Start a transmission <ArrowUpRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
      <InfrastructureCore className="hero-mission__core" />
      <a href="#identity" className="hero-mission__scroll-cue" data-cursor="link">
        <span>DESCEND</span>
        <i />
      </a>
    </section>
  );
}

function SectionFrame({
  id,
  index,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mission-section ${className}`}>
      <div className="mission-section__rail" aria-hidden="true">
        <span>{index}</span>
        <i />
      </div>
      <div className="mission-section__content">
        <p className="system-eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Identity() {
  const reduceMotion = useReducedMotion();
  return (
    <SectionFrame id="identity" index="02" eyebrow="IDENTITY / OPERATIONAL PROFILE" title={<>The systems behind<br />the systems.</>} className="identity-section">
      <div className="identity-grid">
        <motion.div
          className="identity-copy"
          initial={reduceMotion ? undefined : { opacity: 0, x: -42, clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
          viewport={VIEWPORT}
          transition={MOTION.cinematic}
        >
          <p className="identity-copy__lead">I translate operational complexity into calm, repeatable infrastructure.</p>
          <p>
            I am Darsh Soam, a DevOps and Cloud Engineer focused on cloud-native systems, deployment pipelines, and the connective tissue between code and dependable operations.
          </p>
          <p>
            My work centers on AWS, Kubernetes, Docker, Terraform, Linux, and CI/CD practices that make change visible, reversible, and ready to scale.
          </p>
          <div className="identity-copy__meta">
            <span><MapPin size={14} /> Meerut, Uttar Pradesh / India</span>
            <span><i className="signal-dot" /> Open to opportunities</span>
          </div>
        </motion.div>

        <motion.figure
          className="identity-portrait"
          initial={reduceMotion ? undefined : { opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          viewport={VIEWPORT}
          transition={{ ...MOTION.cinematic, delay: 0.08 }}
        >
          <img src={PORTRAIT} alt="Darsh Soam" />
          <div className="identity-portrait__wash" />
          <figcaption>
            <span>DS / 2026</span>
            <span>FIELD PROFILE</span>
          </figcaption>
          <span className="identity-portrait__axis identity-portrait__axis--x" />
          <span className="identity-portrait__axis identity-portrait__axis--y" />
        </motion.figure>

        <div className="identity-principles">
          {PRINCIPLES.map(([number, title, copy], index) => (
            <motion.article
              key={number}
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ ...MOTION.standard, delay: cinematicDelay(index, 0.16) }}
            >
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function Systems() {
  return (
    <SectionFrame id="systems" index="03" eyebrow="SYSTEMS / INTERDEPENDENCIES" title={<>Technology only matters<br />when it connects.</>} className="systems-section">
      <div className="systems-section__intro">
        <p>Explore the relationships that turn discrete tools into an operating system for delivery.</p>
        <div className="systems-section__signal"><i /> Dependency field / interactive</div>
      </div>
      <CapabilityMap />
    </SectionFrame>
  );
}

function ArchitectureFlow({ nodes }: { nodes: readonly string[] }) {
  return (
    <div className="architecture-flow" aria-label={`Architecture: ${nodes.join(" then ")}`}>
      {nodes.map((node, index) => (
        <span key={node}>
          <i />
          {node}
          {index < nodes.length - 1 && <b aria-hidden="true">→</b>}
        </span>
      ))}
    </div>
  );
}

function ProjectDetail({ project, index, onClose }: { project: Project; index: number; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.documentElement.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <motion.div
      className="case-dialog-backdrop"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-title-${index}`}
        className="case-dialog"
        initial={{ opacity: 0, y: 44, rotateX: -6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.98 }}
        transition={MOTION.cinematic}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" onClick={onClose} className="case-dialog__close" data-cursor="link">
          Close <X size={16} />
        </button>
        <div className="case-dialog__head">
          <p>{project.code} / {project.category}</p>
          <span>{project.status}</span>
          <h3 id={`case-title-${index}`}>{project.name}</h3>
        </div>
        <div className="case-dialog__matrix">
          <article><p className="system-eyebrow">PROBLEM</p><p>{project.problem}</p></article>
          <article><p className="system-eyebrow">ARCHITECTURE</p><ArchitectureFlow nodes={project.architecture} /></article>
          <article><p className="system-eyebrow">IMPLEMENTATION</p><p>{project.implementation}</p></article>
          <article><p className="system-eyebrow">OUTCOME</p><p>{project.outcome}</p></article>
        </div>
        <div className="case-dialog__tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </motion.article>
    </motion.div>
  );
}

function ProjectCase({ project, index, onOpen }: { project: Project; index: number; onOpen: (index: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch" || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    ref.current.style.setProperty("--case-x", `${x * 8}deg`);
    ref.current.style.setProperty("--case-y", `${-y * 7}deg`);
    ref.current.style.setProperty("--spot-x", `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty("--spot-y", `${(y + 0.5) * 100}%`);
  };
  const onPointerLeave = () => {
    ref.current?.style.setProperty("--case-x", "0deg");
    ref.current?.style.setProperty("--case-y", "0deg");
  };

  return (
    <motion.article
      ref={ref}
      className="case-world"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      initial={reduceMotion ? undefined : { opacity: 0, y: 48, clipPath: "inset(16% 0 16% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0% 0)" }}
      viewport={VIEWPORT}
      transition={{ ...MOTION.cinematic, delay: index * 0.08 }}
    >
      <div className="case-world__field" aria-hidden="true">
        <i /><i /><i /><i />
      </div>
      <div className="case-world__content">
        <div className="case-world__meta"><span>{project.code}</span><span>{project.status}</span></div>
        <p className="system-eyebrow">{project.category}</p>
        <h3>{project.name}</h3>
        <p className="case-world__description">{project.desc}</p>
        <ArchitectureFlow nodes={project.architecture} />
        <div className="case-world__lower">
          <div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <button type="button" onClick={() => onOpen(index)} data-cursor="project">
            Enter case environment <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Proof() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <SectionFrame id="proof" index="04" eyebrow="PROOF / CASE ENVIRONMENTS" title={<>Evidence, not<br />a feature list.</>} className="proof-section">
      <div className="proof-section__intro">
        <p>Each environment documents the operational problem, the system design, and the way implementation becomes a reliable outcome.</p>
        <span>0{PROJECTS.length} / SELECTED SYSTEMS</span>
      </div>
      <div className="case-worlds">
        {PROJECTS.map((project, index) => <ProjectCase key={project.name} project={project} index={index} onOpen={setOpenIndex} />)}
      </div>
      <AnimatePresence>
        {openIndex !== null && <ProjectDetail project={PROJECTS[openIndex]} index={openIndex} onClose={() => setOpenIndex(null)} />}
      </AnimatePresence>
    </SectionFrame>
  );
}

function Experience() {
  const reduceMotion = useReducedMotion();
  return (
    <SectionFrame id="experience" index="05" eyebrow="EXPERIENCE / SYSTEM TRACE" title={<>A record of moving<br />systems forward.</>} className="experience-section">
      <div className="experience-layout">
        <div className="experience-layout__intro">
          <p>Professional work is treated here as a trace of decisions: each waypoint reflects a system built, clarified, or made more dependable.</p>
          <div className="experience-layout__skills">{SYSTEMS.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </div>
        <ol className="system-trace">
          {EXPERIENCE.map((entry, index) => (
            <motion.li
              key={entry.title}
              initial={reduceMotion ? undefined : { opacity: 0, x: 26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ ...MOTION.standard, delay: index * 0.1 }}
            >
              <p>{entry.year}</p>
              <i aria-hidden="true" />
              <div><h3>{entry.title}</h3><span>{entry.role}</span><p>{entry.summary}</p></div>
            </motion.li>
          ))}
        </ol>
      </div>
    </SectionFrame>
  );
}

function Credentials() {
  const activity = useMemo(() => Array.from({ length: 84 }, (_, index) => ((index * 19 + index * index * 3) % 13) / 13), []);
  return (
    <SectionFrame id="credentials" index="06" eyebrow="EVIDENCE / CREDENTIAL REGISTRY" title={<>Signals of practice,<br />not decoration.</>} className="credentials-section">
      <div className="evidence-grid">
        <article className="telemetry-field">
          <div className="telemetry-field__head"><p className="system-eyebrow">ACTIVITY / TELEMETRY FIELD</p><span>GITHUB / TRACE</span></div>
          <div className="telemetry-field__terrain" aria-label="Illustrative activity intensity field">
            {activity.map((value, index) => <i key={index} style={{ opacity: 0.12 + value * 0.88 }} />)}
          </div>
          <p>Contribution activity rendered as a quiet intensity field. Project evidence lives in the case environments above.</p>
        </article>
        <article className="credential-registry">
          <div className="credential-registry__head"><p className="system-eyebrow">CREDENTIALS / VERIFICATION</p><span>REGISTRY</span></div>
          <div className="credential-registry__record"><span>01</span><div><h3>Credential registry</h3><p>Issuer, certificate ID, and verification action are ready to be recorded here.</p></div><i>OPEN</i></div>
          <div className="credential-registry__record"><span>02</span><div><h3>Continuous learning</h3><p>Engineering evidence is maintained alongside applied infrastructure work.</p></div><i>ACTIVE</i></div>
          <a href="mailto:darsh@example.com?subject=Credential%20verification" className="text-action" data-cursor="link">Request verification <ArrowUpRight size={16} /></a>
        </article>
      </div>
    </SectionFrame>
  );
}

function Contact() {
  return (
    <section id="contact" className="transmission-section">
      <div className="transmission-section__grid" aria-hidden="true" />
      <div className="transmission-section__content">
        <p className="system-eyebrow">07 / FINAL TRANSMISSION</p>
        <h2>Let&apos;s build<br />something <em>reliable.</em></h2>
        <p>Have a platform problem, cloud initiative, or DevOps role in motion? I would be glad to connect.</p>
        <div className="transmission-section__actions">
          <a href="mailto:darsh@example.com" className="transmission-primary" data-cursor="link"><Mail size={18} /> darsh@example.com <ArrowUpRight size={16} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transmission-link" data-cursor="link"><Linkedin size={17} /> LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="transmission-link" data-cursor="link"><Github size={17} /> GitHub</a>
        </div>
      </div>
      <footer><span>© 2026 DARSH SOAM</span><span>MISSION COMPLETE / CONNECTION OPEN</span></footer>
    </section>
  );
}

function MissionReadout({ active }: { active: string }) {
  const current = Math.max(0, MISSION_STAGES.findIndex((stage) => stage.id === active));
  return (
    <aside className="mission-readout" aria-label={`Current section: ${MISSION_STAGES[current].label}`}>
      <span>0{current + 1}</span><i /><p>{MISSION_STAGES[current].label}</p>
    </aside>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.2 });
  const atmosphere = useTransform(scrollYProgress, [0, 0.45, 1], [0.3, 0.85, 0.08]);
  return <><motion.div className="scroll-progress" style={{ scaleX }} /><motion.div className="scroll-atmosphere" style={{ opacity: atmosphere }} /></>;
}

function Portfolio() {
  const { dot, ring } = useCursorInstrument();
  const [active, setActive] = useState("home");
  const [arrived, setArrived] = useState(false);
  const onArrivalComplete = useCallback(() => setArrived(true), []);
  const ids = useMemo(() => MISSION_STAGES.map((stage) => stage.id), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-42% 0px -48% 0px" },
    );
    ids.forEach((id) => document.getElementById(id) && observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <div className="mission-shell">
      <ScrollProgress />
      <ArrivalSequence onComplete={onArrivalComplete} />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <MissionNavigation active={active} />
      <MissionReadout active={active} />
      <main>
        <Hero arrived={arrived} />
        <Identity />
        <Systems />
        <Proof />
        <Experience />
        <Credentials />
        <Contact />
      </main>
    </div>
  );
}
