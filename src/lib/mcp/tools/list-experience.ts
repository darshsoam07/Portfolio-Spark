import { defineTool } from "@lovable.dev/mcp-js";

const EXPERIENCE = [
  {
    year: "2026 — Present",
    company: "Personal DevOps Lab",
    role: "DevOps Engineer",
    description: "Building cloud infrastructure projects and deployment systems.",
  },
  {
    year: "2025 — Present",
    company: "CloudDeployX",
    role: "Project Lead",
    description: "Cloud-native deployment platform.",
  },
  {
    year: "2025 — Present",
    company: "Expense Tracker Analytics",
    role: "Developer",
    description: "Full stack analytics project.",
  },
];

export default defineTool({
  name: "list_experience",
  title: "List experience",
  description: "List Darsh Soam's public work experience entries.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(EXPERIENCE, null, 2) }],
    structuredContent: { experience: EXPERIENCE },
  }),
});
