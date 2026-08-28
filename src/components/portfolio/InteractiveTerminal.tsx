import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, X, Maximize2 } from "lucide-react";
import { PROFILE, PROJECTS, CERTIFICATIONS, EDUCATION } from "@/data/portfolioData";
import { SECTION_REVEAL, VIEWPORT_REVEAL } from "@/lib/motion";

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const WELCOME_BANNER = `
  ____                 _        ____                         
 |  _ \\  __ _ _ __ ___| |__    / ___|  ___   __ _ _ __ ___   
 | | | |/ _\` | '__/ __| '_ \\   \\___ \\ / _ \\ / _\` | '_ \` _ \\  
 | |_| | (_| | |  \\__ \\ | | |   ___) | (_) | (_| | | | | | | 
 |____/ \\__,_|_|  |___/_| |_|  |____/ \\___/ \\__,_|_| |_| |_| 
                                                             
 [ DARSH SOAM // CLOUD & DEVOPS INFRASTRUCTURE CLI v2.4.0 ]
 Type 'help' to inspect available system commands.
`;

const INITIAL_LOGS: CommandLog[] = [
  {
    id: "welcome",
    command: "init --system",
    output: (
      <pre className="font-mono text-[11px] sm:text-xs text-[#b7ff3c] leading-tight overflow-x-auto whitespace-pre">
        {WELCOME_BANNER}
      </pre>
    ),
    timestamp: new Date().toLocaleTimeString(),
  },
];

