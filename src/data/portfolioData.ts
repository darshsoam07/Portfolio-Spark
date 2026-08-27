export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  tags: string[];
  featured: boolean;
  problem: string;
  solution: string;
  architecture: string[];
  pipelineSteps: {
    phase: string;
    action: string;
    tech: string;
    details: string;
  }[];
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SystemNode {
  id: string;
  label: string;
  category: "vcs" | "ci" | "container" | "orchestration" | "cloud" | "iac" | "observability" | "ai";
  categoryLabel: string;
  description: string;
  tools: string[];
  connectsTo: string[];
  role: string;
}

export const PROFILE = {
  name: "Darsh Soam",
  firstName: "Darsh",
  lastName: "Soam",
  role: "Cloud & DevOps Engineer",
  positioning: "Infrastructure & Automation Enthusiast",
  headline: "Engineering the systems behind the experience.",
  subheadline:
    "3rd-year B.Tech CS student focused on practical systems at the intersection of Cloud, DevOps, Infrastructure Automation, and Agentic AI.",
  location: {
    city: "Meerut",
    state: "Uttar Pradesh",
    country: "India",
    short: "Meerut, India",
    coords: "28.9845° N, 77.7064° E",
  },
  email: "darshsoam2006@gmail.com",
  phone: "+91-9548461976",
  linkedin: "https://www.linkedin.com/in/darsh-soam-42a605324",
  github: "https://github.com/darshsoam07",
  githubUsername: "darshsoam07",
  resumeUrl: "/resume.pdf",
  philosophy: [
    { step: "01", name: "Design", detail: "System topology & security boundaries" },
    { step: "02", name: "Development", detail: "Python, APIs & microservices" },
    { step: "03", name: "Containerize", detail: "Optimized Docker images & layers" },
    { step: "04", name: "Deploy", detail: "Kubernetes pod scheduling & services" },
    { step: "05", name: "Automate", detail: "Terraform IaC & GitHub Actions CI/CD" },
    { step: "06", name: "Observe", detail: "CloudWatch, telemetry & health metrics" },
    { step: "07", name: "Intelligence", detail: "Agentic AI workflows & RAG integration" },
  ],
} as const;

export const SOCIALS = [
  { key: "github", label: "GitHub", href: PROFILE.github, handle: "@darshsoam07" },
  { key: "linkedin", label: "LinkedIn", href: PROFILE.linkedin, handle: "darsh-soam" },
  { key: "email", label: "Email", href: `mailto:${PROFILE.email}`, handle: PROFILE.email },
] as const;

export const EDUCATION = [
  {
    institution: "Meerut Institute of Engineering and Technology (MIET)",
    degree: "B.Tech in Computer Science Engineering",
    period: "2024 — 2028",
    status: "Current (3rd Year)",
    location: "Meerut, Uttar Pradesh",
    coursework: [
      "Cloud Computing",
      "DevOps Engineering",
      "Software Engineering",
      "Data Structures & Algorithms",
      "Python & Java Programming",
      "Database Management Systems",
      "Cyber & Network Security",
    ],
  },
  {
    institution: "Dayawati Modi Academy",
    degree: "Senior Secondary (Class XII)",
    period: "2023 — 2024",
    status: "Completed",
    location: "India",
    coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
  },
];

export const EXPERIENCE_TRAINING = [
  {
    title: "AI-Powered Cloud Engineer Virtual Internship",
    issuer: "Cloud, AI & Automation Track",
    year: "2026",
    badge: "Virtual Internship",
    summary:
      "Applied cloud engineering concepts through an AI-focused lens, connecting AWS-based workflows with automated pipelines and intelligent, agent-driven applications.",
    keyPoints: [
      "Architected cloud solutions integrating AWS services with automated CI/CD deployment pipelines.",
      "Explored Agentic AI workflows to enhance automated system diagnostics and cloud resource provisioning.",
      "Bridged container orchestration with intelligent lifecycle monitoring.",
    ],
  },
];

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  provider?: string;
  year: string;
  issuedDate: string;
  category: string;
  description: string;
  certificateImage?: string;
  verified: true;
}

