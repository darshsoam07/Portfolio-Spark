import { defineTool } from "@lovable.dev/mcp-js";

const PROJECTS = [
  {
    name: "Cloud Infra Automation",
    description: "Automated AWS infrastructure deployment using Terraform.",
    tags: ["AWS", "Terraform", "GitHub Actions"],
  },
  {
    name: "K8s Monitoring Stack",
    description: "Production monitoring using Prometheus and Grafana.",
    tags: ["Kubernetes", "Prometheus", "Grafana"],
  },
  {
    name: "CI/CD Pipeline Builder",
    description: "Automated deployment pipeline with Docker and GitHub Actions.",
    tags: ["Docker", "GitHub Actions", "AWS"],
  },
  {
    name: "Multi-Cloud Terraform Module",
    description: "Reusable infrastructure modules across cloud providers.",
    tags: ["Terraform", "AWS", "Cloud"],
  },
];

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "List Darsh Soam's public DevOps/cloud portfolio projects with tags.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PROJECTS, null, 2) }],
    structuredContent: { projects: PROJECTS },
  }),
});
