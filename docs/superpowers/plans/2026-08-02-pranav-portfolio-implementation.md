# Pranav Hole Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved responsive, hand-drawn Pranav Hole portfolio homepage as a production-ready Next.js 16 application with custom local artwork, accessible interactions, typed content, and verified desktop/mobile behavior.

**Architecture:** Keep `app/page.tsx` and all static sections as Server Components. Limit client boundaries to `MobileMenu`, `ProjectCarousel`, and `Reveal`; pass only serializable data or server-rendered children into them. Generate the focal raster artwork locally, draw reusable stickers/icons/doodles as deterministic SVG/CSS, and drive every repeated section from typed configuration.

**Tech Stack:** Next.js 16.2.12 App Router, React 19.2.4, TypeScript 5.9, Tailwind CSS 4, CSS Modules, `next/image`, `next/font`, Motion for React (`motion/react`), Lucide React for utility/social glyphs, Vitest, React Testing Library, and jsdom.

---

## Pre-execution requirements

- Read `AGENTS.md` and the installed Next.js guides listed in Task 1 before changing application code.
- Before implementation, invoke `superpowers:using-git-worktrees` and create an isolated `portfolio-homepage` worktree unless the user explicitly requests direct work on `master`.
- Use `superpowers:test-driven-development` for every behavior-bearing task.
- Use the `imagegen` skill before each image-generation call.
- Use `superpowers:verification-before-completion` before any final success claim.
- The current official Motion package is `motion`, imported from `motion/react`; do not install the legacy `framer-motion` package.

## Locked file map

| Path | Responsibility |
| --- | --- |
| `app/layout.tsx` | Root HTML/body, font variables, viewport, static metadata |
| `app/page.tsx` | Server-rendered homepage composition and semantic section order |
| `app/globals.css` | Tailwind import, tokens, resets, global rough utilities, focus/reduced-motion rules |
| `app/icon.svg` | Custom PH metadata icon |
| `app/opengraph-image.tsx` | Generated 1200×630 social preview using `ImageResponse` flexbox |
| `app/opengraph-image.alt.txt` | Accessible OG-image description |
| `types/content.ts` | Stable content, tone, icon, variant, and optional-link contracts |
| `config/site.ts` | Name, nullable site/contact/social URLs, and disabled contact-action state |
| `data/*.ts` | Exact navigation, hero, trust, service, process, project, and technology content |
| `components/layout/*` | Brand, desktop/sticky header, mobile menu, and footer |
| `components/ui/*` | Rough CTA, heading, divider, reveal, skip link, project card/carousel |
| `components/illustrations/*` | Custom inline SVG icons, stickers, arrows, and doodles |
| `components/sections/*` | One focused server component and CSS Module per homepage section |
| `public/images/*` | Generated hero and About character artwork |
| `public/projects/*` | Three generated software thumbnails |
| `public/doodles/*` | Local paper-grain and dot-field SVG textures |
| `tests/setup.ts` | jsdom matchers and browser API shims |
| `vitest.config.mts` | Vitest React/jsdom/path-alias configuration |
| `README.md` | Setup, editing, assets, contact enablement, and verification guide |

## Task 1: Confirm framework rules and add the test harness

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.mts`
- Create: `tests/setup.ts`
- Create: `tests/setup.test.ts`

- [ ] **Step 1: Read the installed Next.js 16 guides**

Read these local files completely:

```text
node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md
node_modules/next/dist/docs/01-app/01-getting-started/12-images.md
node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md
node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md
node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md
node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md
node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md
node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/public-folder.md
```

Record these implementation constraints: root layout renders `html` and `body`; metadata stays in the Metadata API; client boundaries remain narrow and accept serializable props; local images have intrinsic dimensions; the hero uses `preload` rather than deprecated `priority`; no legacy Image props; non-variable Patrick Hand declares weight `400`.

- [ ] **Step 2: Install runtime and test dependencies**

Run:

```powershell
npm install motion lucide-react
npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom vite-tsconfig-paths lighthouse
```

Expected: both commands exit `0`; `package.json` contains `motion` and `lucide-react` dependencies and the test packages under `devDependencies`.

- [ ] **Step 3: Add exact package scripts**

Run:

```powershell
npm pkg set "scripts.test=vitest" "scripts.test:run=vitest run" "scripts.typecheck=tsc --noEmit" "scripts.verify=npm run lint && npm run typecheck && npm run test:run && npm run build"
```

The complete `scripts` object must be:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest",
  "test:run": "vitest run",
  "typecheck": "tsc --noEmit",
  "verify": "npm run lint && npm run typecheck && npm run test:run && npm run build"
}
```

- [ ] **Step 4: Create the Vitest configuration**

Create `vitest.config.mts`:

```ts
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/setup.ts"],
  },
});
```

Create `tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

Object.defineProperty(window, "matchMedia", {
  configurable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(Element.prototype, "scrollIntoView", {
  configurable: true,
  value: vi.fn(),
});

class ResizeObserverMock implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, "ResizeObserver", {
  configurable: true,
  value: ResizeObserverMock,
});
```

- [ ] **Step 5: Write and run the harness test**

Create `tests/setup.test.ts`:

```ts
import { describe, expect, it } from "vitest";

describe("test environment", () => {
  it("provides the browser APIs used by interactive components", () => {
    expect(window.matchMedia("(prefers-reduced-motion: reduce)").matches).toBe(false);
    expect(window.ResizeObserver).toBeDefined();
    expect(Element.prototype.scrollIntoView).toBeTypeOf("function");
  });
});
```

Run:

```powershell
npm run test:run -- tests/setup.test.ts
```

Expected: one passing test.

- [ ] **Step 6: Commit the harness**

```powershell
git add package.json package-lock.json vitest.config.mts tests/setup.ts tests/setup.test.ts
git commit -m "chore: add portfolio test infrastructure"
```

## Task 2: Define typed content and unavailable-link configuration

**Files:**

- Create: `types/content.ts`
- Create: `config/site.ts`
- Create: `data/navigation.ts`
- Create: `data/page-content.ts`
- Create: `data/trust.ts`
- Create: `data/services.ts`
- Create: `data/process.ts`
- Create: `data/projects.ts`
- Create: `data/technologies.ts`
- Create: `data/content.test.ts`

- [ ] **Step 1: Write the failing content-contract test**

Create `data/content.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { processSteps } from "@/data/process";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";

describe("portfolio content", () => {
  it("keeps the approved repeated content complete", () => {
    expect(services.map((service) => service.title)).toEqual([
      "Web Development",
      "Mobile & Web Apps",
      "AI Integration",
      "Cloud & DevOps",
    ]);
    expect(processSteps.map((step) => step.title)).toEqual(["Plan", "Build", "Launch", "Grow"]);
    expect(projects).toHaveLength(3);
    expect(technologies).toHaveLength(5);
  });

  it("does not invent production contact or project URLs", () => {
    expect(siteConfig.contactActionsEnabled).toBe(false);
    expect(Object.values(siteConfig.contact).every((value) => value === null)).toBe(true);
    expect(Object.values(siteConfig.socials).every((value) => value === null)).toBe(true);
    expect(projects.every((project) => project.url === null)).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
npm run test:run -- data/content.test.ts
```

Expected: FAIL because `@/config/site` and the data modules do not exist.

- [ ] **Step 3: Create the shared types**

Create `types/content.ts`:

```ts
export type Tone = "cream" | "pink" | "mint" | "yellow" | "lavender" | "purple" | "coral";
export type CardVariant = 1 | 2 | 3 | 4;
export type SketchIconName =
  | "laptop"
  | "phone"
  | "robot"
  | "cloud"
  | "lightbulb"
  | "wireframe"
  | "rocket"
  | "growth"
  | "heart";

export type NavItem = { label: string; href: `#${string}` };
export type TrustItem = { label: string; icon: SketchIconName; tone: Tone; variant: CardVariant };
export type Service = {
  title: string;
  description: string;
  icon: SketchIconName;
  tone: Tone;
  variant: CardVariant;
};
export type ProcessStep = {
  title: string;
  description: string;
  icon: SketchIconName;
  tone: Tone;
  variant: CardVariant;
};
export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: readonly string[];
  url: string | null;
  variant: 1 | 2 | 3;
};
export type Technology = {
  label: string;
  shortLabel: string;
  tone: Tone;
  variant: CardVariant;
};
```

- [ ] **Step 4: Create the central site configuration**

Create `config/site.ts`:

```ts
export const siteConfig = {
  name: "Pranav Hole",
  initials: "PH",
  role: "Freelance Full-Stack Consultant",
  siteUrl: null as string | null,
  contactActionsEnabled: false,
  contact: {
    email: null as string | null,
    phone: null as string | null,
    meetingUrl: null as string | null,
    resumeUrl: null as string | null,
  },
  socials: {
    linkedin: null as string | null,
    github: null as string | null,
    x: null as string | null,
  },
  projectUrls: {
    aiEngineerWorkspace: null as string | null,
    instacity: null as string | null,
    muzzy: null as string | null,
  },
  viewAllProjectsUrl: null as string | null,
} as const;

const primaryContactUrl = siteConfig.contact.meetingUrl ?? (siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : null);

export const contactLinks = {
  talk: siteConfig.contactActionsEnabled ? primaryContactUrl : null,
  startProject: siteConfig.contactActionsEnabled ? primaryContactUrl : null,
  buildTogether: siteConfig.contactActionsEnabled ? primaryContactUrl : null,
  scheduleCall: siteConfig.contactActionsEnabled ? primaryContactUrl : null,
} as const;
```

- [ ] **Step 5: Create the exact content modules**

Create `data/navigation.ts`:

```ts
import type { NavItem } from "@/types/content";

export const navigation: readonly NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];
```

Create `data/page-content.ts`:

```ts
export const pageContent = {
  hero: {
    eyebrow: "IDEA → PRODUCT → GROWTH",
    headingLines: ["Your Tech Partner", "to Build Digital", "Products That"] as const,
    highlightedWord: "Work",
    support: "— Web • Mobile • AI • Cloud",
  },
  about: {
    heading: "About Me",
    body: "Full-Stack Developer passionate about building clean, scalable and useful digital products. I turn ideas into working software.",
  },
  contact: {
    headingStart: "Have an",
    highlightedWord: "idea",
    headingEnd: "in mind?",
    body: "Let's discuss and make it real.",
  },
  copyright: "© 2026 Pranav Hole. All rights reserved.",
} as const;
```

Create `data/trust.ts`:

```ts
import type { TrustItem } from "@/types/content";

export const trustItems: readonly TrustItem[] = [
  { label: "On-Time Delivery", icon: "rocket", tone: "lavender", variant: 1 },
  { label: "Scalable & Reliable", icon: "growth", tone: "mint", variant: 2 },
  { label: "Support Beyond Launch", icon: "heart", tone: "pink", variant: 3 },
];
```

Create `data/services.ts`:

```ts
import type { Service } from "@/types/content";

export const services: readonly Service[] = [
  { title: "Web Development", description: "Modern, fast & responsive", icon: "laptop", tone: "yellow", variant: 1 },
  { title: "Mobile & Web Apps", description: "From idea to live product", icon: "phone", tone: "mint", variant: 2 },
  { title: "AI Integration", description: "LLMs, Agents, Automation", icon: "robot", tone: "pink", variant: 3 },
  { title: "Cloud & DevOps", description: "Deploy, scale, monitor", icon: "cloud", tone: "lavender", variant: 4 },
];
```

Create `data/process.ts`:

```ts
import type { ProcessStep } from "@/types/content";

export const processSteps: readonly ProcessStep[] = [
  { title: "Plan", description: "Discuss your idea", icon: "lightbulb", tone: "yellow", variant: 1 },
  { title: "Build", description: "Design & develop", icon: "wireframe", tone: "mint", variant: 2 },
  { title: "Launch", description: "Ship to users", icon: "rocket", tone: "pink", variant: 3 },
  { title: "Grow", description: "Scale together", icon: "growth", tone: "mint", variant: 4 },
];
```

Create `data/projects.ts`:

```ts
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
```

Create `data/technologies.ts`:

```ts
import type { Technology } from "@/types/content";

