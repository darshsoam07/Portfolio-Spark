import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  Play,
  RotateCcw,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import { MOTION, SECTION_REVEAL, VIEWPORT_REVEAL } from "@/lib/motion";

export interface TopologyNode {
  id: string;
  name: string;
  shortName: string;
  tierId: "tier-1" | "tier-2" | "tier-3" | "tier-4";
  tierNum: string;
  tierLabel: string;
  healthPill: string;
  healthStatus: "healthy" | "nominal" | "synced";
  accentColor: string;
  x: number; // Center X in SVG viewBox 0 0 960 620
  y: number; // Center Y in SVG viewBox 0 0 960 620
  icon: "globe" | "cloud" | "server" | "boxes" | "cpu" | "git" | "database" | "shield" | "activity";
  specs: { label: string; value: string }[];
  metrics: {
    label: string;
    value: string;
    pct: number;
    color: string;
  }[];
  role: string;
  description: string;
  connectsTo: string[];
}

export const TOPOLOGY_NODES: TopologyNode[] = [
  // ── Tier 1: Edge & Ingress ──
  {
    id: "route53",
    name: "Amazon Route 53 DNS",
    shortName: "Route 53",
    tierId: "tier-1",
    tierNum: "01",
    tierLabel: "Tier 1: Edge & Ingress",
    healthPill: "100% Uptime",
    healthStatus: "healthy",
    accentColor: "#38bdf8",
    x: 190,
    y: 85,
    icon: "globe",
    specs: [
      { label: "Hosted Zone", value: "darshsoam.dev" },
      { label: "Routing Policy", value: "Latency-Based Anycast" },
      { label: "Health Probes", value: "15s Interval / Multi-Region" },
      { label: "DNSSEC", value: "Active (ECDSA P-256)" },
    ],
    metrics: [
      { label: "Resolution Latency", value: "12ms", pct: 14, color: "#38bdf8" },
      { label: "Query Ingestion", value: "48.2k req/min", pct: 48, color: "#10b981" },
      { label: "SLA Availability", value: "100.0%", pct: 100, color: "#10b981" },
    ],
    role: "Global Anycast DNS authority directing client traffic to nearest AWS edge points of presence.",
    description:
      "Resolves public domain queries with sub-15ms edge latency, automated failover routing, and cryptographic DNSSEC verification.",
    connectsTo: ["cloudfront"],
  },
  {
    id: "cloudfront",
    name: "Amazon CloudFront CDN",
    shortName: "CloudFront CDN",
    tierId: "tier-1",
    tierNum: "01",
    tierLabel: "Tier 1: Edge & Ingress",
    healthPill: "99.99% Cache Hit",
    healthStatus: "healthy",
    accentColor: "#38bdf8",
    x: 480,
    y: 85,
    icon: "cloud",
    specs: [
      { label: "Edge Locations", value: "450+ Global PoPs" },
      { label: "TLS Version", value: "TLS 1.3 / HTTP/3 Active" },
      { label: "DDoS Mitigation", value: "AWS Shield Standard" },
      { label: "Origin Target", value: "ALB DualStack Ingress" },
    ],
    metrics: [
      { label: "Edge Latency", value: "18ms", pct: 20, color: "#38bdf8" },
      { label: "Cache Hit Ratio", value: "94.8%", pct: 95, color: "#10b981" },
      { label: "SSL Handshake", value: "4.2ms", pct: 8, color: "#10b981" },
    ],
    role: "Edge caching, Brotli compression, and distributed TLS termination terminating connections close to users.",
    description:
      "Accelerates content delivery while shielding the core compute clusters against layer 3/4 volumetric DDoS attacks.",
    connectsTo: ["alb"],
  },
  {
    id: "alb",
    name: "AWS Application Load Balancer",
    shortName: "AWS ALB Ingress",
    tierId: "tier-1",
    tierNum: "01",
    tierLabel: "Tier 1: Edge & Ingress",
    healthPill: "Zero Dropped Conn",
    healthStatus: "healthy",
    accentColor: "#38bdf8",
    x: 770,
    y: 85,
    icon: "server",
    specs: [
      { label: "VPC Association", value: "vpc-prod-01 (10.0.0.0/16)" },
      { label: "Routing Algorithm", value: "Least Outstanding Requests" },
      { label: "AWS WAF", value: "OWASP Top 10 + Rate Limiting" },
      { label: "Target Groups", value: "EKS Ingress NodePort / 8080" },
    ],
    metrics: [
      { label: "Ingress Latency", value: "22ms", pct: 24, color: "#38bdf8" },
      { label: "Target Health", value: "6/6 Nodes Ready", pct: 100, color: "#10b981" },
      { label: "HTTP 2xx Rate", value: "99.98%", pct: 99, color: "#10b981" },
    ],
    role: "Layer 7 HTTP/HTTPS traffic dispatcher managing ingress routing, path-based dispatch, and WAF inspection.",
    description:
      "Performs TLS offloading, dynamic health checking, and distributes client traffic evenly across Kubernetes worker nodes.",
    connectsTo: ["eks", "pods"],
  },

  // ── Tier 2: Compute & Orchestration ──
  {
    id: "eks",
    name: "Amazon EKS Cluster Control",
    shortName: "Amazon EKS",
    tierId: "tier-2",
    tierNum: "02",
    tierLabel: "Tier 2: Compute & Orchestration",
    healthPill: "99.99% Uptime",
    healthStatus: "healthy",
    accentColor: "#10b981",
    x: 190,
    y: 225,
    icon: "boxes",
    specs: [
      { label: "Cluster Name", value: "eks-prod-01" },
      { label: "Kubernetes Version", value: "v1.29.2 Managed" },
      { label: "Control Plane", value: "Multi-AZ Highly Available" },
      { label: "Network CNI", value: "AWS VPC CNI (Direct IP)" },
    ],
    metrics: [
      { label: "CPU Allocation", value: "42% / 16 vCPU", pct: 42, color: "#10b981" },
      { label: "Memory Utilization", value: "58% / 64 GB", pct: 58, color: "#f59e0b" },
      { label: "Pod Density", value: "12/12 Ready", pct: 100, color: "#10b981" },
    ],
    role: "Production-grade container orchestration managing pod scheduling, service discovery, and declarative rollouts.",
    description:
      "Maintains desired system state across EC2 compute nodes, providing zero-downtime rolling upgrades and native VPC networking.",
    connectsTo: ["pods", "cloudwatch", "prometheus"],
  },
  {
    id: "pods",
    name: "Dockerized Worker Pods",
    shortName: "K8s Worker Pods",
    tierId: "tier-2",
    tierNum: "02",
    tierLabel: "Tier 2: Compute & Orchestration",
    healthPill: "12/12 Ready",
    healthStatus: "healthy",
    accentColor: "#10b981",
    x: 480,
    y: 225,
    icon: "cpu",
    specs: [
      { label: "Container Runtime", value: "containerd v1.7.1" },
      { label: "Base Image", value: "gcr.io/distroless/static" },
      { label: "Restart Policy", value: "Always (Self-Healing)" },
      { label: "Health Probes", value: "Liveness / Readiness / Startup" },
    ],
    metrics: [
      { label: "Workload Latency", value: "16ms", pct: 18, color: "#10b981" },
      { label: "CPU Throttling", value: "0.02% (Nominal)", pct: 4, color: "#10b981" },
      { label: "Memory Limit", value: "180MB / Pod", pct: 35, color: "#38bdf8" },
    ],
    role: "Stateless containerized application microservices handling transactional compute with sub-20ms execution times.",
    description:
      "Packaged via hardened multi-stage Docker builds, isolated with Linux cgroups/namespaces, and instrumented with Prometheus endpoints.",
    connectsTo: ["asg", "cloudwatch", "prometheus"],
  },
  {
    id: "asg",
    name: "EC2 Auto-Scaling Group",
    shortName: "Auto-Scaling ASG",
    tierId: "tier-2",
    tierNum: "02",
    tierLabel: "Tier 2: Compute & Orchestration",
    healthPill: "Dynamic Capacity",
    healthStatus: "healthy",
    accentColor: "#10b981",
    x: 770,
    y: 225,
    icon: "server",
    specs: [
      { label: "Instance Family", value: "c6i.xlarge (Spot + On-Demand)" },
      { label: "Scaling Boundaries", value: "Min 3 / Desired 4 / Max 10" },
      { label: "Scaling Policy", value: "Target Tracking (CPU @ 65%)" },
      { label: "Warm Pool", value: "Enabled (Sub-45s Provisioning)" },
    ],
    metrics: [
      { label: "Active Nodes", value: "4 Nodes Managed", pct: 40, color: "#10b981" },
      { label: "Scale-Out Speed", value: "45s Provision", pct: 75, color: "#38bdf8" },
      { label: "Spot Cost Savings", value: "62% vs On-Demand", pct: 62, color: "#f59e0b" },
    ],
    role: "Elastic compute infrastructure provisioning dynamic worker capacity based on real-time traffic demand.",
    description:
      "Executes mixed instance strategies combining On-Demand baseline instances with Spot fleet compute to optimize infrastructure spend.",
    connectsTo: ["eks"],
  },

  // ── Tier 3: IaC & Deployment Pipeline ──
  {
    id: "github_actions",
    name: "GitHub Actions CI/CD",
    shortName: "GitHub Actions",
    tierId: "tier-3",
    tierNum: "03",
    tierLabel: "Tier 3: IaC & Deployment Pipeline",
    healthPill: "Pipeline Green",
    healthStatus: "healthy",
    accentColor: "#f59e0b",
    x: 190,
    y: 365,
    icon: "git",
    specs: [
      { label: "Runner Matrix", value: "ubuntu-22.04 LTS" },
      { label: "AWS Authentication", value: "OIDC Role-Based (Zero Secret)" },
      { label: "Security Gates", value: "Static Lint + Semgrep CVE" },
      { label: "Pipeline Trigger", value: "git push origin main" },
    ],
    metrics: [
      { label: "Build Duration", value: "2m 14s", pct: 28, color: "#10b981" },
      { label: "Test Coverage", value: "94.6%", pct: 95, color: "#10b981" },
      { label: "Deploy Reliability", value: "100% (Last 50)", pct: 100, color: "#10b981" },
    ],
    role: "Continuous integration and delivery engine executing automated unit tests, vulnerability checks, and container image builds.",
    description:
      "Validates pull requests, runs automated integration test suites, builds multi-platform container images, and dispatches GitOps triggers.",
    connectsTo: ["docker_registry", "terraform_state"],
  },
  {
    id: "docker_registry",
    name: "Amazon ECR Container Registry",
    shortName: "Amazon ECR",
    tierId: "tier-3",
    tierNum: "03",
    tierLabel: "Tier 3: IaC & Deployment Pipeline",
    healthPill: "0 CVEs Detected",
    healthStatus: "healthy",
    accentColor: "#f59e0b",
    x: 480,
    y: 365,
    icon: "database",
    specs: [
      { label: "Repository", value: "ecr-prod-workloads" },
      { label: "Tag Immutability", value: "Enforced (SHA-256 Pinned)" },
      { label: "Vulnerability Scan", value: "AWS Inspector / Continuous" },
      { label: "Replication", value: "Cross-Region S3 Backed" },
    ],
    metrics: [
      { label: "Push Latency", value: "8.2s (Cached)", pct: 16, color: "#10b981" },
      { label: "Image Size", value: "68MB Hardened", pct: 22, color: "#38bdf8" },
      { label: "Security Status", value: "0 Critical / 0 High", pct: 100, color: "#10b981" },
    ],
    role: "Private, secure OCI container artifact store maintaining encrypted, version-pinned application container images.",
    description:
      "Stores multi-stage Docker artifacts, scans for vulnerabilities automatically upon push, and replicates images for low-latency node pulls.",
    connectsTo: ["pods", "eks"],
  },
  {
    id: "terraform_state",
    name: "Terraform State & Lock",
    shortName: "Terraform IaC",
    tierId: "tier-3",
    tierNum: "03",
    tierLabel: "Tier 3: IaC & Deployment Pipeline",
    healthPill: "Zero Drift",
    healthStatus: "synced",
    accentColor: "#f59e0b",
    x: 770,
    y: 365,
    icon: "layers",
    specs: [
      { label: "IaC Version", value: "Terraform v1.7.5 HCL" },
      { label: "State Backend", value: "AWS S3 Bucket (AES-256 KMS)" },
      { label: "Concurrency Lock", value: "AWS DynamoDB Lock Table" },
      { label: "Managed Primitives", value: "VPC, EKS, IAM, SecurityGroups" },
    ],
    metrics: [
      { label: "Configuration Drift", value: "0.00% Zero Drift", pct: 100, color: "#10b981" },
      { label: "Plan Verification", value: "2.1s", pct: 12, color: "#10b981" },
      { label: "Managed Resources", value: "84 Declarative Items", pct: 84, color: "#f59e0b" },
    ],
    role: "Declarative Infrastructure as Code engine enforcing state locking and version control to eliminate configuration drift.",
    description:
      "Provisions VPC topology, public/private subnets, IAM boundaries, and security group ingress rules deterministically through GitOps.",
    connectsTo: ["alb", "eks", "iam"],
  },

  // ── Tier 4: Observability & Security ──
  {
    id: "cloudwatch",
    name: "Amazon CloudWatch Telemetry",
    shortName: "CloudWatch Logs",
    tierId: "tier-4",
    tierNum: "04",
    tierLabel: "Tier 4: Observability & Security",
    healthPill: "Stream Active",
    healthStatus: "healthy",
    accentColor: "#a855f7",
    x: 190,
    y: 505,
    icon: "activity",
    specs: [
      { label: "Log Destination", value: "/aws/eks/prod-cluster" },
      { label: "Log Retention", value: "30 Days (KMS Encrypted)" },
      { label: "Alarms Configured", value: "14 Composite Anomaly Alarms" },
      { label: "Resolution", value: "10-Second High-Res Metrics" },
    ],
    metrics: [
      { label: "Log Ingestion", value: "1.8k events/sec", pct: 38, color: "#a855f7" },
      { label: "Metric Jitter", value: "< 2ms", pct: 6, color: "#10b981" },
      { label: "Alarm State", value: "0 In Alarm (All Clear)", pct: 100, color: "#10b981" },
    ],
    role: "Native AWS centralized observability platform aggregating host metrics, application log streams, and anomaly alerts.",
    description:
      "Captures stdout/stderr from Kubernetes pods via Fluent Bit daemonsets, triggers automated SNS ops alerts, and tracks cluster vital signs.",
    connectsTo: ["prometheus"],
  },
  {
    id: "prometheus",
    name: "Prometheus & Grafana Suite",
    shortName: "Prometheus Metric",
    tierId: "tier-4",
    tierNum: "04",
    tierLabel: "Tier 4: Observability & Security",
    healthPill: "Scrape Interval 15s",
    healthStatus: "healthy",
    accentColor: "#a855f7",
    x: 480,
    y: 505,
    icon: "activity",
    specs: [
      { label: "Storage Engine", value: "TSDB Persistent Volume Claim" },
      { label: "Scrape Targets", value: "42 Endpoints (100% Up)" },
      { label: "Dashboard Standard", value: "RED & USE Methodology" },
      { label: "Alert Notification", value: "Webhook Router to Slack/CLI" },
    ],
    metrics: [
      { label: "P99 Service Latency", value: "28ms", pct: 28, color: "#10b981" },
      { label: "Error Budget SLA", value: "99.98% Remaining", pct: 99, color: "#10b981" },
      { label: "Active Metric Series", value: "18,400 Series", pct: 55, color: "#38bdf8" },
    ],
    role: "Time-series telemetry storage and PromQL querying engine visualizing real-time infrastructure and application SLOs.",
    description:
      "Scrapes pod `/metrics` endpoints every 15 seconds, computes percentile latency distributions, and exports dashboards to Grafana.",
    connectsTo: ["cloudwatch"],
  },
  {
    id: "iam",
    name: "AWS IAM Roles & Policies (IRSA)",
    shortName: "AWS IAM & IRSA",
    tierId: "tier-4",
    tierNum: "04",
    tierLabel: "Tier 4: Observability & Security",
    healthPill: "Least Privilege",
    healthStatus: "healthy",
    accentColor: "#a855f7",
    x: 770,
    y: 505,
    icon: "shield",
    specs: [
      { label: "Service Account Auth", value: "IAM Roles for Service Accounts" },
      { label: "Identity Provider", value: "OIDC Web Identity Federation" },
      { label: "Credential Lifetime", value: "60-Minute Temporary Tokens" },
      { label: "KMS Envelope", value: "AWS Customer Managed Key" },
    ],
    metrics: [
      { label: "CIS Compliance", value: "100% Benchmark Pass", pct: 100, color: "#10b981" },
      { label: "Token Rotation", value: "Automated STS Exchange", pct: 100, color: "#10b981" },
      { label: "Unauthorized Access", value: "0 Denied Events", pct: 100, color: "#10b981" },
    ],
    role: "Identity and access governance enforcing fine-grained least-privilege security boundaries across Kubernetes workloads.",
    description:
      "Eliminates hardcoded credentials by issuing scoped STS credentials directly to Kubernetes service accounts via OIDC trust relationships.",
    connectsTo: ["eks", "terraform_state"],
  },
];

