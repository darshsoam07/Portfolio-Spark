import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ZoneHeader } from "@/components/ZoneHeader";
import { CERTIFICATIONS, EDUCATION, PROFILE, PROJECTS } from "@/data/portfolio";

interface CommandLog {
  id: string;
  command: string;
  output: ReactNode;
  timestamp: string;
}

const ACCENT = "text-orange-300";
const DIM = "text-slate-400";
const CYAN = "text-cyan-300";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const BANNER = [
  " ____  ____        ___  __   ____   _____  __",
  "|  _ \\/ ___|      / _ \\/ /_ | __ ) / _ \\ \\/ /",
  "| | | \\___ \\     | | | | '_ \\|  _ \\| | | \\  / ",
  "| |_| |___) |  _ | |_| | (_) | |_) | |_| /  \\ ",
  "|____/|____/  (_) \\___/ \\___/|____/ \\___/_/\\_\\",
  "",
  " DS-01 BLACK BOX // VOYAGE DATA RECORDER v6.0",
  " DEPTH 6000M — HULL INTEGRITY NOMINAL",
].join("\n");

function useTerminal() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "boot",
      command: "blackbox --recover",
      output: (
        <pre className="overflow-x-auto whitespace-pre font-mono text-[10px] leading-tight text-orange-300/90 sm:text-xs">
          {BANNER}
        </pre>
      ),
      timestamp: "REC ●",
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [logs]);

  const cmd = (label: string, body: ReactNode) => (
    <div className={`flex flex-col gap-1 font-mono text-xs leading-relaxed ${DIM}`}>
      <div className={`font-bold ${CYAN}`}>{label}</div>
      {body}
    </div>
  );

  const handleCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setHistory((p) => [...p, trimmed]);
    setHistoryIndex(-1);
    const main = trimmed.toLowerCase().split(" ")[0];
    let response: ReactNode = null;

    switch (main) {
      case "help":
        response = cmd(
          "RECOVERED COMMANDS:",
          <>
            {[
              ["whoami", "identity & philosophy"],
              ["systems", "infrastructure topology"],
              ["projects", "engineered case studies"],
              ["stack", "technology layers"],
              ["education", "academic record"],
              ["certs", "verified credentials"],
              ["contact", "communication channels"],
              ["deploy", "simulate CI/CD rollout"],
              ["surface", "ascend to 0M"],
              ["clear", "wipe recorder buffer"],
            ].map(([c, d]) => (
              <div key={c}>
                <span className={ACCENT}>{c.padEnd(10)}</span> — {d}
              </div>
            ))}
          </>
        );
        break;
      case "whoami":
        response = cmd(
          `${PROFILE.name} — ${PROFILE.role}`,
          <>
            <p>{PROFILE.subheadline}</p>
            <p className="text-slate-500">
              {PROFILE.location.short} ({PROFILE.location.coords})
            </p>
          </>
        );
        break;
      case "systems":
        response = cmd(
          "TOPOLOGY RECOVERED:",
          <>
            {[
              "01 · VCS — Git / GitHub",
              "02 · CI/CD — GitHub Actions",
              "03 · Containers — Docker multi-stage",
              "04 · Orchestration — Kubernetes",
              "05 · Cloud — AWS VPC / EC2 / S3 / IAM",
              "06 · IaC — Terraform state-managed",
              "07 · Telemetry — CloudWatch / Prometheus",
              "08 · Intelligence — Agentic AI + RAG",
            ].map((l) => (
              <p key={l}>{l}</p>
            ))}
          </>
        );
        break;
      case "projects":
        response = (
          <div className="flex flex-col gap-2 font-mono text-xs">
            {PROJECTS.map((p) => (
              <div key={p.id} className="rounded border border-white/10 bg-white/[0.03] p-2.5">
                <span className={`${ACCENT} font-bold`}>
                  {p.number} // {p.title}
                </span>
                <p className={`${DIM} mt-0.5 text-[11px]`}>{p.tagline}</p>
                <p className={`${CYAN} mt-1 text-[10px]`}>{p.tags.join(" · ")}</p>
              </div>
            ))}
          </div>
        );
        break;
      case "stack":
        response = cmd(
          "TECHNOLOGY LAYERS:",
          <>
              <p><span className={CYAN}>Cloud & IaC:</span> AWS (EC2, S3, VPC, IAM, RDS), Terraform, Linux</p>
              <p><span className={CYAN}>Containers & CI/CD:</span> Docker, Kubernetes, GitHub Actions, Git</p>
              <p><span className={CYAN}>Agentic & Gen AI:</span> Agentic AI, LLM apps, RAG, LangChain</p>
              <p><span className={CYAN}>Backend:</span> Python, Java, Flask, REST APIs, Bash, SQL</p>
              <p><span className={CYAN}>Security:</span> DevSecOps, infra & container hardening</p>
          </>
        );
        break;
      case "education":
        response = cmd(
          EDUCATION[0].degree,
          <>
            <p className="text-slate-200">
              {EDUCATION[0].institution} ({EDUCATION[0].period})
            </p>
            <p className="text-[11px] text-slate-500">
              {EDUCATION[0].coursework.join(", ")}
            </p>
          </>
        );
        break;
      case "certs":
        response = cmd(
          "VERIFIED CREDENTIALS:",
          <>
            {CERTIFICATIONS.map((c) => (
              <p key={c.id}>
                <span className="text-emerald-300">✓ [{c.issuer}]</span> {c.title} ({c.year})
              </p>
            ))}
          </>
        );
        break;
      case "contact":
        response = cmd(
          "CHANNELS:",
          <>
            <p>
              email —{" "}
              <a href={`mailto:${PROFILE.email}`} className={`${CYAN} hover:underline`}>
                {PROFILE.email}
              </a>
            </p>
            <p>
              github —{" "}
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className={`${CYAN} hover:underline`}>
                {PROFILE.githubUsername}
              </a>
            </p>
            <p>phone — {PROFILE.phone}</p>
          </>
        );
        break;
      case "deploy":
        response = (
          <div className={`flex flex-col gap-1 font-mono text-xs leading-relaxed ${ACCENT}`}>
            <p className="text-slate-200">[DEPLOY] Rolling release to AWS cluster…</p>
            <p>[1/5] Terraform state validated … OK</p>
            <p>[2/5] Docker artifact built … OK</p>
            <p>[3/5] Image pushed to registry … OK</p>
            <p>[4/5] K8s pods scheduled (3 replicas) … HEALTHY</p>
            <p>[5/5] CloudWatch health-checks … <span className={CYAN}>100% NOMINAL</span></p>
            <p className="font-bold text-slate-100">✓ DEPLOYMENT SUCCESSFUL — 0 errors</p>
          </div>
        );
        break;
      case "surface":
        response = (
          <div className={`font-mono text-xs ${CYAN}`}>
            ▲ Ascending… see you at the surface.
          </div>
        );
        setLogs((prev) => [
          ...prev,
          { id: `${Date.now()}`, command: trimmed, output: response, timestamp: "REC ●" },
        ]);
        window.setTimeout(() => scrollTo("surface"), 600);
        return;
      case "clear":
        setLogs([]);
        return;
      default:
        response = (
          <div className="font-mono text-xs text-red-400">
            Unrecognized: '{trimmed}'. Type <span className={ACCENT}>'help'</span>.
          </div>
        );
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        command: trimmed,
        output: response,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length) {
        const ni = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(ni);
        setInput(history[history.length - 1 - ni] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const ni = historyIndex - 1;
        setHistoryIndex(ni);
        setInput(history[history.length - 1 - ni] ?? "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return { input, setInput, logs, bottomRef, inputRef, onKeyDown, handleCommand };
}

export function HadalZone() {
  const { input, setInput, logs, bottomRef, inputRef, onKeyDown, handleCommand } = useTerminal();

  return (
    <section id="hadal" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <ZoneHeader
          zoneId="hadal"
          title={
            <>
              The <span className="text-orange-300 text-glow-warm">Black Box</span>
            </>
          }
          blurb="Six thousand meters. If the expedition ever goes dark, this is what survives — every system, credential, and deployment, recoverable from the recorder."
        />

        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border-2 border-orange-500/25 bg-black/85 shadow-[0_0_60px_-18px_rgba(251,146,60,0.45)] backdrop-blur-md">
            {/* Rivets */}
            {["left-3 top-3", "right-3 top-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos) => (
              <span
                key={pos}
                className={`absolute ${pos} z-10 h-2 w-2 rounded-full bg-gradient-to-br from-orange-200/80 to-orange-900/80`}
              />
            ))}

            {/* Recorder header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-500/20 bg-orange-950/30 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-orange-200">
                  DS-01 // Voyage data recorder
                </span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-200/50">
                Do not tamper
              </div>
            </div>

            {/* Screen */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="flex max-h-[480px] min-h-[380px] cursor-text flex-col gap-4 overflow-y-auto p-5 font-mono text-xs sm:p-6"
            >
              {logs.map((log) => (
                <div key={log.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className={ACCENT}>▸</span>
                    <span className="text-orange-200/80">blackbox</span>
                    <span className="text-slate-200">{log.command}</span>
                    <span className="ml-auto text-[9px]">{log.timestamp}</span>
                  </div>
                  <div className="pl-4">{log.output}</div>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1 text-slate-200">
                <span className={ACCENT}>▸</span>
                <span className="text-orange-200/80">blackbox</span>
                <span className="text-slate-500">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="type 'help'…"
                  autoComplete="off"
                  spellCheck={false}
                  className="flex-1 border-none bg-transparent font-mono text-xs text-slate-100 outline-none placeholder:text-slate-600"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-2">
          {["whoami", "systems", "projects", "deploy", "surface", "clear"].map((c) => (
            <button
              key={c}
              onClick={() => handleCommand(c)}
              className="rounded-full border border-orange-500/25 bg-orange-950/30 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-orange-200/80 transition-all hover:border-orange-300/70 hover:text-orange-100"
            >
              ${c}
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
