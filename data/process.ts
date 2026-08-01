import type { ProcessStep } from "@/types/content";

export const processSteps: readonly ProcessStep[] = [
  {
    title: "Plan",
    description: "Discuss your idea",
    icon: "lightbulb",
    tone: "yellow",
    variant: 1,
  },
  {
    title: "Build",
    description: "Design & develop",
    icon: "wireframe",
    tone: "mint",
    variant: 2,
  },
  {
    title: "Launch",
    description: "Ship to users",
    icon: "rocket",
    tone: "pink",
    variant: 3,
  },
  {
    title: "Grow",
    description: "Scale together",
    icon: "growth",
    tone: "mint",
    variant: 4,
  },
];