const TIER_BANDS = [
  {
    id: "tier-1",
    label: "TIER 01 // EDGE & INGRESS",
    sub: "Global DNS Resolution, CDN Caching & Layer 7 Load Balancing",
    y: 22,
    h: 120,
    accent: "#38bdf8",
  },
  {
    id: "tier-2",
    label: "TIER 02 // COMPUTE & ORCHESTRATION",
    sub: "Kubernetes Control Plane, Worker Pods & Auto-Scaling Fleets",
    y: 162,
    h: 120,
    accent: "#10b981",
  },
  {
    id: "tier-3",
    label: "TIER 03 // IAC & DEPLOYMENT PIPELINE",
    sub: "Automated CI/CD Delivery, Container Registry & Terraform State Locking",
    y: 302,
    h: 120,
    accent: "#f59e0b",
  },
  {
    id: "tier-4",
    label: "TIER 04 // OBSERVABILITY & SECURITY",
    sub: "Centralized Telemetry, Time-Series Metrics & IRSA Identity Governance",
    y: 442,
    h: 120,
    accent: "#a855f7",
  },
];

export function SystemsTopology() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("eks");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(-1);

  const selectedNode =
    TOPOLOGY_NODES.find((node) => node.id === selectedNodeId) || TOPOLOGY_NODES[3];

  const activeNodeId = hoveredNodeId ?? selectedNodeId;
  const activeNode =
    TOPOLOGY_NODES.find((node) => node.id === activeNodeId) || selectedNode;

  // Determine active downstream conduits
  const activeConnections = activeNode.connectsTo;

  // Simulation sequence: Commits -> CI -> Registry -> EKS -> Pods -> Telemetry
  const SIM_SEQUENCE = [
    "github_actions",
    "docker_registry",
    "eks",
    "pods",
    "cloudwatch",
    "prometheus",
  ];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(0);
    setSelectedNodeId(SIM_SEQUENCE[0]);

    const interval = setInterval(() => {
      setSimStep((prev) => {
        const next = prev + 1;
        if (next >= SIM_SEQUENCE.length) {
          clearInterval(interval);
          setIsSimulating(false);
          return 0;
        }
        setSelectedNodeId(SIM_SEQUENCE[next]);
        return next;
      });
    }, 1300);
  };

  const getNodeIcon = (type: TopologyNode["icon"]) => {
    switch (type) {
      case "globe":
        return <Globe className="w-4 h-4" />;
      case "cloud":
        return <Cloud className="w-4 h-4" />;
      case "server":
        return <Server className="w-4 h-4" />;
      case "boxes":
        return <Boxes className="w-4 h-4" />;
      case "cpu":
        return <Cpu className="w-4 h-4" />;
      case "git":
        return <GitBranch className="w-4 h-4" />;
      case "database":
        return <Database className="w-4 h-4" />;
      case "layers":
        return <Layers className="w-4 h-4" />;
      case "activity":
        return <Activity className="w-4 h-4" />;
      case "shield":
        return <ShieldCheck className="w-4 h-4" />;
      default:
        return <Server className="w-4 h-4" />;
    }
  };

  return (
    <motion.section
      id="systems"
      variants={SECTION_REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_REVEAL}
      className="relative py-24 md:py-32 px-6 md:px-10 max-w-[1440px] mx-auto border-t border-[rgba(230,240,245,0.08)]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-amber-400 mb-3">
            <Workflow className="w-3.5 h-3.5 text-amber-400" />
            <span>LAYER 03 // SYSTEMS ARCHITECTURE</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#f1f6f7] tracking-tight">
            CLOUD ARCHITECTURE <span className="text-amber-400">CONSOLE.</span>
          </h2>
          <p className="text-[#b3c0c4] text-sm md:text-base max-w-2xl mt-4 font-sans leading-relaxed">
            Deterministic AWS cloud topology, automated GitOps delivery pipelines, and resilient
            multi-tier cluster orchestration. Click or hover any subsystem to inspect live configuration specs.
          </p>
        </div>

        {/* Telemetry Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYS.STATUS: HEALTHY</span>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded font-mono text-xs uppercase tracking-wider transition-all ${
              isSimulating
                ? "bg-amber-400/20 border border-amber-400 text-amber-300 animate-pulse cursor-not-allowed"
                : "bg-amber-400 text-[#080c14] font-bold hover:bg-amber-300 shadow-[0_0_15px_-3px_rgba(245,158,11,0.35)]"
            }`}
          >
            {isSimulating ? (
              <>
                <Activity className="w-3.5 h-3.5 animate-spin" />
                <span>
                  Simulating Step {simStep + 1} / {SIM_SEQUENCE.length}...
                </span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate CI/CD Rollout</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Multi-Tier Canvas + Inspector */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Multi-Tier SVG Architecture Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="relative rounded-2xl border border-amber-500/20 bg-[#05080f] bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px] p-3 sm:p-5 shadow-2xl overflow-hidden will-change-transform">
            {/* Top Canvas Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-[#73848b] pb-3 mb-2 border-b border-[rgba(230,240,245,0.06)]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[#f1f6f7] font-semibold">LIVE TOPOLOGY GRID</span>
                <span>// 4 TIERS · 12 MANAGED NODES</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-amber-400/80">
                <span>CONDUITS: KINETIC ACTIVE</span>
                <span>SIGNAL: 100% NOMINAL</span>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="w-full overflow-x-auto">
              <svg
                viewBox="0 0 960 580"
                className="w-full h-auto min-w-[720px] select-none"
                style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.5))" }}
              >
                <defs>
                  {/* Pipe Gradients */}
                  <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>

                  <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.95" />
                  </linearGradient>

                  <linearGradient id="emeraldGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
                  </linearGradient>

                  <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Glow Filter */}
                  <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ── Tier Background Bands ── */}
                {TIER_BANDS.map((tier) => (
                  <g key={tier.id}>
                    <rect
                      x="10"
                      y={tier.y}
                      width="940"
                      height={tier.h}
                      rx="12"
                      fill="#080c14"
                      fillOpacity="0.85"
                      stroke={tier.accent}
                      strokeOpacity="0.18"
                      strokeWidth="1"
                    />
                    <text
                      x="24"
                      y={tier.y + 18}
                      fill={tier.accent}
                      fontSize="9"
                      fontFamily="IBM Plex Mono, monospace"
                      fontWeight="bold"
                      letterSpacing="0.15em"
                    >
                      {tier.label}
                    </text>
                    <text
                      x="24"
                      y={tier.y + 30}
                      fill="#73848b"
                      fontSize="8"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      {tier.sub}
                    </text>
                  </g>
                ))}

                {/* ── SVG Curved Bézier Conduits with animated pulsing dashes ── */}
                <g className="conduits">
                  {/* Tier 1 Ingress: Route 53 -> CloudFront */}
                  <path
                    id="path-r53-cf"
                    d="M 290 85 L 380 85"
                    stroke="url(#pipeGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />
                  {/* Tier 1 Ingress: CloudFront -> ALB */}
                  <path
                    id="path-cf-alb"
                    d="M 580 85 L 670 85"
                    stroke="url(#pipeGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />
                  {/* Tier 1 to Tier 2: ALB -> EKS */}
                  <path
                    id="path-alb-eks"
                    d="M 720 120 C 720 155, 240 150, 220 185"
                    stroke="url(#pipeGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />
                  {/* Tier 1 to Tier 2: ALB -> Worker Pods */}
                  <path
                    id="path-alb-pods"
                    d="M 770 120 C 770 155, 500 155, 490 185"
                    stroke="url(#pipeGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />

                  {/* Tier 2 Orchestration: EKS -> Worker Pods */}
                  <path
                    id="path-eks-pods"
                    d="M 290 225 L 380 225"
                    stroke="url(#emeraldGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />
                  {/* Tier 2: Auto-Scaling -> EKS */}
                  <path
                    id="path-asg-pods"
                    d="M 670 225 L 580 225"
                    stroke="url(#emeraldGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />

                  {/* Tier 3 CI/CD Continuous Deployment Stream (GitHub Actions -> ECR -> Pods) */}
                  <path
                    id="path-git-ecr"
                    d="M 290 365 L 380 365"
                    stroke="url(#amberGrad)"
                    strokeWidth="2.5"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />
                  <path
                    id="path-ecr-pods"
                    d="M 480 325 L 480 265"
                    stroke="url(#emeraldGrad)"
                    strokeWidth="2.5"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />
                  <path
                    id="path-ecr-eks"
                    d="M 430 330 C 430 300, 260 300, 240 265"
                    stroke="url(#amberGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />

                  {/* Tier 3 IaC: Terraform -> ALB / EKS / IAM */}
                  <path
                    id="path-tf-alb"
                    d="M 820 325 C 840 250, 840 180, 820 125"
                    stroke="url(#amberGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />
                  <path
                    id="path-tf-iam"
                    d="M 770 405 L 770 465"
                    stroke="url(#amberGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />

                  {/* Tier 2 to Tier 4: EKS & Pods -> Telemetry */}
                  <path
                    id="path-eks-cw"
                    d="M 190 265 L 190 465"
                    stroke="url(#cyanGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />
                  <path
                    id="path-pods-prom"
                    d="M 520 265 C 520 320, 520 400, 520 465"
                    stroke="url(#cyanGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />
                  <path
                    id="path-iam-prom"
                    d="M 670 505 L 580 505"
                    stroke="url(#pipeGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />
                  <path
                    id="path-prom-cw"
                    d="M 380 505 L 290 505"
                    stroke="url(#pipeGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className="animate-flow"
                    fill="none"
                  />
                </g>

                {/* ── Glowing Pulses traversing conduits (Requirement 2) ── */}
                {/* 1. Continuous Deployment: GitHub Actions -> Docker Registry -> Pods */}
                <path
                  id="motion-deploy-path"
                  d="M 190 365 L 480 365 L 480 225"
                  fill="none"
                  stroke="none"
                />
                <circle r="4.5" fill="#f59e0b" filter="url(#glow)">
                  <animateMotion dur="2.4s" repeatCount="indefinite">
                    <mpath href="#motion-deploy-path" />
                  </animateMotion>
                </circle>

                {/* 2. Ingress Traffic Pulse: Route 53 -> CloudFront -> ALB -> EKS */}
                <path
                  id="motion-ingress-path"
                  d="M 190 85 L 480 85 L 770 85 C 770 130, 240 150, 190 225"
                  fill="none"
                  stroke="none"
                />
                <circle r="4.5" fill="#38bdf8" filter="url(#glow)">
                  <animateMotion dur="3.2s" repeatCount="indefinite">
                    <mpath href="#motion-ingress-path" />
                  </animateMotion>
                </circle>

                {/* 3. Telemetry Stream Pulse: Pods -> Prometheus */}
                <path
                  id="motion-telemetry-path"
                  d="M 480 225 L 480 365 L 480 505"
                  fill="none"
                  stroke="none"
                />
                <circle r="4" fill="#10b981" filter="url(#glow)">
                  <animateMotion dur="2.0s" repeatCount="indefinite">
                    <mpath href="#motion-telemetry-path" />
                  </animateMotion>
                </circle>

                {/* ── Node Elements (12 Interactive Cyber Specimen Cards) ── */}
                {TOPOLOGY_NODES.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  const isHovered = hoveredNodeId === node.id;
                  const isConnected = activeConnections.includes(node.id);
                  const isSimActive =
                    isSimulating && SIM_SEQUENCE[simStep] === node.id;

                  const w = 200;
                  const h = 76;
                  const rx = node.x - w / 2;
                  const ry = node.y - h / 2;

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer transition-transform duration-200"
                      onClick={() => {
                        if (!isSimulating) setSelectedNodeId(node.id);
                      }}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      style={{ outline: "none" }}
                    >
                      {/* Node Specimen Card Background */}
                      <rect
                        x={rx}
                        y={ry}
                        width={w}
                        height={h}
                        rx="8"
                        fill={
                          isSelected || isSimActive
                            ? "#111827"
                            : isConnected || isHovered
                              ? "#0d131f"
                              : "#070b12"
                        }
                        stroke={
                          isSelected || isSimActive
                            ? node.accentColor
                            : isHovered
                              ? "#f59e0b"
                              : isConnected
                                ? "#38bdf8"
                                : "rgba(230, 240, 245, 0.12)"
                        }
                        strokeWidth={isSelected || isSimActive ? 2 : 1}
                        filter={isSelected ? "url(#glow)" : undefined}
                      />

                      {/* Active Indicator Left Border Bar */}
                      {(isSelected || isSimActive) && (
                        <rect
                          x={rx}
                          y={ry}
                          width="3.5"
                          height={h}
                          rx="2"
                          fill={node.accentColor}
                        />
                      )}

                      {/* Corner Reticle Brackets */}
                      <path
                        d={`M ${rx + 6} ${ry + 2} L ${rx + 2} ${ry + 2} L ${rx + 2} ${ry + 6}`}
                        stroke={node.accentColor}
                        strokeWidth="1.2"
                        fill="none"
                        opacity={isSelected ? "1" : "0.5"}
                      />
                      <path
                        d={`M ${rx + w - 6} ${ry + 2} L ${rx + w - 2} ${ry + 2} L ${rx + w - 2} ${ry + 6}`}
                        stroke={node.accentColor}
                        strokeWidth="1.2"
                        fill="none"
                        opacity={isSelected ? "1" : "0.5"}
                      />
                      <path
                        d={`M ${rx + 6} ${ry + h - 2} L ${rx + 2} ${ry + h - 2} L ${rx + 2} ${ry + h - 6}`}
                        stroke={node.accentColor}
                        strokeWidth="1.2"
                        fill="none"
                        opacity={isSelected ? "1" : "0.5"}
                      />
                      <path
                        d={`M ${rx + w - 6} ${ry + h - 2} L ${rx + w - 2} ${ry + h - 2} L ${rx + w - 2} ${ry + h - 6}`}
                        stroke={node.accentColor}
                        strokeWidth="1.2"
                        fill="none"
                        opacity={isSelected ? "1" : "0.5"}
                      />

                      {/* Node Top Meta: ID and Status Pill */}
                      <text
                        x={rx + 12}
                        y={ry + 18}
                        fill="#73848b"
                        fontSize="8"
                        fontFamily="IBM Plex Mono, monospace"
                        fontWeight="bold"
                        letterSpacing="0.1em"
                      >
                        {node.tierNum} // {node.id.toUpperCase()}
                      </text>

                      {/* Status Dot */}
                      <circle
                        cx={rx + w - 16}
                        cy={ry + 15}
                        r="3.5"
                        fill={
                          isSelected || isSimActive
                            ? node.accentColor
                            : "#10b981"
                        }
                      />

                      {/* Node Primary Title */}
                      <text
                        x={rx + 12}
                        y={ry + 38}
                        fill={
                          isSelected || isHovered
                            ? "#ffffff"
                            : "#f1f6f7"
                        }
                        fontSize="12"
                        fontFamily="Space Grotesk, sans-serif"
                        fontWeight="bold"
                      >
                        {node.shortName}
                      </text>

                      {/* Health / Key Metric Pill on card */}
                      <rect
                        x={rx + 12}
                        y={ry + 49}
                        width={w - 24}
                        height="18"
                        rx="4"
                        fill="rgba(0, 0, 0, 0.45)"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="0.8"
                      />
                      <text
                        x={rx + 18}
                        y={ry + 61}
                        fill={node.accentColor}
                        fontSize="8.5"
                        fontFamily="IBM Plex Mono, monospace"
                        fontWeight="600"
                        letterSpacing="0.05em"
                      >
                        ● {node.healthPill}
                      </text>
                      <text
                        x={rx + w - 18}
                        y={ry + 61}
                        textAnchor="end"
                        fill="#94a3b8"
                        fontSize="8"
                        fontFamily="IBM Plex Mono, monospace"
                      >
                        {node.metrics[0].value}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Controls / Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[rgba(230,240,245,0.06)] font-mono text-[9px] uppercase tracking-wider text-[#73848b]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
                  Edge / Ingress
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                  Compute / K8s
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                  CI/CD & IaC
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#a855f7]" />
                  Observability / IAM
                </span>
              </div>
              <span className="text-zinc-500">
                ACTIVE FOCUS: <span className="text-amber-400 font-bold">{selectedNode.name}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Diagnostic Inspector Pane (Requirement 3) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="rounded-2xl border border-amber-500/30 bg-[#080c14]/95 p-6 shadow-2xl relative overflow-hidden backdrop-blur-md will-change-transform">
            {/* Subtle Amber Glow Accent */}
            <div
              className="absolute -top-16 -right-16 w-36 h-36 rounded-full pointer-events-none opacity-20"
              style={{
                background: `radial-gradient(circle, ${selectedNode.accentColor}, transparent 70%)`,
              }}
            />

            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[rgba(230,240,245,0.08)]">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{ backgroundColor: selectedNode.accentColor }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold">
                  DIAGNOSTIC INSPECTOR
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                ID: {selectedNode.id.toUpperCase()}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: MOTION.interaction.duration }}
                className="space-y-5"
              >
                {/* Subsystem Name & Health Pill */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                      {selectedNode.tierLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-semibold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {selectedNode.healthPill}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-[#f1f6f7] tracking-tight">
                    {selectedNode.name}
                  </h3>
                </div>

                {/* Active Configuration Specs Table */}
                <div className="rounded-xl border border-white/10 bg-[#05080f]/80 p-3.5 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-amber-400 pb-1.5 border-b border-white/5">
                    <span>CONFIGURATION SPECS</span>
                    <span>STATE: VERIFIED</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 pt-1">
                    {selectedNode.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between font-mono text-[10px]"
                      >
                        <span className="text-zinc-500">{spec.label}:</span>
                        <span className="text-zinc-200 font-medium text-right truncate max-w-[190px]">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-Time Metric Gauge Bars (Requirement 3) */}
                <div className="space-y-3">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                    <span>TELEMETRY METRIC GAUGES</span>
                    <span className="text-emerald-400">REAL-TIME</span>
                  </div>

                  {selectedNode.metrics.map((m, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-zinc-400">{m.label}</span>
                        <span
                          className="font-bold"
                          style={{ color: m.color }}
                        >
                          {m.value}
                        </span>
                      </div>
                      {/* Gauge Bar */}
                      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${m.pct}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: m.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* System Role */}
                <div className="rounded-xl bg-[#05080f]/60 border border-white/5 p-3 space-y-1">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                    ARCHITECTURE ROLE
                  </div>
                  <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                    {selectedNode.role}
                  </p>
                </div>

                {/* Downstream Signal Targets */}
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 mb-2">
                    DOWNSTREAM CONDUITS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.connectsTo.map((targetId) => {
                      const target = TOPOLOGY_NODES.find((n) => n.id === targetId);
                      return (
                        <button
                          key={targetId}
                          onClick={() => setSelectedNodeId(targetId)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 font-mono text-[10px] text-amber-300 hover:bg-amber-400 hover:text-[#080c14] transition-all cursor-pointer"
                        >
                          <span>{target?.shortName || targetId}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
