export type TechNode = {
  id: string;
  label: string;
  tools?: string[];
  projects?: string[];
};

export type CapabilityEdge = {
  from: string;
  to: string;
  label: string;
};

export type CrossLink = {
  techId: string;
  targetCapabilityId: string;
  targetTechId: string;
  label: string;
};

export type Capability = {
  id: string;
  label: string;
  description: string;
  technologies: TechNode[];
  edges: CapabilityEdge[];
  crossLinks: CrossLink[];
};

export const CAPABILITY_MAP: Capability[] = [
  {
    id: "cloud",
    label: "Cloud",
    description: "Provisioning and managing cloud infrastructure.",
    technologies: [
      {
        id: "aws",
        label: "AWS",
        tools: ["TODO — list specific services used"],
        projects: [
          "Cloud Infra Automation",
          "CI/CD Pipeline Builder",
          "Multi-Cloud Terraform Module",
        ],
      },
    ],
    edges: [],
    crossLinks: [
      {
        techId: "aws",
        targetCapabilityId: "iac",
        targetTechId: "terraform",
        label: "provisioned via",
      },
    ],
  },
  {
    id: "iac",
    label: "Infrastructure as Code",
    description: "Defining infrastructure declaratively and repeatably.",
    technologies: [
      {
        id: "terraform",
        label: "Terraform",
        projects: ["Cloud Infra Automation", "Multi-Cloud Terraform Module"],
      },
      { id: "ansible", label: "Ansible", projects: [] },
    ],
    edges: [],
    crossLinks: [
      {
        techId: "terraform",
        targetCapabilityId: "cloud",
        targetTechId: "aws",
        label: "provisions",
      },
    ],
  },
  {
    id: "automation",
    label: "Automation / CI-CD",
    description: "Source → automation → packaging → deployment.",
    technologies: [
      {
        id: "github-actions",
        label: "GitHub Actions",
        projects: ["Cloud Infra Automation", "CI/CD Pipeline Builder"],
      },
    ],
    edges: [],
    crossLinks: [
      {
        techId: "github-actions",
        targetCapabilityId: "containerization",
        targetTechId: "docker",
        label: "builds",
      },
      {
        techId: "github-actions",
        targetCapabilityId: "cloud",
        targetTechId: "aws",
        label: "deploys to",
      },
    ],
  },
  {
    id: "containerization",
    label: "Containerization",
    description: "Packaging and orchestrating workloads.",
    technologies: [
      { id: "docker", label: "Docker", projects: ["CI/CD Pipeline Builder"] },
      { id: "kubernetes", label: "Kubernetes", projects: ["K8s Monitoring Stack"] },
    ],
    edges: [{ from: "docker", to: "kubernetes", label: "orchestrates" }],
    crossLinks: [
      {
        techId: "docker",
        targetCapabilityId: "automation",
        targetTechId: "github-actions",
        label: "built by",
      },
      {
        techId: "kubernetes",
        targetCapabilityId: "monitoring",
        targetTechId: "prometheus",
        label: "observed by",
      },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring",
    description: "Observability across running systems.",
    technologies: [
      { id: "prometheus", label: "Prometheus", projects: ["K8s Monitoring Stack"] },
      { id: "grafana", label: "Grafana", projects: ["K8s Monitoring Stack"] },
    ],
    edges: [{ from: "prometheus", to: "grafana", label: "visualized in" }],
    crossLinks: [
      {
        techId: "prometheus",
        targetCapabilityId: "containerization",
        targetTechId: "kubernetes",
        label: "observes",
      },
    ],
  },
  {
    id: "systems",
    label: "Linux / Systems",
    description: "Operating-system-level administration and scripting.",
    technologies: [
      { id: "linux", label: "Linux", projects: [] },
      { id: "bash", label: "Bash", projects: [] },
    ],
    edges: [{ from: "bash", to: "linux", label: "scripts" }],
    crossLinks: [],
  },
  {
    id: "programming",
    label: "Programming",
    description: "Scripting and tooling in support of automation.",
    technologies: [{ id: "python", label: "Python", projects: [] }],
    edges: [],
    crossLinks: [
      {
        techId: "python",
        targetCapabilityId: "systems",
        targetTechId: "bash",
        label: "complements",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    description: "TODO — no specific tools recorded yet for this stated capability.",
    technologies: [],
    edges: [],
    crossLinks: [],
  },
];
