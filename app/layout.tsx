import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Patrick_Hand } from "next/font/google";

import { siteConfig } from "@/config/site";

import "./globals.css";

const headingFont = Patrick_Hand({
  display: "optional",
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

const bodyFont = Nunito_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
});

const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const deploymentSiteUrl =
  siteConfig.siteUrl ?? (vercelHost ? `https://${vercelHost}` : null);
const metadataBase = new URL(deploymentSiteUrl ?? "http://localhost:3000");
const title = "Pranav Hole | Freelance Full-Stack Developer & AI Consultant";
const description =
  "Freelance Full-Stack Developer helping businesses build modern websites, scalable web applications, AI-powered solutions and cloud systems.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | Pranav Hole" },
  description,
  keywords: [
    "Full Stack Developer",
    "Freelance Developer",
    "AI Engineer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "Web Application Development",
    "AI Consulting",
    "Cloud Development",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    description,
    locale: "en_US",
    siteName: siteConfig.name,
    title,
    type: "website",
  },
  twitter: { card: "summary_large_image", description, title },
  metadataBase,
  ...(deploymentSiteUrl ? { alternates: { canonical: "/" } } : {}),
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F6B8B8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${headingFont.variable} ${bodyFont.variable} scroll-smooth bg-cream motion-reduce:scroll-auto`}
      data-scroll-behavior="smooth"
      lang="en"
    >
      <body className="min-w-80 overflow-x-clip bg-cream font-sans text-ink [text-rendering:optimizeLegibility] selection:bg-pastel-yellow selection:text-ink [&_[id]]:scroll-mt-[calc(var(--header-height)_+_18px)] [&_:focus-visible]:outline-[3px] [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-purple motion-reduce:[&_*]:animate-none motion-reduce:[&_*]:scroll-auto motion-reduce:[&_*]:transition-none">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] bg-[radial-gradient(rgb(23_23_42_/_7%)_0.55px,transparent_0.7px)] bg-[length:12px_12px] opacity-20" />
        {children}
      </body>
    </html>
  );
}
