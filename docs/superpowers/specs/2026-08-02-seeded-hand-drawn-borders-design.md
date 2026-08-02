# Stable Seeded Hand-Drawn Borders

**Date:** 2026-08-02  
**Status:** Approved for implementation planning

## Objective

Replace the mathematically straight outlines on rectangular portfolio components with genuinely uneven, hand-drawn borders. Each component should receive its own authored-looking shape while remaining stable across reloads, server rendering, responsive layouts, and interaction states.

## Approved approach

Use a deterministic seeded SVG border system. A pure function named `createHandDrawnBorder(seed)` will hash a stable string seed and use a small deterministic pseudo-random generator to produce:

- A normalized SVG path with slightly uneven edge control points and independently shaped corners.
- A compatible irregular CSS border radius for the component background.
- A small stroke-width variation within the existing 2–3px ink range.
- Stable rough-shadow offsets where the host component supports a shadow.

The function must never call `Math.random()`. The same seed must always return identical geometry on the server and client.

## Reusable rendering component

Add a decorative `HandDrawnBorder` component that:

- Accepts an explicit stable `seed` and optional visual strength.
- Calls `createHandDrawnBorder(seed)` and renders an absolutely positioned SVG over the host component.
- Uses a normalized view box, `preserveAspectRatio="none"`, and a non-scaling stroke so the outline remains consistent at different sizes.
- Is `aria-hidden`, non-focusable, and `pointer-events: none`.
- Keeps content above the background and below the decorative outline without changing component semantics.
- Exposes the generated background radius and shadow values through CSS custom properties or a returned style object.

Native rectangular borders will be removed only where the SVG outline replaces them. Focus outlines remain CSS-based and must continue to render clearly outside the decorative border.

## Component scope

Apply the new system to the primary rectangular box shells requested by the user:

- Every `RoughButton`, including header `LET'S TALK`, hero CTAs, About CTA, and Schedule a Call.
- All service cards.
- All featured-work project cards.
- The About banner.
- Technology stickers.
- The hero eyebrow badge.
- The mobile menu trigger and menu panel where their rectangular outlines are visible.

Project thumbnail frames will receive the lighter-strength seeded outline. Other nested content frames stay unchanged. Circular icon controls, process circles, slider dots, wavy full-width bands, and organic background blobs will keep their existing purpose-built shapes rather than use the rectangular generator.

Seeds come from stable semantic identifiers such as `button-lets-talk`, `service-web-development`, `project-instacity`, `about-banner`, and `tech-node`. Repeated content must not depend on array index when a stable slug or label exists.

## Visual behavior

- Edges should drift subtly by roughly 0.5–1.5% of the normalized box size.
- Corners should vary independently but remain comfortably rounded and usable.
- Border distortion must be visible at desktop size without looking damaged or distracting.
- Narrow layouts may use slightly reduced distortion to avoid perceived clipping.
- Existing colors, paper texture, rotations, hover lifts, image zoom, spacing, and typography stay unchanged.
- Hover states may settle rotation or deepen shadows, but border geometry itself must not morph.
- No border shape changes during hydration, rerendering, scrolling, focus, hover, or page refresh.

## Accessibility and resilience

- The SVG border carries no semantic content.
- Links, buttons, headings, and cards retain their existing semantic elements and keyboard behavior.
- Focus indicators remain visible and are not clipped by the border SVG.
- The component remains usable if the decorative SVG fails to render because the host retains its background, radius, spacing, and focus treatment.
- The generator contains no browser-only APIs, allowing it to run safely in Server and Client Components.

## Performance

- Geometry is generated synchronously from short strings with no dependencies and no state.
- Each border consists of a small SVG path rather than a raster asset or animation.
- Generated paths remain static after render.
- The implementation must not add a canvas library, rough-drawing package, runtime observer, or new client boundary.

## Verification

Per the user's instruction, do not add or run tests. Verify with:

- ESLint.
- TypeScript validation.
- A production Next.js build.
- Browser inspection at representative mobile, tablet, and desktop widths.
- No horizontal overflow or clipped focus outlines.
- Stable path data before and after reload.
- Visual confirmation that services, projects, About, and `LET'S TALK` no longer look like perfect rectangles.
