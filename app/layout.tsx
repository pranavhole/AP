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
const title = "Pranav Hole — Freelance Full-Stack Consultant";
const description =
  "Pranav Hole builds thoughtful web, mobile, AI, and cloud products from idea to growth.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | Pranav Hole" },
  description,
  keywords: [
    "Pranav Hole",
    "full-stack developer",
    "Next.js consultant",
    "AI integration",
    "cloud development",
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
  themeColor: "#F7C3C5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${headingFont.variable} ${bodyFont.variable} scroll-smooth bg-cream motion-reduce:scroll-auto`}
      lang="en"
    >
      <body className="min-w-80 overflow-x-clip bg-cream font-sans text-ink [text-rendering:optimizeLegibility] selection:bg-pastel-yellow selection:text-ink [&_[id]]:scroll-mt-[calc(var(--header-height)_+_18px)] [&_:focus-visible]:outline-[3px] [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-purple motion-reduce:[&_*]:animate-none motion-reduce:[&_*]:scroll-auto motion-reduce:[&_*]:transition-none">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] bg-[radial-gradient(rgba(17,17,17,0.08)_0.55px,transparent_0.55px)] bg-[length:9px_9px] opacity-[0.18]"
        />
        {children}
      </body>
    </html>
  );
}
