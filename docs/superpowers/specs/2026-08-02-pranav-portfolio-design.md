# Pranav Hole Portfolio Website Design

**Date:** 2026-08-02  
**Status:** Approved for implementation planning  
**Product:** Single-page freelance full-stack consultant portfolio  
**Primary reference:** User-supplied illustrated portfolio screenshot and written brief

## 1. Objective

Build a complete, production-ready Next.js 16 portfolio homepage for Pranav Hole that closely recreates the supplied reference. The site must feel like a hand-drawn digital sketchbook: playful, warm, comic-inspired, intentionally irregular, and clearly human-made. It must not resemble a generic corporate or SaaS template.

Success means:

- The desktop composition preserves the reference's section order, proportions, color rhythm, illustrated hero, and long poster-like flow.
- Tablet and mobile layouts are deliberately recomposed rather than scaled-down desktop screenshots.
- Imperfect borders, varied corner shapes, offset shadows, marker strokes, wavy separators, asymmetric doodles, paper grain, and small rotations remain visible throughout.
- Accessibility, semantic structure, image optimization, keyboard usability, reduced-motion support, and responsive stability are maintained despite the intentionally irregular visual style.
- Content and optional links are editable through typed data and configuration files.

## 2. Approved Scope Decisions

- Use the **hybrid modular artwork** approach.
- The developer character follows the supplied illustrated reference only. It is not a likeness of Pranav Hole and does not require a personal photograph.
- The hero character scene, matching About illustration, project thumbnails, and social/preview artwork are generated specifically for the site. They use no stock photography or external placeholder images.
- Stickers, service/process icons, arrows, doodles, wavy dividers, textures, and rough UI treatments are separate custom SVG/CSS layers so they can be repositioned responsively.
- Contact-related CTA controls remain visually present but do not submit, email, schedule, or navigate to external services in this version. They are exposed as unavailable rather than as misleading active controls.
- Internal navigation, including **View My Work**, remains functional.
- The CTA band doubles as the `contact` navigation destination; no separate form section is added.

## 3. Visual System

### 3.1 Palette

Use the approved palette as CSS custom properties and Tailwind theme values:

- Cream: `#FFF9E9`
- Soft pink: `#F7C3C5`
- Mint: `#BFEBD9`
- Pastel yellow: `#FFE58F`
- Lavender: `#D8C2F2`
- Purple: `#7653D8`
- Coral pink: `#FF9DA6`
- Dark ink: `#111111`
- Muted gray: `#5E5E5E`

Colors should have subtle paper grain, dot fields, faded patches, or low-opacity ink variation. Gradients are limited to marker strokes and restrained texture overlays. There is no glassmorphism, neon styling, or glossy 3D treatment.

### 3.2 Typography

- Headings and expressive labels: **Patrick Hand** through `next/font`.
- Body copy, navigation, and controls: **Nunito Sans** through `next/font`.
- Heading line breaks are intentionally controlled at major breakpoints to echo the reference while avoiding awkward mobile wrapping.
- Body text never drops below an accessible reading size.

### 3.3 Deterministic imperfection

The visual irregularity is authored, not randomized at runtime. Each component variant receives stable values for:

- Border width between 2px and 3px.
- Independent corner radii.
- Rotation generally between `-0.8deg` and `0.8deg`, reduced on narrow screens.
- Shadow direction and offset.
- Oval/circle proportions.
- Marker underline and rough-path geometry.

This avoids hydration differences and keeps the same composition across renders. Reusable utilities include hand-drawn borders, rough shadows, scribble underlines, paper texture, wavy dividers, irregular cards, doodle circles, and slight rotations.

### 3.4 Artwork language

All custom illustration follows one art direction:

- Thick, slightly inconsistent black ink outlines.
- Soft pastel fills with subtle grain.
- Uneven curves and small hand-rendered line imperfections.
- No photorealistic character art, glossy 3D, emoji substitutes, or generic corporate vector style.

The project thumbnails may depict polished software interfaces, but their surrounding frames and secondary marks remain handmade.

## 4. Page Architecture

### 4.1 Header

- Soft pink sticky header with a thin irregular bottom border.
- Left brand lockup: large `PH`, `PRANAV HOLE`, and `Freelance Full-Stack Consultant`.
- Desktop navigation: Home, Services, Work, About, Process, Contact.
- Active Home state uses a hand-drawn underline.
- Right `LET'S TALK` CTA keeps the outlined reference treatment and purple offset shadow; it is non-navigating in this version.
- Mobile uses the brand plus a hand-drawn hamburger that opens a pink/cream slide-down menu.
- Mobile menu behavior includes body-scroll lock, Escape-to-close, close-button labeling, outside/link close, and focus restoration.

### 4.2 Hero

- Cream paper background with a mint angled edge and irregular section boundary.
- Desktop is a two-column composition: copy on the left, modular illustrated scene on the right.
- Exact content:
  - `IDEA → PRODUCT → GROWTH`
  - `Your Tech Partner to Build Digital Products That Work`
  - `— Web • Mobile • AI • Cloud`
  - `Start Your Project →`
  - `View My Work`
