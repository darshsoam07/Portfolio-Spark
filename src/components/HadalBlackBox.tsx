import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface TerminalLog {
  type: "input" | "output" | "system";
  text: string;
}

export default function HadalBlackBox() {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { type: "system", text: "SYS-01 // CLUSTER TELEMETRY & ROOT CONSOLE INITIALIZED" },
    { type: "system", text: "RUNTIME: AWS US-EAST-1 // KUBERNETES CLUSTER ONLINE // 0 ERRORS" },
    { type: "system", text: "Type 'help' for available infrastructure commands." },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLogs: TerminalLog[] = [...logs, { type: "input", text: trimmed }];

    switch (trimmed.toLowerCase()) {
      case "help":
        newLogs.push({
          type: "output",
          text: "COMMANDS:\n  help           Display diagnostic & operational commands\n  status         Query cluster health & latency metrics\n  cat stack      Print verified DevOps/Cloud architecture layers\n  kubectl pods   Check active deployment instances\n  deploy         Simulate full AWS + K8s release pipeline\n  credentials    Display verified system credentials and audit logs\n  top            Navigate back to Edge Gateway (top)\n  clear          Purge viewport buffer",
        });
        break;

      case "status":
        newLogs.push({
          type: "output",
          text: "ENVIRONMENT: AWS US-EAST-1 // PRODUCTION CLUSTER\nSTATUS: 100% NOMINAL // LATENCY: 18MS\nUPTIME: 99.99% // PACKET LOSS: 0%\nSECURITY: IAM LEAST-PRIVILEGE // ENCRYPTION AES-256",
        });
        break;

      case "cat stack":
        newLogs.push({
          type: "output",
          text: "CORE ARCHITECTURE MATRIX:\n - Cloud & IaC: AWS (EC2, S3, IAM, CloudWatch, VPC), Terraform\n - Delivery: Docker, Kubernetes (EKS), GitHub Actions\n - Core Runtime: Linux Admin, Bash, Python Flask, TypeScript\n - Agentic AI: LangChain, RAG Pipelines, Autonomous Decision Loops",
        });
        break;

      case "kubectl pods":
        newLogs.push({
          type: "output",
          text: "NAME                                   READY   STATUS    RESTARTS   AGE\nexpense-tracker-engine-7945d848-xq9m   1/1     Running   0          42d\nagentic-workflow-runner-52a129ef-p4ln  1/1     Running   0          18d\nportfolio-telemetry-hud-4b998d33-91jk  1/1     Running   0          5h",
        });
        break;

      case "deploy":
        newLogs.push({
          type: "output",
          text: "[DEPLOY] Rolling release to AWS production cluster…\n[1/5] Terraform state validated … OK\n[2/5] Docker artifact built … OK\n[3/5] Image pushed to registry … OK\n[4/5] K8s pods scheduled (3 replicas) … HEALTHY\n[5/5] CloudWatch health-checks … 100% NOMINAL\n✓ DEPLOYMENT SUCCESSFUL — 0 errors",
        });
        break;

      case "top":
      case "gateway":
      case "surface":
        newLogs.push({
          type: "output",
          text: "▲ Navigating to Edge Gateway…",
        });
        setTimeout(() => {
          if (window.__lenis) {
            window.__lenis.scrollTo("#surface", { duration: 1.8 });
          } else {
            document.getElementById("surface")?.scrollIntoView({ behavior: "smooth" });
          }
        }, 400);
        break;

      case "credentials":
      case "recover":
        newLogs.push({
          type: "output",
          text: "QUERYING AUDIT ARCHIVE...\n[VERIFIED] Oracle Certified Foundations Associate (Agentic AI) — 2026\n[VERIFIED] AI-Powered Cloud Engineer Virtual Internship (AWS Educate / EduSkills) — 2026\n[VERIFIED] Data Analytics Simulation (Deloitte) — 2025",
        });
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      default:
        newLogs.push({
          type: "output",
          text: `Command not recognized: '${trimmed}'. Type 'help' for available system operations.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <div
      style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
      className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-brass-600/40 bg-[#040608] shadow-[0_0_50px_rgba(201,163,95,0.08)] font-mono text-xs"
    >
      {/* Scanline & Vignette Effect */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,163,95,0.04)_0%,rgba(0,0,0,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px]" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-brass-600/30 bg-[#090c10] px-4 py-2.5 text-[11px] text-brass-300">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brass-400 animate-pulse" />
          <span className="tracking-widest">SYS-01 // CLUSTER TELEMETRY & ROOT CONSOLE</span>
        </div>
        <div className="tracking-widest text-[9px] text-emerald-400">STATUS: NOMINAL</div>
      </div>

      {/* Terminal Display Area */}
      <div
        ref={scrollRef}
        className="h-84 overflow-y-auto p-5 space-y-2 text-brass-200/90 scrollbar-thin scrollbar-thumb-brass-900 scrollbar-track-transparent"
      >
        <pre className="text-[10px] leading-3 text-brass-400/80 select-none">
{`   ____  ____    ____  ____  ____  ____  _  _ 
  (    \\/ ___)  (  _ \\/  _ \\(  _ \\(  _ \\( \\/ )
   ) D (\\___ \\   )(_) )  O / ) _ ( )   / )  ( 
  (____/(____/  (____/ \\__/ (____/(_)\\_)(_/\\_)`}
        </pre>

        {logs.map((log, i) => (
          <div key={i} className="leading-relaxed">
            {log.type === "input" && (
              <span className="text-paper">
                <span className="text-brass-400 mr-2">ops@cloud-terminal:~$</span>
                {log.text}
              </span>
            )}
            {log.type === "system" && (
              <span className="text-fog">{"// " + log.text}</span>
            )}
            {log.type === "output" && (
              <pre className="font-mono whitespace-pre-wrap text-paper-dim mt-0.5">
                {log.text}
              </pre>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Command Prompt */}
      <div className="flex items-center border-t border-brass-600/30 bg-[#06080b] px-4 py-3">
        <span className="text-brass-400 font-bold mr-2">ops@cloud-terminal:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          className="w-full bg-transparent font-mono text-xs text-paper outline-none placeholder:text-faint"
          placeholder="enter diagnostic instruction (e.g. 'help', 'status', 'kubectl pods')..."
        />
      </div>

      {/* Quick Command Chips */}
      <div className="flex flex-wrap items-center gap-2 border-t border-brass-600/20 bg-[#060a0f] px-4 py-2.5">
        <span className="text-[10px] uppercase tracking-wider text-faint">COMMANDS:</span>
        {["help", "status", "cat stack", "kubectl pods", "deploy", "credentials", "top", "clear"].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleCommand(cmd)}
            className="rounded border border-brass-400/25 bg-brass-400/[0.06] px-2.5 py-1 text-[10px] text-brass-300 transition-colors hover:border-brass-300 hover:text-paper cursor-pointer"
          >
            ${cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