export const CERTIFICATIONS: Credential[] = [
  {
    id: "oracle-agentic-ai",
    title: "Oracle Certified Foundations Associate — Agentic AI",
    issuer: "Oracle",
    year: "2026",
    issuedDate: "August 9, 2026",
    category: "AI & Agents",
    description:
      "Oracle Certified recognition for Agentic AI concepts, autonomous decision-making agents, and AI agent workflows.",
    certificateImage: "/certificates/oracle-agentic-ai.jpg",
    verified: true,
  },
  {
    id: "eduskills-cloud-engineer",
    title: "AI-Powered Cloud Engineer Virtual Internship",
    issuer: "EduSkills",
    provider: "Eduskills / AICTE / AWS Educate",
    year: "2026",
    issuedDate: "June – August 2026",
    category: "Cloud Engineering",
    description:
      "8-week virtual internship applying cloud engineering concepts through an AI-focused lens, connecting AWS-based workflows with automated pipelines.",
    certificateImage: "/certificates/eduskills-cloud-engineer.jpg",
    verified: true,
  },
  {
    id: "deloitte-data-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    year: "2025",
    issuedDate: "September 1, 2025",
    category: "Data Analytics",
    description:
      "Certificate of Completion for practical data analysis and forensic technology tasks within Deloitte's simulation program.",
    certificateImage: "/certificates/deloitte-data-analytics.jpg",
    verified: true,
  },
  {
    id: "openai-applied-ai",
    title: "Applied AI Foundations",
    issuer: "OpenAI Academy",
    year: "2026",
    issuedDate: "August 11, 2026",
    category: "Generative AI",
    description:
      "Core principles of applied foundation models, prompt engineering architectures, and embedding-driven semantic processing.",
    certificateImage: "/certificates/openai-applied-ai.jpg",
    verified: true,
  },
  {
    id: "openai-agents-workflows",
    title: "Agents and Workflows",
    issuer: "OpenAI Academy",
    year: "2026",
    issuedDate: "August 11, 2026",
    category: "Agentic Systems",
    description:
      "Multi-step autonomous agent patterns, function calling, tool execution pipelines, and workflow orchestration.",
    certificateImage: "/certificates/openai-agents-workflows.jpg",
    verified: true,
  },
  {
    id: "openai-ai-foundations",
    title: "AI Foundations",
    issuer: "OpenAI Academy",
    year: "2026",
    issuedDate: "August 11, 2026",
    category: "AI Fundamentals",
    description:
      "Foundational understanding of AI systems, machine learning paradigms, and practical AI application patterns.",
    verified: true,
  },
];