export const technologies: readonly Technology[] = [
  { label: "React / Next.js", shortLabel: "React / Next.js", tone: "mint", variant: 1 },
  { label: "Node.js", shortLabel: "Node.js", tone: "mint", variant: 2 },
  { label: "Python", shortLabel: "Python", tone: "yellow", variant: 3 },
  { label: "PostgreSQL", shortLabel: "PostgreSQL", tone: "cream", variant: 4 },
  { label: "AWS", shortLabel: "AWS", tone: "yellow", variant: 1 },
];
```

- [ ] **Step 6: Run GREEN and commit**

Run:

```powershell
npm run test:run -- data/content.test.ts
npm run typecheck
```

Expected: the content tests and typecheck pass.

```powershell
git add types config data
git commit -m "feat: add typed portfolio content"
```

## Task 3: Establish the global hand-drawn foundation

**Files:**

- Modify: `app/globals.css`
- Create: `components/ui/SkipLink.tsx`
- Create: `components/ui/SkipLink.test.tsx`

- [ ] **Step 1: Write the failing skip-link test**

Create `components/ui/SkipLink.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  it("targets the main content landmark", () => {
    render(<SkipLink />);
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main-content");
  });
});
```

- [ ] **Step 2: Verify RED**

```powershell
npm run test:run -- components/ui/SkipLink.test.tsx
```

Expected: FAIL because `SkipLink.tsx` does not exist.

- [ ] **Step 3: Implement the skip link**

Create `components/ui/SkipLink.tsx`:

```tsx
export function SkipLink() {
  return (
    <a className="skip-link" href="#main-content">
      Skip to main content
    </a>
  );
}
```

- [ ] **Step 4: Replace global CSS with the approved foundation**

Replace `app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --cream: #fff9e9;
  --pink: #f7c3c5;
  --mint: #bfebd9;
  --yellow: #ffe58f;
  --lavender: #d8c2f2;
  --purple: #7653d8;
  --coral: #ff9da6;
  --ink: #111111;
  --muted: #5e5e5e;
  --paper-width: 1440px;
  --header-height: 76px;
}

@theme inline {
  --color-cream: var(--cream);
  --color-soft-pink: var(--pink);
  --color-mint: var(--mint);
  --color-pastel-yellow: var(--yellow);
  --color-lavender: var(--lavender);
  --color-purple: var(--purple);
  --color-coral: var(--coral);
  --color-ink: var(--ink);
  --color-muted: var(--muted);
  --font-sans: var(--font-body);
  --font-hand: var(--font-heading);
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--cream); }
body {
  min-width: 320px;
  margin: 0;
  overflow-x: clip;
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-body), "Nunito Sans", system-ui, sans-serif;
  text-rendering: optimizeLegibility;
}
body::before {
  position: fixed;
  inset: 0;
  z-index: 100;
  background-image: radial-gradient(rgba(17, 17, 17, 0.08) 0.55px, transparent 0.55px);
  background-size: 9px 9px;
  content: "";
  opacity: 0.18;
  pointer-events: none;
}
button, a { font: inherit; }
button { color: inherit; }
a { color: inherit; text-decoration: none; }
img, svg { display: block; max-width: 100%; }
::selection { background: var(--yellow); color: var(--ink); }
[id] { scroll-margin-top: calc(var(--header-height) + 18px); }

