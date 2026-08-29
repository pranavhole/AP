export const SITE_INFO = {
  name: "Dialex Technologies",
  companyName: "DIALEX TECHNOLOGIES PRIVATE LIMITED",
  role: "Full-Stack Development & AI Solutions",
  initials: "DT",
  address:
    "SHOP NO. 58 ARIHANT NAGAR, HATHOJ KALWAR ROAD, Hathoj, Jaipur, Jaipur- 302012, Rajasthan",
  headline: "We build digital products that work.",
  subtext: "Websites, Web Apps & AI-Powered Solutions for Modern Businesses.",
  tagline: "IDEA → DESIGN → DEVELOP → GROW",
  aboutHeading: "About Dialex Technologies",
  aboutCopy:
    "Dialex Technologies Private Limited is a full-stack digital solutions company focused on building clean, scalable and high-performance digital products. We work across modern web development, backend systems, cloud infrastructure and smart AI solutions.",
  aboutSkills: ["Full-Stack", "AI Engineering", "Cloud & Backend"],
  ctaHeading: "Have a project in mind?",
  ctaSubtext: "Let's build something awesome together.",
  footerDescription:
    "Helping businesses build modern, scalable and impactful digital products.",
  copyright: "© 2026 Dialex Technologies Private Limited. All rights reserved.",
  email: "info@dialextech.com",
  links: {
    talk: "#contact",
    startProject: "#contact",
    viewWork: "#work",
    buildTogether: "#contact",
  },
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://x.com",
    email: "mailto:info@dialextech.com",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

export const TRUST_ITEMS = [
  {
    icon: "rocket",
    title: "On-Time Delivery",
    tone: "yellow",
  },
  {
    icon: "growth",
    title: "Scalable & Reliable",
    tone: "mint",
  },
  {
    icon: "heart",
    title: "Support Beyond Launch",
    tone: "pink",
  },
] as const;

export const SERVICES = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Fast, responsive and modern websites that represent your brand.",
    icon: "laptop",
    iconBg: "bg-[#CFEBD8]", // pastel green
    cardTone: "yellow",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description: "Online stores that convert visitors into loyal customers.",
    icon: "cart",
    iconBg: "bg-[#FFF0B0]", // pastel yellow
    cardTone: "mint",
  },
  {
    id: "web-apps",
    title: "Web Applications",
    description: "Powerful web apps built for performance and scalability.",
    icon: "mobile",
    iconBg: "bg-[#DCC8F6]", // pastel lavender
    cardTone: "pink",
  },
  {
    id: "ai-integrations",
    title: "AI Integrations",
    description: "Smart AI features to automate, analyze and grow your business.",
    icon: "ai-chip",
    iconBg: "bg-[#F6B8B8]", // pastel pink
    cardTone: "lavender",
  },
] as const;

export const PROJECT_TABS = [
  "All",
  "Websites",
  "Web Apps",
  "E-Commerce",
  "AI Projects",
] as const;

export const PROJECTS = [
  {
    id: "business-landing-page",
    title: "Business Landing Page",
    description: "Modern landing page for a digital agency.",
    category: "Websites",
    tag: "Website",
    type: "landing-page",
    accent: "mint",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO"],
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce Store",
    description: "Full-featured online store with payment & admin.",
    category: "E-Commerce",
    tag: "E-Commerce",
    type: "ecommerce",
    accent: "yellow",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
  },
  {
    id: "ai-dashboard",
    title: "AI Dashboard",
    description: "AI-powered dashboard for data insights & automation.",
    category: "AI Projects",
    tag: "Web App",
    type: "dashboard",
    accent: "lavender",
    tags: ["FastAPI", "Next.js", "LangGraph", "OpenAI"],
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Discover",
    description: "Understand your goals & audience",
    icon: "lightbulb",
    iconBg: "bg-[#CFEBD8]", // pastel green
    tone: "yellow",
  },
  {
    step: 2,
    title: "Design",
    description: "Plan, wireframe & create sleek UI/UX",
    icon: "pencil",
    iconBg: "bg-[#FFF0B0]", // pastel yellow
    tone: "mint",
  },
  {
    step: 3,
    title: "Develop",
    description: "Clean code, fast & scalable solutions",
    icon: "code",
    iconBg: "bg-[#DCC8F6]", // pastel lavender
    tone: "pink",
  },
  {
    step: 4,
    title: "Launch",
    description: "Test, deploy & go live smoothly",
    icon: "launch",
    iconBg: "bg-[#F6B8B8]", // pastel pink
    tone: "lavender",
  },
  {
    step: 5,
    title: "Grow",
    description: "Support, optimize & scale with you",
    icon: "growth",
    iconBg: "bg-[#BFDFAE]", // pastel mint
    tone: "mint",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Dialex Technologies delivered an amazing website that exceeded our expectations.",
    name: "John Doe",
    role: "Founder, StartupX",
    avatarColor: "#F9E37D",
  },
  {
    id: 2,
    quote:
      "Working with Dialex Technologies was smooth from day one. They built our complete SaaS MVP in record time with immaculate attention to detail.",
    name: "Sarah Jenkins",
    role: "Co-Founder, SaaSify",
    avatarColor: "#DCC8F6",
  },
  {
    id: 3,
    quote:
      "The AI automation features Dialex Technologies integrated doubled our team's operational efficiency. A truly talented engineering partner.",
    name: "Alex Rivera",
    role: "Head of Product, Apex AI",
    avatarColor: "#CFEBD8",
  },
] as const;
