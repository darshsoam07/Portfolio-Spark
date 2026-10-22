import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CERTIFICATIONS, type Credential } from "@/data/portfolioData";
import "./CredentialsSection.css";

gsap.registerPlugin(ScrollTrigger);
const featured = CERTIFICATIONS.find((item) => item.id === "oracle-agentic-ai")!;
const internship = CERTIFICATIONS.find((item) => item.type === "virtual-internship")!;
const training = CERTIFICATIONS.filter((item) => item.type === "training-completion");
const additional = CERTIFICATIONS.filter((item) => !item.type);
function categoryLabel(item: Credential) {
  return item.type === "professional-certification"
    ? "Oracle certification"
    : item.type === "training-completion"
      ? "Training completion"
      : item.type === "virtual-internship"
        ? "Virtual internship"
        : item.id.startsWith("deloitte")
          ? "Job simulation"
          : "Learning achievement";
}

export function CredentialsSection() {
  const section = useRef<HTMLElement>(null);
  const modal = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState<Credential | null>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".credential-reveal").forEach((element) => {
          gsap.from(element, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
          });
        });
      }, section);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  useEffect(() => {
    if (selected) {
      modal.current?.showModal();
      if (modal.current) modal.current.scrollTop = 0;
      closeButton.current?.focus({ preventScroll: true });
    }
  }, [selected]);
  function open(item: Credential, button: HTMLButtonElement) {
    trigger.current = button;
    setSelected(item);
  }
  function close() {
    modal.current?.close();
  }
  function finishClose() {
    setSelected(null);
    trigger.current?.focus({ preventScroll: true });
  }

  return (
    <section
      id="credentials"
      ref={section}
      className="credentials-section page-width"
      aria-labelledby="credentials-title"
    >
      <div className="credentials-heading credential-reveal">
        <div>
          <p className="eyebrow">04 / CERTIFICATIONS & ACHIEVEMENTS</p>
          <h2 id="credentials-title" className="serif">
            Proof of <em>progress.</em>
          </h2>
        </div>
        <p className="handwritten">
          a few milestones.
          <br />
          still learning, always building.
        </p>
      </div>
      <article className="credential-feature credential-reveal">
        <button
          className="credential-feature-button"
          data-credential-id={featured.id}
          aria-label={`Explore ${featured.title}`}
          onClick={(e) => open(featured, e.currentTarget)}
        >
          <span className="credential-feature-copy">
            <span className="eyebrow">{categoryLabel(featured)} · AI & AGENTS</span>
            <span className="credential-feature-title serif">
              Foundations for
              <br />
              <em>what comes next.</em>
            </span>
            <span className="credential-title">{featured.title}</span>
            <span className="credential-byline">
              {featured.issuer} · {featured.issuedDate}
            </span>
            <span className="credential-action">
              View achievement <ArrowUpRight size={18} />
            </span>
          </span>
          <span className="credential-feature-art">
            <img
              className="credential-paper"
              src={featured.certificateImage}
              alt="Oracle Agentic AI recognition certificate"
              width="1056"
              height="816"
              loading="lazy"
            />
            <img
              className="credential-oracle-badge"
              src={featured.badgeImage}
              alt="Oracle Agentic AI Foundations Associate badge"
              width="552"
              height="276"
              loading="lazy"
            />
          </span>
        </button>
      </article>
      <div className="credential-collection-heading credential-reveal">
        <h3 className="serif">A little closer to the cloud.</h3>
        <p>AWS training & badges</p>
      </div>
      <div className="credential-training-grid">
        {training.map((item) => (
          <article className="credential-training credential-reveal" key={item.id}>
            <button
              data-credential-id={item.id}
              aria-label={`Explore ${item.title}`}
              onClick={(e) => open(item, e.currentTarget)}
            >
              <span className="credential-badge-stage">
                <img
                  src={item.badgeImage}
                  alt={`${item.title} training badge`}
                  width="601"
                  height="601"
                  loading="lazy"
                />
              </span>
              <span className="eyebrow">Training completion</span>
              <span className="credential-title">{item.title}</span>
              <span className="credential-byline">
                {item.issuer}
                <br />
                {item.issuedDate}
              </span>
              <span className="credential-action">
                Badge & certificate <ArrowUpRight size={17} />
              </span>
            </button>
          </article>
        ))}
      </div>
      <article className="credential-internship credential-reveal">
        <button
          data-credential-id={internship.id}
          aria-label={`Explore ${internship.title}`}
          onClick={(e) => open(internship, e.currentTarget)}
        >
          <span className="internship-paper">
            <img
              src={internship.certificateImage}
              alt="EduSkills virtual internship certificate, public-safe preview"
              width="794"
              height="1123"
              loading="lazy"
            />
          </span>
          <span className="internship-copy">
            <span className="eyebrow">VIRTUAL INTERNSHIP · EIGHT WEEKS</span>
            <span className="credential-feature-title serif">
              Learning through
              <br />
              <em>practice.</em>
            </span>
            <span className="credential-title">{internship.title}</span>
            <span className="credential-byline">
              {internship.issuer}
              <br />
              {internship.issuedDate}
            </span>
            <span className="internship-curriculum">Curriculum provided by AWS Educate.</span>
            <span className="credential-action">
              View achievement <ArrowUpRight size={18} />
            </span>
          </span>
        </button>
      </article>
      <div className="credential-additional credential-reveal">
        <h3 className="serif">Along the way.</h3>
        <p>More learning milestones</p>
        <div>
          {additional.map((item) => (
            <button
              key={item.id}
              data-credential-id={item.id}
              aria-label={`Explore ${item.title}`}
              onClick={(e) => open(item, e.currentTarget)}
            >
              <span>
                <span className="credential-title">{item.title}</span>
                <span className="credential-byline">
                  {item.issuer} · {item.year}
                </span>
              </span>
              <ArrowUpRight size={20} />
            </button>
          ))}
        </div>
      </div>
      <dialog
        ref={modal}
        className="credential-dialog"
        aria-labelledby="credential-dialog-title"
        aria-describedby="credential-dialog-description"
        onClose={finishClose}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="credential-dialog-body">
          <div className="credential-dialog-top">
            <span className="eyebrow">ACHIEVEMENT DETAILS</span>
            <button
              ref={closeButton}
              className="credential-close"
              aria-label="Close achievement"
              onClick={close}
            >
              <X size={22} />
            </button>
          </div>
          {selected && (
            <>
              <p className="credential-dialog-category">{categoryLabel(selected)}</p>
              <h2 id="credential-dialog-title" className="serif">
                {selected.title}
              </h2>
              <p id="credential-dialog-description">{selected.description}</p>
              <dl className="credential-facts">
                <div>
                  <dt>Issued by</dt>
                  <dd>{selected.issuer}</dd>
                </div>
                <div>
                  <dt>
                    {selected.type === "virtual-internship"
                      ? "Completion period"
                      : "Issue / completion date"}
                  </dt>
                  <dd>{selected.issuedDate}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{selected.category}</dd>
                </div>
              </dl>
              {selected.badgeImage && (
                <figure
                  className={`credential-dialog-badge ${selected.id === featured.id ? "oracle-badge-background" : ""}`}
                >
                  <img src={selected.badgeImage} alt={`${selected.title} badge`} />
                  <figcaption>Achievement badge</figcaption>
                </figure>
              )}
              {selected.certificateImage ? (
                <figure className="credential-preview">
                  <figcaption>Certificate preview</figcaption>
                  <a
                    href={selected.certificateImage}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View certificate: ${selected.title}`}
                  >
                    <img src={selected.certificateImage} alt={`${selected.title} certificate`} />
                  </a>
                  <a
                    className="credential-action"
                    href={selected.certificateImage}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View certificate <ArrowUpRight size={17} />
                  </a>
                </figure>
              ) : (
                <p className="credential-no-preview">
                  A certificate image is not available for this existing learning record.
                </p>
              )}
              {selected.verificationUrl && (
                <a
                  className="credential-action"
                  href={selected.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Verify credential <ArrowUpRight size={17} />
                </a>
              )}
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
