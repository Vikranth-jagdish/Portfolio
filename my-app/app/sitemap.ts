import type { MetadataRoute } from "next";

const SITE = "https://vikranth.space";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/projects",
    "/labs",
    "/labs/vtop-mcp",
    "/experience",
    "/blogs",
    "/blogs/agentic-graph-rag",
    "/blogs/how-ai-actually-works",
    "/blogs/livekit-voice",
    "/photos",
    "/videos",
    "/stats",
  ];
  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: path === "/labs/vtop-mcp" ? "weekly" : "monthly",
    priority: path === "/labs/vtop-mcp" ? 0.9 : path === "" ? 1 : 0.6,
  }));
}
