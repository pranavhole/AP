import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Patrick_Hand } from "next/font/google";

import { siteConfig } from "@/config/site";

import "./globals.css";

const headingFont = Patrick_Hand({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

const bodyFont = Nunito_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
});

const metadataBase = siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined;
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
  ...(metadataBase ? { alternates: { canonical: "/" }, metadataBase } : {}),
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F7C3C5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${headingFont.variable} ${bodyFont.variable}`} lang="en">
      <body>{children}</body>
    </html>
  );
}