.page-shell { width: min(100%, var(--paper-width)); margin-inline: auto; overflow: clip; border-inline: 2px solid var(--ink); }
.section-inner { width: min(100% - 40px, 1280px); margin-inline: auto; }
.paper-texture {
  background-image: url("/doodles/paper-grain.svg"), radial-gradient(rgba(17, 17, 17, 0.08) 0.7px, transparent 0.7px);
  background-size: 180px 180px, 13px 13px;
}
.hand-drawn-border { border: 2.5px solid var(--ink); }
.rough-shadow { box-shadow: 5px 6px 0 var(--ink); }
.slight-rotate-left { rotate: -0.55deg; }
.slight-rotate-right { rotate: 0.45deg; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.skip-link {
  position: fixed;
  top: 10px;
  left: 12px;
  z-index: 999;
  translate: 0 -160%;
  border: 2px solid var(--ink);
  border-radius: 8px 11px 7px 10px;
  background: var(--yellow);
  padding: 10px 14px;
  box-shadow: 3px 3px 0 var(--purple);
  font-weight: 800;
  transition: translate 160ms ease;
}
.skip-link:focus { translate: 0; }
:focus-visible { outline: 3px solid var(--purple); outline-offset: 4px; }

@media (max-width: 767px) {
  :root { --header-height: 66px; }
  .page-shell { border-inline: 0; }
  .section-inner { width: min(100% - 28px, 1280px); }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Run GREEN and commit**

```powershell
npm run test:run -- components/ui/SkipLink.test.tsx
npm run lint
git add app/globals.css components/ui/SkipLink.tsx components/ui/SkipLink.test.tsx
git commit -m "feat: establish hand-drawn visual foundation"
```

## Task 4: Build accessible reusable UI primitives

**Files:**

- Create: `components/ui/RoughButton.tsx`
- Create: `components/ui/RoughButton.module.css`
- Create: `components/ui/RoughButton.test.tsx`
- Create: `components/ui/SectionHeading.tsx`
- Create: `components/ui/SectionHeading.module.css`
- Create: `components/ui/ScribbleUnderline.tsx`
- Create: `components/ui/WavyDivider.tsx`

- [ ] **Step 1: Write failing configured/unavailable CTA tests**

Create `components/ui/RoughButton.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RoughButton } from "./RoughButton";

describe("RoughButton", () => {
  it("renders a configured destination as a link", () => {
    render(<RoughButton href="#work">View My Work</RoughButton>);
    expect(screen.getByRole("link", { name: "View My Work" })).toHaveAttribute("href", "#work");
  });

  it("keeps an unavailable CTA visible without making it interactive", () => {
    render(<RoughButton href={null}>Let's Talk</RoughButton>);
    expect(screen.queryByRole("link", { name: "Let's Talk" })).not.toBeInTheDocument();
    expect(screen.getByText("Let's Talk")).toHaveAttribute("aria-disabled", "true");
  });
});
```

- [ ] **Step 2: Verify RED**

```powershell
npm run test:run -- components/ui/RoughButton.test.tsx
```

Expected: FAIL because `RoughButton` does not exist.

- [ ] **Step 3: Implement `RoughButton` and its exact public API**

Create `components/ui/RoughButton.tsx`:

```tsx
import type { ReactNode } from "react";
import styles from "./RoughButton.module.css";

type RoughButtonProps = {
  children: ReactNode;
  href: string | null;
  variant?: "coral" | "paper" | "yellow";
  className?: string;
};

export function RoughButton({ children, href, variant = "coral", className = "" }: RoughButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${className}`.trim();

  if (!href) {
    return (
      <span aria-disabled="true" className={classes}>
        {children}
      </span>
    );
  }

  const external = href.startsWith("http");
  return (
    <a className={classes} href={href} rel={external ? "noreferrer" : undefined} target={external ? "_blank" : undefined}>
      {children}
    </a>
  );
}
```

Create `components/ui/RoughButton.module.css`:

```css
.button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: 2.5px solid var(--ink);
  border-radius: 9px 12px 8px 11px;
  padding: 11px 20px;
  color: var(--ink);
  font-weight: 900;
  line-height: 1;
  transition: translate 160ms ease, rotate 160ms ease, box-shadow 160ms ease;
}
.button[href]:hover { translate: 1px -2px; rotate: -0.25deg; }
.button[aria-disabled="true"] { cursor: default; }
.coral { background: var(--coral); box-shadow: 4px 5px 0 var(--purple); }
.paper { background: #fffef9; box-shadow: 4px 4px 0 var(--yellow); }
.yellow { background: var(--yellow); box-shadow: 4px 5px 0 var(--ink); }
@media (max-width: 430px) { .button { width: 100%; min-height: 50px; } }
```

- [ ] **Step 4: Create the section-heading primitives**

Create `components/ui/SectionHeading.tsx`:

```tsx
import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

export function SectionHeading({ children, decoration }: { children: ReactNode; decoration?: ReactNode }) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>{children}</h2>
      <span aria-hidden="true" className={styles.marker} />
      {decoration ? <span className={styles.decoration}>{decoration}</span> : null}
    </div>
  );
}
```

Create `components/ui/SectionHeading.module.css`:

```css
.wrap { position: relative; width: fit-content; margin-inline: auto; }
.heading { position: relative; z-index: 1; margin: 0; font-family: var(--font-heading), cursive; font-size: clamp(2.25rem, 4vw, 3.6rem); line-height: 1; letter-spacing: 0.015em; }
.marker { position: absolute; right: -5%; bottom: -5px; left: 7%; height: 9px; rotate: -1.5deg; border-radius: 54% 46% 57% 43%; background: var(--yellow); }
.decoration { position: absolute; top: -19px; right: -42px; color: var(--purple); }
```

Create `components/ui/ScribbleUnderline.tsx`:

```tsx
export function ScribbleUnderline({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 180 18">
      <path d="M4 10 C38 5 63 14 94 9 S144 4 176 10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
      <path d="M16 15 C57 11 94 17 160 13" fill="none" opacity=".45" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
```

Create `components/ui/WavyDivider.tsx`:

```tsx
export function WavyDivider({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <svg aria-hidden="true" preserveAspectRatio="none" style={{ rotate: flip ? "180deg" : undefined }} viewBox="0 0 1440 32">
      <path d="M0 15 C120 32 220 2 350 16 C510 33 620 5 760 18 C920 31 1040 3 1180 17 C1290 27 1365 11 1440 14 V32 H0 Z" fill={fill} stroke="var(--ink)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
```

- [ ] **Step 5: Run GREEN and commit**

```powershell
npm run test:run -- components/ui/RoughButton.test.tsx
npm run typecheck
git add components/ui
git commit -m "feat: add accessible sketch-style primitives"
```

## Task 5: Generate focal art and build the SVG illustration system

**Files:**

- Create: `public/images/developer-hero.png`
- Create: `public/images/developer-about.png`
- Create: `public/projects/ai-engineer-workspace.png`
- Create: `public/projects/instacity.png`
- Create: `public/projects/muzzy.png`
- Create: `public/doodles/paper-grain.svg`
- Create: `public/doodles/dot-field.svg`
- Create: `components/illustrations/SketchIcon.tsx`
- Create: `components/illustrations/SketchIcon.test.tsx`
- Create: `components/illustrations/TechSticker.tsx`
- Create: `components/illustrations/TechSticker.module.css`
- Create: `components/illustrations/DoodleDecoration.tsx`
- Create: `components/illustrations/HandDrawnArrow.tsx`

- [ ] **Step 1: Load the image-generation skill and generate the hero scene**

Invoke the `imagegen` skill, then call the image-generation tool with this prompt:

```text
Create a single transparent-background editorial illustration for a playful freelance developer portfolio. Young male developer with curly black hair, round black glasses, and a purple hoodie, smiling while typing behind a gray laptop marked only with the letters “PH”. Include a yellow abstract organic blob behind him, a yellow coffee mug with a black coding symbol, and a small potted green plant beside the laptop. Front three-quarter view, warm friendly personality, thick slightly irregular black ink outlines, soft pastel lavender/pink/mint/yellow/cream palette, subtle paper grain, imperfect hand-rendered comic linework, clean readable silhouette. No technology stickers, no surrounding labels, no stock-photo look, no photorealism, no glossy 3D, no generic corporate vector style. Landscape composition with generous transparent margins, designed to crop well at desktop and mobile sizes.
```

Save the returned image as `public/images/developer-hero.png`. Use `view_image` to verify that the background is transparent or cleanly removable, the laptop reads `PH`, the face is not photorealistic, and the scene includes the mug and plant. Reject and regenerate if any condition fails.

- [ ] **Step 2: Derive the consistent About character**

Invoke the image-generation tool as an edit using `public/images/developer-hero.png` as the referenced image and this prompt:

```text
Using exactly the same character identity, face, curly hair, round glasses, purple hoodie, ink line quality, and pastel palette, create a cropped upper-body pose for an About Me banner. The character looks slightly toward the text area on the right. Transparent background, thick imperfect black outlines, subtle paper grain, no laptop, no mug, no plant, no new props, no photorealism, no 3D.
```

Save as `public/images/developer-about.png` and verify consistency beside the hero with `view_image`.

- [ ] **Step 3: Generate the three project thumbnails separately**

Generate and save each 16:9 image at a minimum of 1280×720:

`public/projects/ai-engineer-workspace.png` prompt:

```text
Realistic polished software screenshot for an AI engineer productivity workspace: dark navy dashboard, purple analytics bar charts, agent task timeline, code-review panels, model activity indicators, crisp modern interface, believable spacing and hierarchy, no browser chrome, no logos, no watermark, no hands or devices. Keep fine text abstract rather than garbled. Designed as a portfolio project thumbnail.
```

`public/projects/instacity.png` prompt:

```text
Realistic polished 3D data visualization screenshot called InstaCity: a bright stylized city generated from social-media activity, varied glass towers, roads, warm blue sky, data markers integrated into the skyline, high-detail interactive product visualization, no people, no logos, no watermark, no browser chrome. Designed as a portfolio project thumbnail.
```

`public/projects/muzzy.png` prompt:

```text
Realistic polished music-streaming application screenshot: dark charcoal and deep purple interface, album grid, playlist sidebar, waveform/player controls, magenta and violet glow used sparingly, believable modern product UI, no recognizable artist photography, no logos, no watermark, no browser chrome. Keep fine text abstract rather than garbled. Designed as a portfolio project thumbnail.
```

Use `view_image` after each generation. Reject images with watermarks, broken UI geometry, photorealistic people, or illegible prominent text.

- [ ] **Step 4: Write the failing SVG-icon accessibility test**

Create `components/illustrations/SketchIcon.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SketchIcon } from "./SketchIcon";

describe("SketchIcon", () => {
  it("stays decorative when the adjacent card already names it", () => {
    const { container } = render(<SketchIcon name="rocket" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
```

Run `npm run test:run -- components/illustrations/SketchIcon.test.tsx` and expect a missing-module failure.

- [ ] **Step 5: Implement the custom icon set**

Create `components/illustrations/SketchIcon.tsx`:

```tsx
import type { SketchIconName } from "@/types/content";

function IconPaths({ name }: { name: SketchIconName }) {
  switch (name) {
    case "laptop":
      return <><path d="M5 7.5 6 6h20l1 1.5v14H5Z" /><path d="m2.5 24.5 3 2h21l3-2M12 12l-3 3 3 3m7-6 3 3-3 3m-3.5-7-2 8" /></>;
    case "phone":
      return <><path d="M10 3.5 11.5 2h11L24 3.5v25L22.5 30h-11L10 28.5Z" /><path d="M15 5h4m-3 21.5h2" /></>;
    case "robot":
      return <><path d="M9 10h14l2 2v11l-2 2H9l-2-2V12Z" /><path d="M16 10V6m-2-2h4M11 17h2m6 0h2m-8 5h6M4 15H2m28 0h-2" /></>;
    case "cloud":
      return <><path d="M8 24h16c7 0 7-9 1-10-1-7-12-8-15-2-7-1-9 9-2 12Z" /><path d="m12 27-2 3m7-3-2 3m7-3-2 3" /></>;
    case "lightbulb":
      return <><path d="M10 15a7 7 0 1 1 12 5c-2 2-2 3-2 5h-8c0-2 0-3-2-5a7 7 0 0 1 0-5Z" /><path d="M12 28h8m-7 3h6M16 1v3M4 8l3 2m21-2-3 2" /></>;
    case "wireframe":
      return <><path d="M3 5h26v23H3Z" /><path d="M3 10h26M7 7h.1m4 0h.1M7 15h8v8H7Zm12 0h6m-6 4h6m-6 4h4" /></>;
    case "rocket":
      return <><path d="M12 21c-3-1-5-1-7 0 1-4 3-6 6-7 2-7 8-11 16-11 0 8-4 14-11 16-1 3-3 5-7 6 1-2 1-4 0-7" /><circle cx="20" cy="10" r="2.5" /><path d="m12 22-4 7m8-10 3 6" /></>;
    case "growth":
      return <><path d="M4 28V5m0 23h25M8 23l6-6 5 3 9-11" /><path d="M22 9h6v6M9 28v-4m6 4v-7m6 7v-5m6 5V14" /></>;
    case "heart":
      return <path d="M16 28S4 21 4 12c0-7 9-9 12-3 3-6 12-4 12 3 0 9-12 16-12 16Z" />;
  }
}

export function SketchIcon({ name, className = "" }: { name: SketchIconName; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 32 32">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.15" vectorEffect="non-scaling-stroke">
        <IconPaths name={name} />
      </g>
    </svg>
  );
}
```

- [ ] **Step 6: Implement technology stickers and doodles**

Create `components/illustrations/TechSticker.tsx`:

```tsx
import type { Technology } from "@/types/content";
import styles from "./TechSticker.module.css";

function TechMark({ label }: { label: string }) {
  if (label.startsWith("React")) return <svg viewBox="0 0 48 34"><ellipse cx="24" cy="17" fill="none" rx="20" ry="7" /><ellipse cx="24" cy="17" fill="none" rx="20" ry="7" transform="rotate(60 24 17)" /><ellipse cx="24" cy="17" fill="none" rx="20" ry="7" transform="rotate(120 24 17)" /><circle cx="24" cy="17" r="3" /></svg>;
  if (label === "Node.js") return <svg viewBox="0 0 48 34"><path d="m24 2 18 10v12L24 32 6 23V11Z" fill="none" /><text x="24" y="22" textAnchor="middle">JS</text></svg>;
  if (label === "Python") return <svg viewBox="0 0 48 34"><path d="M12 17V8c0-5 6-6 12-6s10 1 10 7v6H18c-5 0-8 4-8 8" fill="none" /><path d="M36 17v9c0 5-6 6-12 6s-10-1-10-7v-6h16c5 0 8-4 8-8" fill="none" /></svg>;
  if (label === "PostgreSQL") return <svg viewBox="0 0 48 34"><ellipse cx="24" cy="8" fill="none" rx="15" ry="5" /><path d="M9 8v17c0 3 7 5 15 5s15-2 15-5V8M9 16c0 3 7 5 15 5s15-2 15-5" fill="none" /></svg>;
  return <svg viewBox="0 0 48 34"><text x="24" y="18" textAnchor="middle">aws</text><path d="M10 24c9 5 20 5 29 0" fill="none" /></svg>;
}

export function TechSticker({ technology, className = "" }: { technology: Technology; className?: string }) {
  return (
    <div aria-hidden="true" className={`${styles.sticker} ${styles[technology.tone]} ${styles[`variant${technology.variant}`]} ${className}`}>
      <TechMark label={technology.label} />
      <span>{technology.shortLabel}</span>
    </div>
  );
}
```

Create `components/illustrations/TechSticker.module.css`:

```css
.sticker { display: grid; width: 112px; min-height: 88px; place-items: center; border: 2.5px solid var(--ink); padding: 9px; color: var(--ink); box-shadow: 4px 5px 0 rgb(17 17 17 / 20%); font-weight: 900; line-height: 1; text-align: center; animation: sticker-float 7s ease-in-out infinite; }
.sticker svg { width: 46px; height: 34px; overflow: visible; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2; }
.sticker text { fill: currentColor; stroke: none; font-family: var(--font-heading), cursive; font-size: 12px; font-weight: 900; }
.sticker span { font-size: 0.75rem; }
.cream { background: var(--cream); } .pink { background: var(--pink); } .mint { background: var(--mint); } .yellow { background: var(--yellow); } .lavender { background: var(--lavender); } .purple { background: var(--purple); } .coral { background: var(--coral); }
.variant1 { border-radius: 11px 16px 9px 13px; rotate: -1.3deg; }
.variant2 { border-radius: 18px 10px 15px 8px; rotate: 1deg; animation-delay: -1.5s; }
.variant3 { border-radius: 9px 14px 18px 11px; rotate: -0.6deg; animation-delay: -3s; }
.variant4 { border-radius: 15px 8px 11px 17px; rotate: 0.8deg; animation-delay: -4.5s; }
@keyframes sticker-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -7px; } }
@media (max-width: 767px) { .sticker { width: 78px; min-height: 65px; padding: 6px; } .sticker svg { width: 33px; height: 25px; } .sticker span { font-size: 0.62rem; } }
```

Create `components/illustrations/DoodleDecoration.tsx`:

```tsx
export function Sparkle({ className = "" }: { className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 32 32"><path d="M16 2c1 8 5 12 13 14-8 1-12 5-13 14-2-9-6-13-14-14 8-2 12-6 14-14Z" fill="var(--yellow)" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" /></svg>;
}

export function PaperPlane({ className = "" }: { className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 90 62"><path d="m5 20 78-16-33 50-9-23Z" fill="#dff6f1" stroke="currentColor" strokeLinejoin="round" strokeWidth="3" /><path d="M41 31 83 4 48 39" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" /></svg>;
}

export function GridDoodle({ className = "" }: { className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 100 54"><path d="M3 4 96 9 92 49 7 45ZM8 16l86 4M7 28l86 4M6 39l86 4M22 5l-3 41M40 6l-2 41M59 7l-2 41M78 8l-3 41" fill="none" stroke="currentColor" strokeWidth="2" /></svg>;
}
```

Create `components/illustrations/HandDrawnArrow.tsx`:

```tsx
export function HandDrawnArrow({ className = "", direction = "right" }: { className?: string; direction?: "right" | "down" }) {
  return <svg aria-hidden="true" className={className} style={{ rotate: direction === "down" ? "90deg" : undefined }} viewBox="0 0 88 42"><path d="M4 29c21-18 45-17 73-9" fill="none" stroke="currentColor" strokeDasharray="5 7" strokeLinecap="round" strokeWidth="2.5" /><path d="m67 10 11 10-14 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /></svg>;
}
```

- [ ] **Step 7: Add local SVG textures**

Create `public/doodles/paper-grain.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><filter id="n"><feTurbulence baseFrequency=".78" numOctaves="3" seed="11" type="fractalNoise"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 .12 0"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity=".22"/></svg>
```

Create `public/doodles/dot-field.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="4" cy="4" r="1" fill="#111" opacity=".12"/></svg>
```

- [ ] **Step 8: Verify and commit artwork**

Run:

```powershell
npm run test:run -- components/illustrations/SketchIcon.test.tsx
npm run typecheck
Get-ChildItem public\images,public\projects,public\doodles -File | Select-Object FullName,Length
```

Expected: the icon test/typecheck pass; two character images, three non-empty project thumbnails, and two SVG textures are listed.

```powershell
git add public/images public/projects public/doodles components/illustrations
git commit -m "feat: add custom portfolio artwork"
```

## Task 6: Build the sticky header and mobile navigation via TDD

**Files:**

- Create: `components/layout/BrandLockup.tsx`
- Create: `components/layout/BrandLockup.module.css`
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Header.module.css`
- Create: `components/layout/MobileMenu.tsx`
- Create: `components/layout/MobileMenu.module.css`
- Create: `components/layout/MobileMenu.test.tsx`

- [ ] **Step 1: Write failing menu behavior tests**

Create `components/layout/MobileMenu.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MobileMenu } from "./MobileMenu";

const links = [{ label: "Work", href: "#work" }] as const;

describe("MobileMenu", () => {
  it("opens, locks body scroll, closes with Escape, and restores trigger focus", async () => {
    const user = userEvent.setup();
    render(<MobileMenu links={links} />);
    const trigger = screen.getByRole("button", { name: "Open navigation menu" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(document.body).toHaveStyle({ overflow: "hidden" });
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes when a navigation link is activated", async () => {
    const user = userEvent.setup();
    render(<MobileMenu links={links} />);
    const trigger = screen.getByRole("button", { name: "Open navigation menu" });
    await user.click(trigger);
    await user.click(screen.getByRole("link", { name: "Work" }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on an outside press and restores body overflow on unmount", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<MobileMenu links={links} />);
    const trigger = screen.getByRole("button", { name: "Open navigation menu" });
    await user.click(trigger);
    await user.click(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});
```

Run `npm run test:run -- components/layout/MobileMenu.test.tsx` and expect a missing-module failure.

- [ ] **Step 2: Implement the client menu**

Create `components/layout/MobileMenu.tsx`:

```tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavItem } from "@/types/content";
import styles from "./MobileMenu.module.css";

export function MobileMenu({ links }: { links: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && close(true);
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [close, open]);

  return (
    <div className={styles.root} ref={rootRef}>
      <button aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? "Close navigation menu" : "Open navigation menu"} className={styles.trigger} onClick={() => setOpen((value) => !value)} ref={triggerRef} type="button">
        <span /><span /><span />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.nav animate={{ opacity: 1, y: 0 }} aria-label="Mobile navigation" className={styles.panel} exit={{ opacity: 0, y: -10 }} id="mobile-navigation" initial={reduceMotion ? false : { opacity: 0, y: -10 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
            {links.map((link) => <a href={link.href} key={link.href} onClick={() => close(false)}>{link.label}</a>)}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
```

Create `components/layout/MobileMenu.module.css`:

```css
.root { display: none; }
.trigger { display: grid; width: 46px; height: 44px; place-content: center; gap: 5px; border: 2px solid var(--ink); border-radius: 9px 12px 8px 10px; background: var(--cream); box-shadow: 3px 3px 0 var(--purple); cursor: pointer; }
.trigger span { width: 23px; height: 2.5px; border-radius: 999px; background: var(--ink); transition: opacity 150ms ease, translate 150ms ease, rotate 150ms ease; }
.trigger span:nth-child(2) { width: 18px; translate: 3px; }
.trigger[aria-expanded="true"] span:first-child { translate: 0 7.5px; rotate: 45deg; }
.trigger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.trigger[aria-expanded="true"] span:last-child { translate: 0 -7.5px; rotate: -45deg; }
.panel { position: absolute; top: calc(100% + 2px); right: 0; left: 0; display: grid; gap: 4px; border-bottom: 2.5px solid var(--ink); background: var(--pink); padding: 14px 18px 20px; box-shadow: 0 8px 0 rgb(118 83 216 / 24%); }
.panel a { min-height: 44px; border-bottom: 1.5px dashed rgb(17 17 17 / 35%); padding: 11px 8px; font-family: var(--font-heading), cursive; font-size: 1.35rem; font-weight: 700; }
@media (max-width: 850px) { .root { display: block; } }
```

- [ ] **Step 3: Build the brand and server header**

Create `components/layout/BrandLockup.tsx`:

```tsx
import { siteConfig } from "@/config/site";
import styles from "./BrandLockup.module.css";

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return <a aria-label={`${siteConfig.name} home`} className={`${styles.brand} ${compact ? styles.compact : ""}`} href="#home"><strong>{siteConfig.initials}</strong><span><b>{siteConfig.name.toUpperCase()}</b><small>{siteConfig.role}</small></span></a>;
}
```

Create `components/layout/BrandLockup.module.css`:

```css
.brand { display: inline-flex; align-items: center; gap: 10px; line-height: 1; }
.brand strong { font-family: var(--font-heading), cursive; font-size: 2.65rem; letter-spacing: -0.08em; }
.brand span { display: grid; gap: 3px; }
.brand b { font-size: 0.85rem; }
.brand small { font-size: 0.58rem; font-weight: 700; }
.compact strong { font-size: 2.25rem; }
@media (max-width: 430px) { .brand small { display: none; } .brand b { font-size: 0.72rem; } }
```

Create `components/layout/Header.tsx`:

```tsx
import { MessageCircle } from "lucide-react";
import { navigation } from "@/data/navigation";
import { RoughButton } from "@/components/ui/RoughButton";
import { contactLinks } from "@/config/site";
import { BrandLockup } from "./BrandLockup";
import { MobileMenu } from "./MobileMenu";
import styles from "./Header.module.css";

export function Header() {
  return <header className={styles.header}><div className={styles.inner}><BrandLockup compact /><nav aria-label="Primary navigation" className={styles.nav}>{navigation.map((link, index) => <a className={index === 0 ? styles.active : undefined} href={link.href} key={link.href}>{link.label}</a>)}</nav><div className={styles.cta}><RoughButton href={contactLinks.talk} variant="paper">LET'S TALK <MessageCircle aria-hidden="true" size={17} strokeWidth={2.5} /></RoughButton></div><MobileMenu links={navigation} /></div></header>;
}
```

Create `components/layout/Header.module.css`:

```css
.header { position: sticky; top: 0; z-index: 50; border-bottom: 2.5px solid var(--ink); background: var(--pink); }
.inner { position: relative; display: grid; width: min(100% - 36px, 1320px); min-height: var(--header-height); margin-inline: auto; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 28px; }
.nav { display: flex; align-items: center; gap: clamp(20px, 2.4vw, 38px); font-family: var(--font-heading), cursive; font-size: 1.05rem; font-weight: 700; }
.nav a { position: relative; padding: 8px 1px; }
.active::after { position: absolute; right: 0; bottom: 3px; left: 0; height: 2px; rotate: -1deg; border-radius: 50%; background: var(--ink); content: ""; }
.cta { justify-self: end; }
@media (max-width: 1024px) { .inner { grid-template-columns: auto 1fr auto; } .nav { gap: 17px; } .cta { display: none; } }
@media (max-width: 850px) { .inner { display: flex; width: min(100% - 24px, 1320px); justify-content: space-between; } .nav { display: none; } }
```

- [ ] **Step 4: Run GREEN and commit**

```powershell
npm run test:run -- components/layout/MobileMenu.test.tsx
npm run typecheck
git add components/layout
git commit -m "feat: add responsive accessible navigation"
```

## Task 7: Implement the hero and trust strip

**Files:**

- Create: `components/illustrations/HeroArtwork.tsx`
- Create: `components/illustrations/HeroArtwork.module.css`
- Create: `components/sections/HeroSection.tsx`
- Create: `components/sections/HeroSection.module.css`
- Create: `components/sections/TrustStrip.tsx`
- Create: `components/sections/TrustStrip.module.css`
- Create: `components/sections/HeroSection.test.tsx`

- [ ] **Step 1: Write the failing hero contract test**

Create `components/sections/HeroSection.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroSection } from "./HeroSection";
import { TrustStrip } from "./TrustStrip";

describe("hero and trust", () => {
  it("renders the approved heading and only the work CTA as a link", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Your Tech Partner to Build Digital Products That Work");
    expect(screen.getByRole("link", { name: "View My Work" })).toHaveAttribute("href", "#work");
    expect(screen.getByText("Start Your Project", { exact: false })).toHaveAttribute("aria-disabled", "true");
  });

  it("renders all three trust commitments", () => {
    render(<TrustStrip />);
    expect(screen.getByText("On-Time Delivery")).toBeVisible();
    expect(screen.getByText("Scalable & Reliable")).toBeVisible();
    expect(screen.getByText("Support Beyond Launch")).toBeVisible();
  });
});
```

Run `npm run test:run -- components/sections/HeroSection.test.tsx` and expect missing-module failures.

- [ ] **Step 2: Implement the modular hero artwork**

Create `components/illustrations/HeroArtwork.tsx`:

```tsx
import Image from "next/image";
import { technologies } from "@/data/technologies";
import { Sparkle } from "./DoodleDecoration";
import { TechSticker } from "./TechSticker";
import styles from "./HeroArtwork.module.css";

export function HeroArtwork() {
  return <div aria-label="Illustration of a developer working at a laptop" className={styles.art} role="img"><div aria-hidden="true" className={styles.blob} /><Image alt="Curly-haired developer in a purple hoodie working behind a PH laptop with a coding mug and plant" className={styles.character} height={900} preload sizes="(max-width: 767px) 92vw, (max-width: 1100px) 50vw, 620px" src="/images/developer-hero.png" width={1100} />{technologies.map((technology, index) => <TechSticker className={styles[`sticker${index + 1}`]} key={technology.label} technology={technology} />)}<svg aria-hidden="true" className={styles.paths} viewBox="0 0 650 500"><path d="M115 90c70 8 85 42 92 94M497 70c-44 12-58 44-62 82M545 275c-37-12-72-4-94 24M113 330c38-22 68-22 96-3" /></svg><Sparkle className={styles.sparkle1} /><Sparkle className={styles.sparkle2} /></div>;
}
```

Create `components/illustrations/HeroArtwork.module.css`:

```css
.art { position: relative; min-height: 510px; }
.blob { position: absolute; right: 5%; bottom: 2%; width: 77%; aspect-ratio: 1.25; border-radius: 52% 48% 43% 57% / 58% 43% 57% 42%; background: var(--yellow); }
.character { position: absolute; right: -2%; bottom: -2%; z-index: 2; width: 84%; height: auto; object-fit: contain; }
.paths { position: absolute; inset: 4% 0 8%; z-index: 1; width: 100%; height: 88%; overflow: visible; fill: none; stroke: var(--ink); stroke-dasharray: 5 8; stroke-linecap: round; stroke-width: 2; }
.sticker1, .sticker2, .sticker3, .sticker4, .sticker5 { position: absolute; z-index: 4; }
.sticker1 { top: 7%; left: 5%; } .sticker2 { top: 0; right: 20%; } .sticker3 { top: 10%; right: -3%; } .sticker4 { top: 39%; right: -8%; } .sticker5 { top: 40%; left: 1%; }
.sparkle1, .sparkle2 { position: absolute; z-index: 5; width: 28px; }
.sparkle1 { top: 27%; left: -1%; } .sparkle2 { top: 32%; right: 8%; color: var(--purple); }
@media (max-width: 1024px) { .art { min-height: 440px; } .sticker4 { right: 0; } }
@media (max-width: 767px) { .art { min-height: 390px; margin-top: 8px; } .character { right: 2%; width: 91%; } .sticker1 { top: 12%; left: 0; } .sticker2 { top: 2%; right: 22%; } .sticker3 { top: 18%; right: 0; } .sticker4 { display: none; } .sticker5 { top: 48%; left: 0; } .paths { opacity: .55; } }
@media (max-width: 390px) { .art { min-height: 340px; } .sticker3 { right: -4%; } .sparkle2 { display: none; } }
```

- [ ] **Step 3: Implement the hero section**

Create `components/sections/HeroSection.tsx`:

```tsx
import { ArrowRight } from "lucide-react";
import { HeroArtwork } from "@/components/illustrations/HeroArtwork";
import { RoughButton } from "@/components/ui/RoughButton";
import { ScribbleUnderline } from "@/components/ui/ScribbleUnderline";
import { contactLinks } from "@/config/site";
import { pageContent } from "@/data/page-content";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const hero = pageContent.hero;
  return <section className={`${styles.hero} paper-texture`} id="home"><div aria-hidden="true" className={styles.mintEdge} /><div className={`${styles.inner} section-inner`}><div className={styles.copy}><p className={styles.eyebrow}>{hero.eyebrow}</p><h1><span>{hero.headingLines[0]}</span><span>{hero.headingLines[1]}</span><span>{hero.headingLines[2]}{" "}<span className={styles.work}><mark>{hero.highlightedWord}</mark><ScribbleUnderline /></span></span></h1><p className={styles.support}>{hero.support}</p><div className={styles.actions}><RoughButton href={contactLinks.startProject}>Start Your Project <ArrowRight aria-hidden="true" size={20} /></RoughButton><RoughButton href="#work" variant="paper">View My Work</RoughButton></div></div><HeroArtwork /></div></section>;
}
```

Create `components/sections/HeroSection.module.css`:

```css
.hero { position: relative; min-height: 650px; border-bottom: 2.5px solid var(--ink); background-color: var(--cream); }
.mintEdge { position: absolute; top: 0; bottom: 0; left: 0; width: clamp(20px, 4vw, 62px); border-right: 2px solid var(--ink); background: var(--mint); clip-path: polygon(0 0, 100% 0, 54% 100%, 0 100%); }
.inner { display: grid; min-height: 650px; grid-template-columns: minmax(0, 1fr) minmax(470px, .95fr); align-items: center; gap: 30px; padding-block: 54px 38px; }
.copy { position: relative; z-index: 4; padding-left: clamp(20px, 3vw, 48px); }
.eyebrow { width: fit-content; margin: 0 0 28px; border: 2px solid var(--ink); border-radius: 7px 10px 6px 9px; background: var(--lavender); padding: 7px 14px 5px; box-shadow: 3px 4px 0 rgb(118 83 216 / 55%); font-family: var(--font-heading), cursive; font-size: clamp(.95rem, 1.4vw, 1.25rem); font-weight: 800; rotate: -.7deg; }
.copy h1 { display: grid; margin: 0; font-family: var(--font-heading), cursive; font-size: clamp(3.5rem, 5.4vw, 5.75rem); letter-spacing: .01em; line-height: .92; }
.work { position: relative; display: inline-block; width: fit-content; }
.work mark { position: relative; z-index: 1; background: linear-gradient(transparent 35%, var(--yellow) 35% 91%, transparent 91%); color: inherit; padding-inline: .05em; }
.work svg { position: absolute; right: -5px; bottom: -9px; left: 0; width: 108%; }
.support { margin: 28px 0 0; font-family: var(--font-heading), cursive; font-size: clamp(1.35rem, 2.2vw, 2rem); font-weight: 700; }
.actions { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 40px; }
@media (max-width: 1024px) { .inner { grid-template-columns: .95fr 1.05fr; } .copy h1 { font-size: clamp(3rem, 5vw, 4.5rem); } }
@media (max-width: 767px) { .hero { min-height: auto; } .mintEdge { width: 20px; } .inner { display: block; min-height: auto; padding-block: 40px 12px; } .copy { padding-left: 14px; } .eyebrow { margin-bottom: 22px; } .copy h1 { font-size: clamp(3.05rem, 14.5vw, 4.3rem); line-height: .94; } .support { margin-top: 24px; font-size: 1.35rem; } .actions { display: grid; gap: 14px; margin-top: 30px; } }
```

- [ ] **Step 4: Implement the trust strip**

Create `components/sections/TrustStrip.tsx`:

```tsx
import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { trustItems } from "@/data/trust";
import styles from "./TrustStrip.module.css";

export function TrustStrip() {
  return <section aria-label="Client commitments" className={styles.strip}><div className={`${styles.inner} section-inner`}>{trustItems.map((item) => <div className={`${styles.item} ${styles[`variant${item.variant}`]}`} key={item.label}><span className={`${styles.icon} ${styles[item.tone]}`}><SketchIcon name={item.icon} /></span><strong>{item.label}</strong></div>)}</div></section>;
}
```

Create `components/sections/TrustStrip.module.css`:

```css
.strip { position: relative; z-index: 3; margin-top: -2px; border-block: 2.5px solid var(--ink); background: var(--mint); padding: 26px 0; clip-path: polygon(0 7%, 7% 2%, 17% 8%, 28% 3%, 41% 7%, 55% 1%, 68% 6%, 82% 2%, 100% 7%, 100% 94%, 90% 98%, 77% 93%, 63% 98%, 47% 94%, 31% 99%, 16% 94%, 0 98%); }
.inner { display: grid; grid-template-columns: repeat(3, 1fr); align-items: center; padding-block: 14px; }
.item { display: flex; min-height: 62px; align-items: center; justify-content: center; gap: 13px; padding-inline: 22px; }
.item + .item { border-left: 2px solid rgb(17 17 17 / 65%); }
.icon { display: grid; width: 50px; aspect-ratio: 1; flex: 0 0 auto; place-items: center; border: 2px solid var(--ink); border-radius: 48% 52% 44% 56%; background: white; }
.icon svg { width: 28px; }
.yellow { background: var(--yellow); } .mint { background: #e8fff7; } .pink { background: var(--pink); } .lavender { background: var(--lavender); }
.variant1 .icon { rotate: -4deg; } .variant2 .icon { border-radius: 55% 45% 52% 48%; rotate: 2deg; } .variant3 .icon { border-radius: 44% 56% 48% 52%; rotate: -1deg; }
.item strong { font-size: clamp(.94rem, 1.35vw, 1.15rem); }
@media (max-width: 700px) { .strip { clip-path: polygon(0 2%, 20% 0, 48% 3%, 72% 0, 100% 3%, 100% 98%, 74% 100%, 50% 97%, 22% 100%, 0 97%); padding: 24px 0; } .inner { grid-template-columns: 1fr; gap: 8px; } .item { justify-content: flex-start; padding: 7px 28px; } .item + .item { border-top: 1.5px dashed rgb(17 17 17 / 45%); border-left: 0; } }
```

- [ ] **Step 5: Run GREEN and commit**

```powershell
npm run test:run -- components/sections/HeroSection.test.tsx
npm run typecheck
git add components/illustrations/HeroArtwork.* components/sections/HeroSection.* components/sections/TrustStrip.*
git commit -m "feat: build illustrated hero and trust strip"
```

## Task 8: Implement Services and Process from typed data

**Files:**

- Create: `components/sections/ServicesSection.tsx`
- Create: `components/sections/ServicesSection.module.css`
- Create: `components/sections/ProcessSection.tsx`
- Create: `components/sections/ProcessSection.module.css`
- Create: `components/sections/ServicesProcess.test.tsx`

- [ ] **Step 1: Write the failing section-content test**

Create `components/sections/ServicesProcess.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProcessSection } from "./ProcessSection";
import { ServicesSection } from "./ServicesSection";

describe("services and process", () => {
  it("renders four distinct services", () => {
    render(<ServicesSection />);
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getByText("LLMs, Agents, Automation")).toBeVisible();
  });

  it("renders the four-step process in order", () => {
    render(<ProcessSection />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);
    expect(headings).toEqual(["Plan", "Build", "Launch", "Grow"]);
  });
});
```

Run `npm run test:run -- components/sections/ServicesProcess.test.tsx` and expect missing-module failures.

- [ ] **Step 2: Implement Services**

Create `components/sections/ServicesSection.tsx`:

```tsx
import { ArrowRight } from "lucide-react";
import { PaperPlane } from "@/components/illustrations/DoodleDecoration";
import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import styles from "./ServicesSection.module.css";

export function ServicesSection() {
  return <section className={styles.section} id="services"><div className="section-inner"><SectionHeading decoration={<span>〽</span>}>Services I Offer</SectionHeading><PaperPlane className={styles.plane} /><div className={styles.grid}>{services.map((service) => <article className={`${styles.card} ${styles[service.tone]} ${styles[`variant${service.variant}`]}`} key={service.title}><span className={styles.icon}><SketchIcon name={service.icon} /></span><h3>{service.title}</h3><p>{service.description}</p><span aria-hidden="true" className={styles.arrow}><ArrowRight size={22} strokeWidth={2.6} /></span></article>)}</div></div></section>;
}
```

Create `components/sections/ServicesSection.module.css`:

```css
.section { position: relative; background: var(--cream); padding: 78px 0 90px; }
.plane { position: absolute; top: 42px; right: max(5vw, 40px); width: 96px; rotate: -9deg; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(18px, 2.2vw, 30px); margin-top: 62px; }
.card { display: flex; min-height: 286px; flex-direction: column; align-items: center; border: 2.5px solid var(--ink); padding: 34px 22px 23px; text-align: center; transition: translate 180ms ease, rotate 180ms ease, box-shadow 180ms ease; }
.card:hover { translate: 0 -5px; rotate: 0deg; box-shadow: 7px 8px 0 rgb(17 17 17 / 22%); }
.icon { display: grid; width: 75px; height: 68px; place-items: center; }
.icon svg { width: 58px; transition: translate 180ms ease; }
.card:hover .icon svg { translate: 0 -3px; }
.card h3 { margin: 19px 0 8px; font-family: var(--font-heading), cursive; font-size: 1.75rem; line-height: 1; }
.card p { margin: 0; color: var(--muted); font-weight: 800; }
.arrow { display: grid; width: 42px; aspect-ratio: 1; place-items: center; margin-top: auto; border: 2px solid var(--ink); border-radius: 50% 44% 52% 48%; background: rgb(255 255 255 / 42%); }
.yellow { background: var(--yellow); } .mint { background: var(--mint); } .pink { background: var(--pink); } .lavender { background: var(--lavender); }
.variant1 { border-radius: 12px 17px 10px 15px; rotate: -.65deg; box-shadow: 5px 6px 0 #d8bd56; }
.variant2 { border-radius: 18px 10px 15px 8px; rotate: .45deg; box-shadow: -4px 6px 0 #79bda7; }
.variant3 { border-radius: 9px 16px 11px 13px; rotate: -.35deg; box-shadow: 6px 5px 0 #c97880; }
.variant4 { border-radius: 16px 9px 14px 11px; rotate: .6deg; box-shadow: 4px 7px 0 #9275ba; }
@media (max-width: 1000px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .section { padding-block: 64px 72px; } .plane { top: 28px; right: 14px; width: 68px; } .grid { grid-template-columns: 1fr; gap: 22px; margin-top: 48px; padding-inline: 3px; } .card { min-height: 248px; rotate: 0deg; } }
```

- [ ] **Step 3: Implement Process**

Create `components/sections/ProcessSection.tsx`:

```tsx
import { HandDrawnArrow } from "@/components/illustrations/HandDrawnArrow";
import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import styles from "./ProcessSection.module.css";

export function ProcessSection() {
  return <section className={`${styles.section} paper-texture`} id="process"><div className="section-inner"><SectionHeading>How We Work</SectionHeading><ol className={styles.steps}>{processSteps.map((step, index) => <li className={`${styles.step} ${styles[`variant${step.variant}`]}`} key={step.title}><span className={`${styles.icon} ${styles[step.tone]}`}><SketchIcon name={step.icon} /></span><h3>{step.title}</h3><p>{step.description}</p>{index < processSteps.length - 1 ? <HandDrawnArrow className={styles.connector} /> : null}</li>)}</ol></div></section>;
}
```

Create `components/sections/ProcessSection.module.css`:

```css
.section { border-block: 2.5px solid var(--ink); background-color: var(--yellow); background-image: url("/doodles/dot-field.svg"); padding: 72px 0 80px; }
.steps { display: grid; margin: 58px 0 0; padding: 0; grid-template-columns: repeat(4, 1fr); list-style: none; }
.step { position: relative; display: grid; justify-items: center; min-width: 0; text-align: center; }
.icon { display: grid; width: 132px; aspect-ratio: 1; place-items: center; border: 2.5px solid var(--ink); border-radius: 48% 52% 45% 55%; background: white; box-shadow: 4px 5px 0 rgb(17 17 17 / 14%); }
.icon svg { width: 74px; }
.step h3 { margin: 18px 0 4px; font-family: var(--font-heading), cursive; font-size: 1.85rem; line-height: 1; }
.step p { margin: 0; font-weight: 800; }
.connector { position: absolute; top: 43px; left: calc(50% + 75px); width: calc(100% - 150px); min-width: 62px; }
.yellow { background: #fff8d7; } .mint { background: #dff8ef; } .pink { background: #fbd2d4; }
.variant1 .icon { rotate: -2deg; } .variant2 .icon { border-radius: 54% 46% 50% 50%; rotate: 1deg; } .variant3 .icon { border-radius: 46% 54% 55% 45%; rotate: -1deg; } .variant4 .icon { border-radius: 52% 48% 43% 57%; rotate: 2deg; }
@media (max-width: 900px) { .steps { grid-template-columns: repeat(2, 1fr); gap: 48px 20px; } .connector { display: none; } }
@media (max-width: 560px) { .section { padding-block: 62px 70px; } .steps { grid-template-columns: 1fr; gap: 42px; margin-top: 48px; } .step:not(:last-child)::after { width: 38px; height: 32px; margin-top: 20px; border-right: 2px dashed var(--ink); content: ""; rotate: 12deg; } .icon { width: 118px; } }
```

- [ ] **Step 4: Run GREEN and commit**

```powershell
npm run test:run -- components/sections/ServicesProcess.test.tsx
npm run typecheck
git add components/sections/ServicesSection.* components/sections/ProcessSection.* components/sections/ServicesProcess.test.tsx
git commit -m "feat: add services and process sections"
```

## Task 9: Build Featured Work and the native mobile carousel via TDD

**Files:**

- Create: `components/ui/ProjectCard.tsx`
- Create: `components/ui/ProjectCard.module.css`
- Create: `components/ui/ProjectCarousel.tsx`
- Create: `components/ui/ProjectCarousel.module.css`
- Create: `components/ui/ProjectCarousel.test.tsx`
- Create: `components/sections/FeaturedWork.tsx`
- Create: `components/sections/FeaturedWork.module.css`
- Create: `components/sections/FeaturedWork.test.tsx`

- [ ] **Step 1: Write failing carousel behavior tests**

Create `components/ui/ProjectCarousel.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProjectCarousel } from "./ProjectCarousel";

describe("ProjectCarousel", () => {
  it("advances, reports the active slide, and respects boundaries", async () => {
    const user = userEvent.setup();
    render(<ProjectCarousel count={3}><article>One</article><article>Two</article><article>Three</article></ProjectCarousel>);
    const previous = screen.getByRole("button", { hidden: true, name: "Previous project" });
    const next = screen.getByRole("button", { hidden: true, name: "Next project" });
    expect(previous).toBeDisabled();
    expect(screen.getByRole("button", { name: "Show project 1" })).toHaveAttribute("aria-current", "true");
    await user.click(next);
    expect(screen.getByRole("button", { name: "Show project 2" })).toHaveAttribute("aria-current", "true");
    await user.click(next);
    expect(next).toBeDisabled();
  });
});
```

Run `npm run test:run -- components/ui/ProjectCarousel.test.tsx` and expect a missing-module failure.

- [ ] **Step 2: Implement the narrow client carousel**

Create `components/ui/ProjectCarousel.tsx`:

```tsx
"use client";

import { Children, type ReactNode, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./ProjectCarousel.module.css";

export function ProjectCarousel({ children, count }: { children: ReactNode; count: number }) {
  const [active, setActive] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(count - 1, index));
    setActive(next);
    viewportRef.current?.querySelectorAll<HTMLElement>("[data-project-slide]")[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return <div className={styles.carousel}><div aria-label="Featured projects" className={styles.viewport} onScroll={(event) => { const width = event.currentTarget.clientWidth || 1; setActive(Math.max(0, Math.min(count - 1, Math.round(event.currentTarget.scrollLeft / width)))); }} ref={viewportRef}>{slides.map((slide, index) => <div className={styles.slide} data-project-slide key={index}>{slide}</div>)}</div><div className={styles.controls}><button aria-label="Previous project" disabled={active === 0} onClick={() => goTo(active - 1)} type="button"><ArrowLeft aria-hidden="true" /></button><div className={styles.dots}>{Array.from({ length: count }, (_, index) => <button aria-current={active === index ? "true" : undefined} aria-label={`Show project ${index + 1}`} key={index} onClick={() => goTo(index)} type="button" />)}</div><button aria-label="Next project" disabled={active === count - 1} onClick={() => goTo(active + 1)} type="button"><ArrowRight aria-hidden="true" /></button></div></div>;
}
```

Create `components/ui/ProjectCarousel.module.css`:

```css
.viewport { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 26px; }
.slide { min-width: 0; }
.controls { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 22px; }
.controls > button { display: none; }
.dots { display: flex; gap: 8px; }
.dots button { width: 11px; height: 11px; border: 1.8px solid var(--ink); border-radius: 50%; background: transparent; padding: 0; cursor: pointer; }
.dots button[aria-current="true"] { background: var(--ink); }
@media (max-width: 767px) { .viewport { display: flex; gap: 16px; overflow-x: auto; padding: 6px 4px 18px; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: none; } .viewport::-webkit-scrollbar { display: none; } .slide { min-width: calc(100% - 10px); scroll-snap-align: start; } .controls { margin-top: 8px; } .controls > button { display: grid; width: 42px; aspect-ratio: 1; place-items: center; border: 2px solid var(--ink); border-radius: 50% 44% 54% 46%; background: var(--cream); cursor: pointer; } .controls > button:disabled { cursor: default; opacity: .38; } }
```

- [ ] **Step 3: Implement project cards**

Create `components/ui/ProjectCard.tsx`:

```tsx
import Image from "next/image";
import type { Project } from "@/types/content";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const body = <><div className={styles.imageWrap}><Image alt={project.imageAlt} fill sizes="(max-width: 767px) 88vw, (max-width: 1200px) 31vw, 390px" src={project.image} /></div><h3>{project.title}</h3><p>{project.description}</p><ul aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></>;
  const classes = `${styles.card} ${styles[`variant${project.variant}`]}`;
  return project.url ? <a aria-label={`View ${project.title} project`} className={classes} href={project.url} rel="noreferrer" target="_blank">{body}</a> : <article className={classes}>{body}</article>;
}
```

Create `components/ui/ProjectCard.module.css`:

```css
.card { display: block; height: 100%; border: 2.5px solid var(--ink); background: #fffef9; padding: 12px 12px 15px; color: var(--ink); transition: translate 180ms ease, rotate 180ms ease, box-shadow 180ms ease; }
.card:hover { translate: 0 -4px; rotate: 0deg; box-shadow: 6px 7px 0 rgb(17 17 17 / 16%); }
.imageWrap { position: relative; overflow: hidden; width: 100%; aspect-ratio: 16 / 8.6; border: 2px solid var(--ink); border-radius: 8px 11px 7px 10px; background: #1b1537; }
.imageWrap img { object-fit: cover; transition: scale 260ms ease; }
.card:hover img { scale: 1.025; }
.card h3 { margin: 13px 2px 4px; font-family: var(--font-heading), cursive; font-size: 1.55rem; line-height: 1; }
.card p { margin: 0 2px; color: var(--muted); font-weight: 700; }
.card ul { display: flex; flex-wrap: wrap; gap: 7px; margin: 13px 2px 0; padding: 0; list-style: none; }
.card li { border: 1.5px solid var(--ink); border-radius: 999px 999px 999px 84%; background: var(--mint); padding: 3px 9px; font-size: .75rem; font-weight: 900; }
.card li:nth-child(2n) { background: var(--lavender); }
.variant1 { border-radius: 12px 16px 10px 14px; rotate: -.35deg; box-shadow: 4px 5px 0 #a3d7c5; }
.variant2 { border-radius: 16px 10px 14px 9px; rotate: .3deg; box-shadow: -3px 5px 0 #d6bd72; }
.variant3 { border-radius: 9px 15px 12px 10px; rotate: -.2deg; box-shadow: 5px 4px 0 #b99bdb; }
@media (max-width: 767px) { .card { rotate: 0deg; } }
```

- [ ] **Step 4: Write the failing Featured Work optional-link test**

Create `components/sections/FeaturedWork.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturedWork } from "./FeaturedWork";

describe("FeaturedWork", () => {
  it("keeps unavailable destinations informative and non-interactive", () => {
    render(<FeaturedWork />);
    expect(screen.getByRole("heading", { name: "AI Engineer Workspace" })).toBeVisible();
    expect(screen.queryByRole("link", { name: /AI Engineer Workspace project/ })).not.toBeInTheDocument();
    expect(screen.getByText("View All →")).toHaveAttribute("aria-disabled", "true");
  });
});
```

Run the test and expect a missing-module failure.

- [ ] **Step 5: Implement Featured Work**

Create `components/sections/FeaturedWork.tsx`:

```tsx
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./FeaturedWork.module.css";

export function FeaturedWork() {
  return <section className={styles.section} id="work"><div className="section-inner"><div className={styles.headingRow}><SectionHeading>Featured Work</SectionHeading>{siteConfig.viewAllProjectsUrl ? <a href={siteConfig.viewAllProjectsUrl}>View All →</a> : <span aria-disabled="true">View All →</span>}</div><ProjectCarousel count={projects.length}>{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</ProjectCarousel></div></section>;
}
```

Create `components/sections/FeaturedWork.module.css`:

```css
.section { background: var(--cream); padding: 78px 0 84px; }
.headingRow { position: relative; display: flex; align-items: center; justify-content: center; margin-bottom: 52px; }
.headingRow > a, .headingRow > span { position: absolute; right: 0; border-bottom: 2px solid var(--ink); font-family: var(--font-heading), cursive; font-size: 1.15rem; font-weight: 800; }
.headingRow > span { opacity: .72; }
@media (max-width: 600px) { .section { padding-block: 64px 70px; } .headingRow { display: grid; justify-items: center; gap: 24px; margin-bottom: 34px; } .headingRow > a, .headingRow > span { position: static; justify-self: end; } }
```

- [ ] **Step 6: Run GREEN and commit**

```powershell
npm run test:run -- components/ui/ProjectCarousel.test.tsx components/sections/FeaturedWork.test.tsx
npm run typecheck
git add components/ui/Project* components/sections/FeaturedWork.*
git commit -m "feat: add accessible featured-work carousel"
```

## Task 10: Add About, contact CTA, and footer

**Files:**

- Create: `components/sections/AboutBanner.tsx`
- Create: `components/sections/AboutBanner.module.css`
- Create: `components/sections/CTASection.tsx`
- Create: `components/sections/CTASection.module.css`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/Footer.module.css`
- Create: `components/sections/ClosingSections.test.tsx`

- [ ] **Step 1: Write the failing closing-content test**

Create `components/sections/ClosingSections.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { AboutBanner } from "./AboutBanner";
import { CTASection } from "./CTASection";

describe("closing sections", () => {
  it("renders the approved About copy and unavailable CTA", () => {
    render(<AboutBanner />);
    expect(screen.getByText(/Full-Stack Developer passionate/)).toBeVisible();
    expect(screen.getByText("Let's Build Together", { exact: false })).toHaveAttribute("aria-disabled", "true");
  });

  it("provides the contact anchor without inventing a scheduling link", () => {
    const { container } = render(<CTASection />);
    expect(container.querySelector("#contact")).toBeInTheDocument();
    expect(screen.getByText("Schedule a Call")).toHaveAttribute("aria-disabled", "true");
  });

  it("renders social positions as unavailable when they are unconfigured", () => {
    render(<Footer />);
    expect(screen.queryByRole("link", { name: "LinkedIn" })).not.toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toHaveAttribute("aria-disabled", "true");
  });
});
```

Run `npm run test:run -- components/sections/ClosingSections.test.tsx` and expect missing-module failures.

- [ ] **Step 2: Implement About Banner**

Create `components/sections/AboutBanner.tsx`:

```tsx
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { GridDoodle } from "@/components/illustrations/DoodleDecoration";
import { RoughButton } from "@/components/ui/RoughButton";
import { contactLinks } from "@/config/site";
import { pageContent } from "@/data/page-content";
import styles from "./AboutBanner.module.css";

export function AboutBanner() {
  return <section className={styles.section} id="about"><div className={`${styles.banner} section-inner paper-texture`}><div className={styles.character}><Image alt="Illustrated developer with curly hair, round glasses, and a purple hoodie" fill sizes="(max-width: 600px) 190px, 280px" src="/images/developer-about.png" /></div><div className={styles.copy}><h2>{pageContent.about.heading}</h2><p>{pageContent.about.body}</p></div><RoughButton className={styles.cta} href={contactLinks.buildTogether} variant="yellow">Let's Build Together <ArrowRight aria-hidden="true" size={20} /></RoughButton><GridDoodle className={styles.grid} /></div></section>;
}
```

Create `components/sections/AboutBanner.module.css`:

```css
.section { background: var(--cream); padding: 18px 0 28px; }
.banner { position: relative; display: grid; min-height: 190px; grid-template-columns: 260px 1fr auto; align-items: center; gap: 30px; overflow: hidden; border: 2.5px solid var(--ink); border-radius: 15px 10px 17px 12px; background-color: var(--lavender); padding: 28px 36px 24px 0; box-shadow: 3px 4px 0 rgb(118 83 216 / 25%); }
.character { position: relative; align-self: end; width: 260px; height: 185px; }
.character img { object-fit: contain; object-position: bottom; }
.copy { position: relative; z-index: 2; }
.copy h2 { width: fit-content; margin: 0 0 8px; border-bottom: 3px solid var(--ink); font-family: var(--font-heading), cursive; font-size: 2.25rem; line-height: 1; }
.copy p { max-width: 670px; margin: 0; font-size: 1.05rem; font-weight: 700; line-height: 1.55; }
.cta { position: relative; z-index: 2; white-space: nowrap; }
.grid { position: absolute; top: 9px; right: 26px; width: 92px; rotate: 5deg; }
@media (max-width: 900px) { .banner { grid-template-columns: 190px 1fr; padding-right: 24px; } .character { width: 190px; } .cta { grid-column: 2; width: fit-content; } }
@media (max-width: 600px) { .banner { grid-template-columns: 1fr; gap: 12px; padding: 18px; text-align: left; } .character { width: 180px; height: 150px; margin: -12px auto 0; } .copy h2 { margin-inline: auto; } .copy p { text-align: center; } .cta { grid-column: auto; width: 100%; } .grid { width: 64px; right: 10px; } }
```

- [ ] **Step 3: Implement the contact CTA band**

Create `components/sections/CTASection.tsx`:

```tsx
import { CalendarDays } from "lucide-react";
import { HandDrawnArrow } from "@/components/illustrations/HandDrawnArrow";
import { RoughButton } from "@/components/ui/RoughButton";
import { contactLinks } from "@/config/site";
import { pageContent } from "@/data/page-content";
import styles from "./CTASection.module.css";

export function CTASection() {
  const contact = pageContent.contact;
  return <section className={styles.section} id="contact"><div className={`${styles.inner} section-inner`}><div><h2>{contact.headingStart} <mark>{contact.highlightedWord}</mark> {contact.headingEnd}</h2><p>{contact.body}</p></div><HandDrawnArrow className={styles.arrow} /><div className={styles.action}><RoughButton href={contactLinks.scheduleCall}>Schedule a Call <CalendarDays aria-hidden="true" size={19} /></RoughButton><span aria-hidden="true" className={styles.lines}>〽</span></div></div></section>;
}
```

Create `components/sections/CTASection.module.css`:

```css
.section { border-block: 2.5px solid var(--ink); background: var(--mint); padding: 34px 0; clip-path: polygon(0 6%, 14% 1%, 31% 7%, 49% 2%, 68% 7%, 84% 1%, 100% 6%, 100% 95%, 84% 100%, 67% 94%, 48% 99%, 28% 94%, 13% 99%, 0 95%); }
.inner { display: grid; grid-template-columns: 1fr 160px auto; align-items: center; gap: 28px; padding-block: 18px; }
.inner h2 { margin: 0; font-family: var(--font-heading), cursive; font-size: clamp(2.25rem, 4vw, 3.5rem); line-height: 1; }
.inner mark { background: var(--yellow); color: inherit; padding: 0 .12em; rotate: -1deg; }
.inner p { margin: 7px 0 0; font-size: 1.05rem; font-weight: 700; }
.arrow { width: 160px; }
.action { position: relative; }
.lines { position: absolute; top: -23px; right: -24px; color: var(--ink); font-family: var(--font-heading), cursive; font-size: 1.9rem; rotate: -15deg; }
@media (max-width: 800px) { .inner { grid-template-columns: 1fr auto; } .arrow { display: none; } }
@media (max-width: 600px) { .section { padding: 44px 0; clip-path: polygon(0 2%, 23% 0, 50% 3%, 78% 0, 100% 3%, 100% 98%, 77% 100%, 48% 97%, 21% 100%, 0 97%); } .inner { grid-template-columns: 1fr; gap: 28px; text-align: center; } .inner h2 { font-size: 2.65rem; } .action { width: 100%; } }
```

- [ ] **Step 4: Implement the footer and optional social states**

Create `components/layout/Footer.tsx`:

```tsx
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navigation } from "@/data/navigation";
import { pageContent } from "@/data/page-content";
import { BrandLockup } from "./BrandLockup";
import styles from "./Footer.module.css";

const socialItems = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: Linkedin },
  { label: "GitHub", href: siteConfig.socials.github, icon: Github },
  { label: "X", href: siteConfig.socials.x, icon: null },
  { label: "Email", href: siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : null, icon: Mail },
] as const;

export function Footer() {
  return <footer className={styles.footer}><div className={`${styles.inner} section-inner`}><BrandLockup /><nav aria-label="Footer navigation">{navigation.filter((item) => item.label !== "Process").map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav><div aria-label="Social links" className={styles.socials}>{socialItems.map(({ label, href, icon: Icon }) => { const content = Icon ? <Icon aria-hidden="true" size={20} /> : <b aria-hidden="true">X</b>; return href ? <a aria-label={label} href={href} key={label} rel="noreferrer" target="_blank">{content}</a> : <span aria-disabled="true" aria-label={label} key={label}>{content}</span>; })}</div><small>{pageContent.copyright}</small></div></footer>;
}
```

Create `components/layout/Footer.module.css`:

```css
.footer { border-top: 2.5px solid var(--ink); background: var(--pink); padding: 26px 0 22px; }
.inner { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px; }
.inner nav { display: flex; gap: 25px; font-family: var(--font-heading), cursive; font-weight: 800; }
.socials { display: flex; justify-content: flex-end; gap: 12px; }
.socials a, .socials span { display: grid; width: 34px; aspect-ratio: 1; place-items: center; border-radius: 50%; }
.socials span { opacity: .62; }
.inner small { grid-column: 1 / -1; justify-self: center; margin-top: -4px; font-weight: 700; }
@media (max-width: 800px) { .inner { grid-template-columns: 1fr auto; } .inner nav { grid-column: 1 / -1; grid-row: 2; justify-content: center; } .socials { justify-content: flex-end; } }
@media (max-width: 520px) { .footer { padding-block: 30px; } .inner { grid-template-columns: 1fr; justify-items: center; text-align: center; } .inner nav { grid-column: auto; grid-row: auto; flex-wrap: wrap; gap: 13px 20px; } .socials { justify-content: center; } .inner small { grid-column: auto; margin-top: 4px; } }
```

- [ ] **Step 5: Run GREEN and commit**

```powershell
npm run test:run -- components/sections/ClosingSections.test.tsx
npm run typecheck
git add components/sections/AboutBanner.* components/sections/CTASection.* components/layout/Footer.*
git commit -m "feat: add about contact and footer sections"
```

## Task 11: Assemble the Server Component page and add Next.js metadata

**Files:**

- Modify: `app/page.tsx`
- Create: `app/page.test.tsx`
- Modify: `app/layout.tsx`
- Delete: `app/favicon.ico`
- Delete: `public/file.svg`
- Delete: `public/globe.svg`
- Delete: `public/next.svg`
- Delete: `public/vercel.svg`
- Delete: `public/window.svg`
- Create: `app/icon.svg`
- Create: `app/opengraph-image.tsx`
- Create: `app/opengraph-image.alt.txt`

- [ ] **Step 1: Write the failing full-page smoke test**

Create `app/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renders every approved primary section", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Your Tech Partner");
    expect(screen.getByRole("heading", { name: "Services I Offer" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "How We Work" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Featured Work" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "About Me" })).toBeVisible();
    expect(document.querySelector("main#main-content")).toBeInTheDocument();
  });
});
```

Run `npm run test:run -- app/page.test.tsx` and expect the default starter page to fail the assertions.

- [ ] **Step 2: Compose the homepage without adding `use client`**

Replace `app/page.tsx` with:

```tsx
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutBanner } from "@/components/sections/AboutBanner";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { SkipLink } from "@/components/ui/SkipLink";

export default function Home() {
  return <div className="page-shell"><SkipLink /><Header /><main id="main-content"><HeroSection /><TrustStrip /><ServicesSection /><ProcessSection /><FeaturedWork /><AboutBanner /><CTASection /></main><Footer /></div>;
}
```

- [ ] **Step 3: Replace fonts and metadata in the root layout**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Patrick_Hand } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const headingFont = Patrick_Hand({ subsets: ["latin"], variable: "--font-heading", weight: "400" });
const bodyFont = Nunito_Sans({ display: "swap", subsets: ["latin"], variable: "--font-body" });
const metadataBase = siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined;
const title = "Pranav Hole — Freelance Full-Stack Consultant";
const description = "Pranav Hole builds thoughtful web, mobile, AI, and cloud products from idea to growth.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | Pranav Hole" },
  description,
  keywords: ["Pranav Hole", "full-stack developer", "Next.js consultant", "AI integration", "cloud development"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: { description, locale: "en_US", siteName: siteConfig.name, title, type: "website" },
  twitter: { card: "summary_large_image", description, title },
  ...(metadataBase ? { alternates: { canonical: "/" }, metadataBase } : {}),
};

export const viewport: Viewport = { colorScheme: "light", themeColor: "#F7C3C5" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html className={`${headingFont.variable} ${bodyFont.variable}`} lang="en"><body>{children}</body></html>;
}
```

- [ ] **Step 4: Replace the starter favicon with a PH metadata icon**

First verify the exact binary target, then remove it:

```powershell
Resolve-Path -LiteralPath app\favicon.ico
Remove-Item -LiteralPath app\favicon.ico
Resolve-Path -LiteralPath public\file.svg,public\globe.svg,public\next.svg,public\vercel.svg,public\window.svg
Remove-Item -LiteralPath public\file.svg,public\globe.svg,public\next.svg,public\vercel.svg,public\window.svg
```

Create `app/icon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect x="5" y="5" width="118" height="118" rx="27" fill="#F7C3C5" stroke="#111" stroke-width="8"/><path d="M31 92V34c19-4 35-1 35 17 0 17-14 22-29 19M74 34v58M75 61h27M104 34v58" fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/><path d="M20 108c29 5 59 5 88-1" fill="none" stroke="#7653D8" stroke-linecap="round" stroke-width="5"/></svg>
```

- [ ] **Step 5: Add a generated Open Graph route using supported flexbox CSS**

Create `app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";

export const alt = "Pranav Hole — your tech partner for web, mobile, AI, and cloud products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ alignItems: "center", background: "#FFF9E9", color: "#111111", display: "flex", height: "100%", justifyContent: "center", padding: "64px", width: "100%" }}><div style={{ alignItems: "center", background: "#F7C3C5", border: "6px solid #111111", borderRadius: "34px 28px 38px 30px", boxShadow: "14px 16px 0 #7653D8", display: "flex", gap: "48px", height: "100%", padding: "58px", width: "100%" }}><div style={{ alignItems: "center", background: "#FFE58F", border: "6px solid #111111", borderRadius: "44% 56% 49% 51%", display: "flex", fontSize: 104, fontWeight: 900, height: 220, justifyContent: "center", width: 220 }}>PH</div><div style={{ display: "flex", flexDirection: "column", gap: "18px" }}><div style={{ fontSize: 72, fontWeight: 900 }}>Pranav Hole</div><div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.08 }}>Your Tech Partner to Build Digital Products That Work</div><div style={{ fontSize: 27 }}>Web • Mobile • AI • Cloud</div></div></div></div>, size);
}
```

Create `app/opengraph-image.alt.txt`:

```text
Pranav Hole portfolio card with a hand-drawn PH badge and the message: Your Tech Partner to Build Digital Products That Work.
```

- [ ] **Step 6: Run GREEN, build, and commit**

```powershell
npm run test:run -- app/page.test.tsx
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit `0`; the build reports `/` and `/opengraph-image` successfully.

```powershell
git add app components config data public types
git commit -m "feat: assemble portfolio homepage and metadata"
```

## Task 12: Add progressive, reduced-motion-safe reveals

**Files:**

- Create: `components/ui/Reveal.tsx`
- Create: `components/ui/Reveal.test.tsx`
- Modify: `app/page.tsx`
- Modify: `components/sections/ProcessSection.tsx`

- [ ] **Step 1: Write the reduced-motion test first**

Create `components/ui/Reveal.test.tsx`:

```tsx
import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("motion/react", () => ({
  motion: { div: ({ children }: { children: ReactNode }) => <div>{children}</div> },
  useReducedMotion: () => true,
}));

import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("keeps content immediately visible when reduced motion is requested", () => {
    render(<Reveal><p>Always readable</p></Reveal>);
    expect(screen.getByText("Always readable")).toBeVisible();
    expect(screen.getByText("Always readable").parentElement).not.toHaveStyle({ opacity: "0" });
  });
});
```

Run `npm run test:run -- components/ui/Reveal.test.tsx` and expect a missing-module failure.

- [ ] **Step 2: Implement the no-JS-readable reveal wrapper**

Create `components/ui/Reveal.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  const canAnimate = useSyncExternalStore(subscribe, () => true, () => false);

  if (!canAnimate || reduceMotion) return <div className={className}>{children}</div>;

  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} transition={{ delay, duration: .45, ease: [0.22, 1, 0.36, 1] }} viewport={{ amount: .16, once: true }} whileInView={{ opacity: 1, y: 0 }}>{children}</motion.div>;
}
```

- [ ] **Step 3: Wrap below-fold server sections in the client reveal slot**

Modify `app/page.tsx` so the imports add:

```tsx
import { Reveal } from "@/components/ui/Reveal";
```

Replace the `<main>` content with this exact composition:

```tsx
<main id="main-content">
  <HeroSection />
  <TrustStrip />
  <Reveal><ServicesSection /></Reveal>
  <Reveal><ProcessSection /></Reveal>
  <Reveal><FeaturedWork /></Reveal>
  <Reveal><AboutBanner /></Reveal>
  <Reveal><CTASection /></Reveal>
