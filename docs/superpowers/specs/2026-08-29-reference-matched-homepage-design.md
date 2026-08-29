# Reference-Matched Homepage Design

## Goal

Rebuild the Pranav Hole freelance consultancy homepage so its composition, density, colors, typography, outlined cards, and hand-drawn details closely match the supplied 748 × 2103 reference while remaining responsive and accessible.

## Source of truth

The supplied image is the visual authority. The pasted brief supplies exact copy, accessibility, metadata, and technical requirements where the image cannot. Where they conflict, the image wins for visible layout. In particular, the visible page excludes the brief's standalone About section because it is absent from the reference.

## Considered approaches

1. **Adapt the current component system (chosen).** Keep the App Router shell, narrow Client Component boundaries, reusable icons, the supplied hero video, and available art assets; rewrite section markup and styling for the reference. This preserves accessibility work and minimizes new client JavaScript.
2. **Replace the page with one monolithic component.** Faster initially, but it would discard useful menu/carousel behavior and make the page harder to tune and maintain.
3. **Use the reference as a background image.** Visually literal but inaccessible, non-responsive, uneditable, and incompatible with the requested semantic production site.

## Page architecture

`app/page.tsx` remains a Server Component and assembles compact section components in this order:

1. Header
2. Hero
3. Trust strip
4. Services
5. Selected work
6. Process
7. Testimonials
8. Contact CTA
9. Footer

Only the mobile menu, project carousel/filter affordances, and testimonial navigation require client-side state. Static content and illustration markup remain Server Components.

## Visual system

- Canvas: warm cream `#FFF8E8` with a very faint CSS dot/paper texture.
- Header/footer: pastel pink `#F6B8B8`.
- Services/CTA: mint `#CFEBD8`.
- Process: lavender `#DCC8F6`.
- Highlights: yellow `#F9E37D`; testimonial: `#FFF0B0`.
- Ink: navy-black `#17172A`; muted copy: `#575467`.
- Typography: Patrick Hand for large/display copy and Nunito Sans for readable text, self-hosted by `next/font`.
- Geometry: 2px ink outlines, 10–18px radii, mild irregularity, low-offset shadows, hand-drawn doodles, and wavy section edges.

At approximately 748 CSS pixels, the composition intentionally mirrors the reference: hamburger header, two-column hero, two-column service grid, three project cards, and a five-column process row. Below roughly 640px the hero stacks; below 560px projects become a snap carousel and process becomes a vertical timeline. Buttons become full-width below 420px.

## Section design

### Header

A compact pink bar contains the PH monogram/name, a cream outlined `LET'S TALK` button on larger widths, and a three-line menu trigger at the reference width. Its bottom boundary uses an irregular wave rather than a straight corporate edge. The menu remains keyboard trapped, Escape-dismissable, and focus-restoring.

### Hero and trust strip

The left column contains the lavender process tag, exact three-line headline, yellow `work.` marker, supporting copy, and two stacked reference-style buttons. The right column uses the supplied autoplaying, muted, looping 1280 × 720 video, with the MP4 source, metadata preload, no controls, `aria-hidden`, and a simple fallback label. It is clipped/contained so the illustration fills the visual column without crowding the copy. The trust strip is a rounded cream card with three equal benefits and desktop separators.

### Services

A rounded mint panel contains a centered doodled heading, four cream cards in a 2 × 2 grid at the reference width, pastel icon blobs, exact copy, and a centered pink CTA. Icons are inline, ink-stroked SVGs.

### Selected work

The cream section includes five compact category tabs, three outlined project cards with illustrated placeholder art matching the reference categories, one colored tag per card, and a centered pink CTA. At narrow mobile widths, cards scroll horizontally with mandatory snap points.

### Process

A full-width lavender band presents five pastel circular icons joined by a dashed line. The reference-width layout is horizontal; narrow mobile becomes a vertical left-icon/right-copy timeline.

### Testimonial, CTA, and footer

One pale-yellow testimonial card is framed by pink previous/next controls and followed by five small dots. The CTA is a compact mint strip with a paper-plane doodle and two buttons. The footer reproduces the reference’s brand column, quick-link columns, social circles, and pink copyright bar.

## Content and link behavior

All visible copy follows the pasted brief and reference. Since no contact, social, or project URLs were supplied, unavailable actions render as accessible non-clickable controls rather than broken links. Internal navigation links remain functional. The `About` link points to the hero identity content (`#about`) without adding a visible standalone section.

## Accessibility and performance

- Semantic landmarks and labelled sections, one page-level `h1`, logical heading order.
- Visible focus treatment and keyboard-operable navigation.
- Decorative SVGs and hero video hidden from assistive technology; meaningful project art has descriptive text.
- Motion is subtle and disabled through `prefers-reduced-motion`.
- Static illustrations remain inline SVG/CSS; raster project imagery is not required for the reference placeholders.
- `next/font` remains in the root layout and metadata uses the App Router Metadata API.
- The video stays metadata-preloaded and does not pull controls/UI libraries.

## Verification

Automated contract tests will assert exact copy, section order, metadata, video attributes/source, and responsive class contracts. Fresh lint, TypeScript, and production build checks must pass. Chrome will then verify the rendered page at 748px reference width plus 390px mobile and a desktop viewport, including menu interaction, overflow, section ordering, and console cleanliness.
