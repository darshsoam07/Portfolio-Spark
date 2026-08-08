import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description: "Return Darsh Soam's public profile: name, role, location, and status.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const profile = {
      name: "Darsh Soam",
      role: "DevOps & Cloud Engineer",
      location: "Meerut, India",
      status: "Open to Work",
      tagline: "Infrastructure that scales. Pipelines that ship.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
      structuredContent: profile,
    };
  },
});
