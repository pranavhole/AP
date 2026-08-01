export type Tone =
  | "cream"
  | "pink"
  | "mint"
  | "yellow"
  | "lavender"
  | "purple"
  | "coral";

export type CardVariant = 1 | 2 | 3 | 4;

export type TechnologyMark = "react" | "node" | "python" | "postgres" | "aws";

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

export type TrustItem = {
  label: string;
  icon: SketchIconName;
  tone: Tone;
  variant: CardVariant;
};

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
  mark: TechnologyMark;
  tone: Tone;
  variant: CardVariant;
};
