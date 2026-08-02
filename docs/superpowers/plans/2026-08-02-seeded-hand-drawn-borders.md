# Stable Seeded Hand-Drawn Borders Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace perfect rectangular outlines with reusable, stable, seed-generated SVG borders across the portfolio's primary box components.

**Architecture:** Add a dependency-free deterministic geometry function under `lib/` and a decorative Server/Client-safe SVG component under `components/ui/`. Existing semantic elements remain the host boxes; they receive generated CSS variables and an `aria-hidden` SVG overlay, so no wrapper changes navigation, button, card, or section semantics.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, inline SVG, existing CSS custom properties. No new dependencies, worktree, tests, or test commands per the user's explicit instructions.

---

## Locked file map

| Path | Responsibility |
| --- | --- |
| `lib/create-hand-drawn-border.ts` | Stable string hash, deterministic PRNG, SVG path/radius/shadow generation, CSS-variable helper |
| `components/ui/HandDrawnBorder.tsx` | Accessible decorative SVG renderer |
| `components/ui/HandDrawnBorder.module.css` | Absolute overlay, stroke, and strength styles |
| `components/ui/RoughButton.*` | Apply generated borders to every CTA |
| `components/layout/Header.tsx` | Stable seed for `LET'S TALK` |
| `components/layout/MobileMenu.*` | Generated trigger and panel borders |
| `components/sections/HeroSection.*` | Generated eyebrow badge and CTA seeds |
| `components/sections/ServicesSection.*` | One stable generated border per service card |
| `components/illustrations/TechSticker.*` | One stable generated border per technology sticker |
| `components/ui/ProjectCard.*` | Generated project-card and lighter thumbnail-frame borders |
| `components/sections/AboutBanner.*` | Generated banner border and About CTA seed |
| `components/sections/CTASection.tsx` | Stable Schedule a Call seed |

## Task 1: Build the deterministic border primitive

**Files:**

- Create: `lib/create-hand-drawn-border.ts`
- Create: `components/ui/HandDrawnBorder.tsx`
- Create: `components/ui/HandDrawnBorder.module.css`

- [ ] **Step 1: Add the pure seeded geometry generator**

Create `lib/create-hand-drawn-border.ts`:

```ts
import type { CSSProperties } from "react";

export type HandDrawnBorderStrength = "subtle" | "regular" | "bold";

export type HandDrawnBorderGeometry = {
  path: string;
  radius: string;
  shadowX: number;
  shadowY: number;
  strokeWidth: number;
};

type HandDrawnBorderVariables = CSSProperties & {
  "--hand-radius": string;
  "--hand-shadow-x": string;
  "--hand-shadow-y": string;
};

const amplitudes: Record<
  HandDrawnBorderStrength,
  { x: number; y: number }
> = {
  subtle: { x: 0.1, y: 0.3 },
  regular: { x: 0.18, y: 0.5 },
  bold: { x: 0.28, y: 0.75 },
};

function hashSeed(seed: string) {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRandom(seed: number) {
  let state = seed;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const tidy = (value: number) => Number(value.toFixed(2));

export function createHandDrawnBorder(
  seed: string,
  strength: HandDrawnBorderStrength = "regular",
): HandDrawnBorderGeometry {
  const random = createSeededRandom(hashSeed(seed));
  const amplitude = amplitudes[strength];
  const edgeX = 0.2;
  const edgeY = 0.55;
  const jitterX = () => (random() * 2 - 1) * amplitude.x;
  const jitterY = () => (random() * 2 - 1) * amplitude.y;
  const x = (value: number) => tidy(value + jitterX());
  const y = (value: number) => tidy(value + jitterY());
  const cornerX = () => tidy(1.2 + random() * 0.9);
  const cornerY = () => tidy(3.2 + random() * 2.4);
  const topLeft = { x: cornerX(), y: cornerY() };
  const topRight = { x: cornerX(), y: cornerY() };
  const bottomRight = { x: cornerX(), y: cornerY() };
  const bottomLeft = { x: cornerX(), y: cornerY() };
  const topY = y(edgeY);
  const rightX = x(100 - edgeX);
  const bottomY = y(100 - edgeY);
  const leftX = x(edgeX);

  const path = [
    `M ${topLeft.x} ${topY}`,
    `C ${x(29)} ${y(edgeY)}, ${x(69)} ${y(edgeY)}, ${100 - topRight.x} ${y(edgeY)}`,
    `Q ${x(100 - edgeX)} ${y(edgeY)}, ${rightX} ${topRight.y}`,
    `C ${x(100 - edgeX)} ${y(31)}, ${x(100 - edgeX)} ${y(70)}, ${x(100 - edgeX)} ${100 - bottomRight.y}`,
    `Q ${x(100 - edgeX)} ${y(100 - edgeY)}, ${100 - bottomRight.x} ${bottomY}`,
    `C ${x(70)} ${y(100 - edgeY)}, ${x(31)} ${y(100 - edgeY)}, ${bottomLeft.x} ${y(100 - edgeY)}`,
    `Q ${x(edgeX)} ${y(100 - edgeY)}, ${leftX} ${100 - bottomLeft.y}`,
    `C ${x(edgeX)} ${y(70)}, ${x(edgeX)} ${y(31)}, ${x(edgeX)} ${topLeft.y}`,
    `Q ${x(edgeX)} ${y(edgeY)}, ${topLeft.x} ${topY}`,
    "Z",
  ].join(" ");

  const radiusValues = Array.from(
    { length: 4 },
    () => `${Math.round(8 + random() * 10)}px`,
  );
  const shadowDirection = random() > 0.22 ? 1 : -1;

  return {
    path,
    radius: radiusValues.join(" "),
    shadowX: shadowDirection * Math.round(3 + random() * 3),
    shadowY: Math.round(4 + random() * 3),
    strokeWidth: tidy(2.15 + random() * 0.65),
  };
}

export function handDrawnBorderStyle(
  seed: string,
  strength: HandDrawnBorderStrength = "regular",
): HandDrawnBorderVariables {
  const geometry = createHandDrawnBorder(seed, strength);

  return {
    "--hand-radius": geometry.radius,
    "--hand-shadow-x": `${geometry.shadowX}px`,
    "--hand-shadow-y": `${geometry.shadowY}px`,
  };
}
```

- [ ] **Step 2: Add the reusable SVG renderer**

Create `components/ui/HandDrawnBorder.tsx`:

```tsx
import {
  createHandDrawnBorder,
  type HandDrawnBorderStrength,
} from "@/lib/create-hand-drawn-border";

import styles from "./HandDrawnBorder.module.css";

export function HandDrawnBorder({
  seed,
  strength = "regular",
}: {
  seed: string;
  strength?: HandDrawnBorderStrength;
}) {
  const geometry = createHandDrawnBorder(seed, strength);

  return (
    <svg
      aria-hidden="true"
      className={`${styles.border} ${styles[strength]}`}
      data-hand-drawn-seed={seed}
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path
        className={styles.echo}
        d={geometry.path}
        strokeWidth={geometry.strokeWidth * 0.58}
        transform="translate(0.28 -0.2)"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={geometry.path}
        strokeWidth={geometry.strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
```

Create `components/ui/HandDrawnBorder.module.css`:

```css
.border {
  position: absolute;
  z-index: 3;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.border path {
  fill: none;
  stroke: var(--ink);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.echo {
  opacity: 0.18;
}

.subtle .echo {
  opacity: 0.1;
}

.bold .echo {
  opacity: 0.25;
}
```

- [ ] **Step 3: Validate the primitive without running tests**

Run:

```powershell
npm run typecheck
npm run lint
git diff --check
```

Expected: all commands exit `0`; there are no test commands.

- [ ] **Step 4: Commit the primitive**

