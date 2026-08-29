# Reference-Matched Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage into the compact, responsive, hand-drawn pastel composition shown in the supplied reference.

**Architecture:** Keep the Next.js App Router page and static sections as Server Components. Reuse the narrow mobile-menu Client Component and supplied hero media, add one focused testimonial Client Component only if navigation state is needed, and drive repeated content from typed data arrays.

**Tech Stack:** Next.js 16.2.12, React 19.2.4, TypeScript, Tailwind CSS 4, Motion, Lucide React, inline SVG, Node test runner

---

### Task 1: Homepage contract test

**Files:**
- Create: `tests/homepage-contract.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write a failing source contract**

Create a Node test that reads `app/page.tsx`, `app/layout.tsx`, `data/page-content.ts`, `data/services.ts`, `data/projects.ts`, `data/process.ts`, and the section sources. Assert the exact reference headings/copy, required section ordering, SEO title, five process steps, four services, three projects, hero video semantics, and presence of narrow responsive breakpoints.

- [ ] **Step 2: Run the contract and verify RED**

Run: `node --test tests/homepage-contract.test.mjs`

Expected: FAIL on the current copy such as `IDEA → PRODUCT → GROWTH`, missing `TestimonialsSection`, and the old page order.

- [ ] **Step 3: Add the test script**

Add `"test": "node --test tests/*.test.mjs"` to `package.json`.

- [ ] **Step 4: Re-run and retain the expected failure**

Run: `npm test`

Expected: the same contract assertions fail for missing reference implementation, not for syntax or setup errors.

### Task 2: Global shell, metadata, and typed content

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `data/page-content.ts`
- Modify: `data/services.ts`
- Modify: `data/projects.ts`
- Modify: `data/process.ts`
- Modify: `types/content.ts`

- [ ] **Step 1: Replace theme tokens with the supplied palette**

Define cream, pink, mint, lavender, yellow, soft tones, ink, muted, white, header height, paper texture, and compact shared transition keyframes in `app/globals.css`.

- [ ] **Step 2: Set the required Metadata API values**

Update the title, description, keywords, Open Graph fields, theme color, and add `data-scroll-behavior="smooth"` on `<html>` per the installed Next 16 guide.

- [ ] **Step 3: Replace repeated data with exact reference copy**

Populate typed arrays for the four services, three projects, five process steps, hero, testimonial, CTA, and footer strings. Extend icon and tone unions only for values the page actually uses.

- [ ] **Step 4: Run typecheck as the GREEN gate for data/types**

Run: `npm run typecheck`

Expected: PASS with no TypeScript diagnostics.

### Task 3: Header, hero, and trust strip

**Files:**
- Modify: `components/layout/BrandLockup.tsx`
- Modify: `components/layout/Header.tsx`
- Modify: `components/layout/MobileMenu.tsx`
- Modify: `components/sections/HeroSection.tsx`
- Modify: `components/illustrations/HeroArtwork.tsx`
- Modify: `components/sections/TrustStrip.tsx`

- [ ] **Step 1: Rebuild the header to the reference geometry**

Use a full-width pink 88px desktop/72px mobile header, compact brand lockup, outlined cream CTA, and hamburger breakpoint matching the 748px reference. Retain keyboard menu dismissal, focus trapping, and focus restoration.

- [ ] **Step 2: Implement exact hero copy and CTA arrangement**

Create the lavender `IDEA → DESIGN → DEVELOP → GROW` pill, three-line `I build digital / products that / work.` heading, organic yellow highlight, exact support text, and reference-style buttons.

- [ ] **Step 3: Integrate the supplied hero media accessibly**

Render the existing MP4 in an `aria-hidden` autoplay/muted/loop/playsInline video with `preload="metadata"`, no controls, contained sizing, a pale-yellow integration shape, and fallback `Hero Animation` text.

- [ ] **Step 4: Compact the trust strip**

Render the rocket, growth, and heart benefits in a rounded cream strip with equal columns and separators at reference width.

- [ ] **Step 5: Run the contract**

Run: `npm test`

Expected: hero and trust assertions pass; later-section assertions remain red until their tasks land.

### Task 4: Services and selected work

**Files:**
- Modify: `components/illustrations/SketchIcon.tsx`
- Modify: `components/sections/ServicesSection.tsx`
- Modify: `components/sections/FeaturedWork.tsx`
- Modify: `components/ui/ProjectCard.tsx`
- Modify: `components/ui/ProjectCarousel.tsx`

- [ ] **Step 1: Add only the missing inline icon paths**

Support the cart, AI chip, code, and pencil icon names with ink strokes, rounded caps, and responsive viewBoxes.

- [ ] **Step 2: Build the mint 2 × 2 services panel**

Render four compact cream cards with pastel icon circles, exact copy, and a centered pink `Explore All Services →` control. Stack below 390px.

- [ ] **Step 3: Build the selected-work controls and cards**

Add the five reference tabs, three compact illustrated project cards, exact titles/descriptions/tags, and `View All Projects →`. Use CSS/inline-SVG category art rather than the current dark screenshots.

- [ ] **Step 4: Preserve deliberate mobile carousel behavior**

At narrow widths use horizontal snap scrolling; from the reference width upward use three columns.

- [ ] **Step 5: Run the contract and typecheck**

Run: `npm test && npm run typecheck`

Expected: service/work assertions pass and TypeScript reports no errors.

### Task 5: Process, testimonial, CTA, and footer

**Files:**
- Modify: `components/sections/ProcessSection.tsx`
- Create: `components/sections/TestimonialsSection.tsx`
- Modify: `components/sections/CTASection.tsx`
- Modify: `components/layout/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Implement the five-stage process band**