export const SYSTEM_NODES: SystemNode[] = [
  {
    id: "github",
    label: "GitHub / VCS",
    category: "vcs",
    categoryLabel: "Source Control",
    description:
      "Git-based distributed version control hosting declarative application code, Dockerfiles, and Terraform manifests.",
    tools: ["Git", "GitHub", "Branch Protections", "Webhook Triggers"],
    connectsTo: ["cicd"],
    role: "Single source of truth for application logic and declarative infrastructure definitions.",
  },
  {
    id: "cicd",
    label: "CI/CD Automation",
    category: "ci",
    categoryLabel: "Continuous Delivery",
    description:
      "Automated pipeline execution on every commit: linting, unit testing, container build, and environment gatechecks.",
    tools: ["GitHub Actions", "Automated Testing", "Secret Scanning", "Artifact Packaging"],
    connectsTo: ["docker", "terraform"],
    role: "Validates code quality and triggers parallel containerization and infrastructure reconciliation.",
  },
  {
    id: "docker",
    label: "Docker Containerization",
    category: "container",
    categoryLabel: "Workload Packaging",
    description:
      "Multi-stage Docker builds creating minimal, secure container images packaged with all runtime dependencies.",
    tools: ["Docker Engine", "Dockerfile Multi-stage", "Container Security", "Image Optimization"],
    connectsTo: ["kubernetes"],
    role: "Packages Python, Flask, and microservices into immutable, reproducible artifacts.",
  },
  {
    id: "kubernetes",
    label: "Kubernetes Orchestration",
    category: "orchestration",
    categoryLabel: "Cluster Management",
    description:
      "Pod scheduling, service networking, horizontal auto-scaling, and rolling zero-downtime deployment updates.",
    tools: ["Kubernetes", "Deployments", "Services", "ConfigMaps & Secrets", "Ingress Controller"],
    connectsTo: ["aws", "monitoring"],
    role: "Schedules containerized workloads across compute nodes with automated healing and traffic distribution.",
  },
  {
    id: "terraform",
    label: "Terraform (IaC)",
    category: "iac",
    categoryLabel: "Infrastructure as Code",
    description:
      "Declarative state-managed provisioning of AWS VPCs, subnets, EC2 instances, IAM roles, and security groups.",
    tools: ["Terraform HCL", "State Locking", "Modular Architectures", "Plan Validation"],
    connectsTo: ["aws"],
    role: "Guarantees reproducible, version-controlled cloud topology without configuration drift.",
  },
  {
    id: "aws",
    label: "AWS Cloud Platform",
    category: "cloud",
    categoryLabel: "Cloud Infrastructure",
    description:
      "Core cloud foundation providing scalable compute, managed databases, secure networking, and global DNS.",
    tools: ["EC2", "S3", "VPC", "IAM", "RDS", "ELB", "CloudWatch", "Route 53"],
    connectsTo: ["monitoring", "ai"],
    role: "Provides high-availability hosting, secure VPC isolation, and managed cloud primitives.",
  },
  {
    id: "monitoring",
    label: "Observability & Telemetry",
    category: "observability",
    categoryLabel: "System Visibility",
    description:
      "Real-time cluster health inspection, latency monitoring, error rate telemetry, and log aggregation.",
    tools: ["CloudWatch", "Prometheus Metrics", "Grafana Dashboards", "Alert Routing"],
    connectsTo: ["github"],
    role: "Closes the feedback loop by streaming runtime metrics and alerting on performance anomalies.",
  },
  {
    id: "ai",
    label: "Agentic AI & LLMs",
    category: "ai",
    categoryLabel: "Intelligent Systems",
    description:
      "Intelligent agents, retrieval-augmented generation (RAG), and LangChain orchestration integrated into cloud flows.",
    tools: ["LangChain", "RAG Pipelines", "Agentic Workflows", "Vector Search", "OpenAI / Oracle AI"],
    connectsTo: ["github", "aws"],
    role: "Empowers applications with autonomous decision-making, natural language reasoning, and dynamic task automation.",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "cloud-devops-workflows",
    number: "01",
    title: "Cloud / DevOps Deployment Workflows",
    tagline: "Automated AWS Infrastructure & Kubernetes Orchestration Pipeline",
    featured: true,
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux"],
    problem:
      "Manual cloud provisioning and ad-hoc container deployments are error-prone, slow, and produce dangerous configuration drift between development and production environments.",
    solution:
      "Built an end-to-end GitOps delivery engine combining Terraform Infrastructure as Code for automated AWS VPC/EC2/IAM provisioning with Docker containerization, Kubernetes pod scheduling, and GitHub Actions CI/CD automation.",
    architecture: [
      "Developer Workstation (Git Commit)",
      "GitHub Repository (Main Trigger)",
      "GitHub Actions (CI/CD Pipeline)",
      "Docker Hub (Container Registry)",
      "Terraform (AWS VPC + EC2 + IAM IaC)",
      "Kubernetes Cluster (Pod Scheduling & Services)",
      "CloudWatch & Metrics (Telemetry)",
    ],
    pipelineSteps: [
      {
        phase: "01 / Source & Trigger",
        action: "Developer pushes code commit to main",
        tech: "Git + GitHub",
        details: "Branch protection rules enforce commit verification and trigger GitHub Actions webhook.",
      },
      {
        phase: "02 / Automated CI Pipeline",
        action: "Build, security scan & test suite execution",
        tech: "GitHub Actions",
        details: "Automated unit testing, dependency vulnerability audits, and static code analysis.",
      },
      {
        phase: "03 / Containerization",
        action: "Multi-stage Docker packaging & layer caching",
        tech: "Docker Engine",
        details: "Produces a hardened, lightweight Linux container image tagged with commit SHA.",
      },
      {
        phase: "04 / Infrastructure as Code",
        action: "Terraform plan verification & apply",
        tech: "Terraform HCL",
        details: "Declaratively provisions and verifies AWS VPC, public/private subnets, EC2 nodes, and strict IAM roles.",
      },
      {
        phase: "05 / Orchestration & Rollout",
        action: "Kubernetes deployment rollout & service routing",
        tech: "Kubernetes",
        details: "Applies manifests, manages rolling updates, readiness probes, and internal service networking.",
      },
      {
        phase: "06 / Observability",
        action: "Live telemetry streaming & health monitoring",
        tech: "CloudWatch + Health Checks",
        details: "Monitors CPU/memory utilization, request latency, and automated pod recovery.",
      },
    ],
    techStack: [
      "AWS (EC2, S3, VPC, IAM, ELB, CloudWatch)",
      "Terraform (Infrastructure as Code)",
      "Docker (Multi-stage container builds)",
      "Kubernetes (Pod scheduling & Service discovery)",
      "GitHub Actions (CI/CD workflows)",
      "Linux (Ubuntu Server administration)",
      "Bash (Automation scripting)",
    ],
    highlights: [
      "Fully repeatable, version-controlled AWS infrastructure managed exclusively via Terraform.",
      "Zero-downtime rolling container deployments with health-checked Kubernetes pods.",
      "Automated CI/CD workflow eliminating manual intervention from commit to cloud.",
      "Hardened IAM security policies following the principle of least privilege.",
    ],
    githubUrl: "https://github.com/darshsoam07",
  },
  {
    id: "expense-tracker-insights",
    number: "02",
    title: "Expense Tracker with Insights",
    tagline: "Full-Stack Financial Analytics & Transaction Management Engine",
    featured: true,
    tags: ["Python", "Flask", "SQLite", "Tailwind CSS", "JavaScript", "REST APIs"],
    problem:
      "Individuals struggle to maintain visibility over fragmented spending habits, lacking intuitive categorisation, structured data persistence, and portable export tools.",
    solution:
      "Engineered a responsive, full-stack financial analytics application featuring secure user authentication, transactional CRUD operations, dynamic category-based filtering, interactive spending dashboard visualizations, and clean CSV data export.",
    architecture: [
      "Modern Web UI (Tailwind CSS + Dynamic JS)",
      "RESTful API Layer (Python / Flask Router)",
      "Authentication & Security Controller",
      "Analytics & Aggregation Engine",
      "Persistent SQLite Database",
      "CSV Export & Backup Generator",
    ],
    pipelineSteps: [
      {
        phase: "01 / User Interaction",
        action: "Client-side category filtering & entry input",
        tech: "Tailwind CSS + JS",
        details: "Instant responsive UI feedback with category badges, date range filters, and modal dialogues.",
      },
      {
        phase: "02 / REST API Request",
        action: "Structured JSON payload dispatch",
        tech: "Fetch API + REST",
        details: "Clean asynchronous endpoints for authentication, expense creation, updates, and deletion.",
      },
      {
        phase: "03 / Backend Controller",
        action: "Data validation, sanitization & business logic",
        tech: "Python / Flask",
        details: "Validates transaction types, checks authentication sessions, and computes categorical budgets.",
      },
      {
        phase: "04 / Persistent Storage",
        action: "ACID-compliant SQLite relational persistence",
        tech: "SQLite 3",
        details: "Structured relational tables storing indexed user accounts, categories, timestamps, and amounts.",
      },
      {
        phase: "05 / Analytics Computation",
        action: "Statistical aggregation & trend computation",
        tech: "Python Analytics",
        details: "Calculates total expenditure, monthly breakdown, category distribution, and highest-spend vectors.",
      },
      {
        phase: "06 / Portable Export",
        action: "On-demand CSV transaction generation",
        tech: "CSV Stream Engine",
        details: "Enables users to export their complete financial ledger for external analysis and backup.",
      },
    ],
    techStack: [
      "Python 3 (Backend architecture & logic)",
      "Flask (Microframework REST API endpoints)",
      "SQLite (Relational persistent storage)",
      "Tailwind CSS (Modern responsive styling)",
      "JavaScript (ES6+ dynamic DOM manipulation)",
      "Chart / Analytics Algorithms",
    ],
    highlights: [
      "Secure user authentication and session management.",
      "Comprehensive CRUD operations with instant UI reactivity.",
      "Category-based filtering and statistical spending analytics.",
      "Seamless CSV export enabling portable financial backups.",
    ],
    githubUrl: "https://github.com/darshsoam07",
  },
];