```powershell
git add lib/create-hand-drawn-border.ts components/ui/HandDrawnBorder.tsx components/ui/HandDrawnBorder.module.css
git commit -m "feat: add seeded hand-drawn border primitive"
```

## Task 2: Apply generated borders to buttons, badges, and mobile navigation

**Files:**

- Modify: `components/ui/RoughButton.tsx`
- Modify: `components/ui/RoughButton.module.css`
- Modify: `components/layout/Header.tsx`
- Modify: `components/layout/MobileMenu.tsx`
- Modify: `components/layout/MobileMenu.module.css`
- Modify: `components/sections/HeroSection.tsx`
- Modify: `components/sections/HeroSection.module.css`
- Modify: `components/sections/AboutBanner.tsx`
- Modify: `components/sections/CTASection.tsx`

- [ ] **Step 1: Make `RoughButton` consume an explicit stable seed**

Replace `components/ui/RoughButton.tsx` with:

```tsx
import type { ReactNode } from "react";

import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";

import styles from "./RoughButton.module.css";

type RoughButtonProps = {
  borderSeed: string;
  children: ReactNode;
  href: string | null;
  variant?: "coral" | "paper" | "yellow";
  className?: string;
};

export function RoughButton({
  borderSeed,
  children,
  href,
  variant = "coral",
  className = "",
}: RoughButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${className}`.trim();
  const border = <HandDrawnBorder seed={borderSeed} />;
  const borderStyle = handDrawnBorderStyle(borderSeed);

  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={classes}
        role="link"
        style={borderStyle}
      >
        {children}
        {border}
      </span>
    );
  }

  const external = /^https?:\/\//i.test(href);

  return (
    <a
      className={classes}
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      style={borderStyle}
      target={external ? "_blank" : undefined}
    >
      {children}
      {border}
    </a>
  );
}
```

In `components/ui/RoughButton.module.css`, change the base box rules to:

```css
.button {
  position: relative;
  border: 2.5px solid transparent;
  border-radius: var(--hand-radius);
}

.coral {
  background: var(--coral);
  box-shadow: var(--hand-shadow-x) var(--hand-shadow-y) 0 var(--purple);
}

.paper {
  background: #fffef9;
  box-shadow: var(--hand-shadow-x) var(--hand-shadow-y) 0 var(--yellow);
}

.yellow {
  background: var(--yellow);
  box-shadow: var(--hand-shadow-x) var(--hand-shadow-y) 0 var(--ink);
}
```

Keep all existing sizing, typography, interaction, and responsive declarations not replaced above.

- [ ] **Step 2: Assign button seeds at every call site**

Use these exact seeds:

```tsx
// components/layout/Header.tsx
<RoughButton borderSeed="button-lets-talk" href={contactLinks.talk} variant="paper">

// components/sections/HeroSection.tsx
<RoughButton borderSeed="button-start-project" href={contactLinks.startProject}>
<RoughButton borderSeed="button-view-work" href="#work" variant="paper">

// components/sections/AboutBanner.tsx
<RoughButton borderSeed="button-build-together" className={styles.cta} href={contactLinks.buildTogether} variant="yellow">

// components/sections/CTASection.tsx
<RoughButton borderSeed="button-schedule-call" href={contactLinks.scheduleCall}>
```

- [ ] **Step 3: Convert the hero eyebrow badge**

In `components/sections/HeroSection.tsx`, import `HandDrawnBorder` and `handDrawnBorderStyle`, then replace the eyebrow with:

```tsx
<p
  className={styles.eyebrow}
  style={handDrawnBorderStyle("hero-eyebrow", "subtle")}
>
  {hero.eyebrow}
  <HandDrawnBorder seed="hero-eyebrow" strength="subtle" />
