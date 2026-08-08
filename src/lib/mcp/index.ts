import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import listProjects from "./tools/list-projects";
import listSkills from "./tools/list-skills";
import listExperience from "./tools/list-experience";

export default defineMcp({
  name: "darsh-soam-portfolio",
  title: "Darsh Soam Portfolio",
  version: "0.1.0",
  instructions:
    "Public MCP server for Darsh Soam's DevOps/cloud portfolio. Use these tools to fetch profile info, projects, skills, and experience.",
  tools: [getProfile, listProjects, listSkills, listExperience],
});
