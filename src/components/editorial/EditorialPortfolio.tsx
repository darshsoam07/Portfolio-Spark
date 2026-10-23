import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Cloud,
  Database,
  GitBranch,
  LockKeyhole,
  Search,
  Server,
  X,
} from "lucide-react";
import portrait from "@/assets/darsh.jpeg";
import { PROFILE, EDUCATION, CERTIFICATIONS, SKILL_CATEGORIES } from "@/data/portfolioData";
import { selectedWork } from "@/data/selectedWork";
import { HomepageArrival } from "./HomepageArrival";
import { CredentialsSection } from "./CredentialsSection";

const aboutTabs = ["about me", "work log", "education", "credentials"];
const filters = ["Cloud", "Delivery", "AI", "Software", "Security"];
const resumeHref = `mailto:${PROFILE.email}?subject=Resume%20request`;
gsap.registerPlugin(ScrollTrigger);

function ProjectArtwork({ index }: { index: number }) {
  return (
    <div
      className={`project-art art-${index}`}
      aria-label={`${selectedWork[index].title} architecture illustration`}
      role="img"
    >
      <div className="art-copy">
        <span className="mini-label">{selectedWork[index].title}</span>
        <strong>
          {selectedWork[index].line.split("\n").map((line, i) => (
            <span key={line} className={i ? "serif-emphasis" : ""}>
              {line}
            </span>
          ))}
        </strong>
        <span className="art-note">
          {index === 0
            ? "Controlled experiments. Observable systems."
            : index === 1
              ? "From a question to its source."
              : "Record. Understand. Export."}
        </span>
      </div>
      <div className="art-window">
        <div className="window-top">
          <span>● ● ●</span>
          <span>{selectedWork[index].title.toLowerCase()}</span>
        </div>
        {index === 0 ? (
          <div className="system-art">
            <div className="system-heading">
              <span>Experiment lifecycle</span>
              <span className="status-dot">SLO guardrails</span>
            </div>
            <svg viewBox="0 0 500 130" aria-hidden="true">
              <path
                d="M0 100 L50 98 L80 102 L115 96 L155 100 L180 30 L215 45 L245 20 L280 42 L310 27 L340 96 L380 99 L430 97 L500 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M0 65 H500"
                stroke="currentColor"
                strokeOpacity=".25"
                strokeDasharray="6 5"
              />
            </svg>
            <div className="system-nodes">
              <span>Order API</span>
              <i>→</i>
              <span>Queue</span>
              <i>→</i>
              <span>Worker</span>
            </div>
            <p>Inject → observe → recover</p>
          </div>
        ) : index === 1 ? (
          <div className="query-art">
            <div className="query-prompt">
              <Search size={18} /> Ask your knowledge base
            </div>
            <h4>Every answer has a source.</h4>
            <div className="text-lines">
              <i />
              <i />
              <i />
            </div>
            <div className="source-chip">
              <Database size={17} /> Retrieved document evidence <span>↗</span>
            </div>
            <small>Hybrid retrieval + citation validation</small>
          </div>
        ) : (
          <div className="expense-art">
            <span>Spending, at a glance</span>
            <div className="chart-bars">
              {[40, 65, 48, 82, 58, 96, 72].map((n, i) => (
                <i key={i} style={{ height: `${n}%` }} />
              ))}
            </div>
            <div className="chart-labels">
              <span>Track</span>
              <span>Categorize</span>
              <span>Understand</span>
            </div>
            <div className="expense-tags">
              <span>Category filters</span>
              <span>CSV export ↗</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function EditorialPortfolio() {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const manualAbout = useRef(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [category, setCategory] = useState(0);
  const [project, setProject] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [hello, setHello] = useState(false);
  useEffect(() => {
    root.current?.setAttribute("data-hydrated", "true");
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {}, root);
      let revealed = false;
      const reveal = () => {
        if (revealed) return;
        revealed = true;
        context.add(() => {
          gsap.from(".hero-enter", {
            y: 24,
            opacity: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
          });
        });
      };
      if (window.__homepageArrival?.pending) {
        document.addEventListener("homepage-arrival-reveal", reveal, { once: true });
        document.addEventListener("homepage-arrival-done", reveal, { once: true });
      } else reveal();
      return () => {
        document.removeEventListener("homepage-arrival-done", reveal);
        document.removeEventListener("homepage-arrival-reveal", reveal);
        context.revert();
      };
    });
    motion.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const entrance = gsap.timeline({
          scrollTrigger: {
            trigger: ".work-intro",
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 0.6,
          },
        });
        entrance
          .to(".work-intro .handwritten", { y: -45, opacity: 0, duration: 0.3 }, 0)
          .fromTo(
            ".portal",
            { rotateY: -22, scale: 1 },
            { rotateY: 0, scale: 1.7, duration: 0.65 },
            0,
          )
          .to(".work-intro", { backgroundColor: "#141212", color: "#f1f0ea", duration: 0.35 }, 0.65)
          .to(".portal", { scale: 2.4, opacity: 0, duration: 0.35 }, 0.65);
        const track = document.querySelector<HTMLElement>(".project-track");
        if (!track) return;
        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".project-stage",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        const projects = Array.from(track.querySelectorAll<HTMLElement>(".project"));
        projects.forEach((item) => {
          gsap.fromTo(
            item.querySelector(".project-open"),
            { rotateY: 7 },
            {
              rotateY: -7,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
        const handlers = projects.flatMap((item, index) =>
          Array.from(item.querySelectorAll<HTMLElement>("button, a")).map((control) => {
            const handler = () => {
              const st = tween.scrollTrigger;
              if (st && control.matches(":focus-visible"))
                window.scrollTo({
                  top: st.start + ((st.end - st.start) * index) / Math.max(1, projects.length - 1),
                  behavior: "instant",
                });
            };
            control.addEventListener("focus", handler);
            return () => control.removeEventListener("focus", handler);
          }),
        );
        return () => handlers.forEach((remove) => remove());
      }, root);
      return () => context.revert();
    });
    motion.add(
      "(min-width: 1025px) and (min-height: 850px) and (prefers-reduced-motion: no-preference)",
      () => {
        const frame = root.current?.querySelector<HTMLElement>(".browser-frame");
        if (!frame || frame.offsetHeight > innerHeight - 110) return;
        const context = gsap.context(() => {
          ScrollTrigger.create({
            trigger: frame,
            start: "top 55px",
            end: () => `+=${innerHeight * 1.5}`,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Manual selection and keyboard focus always take precedence over storytelling.
              if (!manualAbout.current && !frame.contains(document.activeElement))
                setActiveTab(Math.min(3, Math.floor(self.progress * 4)));
            },
            onLeaveBack: () => {
              manualAbout.current = false;
              setActiveTab(0);
            },
          });
        }, root);
        return () => context.revert();
      },
    );
    // A full-document Back needs its saved position after the pin spacers exist.
    // Fresh visits are owned by the arrival gate; in-page history stays with the router.
    const savedPosition = window.__homepageArrival?.restore;
    const restoreFrame = savedPosition
      ? requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          window.scrollTo({ left: savedPosition.x, top: savedPosition.y, behavior: "instant" });
          if (window.__homepageArrival) delete window.__homepageArrival.restore;
        })
      : 0;
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        setProgress(max > 0 ? Math.round((scrollY / max) * 100) : 0);
        frame = 0;
      });
    };
    addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      motion.revert();
      removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(restoreFrame);
    };
  }, []);
  useEffect(() => {
    if (project !== null) {
      dialog.current?.showModal();
      closeButton.current?.focus();
    }
  }, [project]);
  function closeProject() {
    dialog.current?.close();
    setProject(null);
    lastTrigger.current?.focus();
  }
  function tabKeys(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    labels: string[],
    setter: (n: number) => void,
    prefix: string,
  ) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % labels.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + labels.length) % labels.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = labels.length - 1;
    else return;
    event.preventDefault();
    setter(next);
    document.getElementById(`${prefix}-${next}`)?.focus();
  }
  return (
    <div ref={root} className="editorial-site">
      <HomepageArrival />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-nav page-width">
        <nav aria-label="Primary">
          <a href="#work">work</a>
          <a href="#experience">about me</a>
          <a href={resumeHref} aria-label="Request Darsh's resume by email">
            resume <ArrowDown size={13} />
          </a>
        </nav>
        <a href={`mailto:${PROFILE.email}`}>
          say hey <ArrowUpRight size={14} />
        </a>
      </header>
      <main id="main">
        <section className="hero page-width" aria-labelledby="hero-title">
          <p className="eyebrow hero-enter">DEVOPS & CLOUD ENGINEERING</p>
          <div className="hero-composition">
            <div className="hero-type">
              <p className="hello serif hero-enter">hey, I’m</p>
              <div className="name-wrap hero-enter">
                <h1
                  className="hero-name"
                  id="hero-title"
                  aria-label="Darsh Soam — DevOps and Cloud Engineering"
                >
                  <span className="name-line">Darsh</span>{" "}
                  <span className="name-line">
                    Soam
                    <span className="name-dot" aria-hidden="true">
                      .
                    </span>
                  </span>
                </h1>
                <button
                  className={`hello-sticker ${hello ? "is-hello" : ""}`}
                  aria-label="Say hi to Darsh"
                  onClick={() => setHello(!hello)}
                >
                  <Cloud size={45} strokeWidth={1.25} />
                  <span>{hello ? "hey, glad you’re here!" : "always building"}</span>
                </button>
              </div>
            </div>
            <div className="photo-stack hero-enter" aria-label="A few things about Darsh">
              {[0, 1, 2].map((n) => (
                <button
                  key={n}
                  className={`polaroid photo-${n} ${activePhoto === n ? "photo-active" : ""}`}
                  aria-pressed={activePhoto === n}
                  onClick={() => setActivePhoto(activePhoto === n ? null : n)}
                  aria-label={`${["Darsh's portrait", "Cloud and infrastructure", "Code and automation"][n]} — bring card forward`}
                >
                  {n === 0 ? (
                    <img src={portrait} alt="Darsh Soam" width="260" height="320" />
                  ) : n === 1 ? (
                    <div className="paper-cloud">
                      <Cloud size={76} strokeWidth={1} />
                      <span>
                        design
                        <br />
                        deploy
                        <br />
                        <em>repeat.</em>
                      </span>
                    </div>
                  ) : (
                    <div className="paper-code">
                      <span>~/darsh</span>
                      <code>
                        $ build
                        <br />$ learn
                        <br />$ automate<span className="code-cursor">_</span>
                      </code>
                      <GitBranch size={40} strokeWidth={1} />
                    </div>
                  )}
                  <span className="photo-caption">
                    {
                      [
                        "the person behind the systems.",
                        "a little closer to the cloud.",
                        "usually automating something.",
                      ][n]
                    }
                  </span>
                </button>
              ))}
              <span className="handwritten photo-note">↖ that’s me</span>
            </div>
          </div>
          <div className="intro-copy hero-enter">
            <p>
              I build systems.
              <br />I like making them <em className="serif">work.</em>
            </p>
            <p>
              <span>Cloud infrastructure</span>, <span>automation</span> &
              <br className="desktop-break" /> a growing curiosity for <span>agentic AI</span>.
            </p>
          </div>
          <div className="experience-strip hero-enter">
            <span className="eyebrow">LEARNING & BUILDING</span>
            <div>
              <span className="experience-name">
                MIET <b>B.TECH · 2024–28</b>
              </span>
              <i>/</i>
              <span className="experience-name">Cloud & DevOps</span>
              <i>/</i>
              <a className="experience-name" href={PROFILE.github} target="_blank" rel="noreferrer">
                Open source ↗
              </a>
            </div>
          </div>
        </section>
        <section className="work-intro" aria-label="Introduction to selected work">
          <p className="handwritten">
            Welcome to my work section.
            <br />
            Let’s look under the hood.
          </p>
          <div className="portal">
            <span aria-hidden="true">{`{`}</span>
            <Server size={100} strokeWidth={0.7} />
            <span aria-hidden="true">{`}`}</span>
          </div>
          <p className="serif">the systems behind the experience.</p>
          <a className="text-link" href="#work">
            LET’S TAKE A LOOK <ArrowDown size={15} />
          </a>
        </section>
        <section id="work" className="work-section" aria-labelledby="work-heading">
          <div className="work-inner">
            <div className="project-stage">
              <h2 id="work-heading" className="eyebrow serif">
                01 / FEATURED WORK
              </h2>
              <div className="project-track">
                {selectedWork.map((item, index) => (
                  <article className="project" key={item.id}>
                    <div className="project-heading">
                      <div>
                        <h3>{item.title}</h3>
                        <span className="project-category">{item.category}</span>
                      </div>
                      <div className="project-meta">
                        <span className="project-stack">{item.stack}</span>
                        <a
                          className="project-repository"
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${item.title} repository on GitHub`}
                        >
                          View repository <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                    <p className="project-technical">{item.technical}</p>
                    <button
                      className="project-open"
                      onClick={(event) => {
                        lastTrigger.current = event.currentTarget;
                        setProject(index);
                      }}
                      aria-label={`Explore ${item.title}`}
                    >
                      <ProjectArtwork index={index} />
                      <span className="project-cta">
                        Explore project <ArrowUpRight size={18} />
                      </span>
                    </button>
                  </article>
                ))}
              </div>
              <a href="#toolkit" className="skip-gallery">
                SKIP AHEAD →
              </a>
            </div>
            <div className="more-work">
              <h3 className="serif">More work</h3>
              <a
                href="https://github.com/darshsoam07/DSA-in-Java-"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  Data structures & algorithms<small>Java · Practice and problem solving</small>
                </span>
                <ArrowUpRight />
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer">
                <span>
                  On my GitHub<small>Code, experiments & things I’m learning</small>
                </span>
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>
        <section id="toolkit" className="expertise page-width" aria-labelledby="expertise-title">
          <p className="handwritten section-aside">
            the tools behind the projects.
            <br />
            always a little more to learn.
          </p>
          <p className="eyebrow">02 / THE TOOLKIT</p>
          <h2 id="expertise-title" className="serif">
            little pieces of the stack,
            <br />
            <em>working together.</em>
          </h2>
          <div className="filter-tabs" role="tablist" aria-label="Filter expertise">
            {filters.map((label, i) => (
              <button
                key={label}
                id={`skill-${i}`}
                role="tab"
                aria-selected={category === i}
                aria-controls="skill-panel"
                tabIndex={category === i ? 0 : -1}
                onKeyDown={(e) => tabKeys(e, i, filters, setCategory, "skill")}
                onClick={() => setCategory(i)}
              >
                {label}
                <sup>{SKILL_CATEGORIES[i].skills.length}</sup>
              </button>
            ))}
          </div>
          <div
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`skill-${category}`}
            className="skill-grid"
          >
            <p className="skill-summary">{SKILL_CATEGORIES[category].description}</p>
            {SKILL_CATEGORIES[category].skills.map((skill, i) => (
              <article className="skill-sheet" key={skill.name}>
                <span className="mini-label">
                  <span aria-hidden="true">0{i + 1} / </span>
                  {skill.badge}
                </span>
                <h3>{skill.name}</h3>
                <p>{skill.details}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="experience" className="about page-width" aria-labelledby="about-title">
          <p className="eyebrow">03 / ABOUT ME</p>
          <h2 id="about-title" className="serif">
            a little more
            <br />
            <em>about me.</em>
          </h2>
          <p className="handwritten">yes, there’s probably a terminal open</p>
          <div className="browser-frame">
            <div className="browser-tabs">
              <span className="browser-brand">Darsh Soam</span>
              <div role="tablist" aria-label="About Darsh">
                {aboutTabs.map((label, i) => (
                  <button
                    id={`about-${i}`}
                    key={label}
                    role="tab"
                    aria-selected={activeTab === i}
                    aria-controls="about-panel"
                    tabIndex={activeTab === i ? 0 : -1}
                    onClick={() => {
                      manualAbout.current = true;
                      setActiveTab(i);
                    }}
                    onKeyDown={(e) => {
                      manualAbout.current = true;
                      tabKeys(e, i, aboutTabs, setActiveTab, "about");
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="address-bar">
              <LockKeyhole size={12} />
              <span>
                darsh.me / <b>{aboutTabs[activeTab].replace(" ", "-")}</b>
              </span>
            </div>
            <div
              id="about-panel"
              className="about-panel"
              role="tabpanel"
              aria-labelledby={`about-${activeTab}`}
            >
              {activeTab === 0 ? (
                <div className="bio-layout">
                  <figure className="bio-photo">
                    <img src={portrait} alt="Darsh Soam" loading="lazy" width="360" height="400" />
                    <figcaption className="handwritten">yep, that’s me</figcaption>
                  </figure>
                  <div>
                    <p className="serif bio-hello">hello, i’m</p>
                    <h3 className="serif">
                      Darsh Soam<span>.</span>
                    </h3>
                    <p>{PROFILE.subheadline}</p>
                    <p>
                      I’m interested in how software runs beyond the screen: the infrastructure,
                      delivery pipelines, and automation that keep it working.
                    </p>
                    <div className="bio-tags">
                      <span>cloud & devops</span>
                      <span>infrastructure automation</span>
                      <span>agentic AI</span>
                    </div>
                    <p className="bio-location">
                      based in {PROFILE.location.short} ·{" "}
                      <a href={`mailto:${PROFILE.email}`}>say hello ↗</a>
                    </p>
                  </div>
                </div>
              ) : activeTab === 1 ? (
                <div className="tab-content">
                  <h3 className="serif">Learning by building.</h3>
                  {selectedWork.map((item) => (
                    <a
                      className="log-row"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      key={item.id}
                    >
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.category}</small>
                      </span>
                      <ArrowUpRight />
                    </a>
                  ))}
                  <p>AI-Powered Cloud Engineer Virtual Internship · EduSkills · 2026</p>
                </div>
              ) : activeTab === 2 ? (
                <div className="tab-content">
                  <h3 className="serif">A work in progress.</h3>
                  {EDUCATION.map((item) => (
                    <div className="education-row" key={item.institution}>
                      <span className="eyebrow">{item.period}</span>
                      <h4>{item.degree}</h4>
                      <p>{item.institution}</p>
                      <small>{item.coursework.join(" · ")}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tab-content">
                  <h3 className="serif">Along the way.</h3>
                  <p>
                    {CERTIFICATIONS.length} milestones across AI, cloud training, and practical
                    learning.
                  </p>
                  <p>Explore the collection, with original badges and certificate previews.</p>
                  <a className="credential-directory-link" href="#credentials">
                    Explore certifications & achievements <ArrowUpRight size={18} />
                  </a>
                </div>
              )}
            </div>
            <button
              className="next-tab"
              onClick={() => {
                manualAbout.current = true;
                setActiveTab((activeTab + 1) % aboutTabs.length);
              }}
            >
              next: {aboutTabs[(activeTab + 1) % aboutTabs.length]} <ArrowRight size={16} />
            </button>
          </div>
        </section>
        <CredentialsSection />
        <footer id="contact" className="contact">
          <svg
            className="mountain-drawing"
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 245 140 210 220 230 330 185 450 220 570 175 650 210 760 125 850 230 1010 195 1110 230 1240 195 1440 240 V300 H0Z"
              fill="#e6e6dc"
            />
            <path
              d="M0 290 170 275 310 255 445 220 570 165 645 105 720 12 775 115 835 190 910 230 980 245 1060 220 1120 165 1190 210 1280 255 1360 277 1440 287"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <circle cx="720" cy="12" r="4" fill="#e75b35" />
          </svg>
          <div className="page-width">
            <p className="handwritten">
              that’s a little of what I’m building.
              <br />
              I’d love to hear what you’re working on.
            </p>
            <div className="contact-layout">
              <div>
                <h2 className="serif">
                  good things start
                  <br />
                  <em>with a hello.</em>
                </h2>
                <p>
                  Cloud, infrastructure, or an interesting engineering problem.
                  <br />
                  Let’s start a conversation.
                </p>
              </div>
              <div className="contact-links">
                <a className="repository-link" href={resumeHref}>
                  request resume <ArrowUpRight size={16} />
                </a>
                <br />
                <a className="contact-email" href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </a>
                <div>
                  <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                  <a href={PROFILE.github} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Darsh Soam · Meerut, India</span>
              <div>
                <a href={resumeHref}>request resume ↗</a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <a href="#main">back to top ↑</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
      <div
        className="reading-progress"
        role="progressbar"
        aria-label="Page exploration progress"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className="progress-track">
          <i style={{ transform: `scaleY(${progress / 100})` }} />
        </span>
        <small>{progress}%</small>
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onCancel={closeProject}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeProject();
        }}
      >
        <div className="dialog-body">
          <button
            ref={closeButton}
            className="close-project"
            aria-label="Close project"
            onClick={closeProject}
          >
            <X />
          </button>
          {project !== null && (
            <>
              <p className="eyebrow">SELECTED WORK / 0{project + 1}</p>
              <h2 id="project-dialog-title" className="serif">
                {selectedWork[project].title}
              </h2>
              <p>{selectedWork[project].description}</p>
              <div className="bio-tags">
                {selectedWork[project].tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <ol className="project-steps">
                {selectedWork[project].steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <a
                className="repository-link"
                href={selectedWork[project].href}
                target="_blank"
                rel="noreferrer"
              >
                Explore the repository <ArrowUpRight size={20} />
              </a>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
