import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Patrick_Hand } from "next/font/google";

import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";

import "./globals.css";

const headingFont = Patrick_Hand({
  display: "optional",
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
  fallback: ["Caveat", "Comic Sans MS", "cursive", "sans-serif"],
});

const bodyFont = Nunito_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const deploymentSiteUrl =
  siteConfig.siteUrl ?? (vercelHost ? `https://${vercelHost}` : "https://dialextech.com");
const metadataBase = new URL(deploymentSiteUrl);

const title = "Dialex Technologies | Full-Stack Development & AI Solutions Company";
const description =
  "Dialex Technologies Private Limited helps businesses build modern websites, scalable web applications, AI-powered solutions and cloud systems.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Dialex Technologies",
  },
  description,
  applicationName: "Dialex Technologies",
  generator: "Next.js",
  keywords: [
    "Dialex Technologies",
    "Dialex Technologies Private Limited",
    "Full Stack Developer",
    "Software Development Company",
    "AI Engineer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "Web Application Development",
    "AI Consulting",
    "Cloud Development",
    "Jaipur Software Company",
    "Rajasthan IT Company",
    "E-Commerce Development",
    "Custom AI Integrations",
    "SaaS MVP Development",
    "Enterprise Web Solutions",
    "UI UX Design Agency",
    "API Development",
    "PostgreSQL Database Engineering",
    "Frontend Engineering",
    "Backend Engineering",
    "Artificial Intelligence Agency",
    "FastAPI Python Developers",
    "TypeScript Consultants",
    "Tailwind CSS Web Design",
    "Modern Web Design Agency",
    "Mobile Responsive Web Apps",
    "Cloud Native Development",
  ],
  authors: [
    { name: "Dialex Technologies", url: "https://dialextech.com" },
    { name: "DIALEX TECHNOLOGIES PRIVATE LIMITED", url: "https://dialextech.com" },
  ],
  creator: "Dialex Technologies Private Limited",
  publisher: "Dialex Technologies Private Limited",
  category: "technology",
  classification: "Software & Technology Solutions, Web Development Agency, AI Consulting",
  metadataBase,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "en-IN": "/",
      "en-GB": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title,
    description,
    url: deploymentSiteUrl,
    siteName: "Dialex Technologies",
    locale: "en_US",
    alternateLocale: ["en_IN", "en_GB"],
    type: "website",
    emails: ["info@dialextech.com"],
    countryName: "India",
    images: [
      {
        url: "/opengraph-image",
        secureUrl: "/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Dialex Technologies - Full-Stack Web & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dialextech",
    creator: "@dialextech",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        alt: "Dialex Technologies - Full-Stack Web & AI Solutions",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: [
      { url: "/icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "rating": "General",
    "distribution": "Global",
    "revisit-after": "7 days",
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur",
    "geo.position": "26.9443;75.6983",
    "ICBM": "26.9443, 75.6983",
    "format-detection": "telephone=no, address=no, email=no",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6B8B8" },
    { media: "(prefers-color-scheme: dark)", color: "#17172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
      <head>
        <JsonLd />
      </head>
      <body className="min-w-80 overflow-x-clip bg-cream font-sans text-ink [text-rendering:optimizeLegibility] selection:bg-pastel-yellow selection:text-ink [&_[id]]:scroll-mt-[calc(var(--header-height)_+_18px)] [&_:focus-visible]:outline-[3px] [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-purple motion-reduce:[&_*]:animate-none motion-reduce:[&_*]:scroll-auto motion-reduce:[&_*]:transition-none">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] bg-[radial-gradient(rgb(23_23_42_/_7%)_0.55px,transparent_0.7px)] bg-[length:12px_12px] opacity-20" />
        {children}
      </body>
    </html>
  );
}