</p>
```

In `HeroSection.module.css`, make `.eyebrow` positioned and replace its native outline/radius:

```css
.eyebrow {
  position: relative;
  border: 2px solid transparent;
  border-radius: var(--hand-radius);
  box-shadow: var(--hand-shadow-x) var(--hand-shadow-y) 0 rgb(118 83 216 / 55%);
}
```

- [ ] **Step 4: Convert the mobile menu trigger and panel**

In `components/layout/MobileMenu.tsx`, import the border renderer/helper. Replace the trigger JSX with:

```tsx
<button
  aria-controls="mobile-navigation"
  aria-expanded={open}
  aria-label={open ? "Close navigation menu" : "Open navigation menu"}
  className={styles.trigger}
  onClick={() => setOpen((value) => !value)}
  ref={triggerRef}
  style={handDrawnBorderStyle("mobile-menu-trigger", "subtle")}
  type="button"
>
  <span />
  <span />
  <span />
  <HandDrawnBorder seed="mobile-menu-trigger" strength="subtle" />
</button>
```

Replace the open panel JSX with:

```tsx
{open ? (
  <nav
    aria-label="Mobile navigation"
    className={styles.panel}
    id="mobile-navigation"
    style={handDrawnBorderStyle("mobile-menu-panel", "subtle")}
  >
    {links.map((link, index) => (
      <a
        href={link.href}
        key={link.href}
        onClick={() => close(false)}
        ref={index === 0 ? firstLinkRef : undefined}
      >
        {link.label}
      </a>
    ))}
    <HandDrawnBorder seed="mobile-menu-panel" strength="subtle" />
  </nav>
) : null}
```

In `MobileMenu.module.css`, replace the trigger's native border/radius and the panel's bottom border:

```css
.trigger {
  position: relative;
  border: 2px solid transparent;
  border-radius: var(--hand-radius);
  box-shadow: var(--hand-shadow-x) var(--hand-shadow-y) 0 var(--purple);
}

.panel {
  border: 2.5px solid transparent;
  border-radius: var(--hand-radius);
}
```

- [ ] **Step 5: Validate and commit buttons/badges/navigation**

```powershell
npm run typecheck
npm run lint
git diff --check
git add components/ui/RoughButton.* components/layout/Header.tsx components/layout/MobileMenu.* components/sections/HeroSection.* components/sections/AboutBanner.tsx components/sections/CTASection.tsx
git commit -m "feat: roughen portfolio buttons and badges"
```

Expected: every command exits `0`; no tests are run.

## Task 3: Apply generated borders to service cards and technology stickers

**Files:**

- Modify: `components/sections/ServicesSection.tsx`
- Modify: `components/sections/ServicesSection.module.css`
- Modify: `components/illustrations/TechSticker.tsx`
- Modify: `components/illustrations/TechSticker.module.css`

- [ ] **Step 1: Add seeded borders to service cards**

Import `HandDrawnBorder` and `handDrawnBorderStyle` in `ServicesSection.tsx`. Add the style and border inside every card:

```tsx
const seed = `service-${service.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

<article
  className={`${styles.card} ${toneClasses[service.tone]} ${variantClasses[service.variant]}`}
  key={service.title}
  style={handDrawnBorderStyle(seed, "bold")}
>
  <span className={styles.icon}>
    <SketchIcon name={service.icon} />
  </span>
  <h3>{service.title}</h3>
  <p>{service.description}</p>
  <span aria-hidden="true" className={styles.arrow}>
    <ArrowRight size={22} strokeWidth={2.6} />
  </span>
  <HandDrawnBorder seed={seed} strength="bold" />
</article>
```

In `ServicesSection.module.css`, replace straight border geometry with generated variables:

```css
.card {
  position: relative;
  border: 2.5px solid transparent;
  border-radius: var(--hand-radius);
  box-shadow: var(--hand-shadow-x) var(--hand-shadow-y) 0 var(--card-shadow);
}

.variant1 { --card-shadow: #d8bd56; rotate: -0.65deg; }
.variant2 { --card-shadow: #79bda7; rotate: 0.45deg; }
.variant3 { --card-shadow: #c97880; rotate: -0.35deg; }
.variant4 { --card-shadow: #9275ba; rotate: 0.6deg; }
```

