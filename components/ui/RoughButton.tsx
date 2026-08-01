import type { ReactNode } from "react";

import styles from "./RoughButton.module.css";

type RoughButtonProps = {
  children: ReactNode;
  href: string | null;
  variant?: "coral" | "paper" | "yellow";
  className?: string;
};

export function RoughButton({
  children,
  href,
  variant = "coral",
  className = "",
}: RoughButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${className}`.trim();

  if (!href) {
    return (
      <span aria-disabled="true" className={classes}>
        {children}
      </span>
    );
  }

  const external = /^https?:\/\//i.test(href);

  return (
    <a
      className={classes}
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}