- `Work` receives a yellow marker field and scribbled black underline.
- The generated hero character has curly black hair, round glasses, a purple hoodie, a `PH` laptop, coding mug, plant, and yellow blob.
- Five technology stickers—React/Next.js, Node.js, Python, PostgreSQL, and AWS—float as separate, differently shaped layers connected by dotted paths.
- Mobile becomes text-first, stacks the CTAs, moves the character below the copy, reduces doodle density, and deliberately repositions the essential stickers.
- `Start Your Project →` is retained as a styled unavailable CTA. `View My Work` remains an active in-page link to `#work`.

### 4.3 Trust strip

- Mint-green wavy band containing On-Time Delivery, Scalable & Reliable, and Support Beyond Launch.
- Each item uses a distinct irregular icon container—rocket, growth chart, and heart respectively—and an uneven divider.
- Desktop uses three columns. Mobile uses a readable stacked arrangement inside the same irregular band.

### 4.4 Services

- Centered `Services I Offer` heading with yellow marker underline, purple strokes, and paper-plane doodle.
- Four typed service cards:
  - Web Development — `Modern, fast & responsive` — yellow.
  - Mobile & Web Apps — `From idea to live product` — mint.
  - AI Integration — `LLMs, Agents, Automation` — pink.
  - Cloud & DevOps — `Deploy, scale, monitor` — lavender.
- Each card has its own stable shape, rotation, border, shadow, spacing, icon, and circular arrow detail.
- Desktop uses four columns, tablet uses two, and mobile uses one column.

### 4.5 Process

- Yellow dotted paper section with `How We Work` heading.
- Four steps use the exact supplied labels and descriptions:
  - Plan — `Discuss your idea`.
  - Build — `Design & develop`.
  - Launch — `Ship to users`.
  - Grow — `Scale together`.
- Their custom icons are a lightbulb, browser/wireframe, rocket, and growth chart respectively.
- Each step has a distinct irregular icon circle; hand-drawn arrows connect the flow.
- Desktop is horizontal, tablet is a two-column sequence, and mobile is a vertical timeline with downward/curved arrows.

### 4.6 Featured work

- `Featured Work` heading and `View All →` visual link treatment.
- Three project cards with the supplied titles, descriptions, and tags:
  - AI Engineer Workspace — `AI-powered developer productivity suite.` — Next.js, FastAPI, AI, AWS.
  - InstaCity — `Instagram data in a 3D city experience.` — FastAPI, Next.js, PostgreSQL.
  - Muzzy — `Real-time music streaming platform.` — Next.js, Node.js, Socket.IO.
- Cards use generated thumbnails, stable shape variations, rough borders, handmade shadows, and pastel tag pills.
- Desktop shows all three cards. Mobile uses native horizontal scroll snap with accessible previous/next controls and live active-dot state; no external carousel package is used.
- Optional project URLs come from configuration. Without a URL, a project card remains informative but non-interactive.
- `View All →` is a configured optional link. In this version it retains its visual treatment but is unavailable because no destination was supplied.

### 4.7 About banner

- Lavender irregular banner with the matching cropped developer character, the exact text `Full-Stack Developer passionate about building clean, scalable and useful digital products. I turn ideas into working software.`, yellow `Let's Build Together →` CTA, grid doodle, and paper texture.
- Mobile stacks the character, text, and full-width CTA without overcrowding.
- The CTA is non-navigating in this version.

### 4.8 Contact CTA

- Mint wavy band with `Have an idea in mind?`, yellow-highlighted `idea`, and `Let's discuss and make it real.`
- Curved arrow, pink `Schedule a Call` CTA, calendar illustration, and motion lines.
- The section owns `id="contact"` for header navigation.
- The CTA is non-navigating in this version.

### 4.9 Footer

- Soft pink footer with the brand lockup, Home/Services/Work/About/Contact links, copyright text, and LinkedIn/GitHub/X/email icon positions.
- Copyright is `© 2026 Pranav Hole. All rights reserved.`
- Optional external values come from the central configuration. Unconfigured entries render as unavailable rather than linking to fake destinations.
- Mobile stacks the groups compactly and centers the social row.

## 5. Component and Data Architecture

The App Router page remains a server component by default. Client code is limited to interactive islands.

Suggested structure:

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  layout/
    Header.tsx
    MobileMenu.tsx
    Footer.tsx
  sections/
    HeroSection.tsx
    TrustStrip.tsx
    ServicesSection.tsx
    ProcessSection.tsx
    FeaturedWork.tsx
    AboutBanner.tsx
    CTASection.tsx
  ui/
    RoughButton.tsx
    SectionHeading.tsx
    ProjectCarousel.tsx
    Reveal.tsx
    ScribbleUnderline.tsx
    WavyDivider.tsx
  illustrations/
    TechSticker.tsx
    DoodleDecoration.tsx
    HandDrawnArrow.tsx
    ServiceIcon.tsx
    ProcessIcon.tsx
