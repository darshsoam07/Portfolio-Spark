import { useState } from "react";

interface PipelineNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  status: "nominal" | "active" | "standby";
  metrics: { label: string; value: string }[];
  description: string;
}

const NODES: PipelineNode[] = [
  {
    id: "node-1",
    name: "Developer Station",
    category: "Source & Trigger",
    x: 60,
    y: 120,
    status: "nominal",
    metrics: [
      { label: "VCS", value: "Git / Main branch" },
      { label: "Hook", value: "Pre-commit Lint" },
    ],
    description: "Local commit signed and pushed upstream to trigger automation webhooks.",
  },
  {
    id: "node-2",
    name: "GitHub Actions",
    category: "CI Engine",
    x: 230,
    y: 120,
    status: "active",
    metrics: [
      { label: "Runner", value: "Ubuntu 22.04" },
      { label: "Build Time", value: "1m 42s" },
    ],
    description: "Automated test matrix, container image creation, and security scanning.",
  },
  {
    id: "node-3",
    name: "Terraform State",
    category: "IaC Engine",
    x: 400,
    y: 50,
    status: "nominal",
    metrics: [
      { label: "Backend", value: "AWS S3 + Lock" },
      { label: "Resources", value: "18 Managed" },
    ],
    description: "Declarative AWS infrastructure provisioning with state-locking guarantees.",
  },
  {
    id: "node-4",
    name: "Docker Registry",
    category: "Artifact Packaging",
    x: 400,
    y: 190,
    status: "nominal",
    metrics: [
      { label: "Layers", value: "Multi-stage alpine" },
      { label: "Image Scan", value: "0 Critical" },
    ],
    description: "Immutable production image storage with digest verification.",
  },
  {
    id: "node-5",
    name: "Kubernetes (EKS)",
    category: "Orchestration",
    x: 570,
    y: 120,
    status: "active",
    metrics: [
      { label: "Rollout", value: "Zero-Downtime" },
      { label: "Replicas", value: "3/3 Ready" },
    ],
    description: "Pod scheduling, ingress routing, health checks, and rolling updates.",
  },
  {
    id: "node-6",
    name: "CloudWatch Telemetry",
    category: "Observability",
    x: 740,
    y: 120,
    status: "nominal",
    metrics: [
      { label: "Latency", value: "24ms" },
      { label: "Health", value: "100% OK" },
    ],
    description: "Real-time metrics, automated alarm policies, and log stream aggregation.",
  },
];

export default function PipelineTopology() {
  const [activeNode, setActiveNode] = useState<PipelineNode>(NODES[1]);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#06090e]/90 p-6 backdrop-blur-md transition-colors hover:border-brass-400/30">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brass-300">
            Specimen 01 // Interactive Telemetry
          </span>
          <h3 className="display-serif mt-1 text-xl font-medium text-paper sm:text-2xl">
            Cloud & DevOps Deployment Architecture
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-fog">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>STATUS: STREAMING</span>
        </div>
      </div>

      {/* SVG Circuit Canvas */}
      <div className="relative my-6 overflow-x-auto">
        <svg viewBox="0 0 800 240" className="w-full min-w-[700px] select-none">
          <defs>
            <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c9a35f" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#c9a35f" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c9a35f" stopOpacity="0.1" />
            </linearGradient>
            <style>{`
              @keyframes flow {
                from { stroke-dashoffset: 40; }
                to { stroke-dashoffset: 0; }
              }
              .circuit-active {
                stroke-dasharray: 6 10;
                animation: flow 1.2s linear infinite;
              }
            `}</style>
          </defs>

          {/* Connection Traces */}
          <path d="M 60 120 L 230 120" stroke="#27272a" strokeWidth="2" />
          <path d="M 230 120 L 400 50" stroke="#27272a" strokeWidth="2" />
          <path d="M 230 120 L 400 190" stroke="#27272a" strokeWidth="2" />
          <path d="M 400 50 L 570 120" stroke="#27272a" strokeWidth="2" />
          <path d="M 400 190 L 570 120" stroke="#27272a" strokeWidth="2" />
          <path d="M 570 120 L 740 120" stroke="#27272a" strokeWidth="2" />

          {/* Dynamic Active Signal Flow */}
          <path d="M 60 120 L 230 120" stroke="#c9a35f" strokeWidth="2" className="circuit-active" />
          <path d="M 230 120 L 400 190" stroke="#c9a35f" strokeWidth="2" className="circuit-active" />
          <path d="M 400 190 L 570 120" stroke="#c9a35f" strokeWidth="2" className="circuit-active" />
          <path d="M 570 120 L 740 120" stroke="#c9a35f" strokeWidth="2" className="circuit-active" />

          {/* Interactive Nodes */}
          {NODES.map((node) => {
            const isSelected = activeNode.id === node.id;
            return (
              <g
                key={node.id}
                onClick={() => setActiveNode(node)}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="24"
                  fill={isSelected ? "#1a160f" : "#0d1117"}
                  stroke={isSelected ? "#c9a35f" : "#3f3f46"}
                  strokeWidth={isSelected ? "2.5" : "1.5"}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="6"
                  fill={isSelected ? "#c9a35f" : "#71717a"}
                />
                <text
                  x={node.x}
                  y={node.y + 38}
                  textAnchor="middle"
                  fill={isSelected ? "#ece7d9" : "#9aa3b2"}
                  className="font-mono text-[11px] font-medium"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Node Diagnostic Inspector */}
      <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-[#090d14]/90 p-5 font-mono md:grid-cols-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-faint">SELECTED SUBSYSTEM</span>
          <p className="mt-1 text-sm font-semibold text-paper">{activeNode.name}</p>
          <span className="text-xs text-brass-300">{activeNode.category}</span>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-faint">SUBSYSTEM TELEMETRY</span>
          <div className="mt-1 space-y-1">
            {activeNode.metrics.map((m, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className="text-fog">{m.label}:</span>
                <span className="text-paper">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-faint">DIAGNOSTIC SUMMARY</span>
          <p className="mt-1 text-xs leading-relaxed text-paper-dim">
            {activeNode.description}
          </p>
        </div>
      </div>
    </div>
  );
}
