import type { ProcessStep } from "@/types/content";

export const processSteps: readonly ProcessStep[] = [
  {
    title: "Discover",
    description: "Understand your goals & audience",
    icon: "lightbulb",
    tone: "yellow",
    variant: 1,
  },
  {
    title: "Design",
    description: "Plan, wireframe & create sleek UI/UX",
    icon: "wireframe",
    tone: "mint",
    variant: 2,
  },
  {
    title: "Develop",
    description: "Clean code, fast & scalable solutions",
    icon: "laptop",
    tone: "pink",
    variant: 3,
  },
  {
    title: "Launch",
    description: "Test, deploy & go live smoothly",
    icon: "rocket",
    tone: "lavender",
    variant: 4,
  },
  {
    title: "Grow",
    description: "Support, optimize & scale with you",
    icon: "growth",
    tone: "yellow",
    variant: 5,
  },
];
