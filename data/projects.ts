import { siteConfig } from "@/config/site";
import type { Project } from "@/types/content";

export const projects: readonly Project[] = [
  {
    slug: "ai-engineer-workspace",
    title: "AI Engineer Workspace",
    description: "AI-powered developer productivity suite.",
    image: "/projects/ai-engineer-workspace.png",
    imageAlt: "Dark AI engineering dashboard with purple analytics panels",
    tags: ["Next.js", "FastAPI", "AI", "AWS"],
    url: siteConfig.projectUrls.aiEngineerWorkspace,
    variant: 1,
  },
  {
    slug: "instacity",
    title: "InstaCity",
    description: "Instagram data in a 3D city experience.",
    image: "/projects/instacity.png",
    imageAlt: "Colorful three-dimensional city visualization for Instagram data",
    tags: ["FastAPI", "Next.js", "PostgreSQL"],
    url: siteConfig.projectUrls.instacity,
    variant: 2,
  },
  {
    slug: "muzzy",
    title: "Muzzy",
    description: "Real-time music streaming platform.",
    image: "/projects/muzzy.png",
    imageAlt: "Dark purple music streaming interface with albums and playlists",
    tags: ["Next.js", "Node.js", "Socket.IO"],
    url: siteConfig.projectUrls.muzzy,
    variant: 3,
  },
];