export const SKILL_CATEGORIES = [
  {
    id: "cloud-infra",
    title: "Cloud & Infrastructure",
    eyebrow: "Layer 01 // Foundation",
    description: "Cloud architecture, Infrastructure as Code, and resilient compute systems.",
    skills: [
      { name: "AWS (Amazon Web Services)", badge: "Core", details: "EC2, S3, VPC, IAM, RDS, ELB, CloudWatch, Route 53" },
      { name: "Terraform", badge: "IaC", details: "Declarative infrastructure, state management, provider modules" },
      { name: "Linux Administration", badge: "OS", details: "Ubuntu/Debian, shell scripting, permissions, systemd, networking" },
      { name: "Cloud Architecture", badge: "Design", details: "VPC subnets, security groups, routing tables, high availability" },
    ],
  },
  {
    id: "container-devops",
    title: "Containers & CI/CD",
    eyebrow: "Layer 02 // Delivery",
    description: "Packaging, orchestration, automated testing, and continuous deployment.",
    skills: [
      { name: "Docker", badge: "Containers", details: "Multi-stage builds, layer caching, Docker Compose, container security" },
      { name: "Kubernetes", badge: "Orchestration", details: "Pod scheduling, Services, Deployments, ConfigMaps, Ingress" },
      { name: "GitHub Actions", badge: "CI/CD", details: "Automated pipelines, workflow dispatch, secret injection, artifact publishing" },
      { name: "Git & GitHub", badge: "VCS", details: "Branching strategies, code review workflows, release tagging" },
    ],
  },
  {
    id: "ai-intelligent",
    title: "Agentic & Generative AI",
    eyebrow: "Layer 03 // Intelligence",
    description: "Next-generation autonomous agents, retrieval systems, and LLM applications.",
    skills: [
      { name: "Agentic AI", badge: "Agents", details: "Autonomous agent workflows, function calling, tool execution loops" },
      { name: "LLM Applications", badge: "GenAI", details: "Prompt engineering, structured outputs, API integration" },
      { name: "RAG & Vector Search", badge: "Retrieval", details: "Retrieval-Augmented Generation, chunking, contextual embeddings" },
      { name: "LangChain", badge: "Framework", details: "Chains, memory, tool orchestration, document loaders" },
      { name: "ML Fundamentals", badge: "Theory", details: "Supervised/unsupervised learning fundamentals, feature representations" },
    ],
  },
  {
    id: "software-backend",
    title: "Software Engineering & APIs",
    eyebrow: "Layer 04 // Application",
    description: "Backend development, scripting, data structures, and database systems.",
    skills: [
      { name: "Python", badge: "Language", details: "Backend development, scripting, automation, data handling" },
      { name: "Java", badge: "Language", details: "Object-oriented programming, Data Structures & Algorithms" },
      { name: "Flask & REST APIs", badge: "Backend", details: "Microservice endpoints, routing, request validation, middleware" },
      { name: "Bash Scripting", badge: "Automation", details: "System automation, cron tasks, deployment scripts" },
      { name: "SQLite & Oracle Database", badge: "Databases", details: "Relational schema design, SQL querying, transactional integrity" },
      { name: "Tailwind CSS & JavaScript", badge: "Frontend", details: "Modern interactive UI, semantic HTML, responsive layouts" },
    ],
  },
  {
    id: "security-devsecops",
    title: "DevSecOps & Security",
    eyebrow: "Layer 05 // Protection",
    description: "Infrastructure hardening, container vulnerability scanning, and secure CI/CD.",
    skills: [
      { name: "DevSecOps", badge: "Security", details: "Automated security checks in CI/CD, least-privilege access" },
      { name: "Infrastructure Security", badge: "Cloud", details: "IAM role boundaries, VPC security groups, encryption in transit/at rest" },
      { name: "Container Security", badge: "Workloads", details: "Non-root container execution, minimal base images, vulnerability audits" },
    ],
  },
];