export function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>(INITIAL_LOGS);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [logs]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.toLowerCase().split(" ");
    const mainCmd = parts[0];

    let response: React.ReactNode = null;

    switch (mainCmd) {
      case "help":
        response = (
          <div className="flex flex-col gap-1 font-mono text-xs text-[#b3c0c4]">
            <div className="text-[#38bdf8] font-bold mb-1">AVAILABLE COMMANDS:</div>
            <div><span className="text-[#b7ff3c]">whoami</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Display professional identity and philosophy</div>
            <div><span className="text-[#b7ff3c]">systems</span> &nbsp;&nbsp;&nbsp;&nbsp; - List infrastructure topology components</div>
            <div><span className="text-[#b7ff3c]">projects</span> &nbsp;&nbsp;&nbsp; - Inspect engineered case studies</div>
            <div><span className="text-[#b7ff3c]">stack</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - View technology layers & primitives</div>
            <div><span className="text-[#b7ff3c]">education</span> &nbsp;&nbsp; - Review MIET university credentials</div>
            <div><span className="text-[#b7ff3c]">certs</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - List verified Oracle & OpenAI credentials</div>
            <div><span className="text-[#b7ff3c]">contact</span> &nbsp;&nbsp;&nbsp;&nbsp; - Show verified contact channels</div>
            <div><span className="text-[#b7ff3c]">deploy</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Simulate automated CI/CD pipeline rollout</div>
            <div><span className="text-[#b7ff3c]">clear</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Clear console output</div>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="font-mono text-xs text-[#cbd5e1] leading-relaxed">
            <p className="text-[#b7ff3c] font-bold">{PROFILE.name} — {PROFILE.role}</p>
            <p className="mt-1">{PROFILE.subheadline}</p>
            <p className="text-[#73848b] mt-1">Location: {PROFILE.location.short} ({PROFILE.location.coords})</p>
          </div>
        );
        break;

      case "systems":
        response = (
          <div className="font-mono text-xs text-[#cbd5e1] leading-relaxed">
            <p className="text-[#38bdf8] font-bold mb-1">ENGINEERING TOPOLOGY PIPELINE:</p>
            <p>01. VCS: Git / GitHub</p>
            <p>02. CI/CD: GitHub Actions (Automated build & test)</p>
            <p>03. Container: Docker Multi-stage images</p>
            <p>04. Orchestration: Kubernetes Pods & Services</p>
            <p>05. Cloud: AWS VPC / EC2 / S3 / IAM / RDS</p>
            <p>06. IaC: Terraform declarative state management</p>
            <p>07. Telemetry: CloudWatch, Prometheus & Grafana</p>
            <p>08. Intelligence: Agentic AI & RAG LangChain Workflows</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="flex flex-col gap-2 font-mono text-xs">
            {PROJECTS.map((p) => (
              <div key={p.id} className="p-2 rounded bg-white/5 border border-white/5">
                <span className="text-[#b7ff3c] font-bold">{p.number} // {p.title}</span>
                <p className="text-[#b3c0c4] text-[11px] mt-0.5">{p.problem}</p>
                <p className="text-[#38bdf8] text-[10px] mt-1">Stack: {p.tags.join(" · ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "stack":
        response = (
          <div className="font-mono text-xs text-[#cbd5e1] leading-relaxed">
            <p className="text-[#b7ff3c] font-bold mb-1">TECHNICAL STACK MATRIX:</p>
            <p><span className="text-[#38bdf8]">Cloud & IaC:</span> AWS (EC2, S3, VPC, IAM, RDS), Terraform, Linux</p>
            <p><span className="text-[#38bdf8]">Containers & CI/CD:</span> Docker, Kubernetes, GitHub Actions, Git</p>
            <p><span className="text-[#38bdf8]">Agentic & Gen AI:</span> Agentic AI, LLM Apps, RAG, LangChain</p>
            <p><span className="text-[#38bdf8]">Backend & Languages:</span> Python, Java, Flask, REST APIs, Bash, SQL, SQLite</p>
            <p><span className="text-[#38bdf8]">Security:</span> DevSecOps, Infrastructure & Container Hardening</p>
          </div>
        );
        break;

      case "education":
        response = (
          <div className="font-mono text-xs text-[#cbd5e1]">
            <p className="text-[#b7ff3c] font-bold">{EDUCATION[0].degree}</p>
            <p className="text-[#f1f6f7]">{EDUCATION[0].institution} ({EDUCATION[0].period})</p>
            <p className="text-[#73848b] text-[11px] mt-1">Coursework: {EDUCATION[0].coursework.join(", ")}</p>
          </div>
        );
        break;

      case "certs":
        response = (
          <div className="flex flex-col gap-1 font-mono text-xs text-[#cbd5e1]">
            <p className="text-[#38bdf8] font-bold mb-1">VERIFIED CERTIFICATIONS:</p>
            {CERTIFICATIONS.map((c) => (
              <p key={c.id}>
                <span className="text-[#b7ff3c]">✓ [{c.issuer}]</span> {c.title} ({c.year})
              </p>
            ))}
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="font-mono text-xs text-[#cbd5e1] leading-relaxed">
            <p className="text-[#b7ff3c] font-bold mb-1">DIRECT COMMUNICATION CHANNELS:</p>
            <p>Email: <a href={`mailto:${PROFILE.email}`} className="text-[#38bdf8] hover:underline">{PROFILE.email}</a></p>
            <p>LinkedIn: <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-[#38bdf8] hover:underline">{PROFILE.linkedin}</a></p>
            <p>GitHub: <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-[#38bdf8] hover:underline">{PROFILE.github}</a></p>
            <p>Phone: {PROFILE.phone}</p>
          </div>
        );
        break;

      case "deploy":
        response = (
          <div className="font-mono text-xs text-[#b7ff3c] leading-relaxed space-y-1">
            <p className="text-[#f1f6f7]">[DEPLOY] Starting zero-downtime rolling release to AWS cluster...</p>
            <p>[01/05] Validating Terraform remote state ... <span className="text-[#b7ff3c]">OK (0.3s)</span></p>
            <p>[02/05] Building multi-stage Docker artifact ... <span className="text-[#b7ff3c]">OK (1.2s)</span></p>
            <p>[03/05] Pushing image to container registry ... <span className="text-[#b7ff3c]">OK (0.8s)</span></p>
            <p>[04/05] Scheduling Kubernetes pods (3 replicas) ... <span className="text-[#b7ff3c]">HEALTHY (0.6s)</span></p>
            <p>[05/05] CloudWatch traffic health-checks passing ... <span className="text-[#38bdf8]">100% NOMINAL</span></p>
            <p className="text-[#f1f6f7] font-bold mt-2">✓ SYSTEM DEPLOYMENT SUCCESSFUL [0 errors, 0 warnings]</p>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        return;

      default:
        response = (
          <div className="font-mono text-xs text-[#ff5a5f]">
            Command not recognized: '{trimmed}'. Type <span className="text-[#b7ff3c]">'help'</span> for available commands.
          </div>
        );
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output: response,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <motion.section
      id="terminal"
      variants={SECTION_REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_REVEAL}
      className="relative py-24 md:py-32 px-6 md:px-10 max-w-[1440px] mx-auto border-t border-[rgba(230,240,245,0.08)]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#b7ff3c] mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Interactive System Shell</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#f1f6f7] tracking-tight">
            SYSTEM <span className="text-[#b7ff3c]">CLI.</span>
          </h2>
          <p className="text-[#b3c0c4] text-sm md:text-base max-w-2xl mt-4 font-sans leading-relaxed">
            Explore the portfolio via an interactive terminal. Type <code className="text-[#b7ff3c]">whoami</code>,{" "}
            <code className="text-[#b7ff3c]">systems</code>, <code className="text-[#b7ff3c]">projects</code>, or{" "}
            <code className="text-[#b7ff3c]">deploy</code>.
          </p>
        </div>

        {/* Preset Quick Chips */}
        <div className="flex flex-wrap gap-2">
          {["whoami", "systems", "projects", "stack", "deploy", "certs", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-1 rounded bg-[#0e1317] border border-[rgba(230,240,245,0.1)] font-mono text-[10px] text-[#b3c0c4] hover:border-[#b7ff3c] hover:text-[#b7ff3c] transition-colors"
            >
              ${cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Window Frame */}
      <div className="rounded-xl border border-[rgba(230,240,245,0.12)] bg-[#07090b] shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0e1317] border-b border-[rgba(230,240,245,0.08)]">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ff5a5f]/80" />
            <div className="h-3 w-3 rounded-full bg-[#ffb547]/80" />
            <div className="h-3 w-3 rounded-full bg-[#b7ff3c]/80" />
            <span className="font-mono text-xs text-[#73848b] ml-2">
              darsh@infra-control-room:~
            </span>
          </div>
          <div className="font-mono text-[10px] text-[#73848b] uppercase tracking-wider hidden sm:block">
            BASH / ZSH EMULATOR
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-4 sm:p-6 min-h-[360px] max-h-[500px] overflow-y-auto font-mono text-xs flex flex-col gap-4 cursor-text"
        >
          {logs.map((log) => (
            <div key={log.id} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#73848b] text-[11px]">
                <span className="text-[#b7ff3c]">➜</span>
                <span className="text-[#38bdf8]">darsh-soam</span>
                <span className="text-[#f1f6f7]">{log.command}</span>
                <span className="ml-auto text-[9px] text-[#73848b]">{log.timestamp}</span>
              </div>
              <div className="pl-4">{log.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-2 text-[#f1f6f7]">
            <span className="text-[#b7ff3c]">➜</span>
            <span className="text-[#38bdf8]">darsh-soam</span>
            <span className="text-[#73848b]">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. help, deploy, whoami)..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#f1f6f7] placeholder-[#73848b]/50"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </motion.section>
  );
}