Create a lavender horizontal dashed timeline with Discover, Design, Develop, Launch, and Grow icons/copy. Switch to a vertical timeline below the narrow-mobile breakpoint.

- [ ] **Step 2: Implement the testimonial composition**

Render the exact quote/client copy in a pale-yellow outlined card with an inline avatar, labelled previous/next controls, and five pagination dots. With one supplied quote, controls remain present but disabled without looking broken.

- [ ] **Step 3: Implement the compact mint CTA and reference footer**

Use a paper-plane doodle, exact CTA copy/two controls, then the brand/description, quick-link columns, social circles, and 2026 copyright bar.

- [ ] **Step 4: Assemble the exact page order**

Remove the visible `AboutBanner` and section-level `Reveal` wrappers from `app/page.tsx`; insert selected work before process and testimonials after process. Add `id="about"` to the hero identity container to preserve the About navigation target.

- [ ] **Step 5: Run the full contract GREEN gate**

Run: `npm test`

Expected: all homepage contract tests pass.

### Task 6: Static verification and Chrome visual QA

**Files:**
- Modify as required by observed defects in the files above

- [ ] **Step 1: Run formatting/whitespace validation**

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 2: Run lint, typecheck, and production build**

Run: `npm run verify`

Expected: ESLint, TypeScript, and Next production build all exit 0 with no errors.

- [ ] **Step 3: Verify the reference-width composition in Chrome**

At 748 × 900, reload `http://localhost:3000`, capture the full page, and compare section order, total density, hero ratio, 2 × 2 services, three projects, five-step process, testimonial, CTA, and footer against the supplied image. Confirm `documentElement.scrollWidth === innerWidth`.

- [ ] **Step 4: Verify deliberate mobile composition**

At 390 × 844, verify stacked hero, full-width buttons, snap project carousel, vertical process timeline, stacked CTA/footer, menu open/close, Escape behavior, and no horizontal page overflow.

- [ ] **Step 5: Verify desktop composition and browser health**

At 1440 × 1000, verify readable max-width layout, full navigation, 45/55 hero columns, four service cards, three projects, and console error count of zero. Reset the temporary Chrome viewport afterward.