config/
  site.ts
data/
  services.ts
  projects.ts
  process.ts
  technologies.ts
types/
  content.ts
public/
  images/
  icons/
  doodles/
  projects/
```

`site.ts` contains the site name plus nullable email, phone, LinkedIn, GitHub, X, meeting, resume, and project URLs. It also exposes whether contact actions are enabled. This version sets those actions to unavailable without inventing placeholder URLs.

Focal image outputs use meaningful names such as `public/images/developer-hero.png`, `public/images/developer-about.png`, and `public/projects/ai-engineer-workspace.png`. The custom PH favicon and Open Graph preview are also local. Source images retain transparency where required and are rendered through `next/image`, which produces optimized responsive formats.

Typed arrays feed the reusable section/card components. Interactive islands receive only the serialized data they require. The carousel owns local index/scroll state; the mobile menu owns open/closed state and focus/scroll side effects. There is no runtime API or database.

## 6. Motion and Interaction

- Technology stickers use offset 5–8 second ambient float loops.
- Buttons and cards move only 1–3px on hover/focus; shadows deepen and rotations settle slightly.
- Doodles and section content reveal once as they enter the viewport.
- Process items reveal sequentially with a short stagger.
- Project images use restrained hover zoom.
- All continuous and entrance motion becomes static under `prefers-reduced-motion`; hover and focus clarity remain.
- Smooth in-page navigation accounts for the sticky header through scroll margin.

## 7. Accessibility and Failure Handling

- Semantic header, navigation, main, sections, headings, and footer.
- A keyboard-visible skip link and sketch-style `:focus-visible` treatment.
- Meaningful alt text for content imagery and empty alt text for decorative marks.
- Lucide React is limited to utility controls or social glyphs where no custom illustration exists; the focal, service, process, and decorative artwork remains custom.
- Interactive targets are at least 44px where practical.
- Mobile menu supports keyboard navigation, Escape, focus restoration, and body-scroll locking.
- Carousel buttons have explicit labels; dot state is announced without noisy live-region updates.
- Contact CTAs with no configured action are marked unavailable and removed from the tab sequence, while retaining the requested visual appearance.
- Static local data eliminates network-loading and runtime API error states.
- Required image assets are checked into `public` with intrinsic dimensions. `next/image` sizes and reserved containers prevent layout shift.
- Missing optional project/social links degrade to non-interactive cards or icons rather than dead links.
- If motion JavaScript fails, all primary content remains visible and readable.

## 8. Performance and SEO

- Read the installed Next.js 16 documentation under `node_modules/next/dist/docs/` before implementation, per `AGENTS.md`.
- Use `next/image` for meaningful raster images, responsive `sizes`, priority only for the hero focal image, and lazy loading below the fold.
- Keep decorative SVGs inline or bundled locally; do not request stock assets or remote image hosts.
- Use `next/font` subsets and CSS variables to avoid font layout shift.
- Keep most sections server-rendered and minimize client JavaScript.
- Provide descriptive metadata, canonical-ready metadata fields, Open Graph/Twitter fields, and a custom PH favicon/Open Graph image.
- Aim for Lighthouse scores of at least 90 Performance and 95 Accessibility/Best Practices/SEO under a normal production audit, treating them as quality targets rather than hard environmental guarantees.

## 9. Verification Strategy

Implementation follows test-driven development for interactive behavior.

Automated checks:

- Component tests for mobile menu open/close, Escape handling, body-scroll lock, and focus restoration.
- Component tests for project carousel previous/next controls, dots, and boundary behavior.
- Tests for configured versus unavailable external links.
- TypeScript validation, ESLint, and a production Next.js build.

Browser and visual checks:

- Inspect 360, 390, 430, 768, 1024, 1280, and 1440px widths.
- Confirm no horizontal overflow from rotations, shadows, stickers, wavy edges, or the carousel.
- Confirm every image loads with correct sizing and alt behavior.
- Confirm header navigation, View My Work, mobile menu, carousel, keyboard controls, and reduced-motion behavior.
- Confirm long headings and wrapped buttons remain legible.
- Confirm the mobile layout is recomposed and the hand-drawn irregularity remains visible at every breakpoint.
- Run a production-mode browser smoke test and a Lighthouse-oriented review.

## 10. Deliverables

- Complete Next.js 16 App Router project in TypeScript and Tailwind CSS.
- Generated and custom-drawn local visual assets in the requested public directories.
- Reusable section, UI, and illustration components.
- Typed content arrays and central site configuration.
- Responsive desktop, tablet, and mobile behavior.
- SEO and social metadata.
- Accessible navigation and interactive components.
- README covering setup, development, build, asset replacement, project editing, contact configuration, and the hand-drawn implementation system.