</main>
```

Keep `Header`, `Footer`, and `SkipLink` unchanged and outside the reveal wrappers.

- [ ] **Step 4: Stagger process internals through the same `Reveal` boundary**

In `components/sections/ProcessSection.tsx`, import `Reveal` and replace the body inside each `<li>` with:

```tsx
<Reveal delay={index * 0.08}>
  <span className={`${styles.icon} ${styles[step.tone]}`}><SketchIcon name={step.icon} /></span>
  <h3>{step.title}</h3>
  <p>{step.description}</p>
  {index < processSteps.length - 1 ? <HandDrawnArrow className={styles.connector} /> : null}
</Reveal>
```

Add this CSS to `ProcessSection.module.css` so the inner reveal wrapper preserves the original layout:

```css
.step > div { position: relative; display: grid; justify-items: center; width: 100%; }
```

- [ ] **Step 5: Run GREEN and commit**

```powershell
npm run test:run -- components/ui/Reveal.test.tsx app/page.test.tsx components/sections/ServicesProcess.test.tsx
npm run typecheck
npm run lint
git add app/page.tsx components/ui/Reveal.* components/sections/ProcessSection.*
git commit -m "feat: add reduced-motion-safe reveals"
```

## Task 13: Perform responsive, accessibility, and Lighthouse QA

**Files:**

- Modify only the specific CSS Module or component responsible for a verified defect.
- Modify: `.gitignore` only if a QA tool produces a repository-local report directory.

- [ ] **Step 1: Run the complete automated gate before browser testing**

```powershell
npm run lint
npm run typecheck
npm run test:run
npm run build
git diff --check
```

Expected: every command exits `0`; do not continue while any warning represents a real code or accessibility issue.

- [ ] **Step 2: Smoke-test development mode, then start production mode**

```powershell
$portfolioNextCli = Join-Path (Get-Location).Path 'node_modules\next\dist\bin\next'
$portfolioDevServer = Start-Process -FilePath (Get-Command node).Source -ArgumentList $portfolioNextCli,"dev" -WorkingDirectory (Get-Location).Path -WindowStyle Hidden -PassThru
for ($portfolioAttempt = 0; $portfolioAttempt -lt 20; $portfolioAttempt++) { try { $portfolioDevResponse = Invoke-WebRequest -UseBasicParsing http://localhost:3000; break } catch { Start-Sleep -Seconds 1 } }
$portfolioDevResponse.StatusCode
Stop-Process -Id $portfolioDevServer.Id
Start-Sleep -Seconds 1
$portfolioServer = Start-Process -FilePath (Get-Command node).Source -ArgumentList $portfolioNextCli,"start" -WorkingDirectory (Get-Location).Path -WindowStyle Hidden -PassThru
$portfolioServer.Id
```

Expected: development mode returns HTTP `200`; the production command returns a numeric process ID and makes `http://localhost:3000` reachable.

- [ ] **Step 3: Load the in-app browser control skill and inspect every required viewport**

Invoke `browser:control-in-app-browser`, open `http://localhost:3000`, and capture/inspect screenshots at exactly:

```text
360×800
390×844
430×932
768×1024
1024×768
1280×900
1440×1000
```

At every width evaluate:

```js
({
  overflowFree: document.documentElement.scrollWidth <= window.innerWidth,
  imageCount: document.images.length,
  brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc),
  sectionIds: [...document.querySelectorAll("main section[id]")].map((section) => section.id),
})
```

Expected: `overflowFree: true`, `brokenImages: []`, and IDs include `home`, `services`, `process`, `work`, `about`, and `contact`.

- [ ] **Step 4: Exercise interaction and keyboard paths**

At 390px:

1. Tab to the hamburger and press Enter.
2. Confirm the menu opens, page scrolling is locked, and Escape closes it with focus restored.
3. Open again and activate Work; confirm the menu closes and the viewport reaches `#work`.
4. Use carousel Next twice, confirm the active dots advance, then use Previous.
5. Tab through all active controls and confirm a visible purple rough focus outline.
6. Emulate `prefers-reduced-motion: reduce`, reload, and confirm there is no continuous sticker motion or entrance animation.

At 1280px:

1. Confirm the desktop nav is visible and hamburger is hidden.
2. Confirm four services, four horizontal process steps, and three project cards fit without clipping.
3. Confirm the header remains sticky during scroll.

Expected: every interaction succeeds and unavailable CTA/social items never enter the tab order.

- [ ] **Step 5: Run a Lighthouse production audit**

Run:

```powershell
$portfolioLighthouseReport = Join-Path $env:TEMP 'pranav-hole-lighthouse.json'
npx lighthouse http://localhost:3000 --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=$portfolioLighthouseReport
$portfolioAudit = Get-Content -Raw $portfolioLighthouseReport | ConvertFrom-Json
$portfolioAudit.categories | Select-Object @{Name='Performance';Expression={$_.performance.score * 100}},@{Name='Accessibility';Expression={$_.accessibility.score * 100}},@{Name='BestPractices';Expression={$_.'best-practices'.score * 100}},@{Name='SEO';Expression={$_.seo.score * 100}}
```

Expected targets: Performance ≥ 90 and Accessibility/Best Practices/SEO ≥ 95. If an environmental factor blocks Lighthouse, preserve the command output and complete the browser checks rather than claiming a score.

- [ ] **Step 6: Stop the exact production helper process**

```powershell
Stop-Process -Id $portfolioServer.Id
```

- [ ] **Step 7: Commit verified QA corrections, if any**

If the earlier exact implementation already passes, do not create an empty commit. If a verified defect required a focused correction, rerun Steps 1–5 and commit only the responsible files:

```powershell
git add app components public
git commit -m "fix: polish responsive portfolio behavior"
```

## Task 14: Replace the README and run the final verification gate

**Files:**

- Modify: `README.md`

- [ ] **Step 1: Replace the starter README with the maintenance guide**

Replace `README.md` with:

````markdown
# Pranav Hole Portfolio

A responsive Next.js 16 portfolio with a custom hand-drawn comic aesthetic, generated local artwork, typed content, accessible interactions, and reduced-motion support.

## Requirements

- Node.js 20 or newer
- npm

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

Run the full quality gate with:

```bash
npm run verify
```

## Editing content

- Site identity and optional contact/social/project URLs: `config/site.ts`
- Navigation: `data/navigation.ts`
- Hero, About, CTA, and copyright copy: `data/page-content.ts`
- Services: `data/services.ts`
- Process steps: `data/process.ts`
- Project copy, tags, and thumbnails: `data/projects.ts`
- Technology stickers: `data/technologies.ts`

URLs are intentionally `null` in the initial build. A `null` destination remains visibly present but is not rendered as a fake link. To enable contact actions, add real URLs and set `contactActionsEnabled` to `true`; never substitute invented destinations.

## Replacing artwork

- Hero developer: `public/images/developer-hero.png` (transparent background preferred)
- About developer: `public/images/developer-about.png`
- Project thumbnails: `public/projects/*.png` at 16:9
- Doodle textures: `public/doodles/*.svg`

Keep filenames stable or update their paths in `data/projects.ts` and the associated section components. Preserve intrinsic dimensions and descriptive alt text.

## Hand-drawn system

The sketchbook effect combines stable per-card rotations, varied radii, 2–3px ink borders, offset shadows, inline SVG scribbles, wavy separators, pastel paper fields, and local grain textures. Variations are deterministic rather than randomized at render time, preventing hydration mismatch and visual jumping. Section-specific geometry lives in CSS Modules; shared colors, focus states, texture, and reduced-motion behavior live in `app/globals.css`.

## Accessibility and motion

The site includes a skip link, semantic landmarks, visible focus states, keyboard-operable mobile navigation and carousel controls, descriptive image alternatives, unavailable states for missing destinations, and `prefers-reduced-motion` support.
````

- [ ] **Step 2: Run the final evidence-producing commands**

```powershell
npm run verify
git diff --check
git status --short --branch
```

Expected: lint, TypeScript, all tests, and the production build pass; `git diff --check` is silent; only the intended README change remains before commit.

- [ ] **Step 3: Commit documentation and verify a clean tree**

```powershell
git add README.md
git commit -m "docs: document portfolio customization"
git status --short --branch
```

Expected: the branch line is shown with no modified or untracked files.

- [ ] **Step 4: Perform final completion review**

Invoke `superpowers:verification-before-completion`, cite the fresh `npm run verify` and browser QA evidence, then invoke `superpowers:requesting-code-review` for a final requirements review before presenting integration options through `superpowers:finishing-a-development-branch`.