Keep the hover shadow override and all responsive behavior.

- [ ] **Step 2: Add seeded borders to technology stickers**

In `TechSticker.tsx`, use `technology.mark` as the stable identity:

```tsx
const borderSeed = `tech-${technology.mark}`;

<div
  className={`${styles.sticker} ${styles[technology.tone]} ${styles[`variant${technology.variant}`]} ${className}`}
  style={handDrawnBorderStyle(borderSeed)}
>
  <span aria-hidden="true" className={styles.mark}>
    <TechMark mark={technology.mark} />
  </span>
  <span className={styles.label}>{technology.shortLabel}</span>
  <HandDrawnBorder seed={borderSeed} />
</div>
```

In `TechSticker.module.css`, update the base sticker and remove border-radius declarations from all four variants:

```css
.sticker {
  position: relative;
  border: 2.5px solid transparent;
  border-radius: var(--hand-radius);
  box-shadow: var(--hand-shadow-x) var(--hand-shadow-y) 0 rgb(17 17 17 / 20%);
}
```

Keep variant rotations and animation delays unchanged.

- [ ] **Step 3: Validate and commit cards/stickers**

```powershell
npm run typecheck
npm run lint
git diff --check
git add components/sections/ServicesSection.* components/illustrations/TechSticker.*
git commit -m "feat: roughen service cards and tech stickers"
```

Expected: every command exits `0`; no tests are run.

## Task 4: Apply generated borders to featured work and About

**Files:**

- Modify: `components/ui/ProjectCard.tsx`
- Modify: `components/ui/ProjectCard.module.css`
- Modify: `components/sections/AboutBanner.tsx`
- Modify: `components/sections/AboutBanner.module.css`

- [ ] **Step 1: Generate both project-card and thumbnail-frame outlines**

Replace `components/ui/ProjectCard.tsx` with:

```tsx
import Image from "next/image";

import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";
import type { Project } from "@/types/content";

import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const cardSeed = `project-${project.slug}`;
  const imageSeed = `${cardSeed}-image`;
  const cardStyle = handDrawnBorderStyle(cardSeed, "bold");
  const content = (
    <>
      <div
        className={styles.imageWrap}
        style={handDrawnBorderStyle(imageSeed, "subtle")}
      >
        <Image
          alt={project.imageAlt}
          fill
          sizes="(max-width: 767px) 88vw, (max-width: 1200px) 31vw, 390px"
          src={project.image}
        />
        <HandDrawnBorder seed={imageSeed} strength="subtle" />
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul aria-label={`${project.title} technologies`}>
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <HandDrawnBorder seed={cardSeed} strength="bold" />
    </>
  );
  const classes = `${styles.card} ${styles[`variant${project.variant}`]}`;

  return project.url ? (
    <a
      aria-label={`View ${project.title} project (opens in a new tab)`}
      className={classes}
      href={project.url}
      rel="noopener noreferrer"
      style={cardStyle}
      target="_blank"
    >
      {content}
    </a>
  ) : (
    <article className={classes} style={cardStyle}>
      {content}
    </article>
  );
}
```

In `ProjectCard.module.css`, replace the straight outlines:

```css
.card {
  position: relative;
  border: 2.5px solid transparent;
  border-radius: var(--hand-radius);
  box-shadow: var(--hand-shadow-x) var(--hand-shadow-y) 0 var(--card-shadow);
}

.imageWrap {
  border: 2px solid transparent;
  border-radius: var(--hand-radius);
}

.variant1 { --card-shadow: #a3d7c5; rotate: -0.35deg; }
.variant2 { --card-shadow: #d6bd72; rotate: 0.3deg; }
.variant3 { --card-shadow: #b99bdb; rotate: -0.2deg; }
```

Keep existing hover/focus shadow overrides, image zoom, tags, and responsive rotation reset.

