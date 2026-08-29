import { siteConfig } from "@/config/site";
import type { Project } from "@/types/content";

export const projects: readonly Project[] = [
  {
    slug: "business-landing-page",
    title: "Business Landing Page",
    description: "Modern landing page for a digital agency.",
    image: "/projects/ai-engineer-workspace.png",
    imageAlt: "Modern landing page for a digital agency with clean vector illustrations",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO"],
    url: siteConfig.projectUrls.aiEngineerWorkspace,
    variant: 1,
  },
  {
    slug: "ecommerce-store",
    title: "E-Commerce Store",
    description: "Full-featured online store with payment & admin.",
    image: "/projects/instacity.png",
    imageAlt: "E-commerce store with product grid, shopping bag and checkout",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    url: siteConfig.projectUrls.instacity,
    variant: 2,
  },
  {
    slug: "ai-dashboard",
    title: "AI Dashboard",
    description: "AI-powered dashboard for data insights & automation.",
    image: "/projects/muzzy.png",
    imageAlt: "AI-powered dashboard with real-time performance analytics charts",
    tags: ["FastAPI", "Next.js", "LangGraph", "OpenAI"],
    url: siteConfig.projectUrls.muzzy,
    variant: 3,
  },
];
