import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = async (path) => {
  try {
    return await readFile(new URL(`../${path}`, import.meta.url), "utf8");
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return "";
    }
    throw error;
  }
};

test("homepage uses the reference section order without a standalone about panel", async () => {
  const page = await read("app/page.tsx");
  const sections = [
    "<HeroSection",
    "<TrustStrip",
    "<ServicesSection",
    "<FeaturedWork",
    "<ProcessSection",
    "<TestimonialsSection",
    "<CTASection",
  ];

  let previous = -1;
  for (const section of sections) {
    const position = page.indexOf(section);
    assert.notEqual(position, -1, `${section} must be rendered`);
    assert.ok(position > previous, `${section} must follow the reference order`);
    previous = position;
  }

  assert.doesNotMatch(page, /<AboutBanner/);
});

test("hero, services, projects, process, testimonial, and CTA use exact copy", async () => {
  const sources = (
    await Promise.all([
      "data/page-content.ts",
      "data/services.ts",
      "data/projects.ts",
      "data/process.ts",
      "components/sections/TestimonialsSection.tsx",
    ].map(read))
  ).join("\n");

  const requiredCopy = [
    "IDEA → DESIGN → DEVELOP → GROW",
    "We build digital",
    "products that",
    "work.",
    "Websites, Web Apps & AI-Powered Solutions for Modern Businesses.",
    "What We Can Help You With",
    "Web Development",
    "Fast, responsive and modern websites that represent your brand.",
    "E-Commerce",
    "Online stores that convert visitors into loyal customers.",
    "Web Applications",
    "Powerful web apps built for performance and scalability.",
    "AI Integrations",
    "Smart AI features to automate, analyze and grow your business.",
    "Selected Work",
    "Business Landing Page",
    "E-Commerce Store",
    "AI Dashboard",
    "Our Process",
    "Discover",
    "Design",
    "Develop",
    "Launch",
    "Grow",
    "What Clients Say",
    "Dialex Technologies delivered an amazing website that exceeded our expectations.",
    "John Doe",
    "Founder, StartupX",
    "Have a project in mind?",
    "Let's build something awesome together.",
  ];

  for (const copy of requiredCopy) {
    assert.ok(sources.includes(copy), `Missing exact copy: ${copy}`);
  }
});

test("hero video follows the accessible autoplay media contract", async () => {
  const artwork = await read("components/illustrations/HeroArtwork.tsx");

  for (const attribute of [
    "autoPlay",
    "muted",
    "loop",
    "playsInline",
    'preload="metadata"',
    'aria-hidden="true"',
  ]) {
    assert.ok(artwork.includes(attribute), `Hero video is missing ${attribute}`);
  }

  assert.match(artwork, /i_want_to_redesign_this_in_s\.mp4/);
  assert.match(artwork, /Hero Animation/);
  assert.doesNotMatch(artwork, /controls(?:=|\s|>)/);
});

test("metadata matches the consultancy SEO brief", async () => {
  const layout = await read("app/layout.tsx");

  assert.ok(
    layout.includes("Dialex Technologies | Full-Stack Development & AI Solutions Company"),
  );
  assert.ok(
    layout.includes(
      "Dialex Technologies Private Limited helps businesses build modern websites, scalable web applications, AI-powered solutions and cloud systems.",
    ),
  );
  for (const keyword of [
    "Dialex Technologies",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js Developer",
    "AI Consulting",
    "Cloud Development",
  ]) {
    assert.ok(layout.includes(keyword), `Missing SEO keyword: ${keyword}`);
  }
});

test("reference and narrow-mobile responsive contracts are present", async () => {
  const source = (
    await Promise.all([
      "components/sections/HeroSection.tsx",
      "components/sections/ServicesSection.tsx",
      "components/ui/ProjectCarousel.tsx",
      "components/sections/ProcessSection.tsx",
      "components/layout/Footer.tsx",
    ].map(read))
  ).join("\n");

  assert.match(source, /grid-cols-2/);
  assert.match(source, /grid-cols-3/);
  assert.match(source, /grid-cols-5/);
  assert.match(source, /snap-mandatory/);
  assert.match(source, /max-\[(?:390|420|560|640)px\]/);
});