- [ ] **Step 2: Generate the About banner outline**

In `AboutBanner.tsx`, import the renderer/helper and update the banner host:

```tsx
<div
  className={`${styles.banner} section-inner paper-texture`}
  style={handDrawnBorderStyle("about-banner", "bold")}
>
  <div className={styles.character}>
    <Image
      alt="Illustrated developer with curly hair, round glasses, and a purple hoodie"
      fill
      sizes="(max-width: 600px) 180px, (max-width: 900px) 190px, 260px"
      src="/images/developer-about.png"
    />
  </div>

  <div className={styles.copy}>
    <h2>{pageContent.about.heading}</h2>
    <p>{pageContent.about.body}</p>
  </div>

  <RoughButton
    borderSeed="button-build-together"
    className={styles.cta}
    href={contactLinks.buildTogether}
    variant="yellow"
  >
    Let&apos;s Build Together
    <ArrowRight aria-hidden="true" size={20} />
  </RoughButton>

  <GridDoodle className={styles.grid} />
  <HandDrawnBorder seed="about-banner" strength="bold" />
</div>
```

In `AboutBanner.module.css`, replace only its native border geometry and shadow offsets:

```css
.banner {
  border: 2.5px solid transparent;
  border-radius: var(--hand-radius);
  box-shadow: var(--hand-shadow-x) var(--hand-shadow-y) 0 rgb(118 83 216 / 25%);
}
```

Retain `position: relative`, `overflow: hidden`, grid layout, texture, and responsive behavior. The SVG path stays inset within its normalized view box, so the banner's overflow clipping does not remove the primary stroke.

- [ ] **Step 3: Validate and commit Featured Work/About**

```powershell
npm run typecheck
npm run lint
git diff --check
git add components/ui/ProjectCard.* components/sections/AboutBanner.*
git commit -m "feat: roughen project cards and about banner"
```

Expected: every command exits `0`; no tests are run.

## Task 5: Perform production and visual verification

**Files:**

- Modify only the component or CSS Module responsible for a verified visual defect.

- [ ] **Step 1: Run the complete non-test quality gate**

```powershell
npm run verify
git diff --check
git status --short --branch
```

Expected: ESLint, TypeScript, and the production build exit `0`; no test command runs; the tree contains only intended changes if a correction is still pending.

- [ ] **Step 2: Start the exact production build on a temporary port**

```powershell
$borderServer = Start-Process -FilePath "node.exe" -ArgumentList @("E:\freelance\my\node_modules\next\dist\bin\next","start","--hostname","localhost","--port","3010") -WorkingDirectory "E:\freelance\my" -PassThru -WindowStyle Hidden
$borderServer.Id
```

Poll `http://localhost:3010` until it returns HTTP `200`.

- [ ] **Step 3: Inspect representative responsive widths in the browser**

Use the in-app browser workflow at:

```text
360×800
768×1024
1440×1000
```

At each width confirm:

- `document.documentElement.scrollWidth <= window.innerWidth`.
- Services, project cards, About banner, hero badge, technology stickers, and visible buttons contain `svg[data-hand-drawn-seed]`.
- Outer host native border colors are transparent while the SVG outline remains visibly black.
- Focus outlines are visible and not clipped.
- Existing mobile menu and carousel behavior remain intact.

- [ ] **Step 4: Prove border stability across reloads**

Capture the `d` value from the `button-lets-talk` path, reload, and capture it again:

```js
const readPath = () =>
  document
    .querySelector('svg[data-hand-drawn-seed="button-lets-talk"] path:last-child')
    ?.getAttribute("d");
```

Expected: both strings are exactly equal. Repeat for `service-web-development` and `project-instacity`.

- [ ] **Step 5: Stop the exact temporary process and finish cleanly**

```powershell
Stop-Process -Id $borderServer.Id
git diff --check
git status --short --branch
```

Expected: port `3010` is no longer listening and the Git branch is clean after any verified correction commit.
