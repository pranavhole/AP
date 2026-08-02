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
