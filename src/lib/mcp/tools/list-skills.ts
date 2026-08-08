import { defineTool } from "@lovable.dev/mcp-js";

const SKILLS = [
  { name: "AWS", level: 88 },
  { name: "Kubernetes", level: 80 },
  { name: "Docker", level: 85 },
  { name: "Terraform", level: 78 },
  { name: "CI/CD", level: 82 },
  { name: "Linux", level: 90 },
  { name: "Ansible", level: 72 },
  { name: "Python", level: 75 },
  { name: "Bash", level: 85 },
  { name: "GitHub Actions", level: 80 },
];

export default defineTool({
  name: "list_skills",
  title: "List skills",
  description: "List Darsh Soam's technical skills with self-rated proficiency (0-100).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SKILLS, null, 2) }],
    structuredContent: { skills: SKILLS },
  }),
});
