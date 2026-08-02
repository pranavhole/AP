import type { ReactNode } from "react";

import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";

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
  const variantClasses = {
    coral:
      "bg-coral shadow-[var(--hand-shadow-x)_var(--hand-shadow-y)_0_var(--purple)]",
    paper:
      "bg-[#fffef9] shadow-[var(--hand-shadow-x)_var(--hand-shadow-y)_0_var(--yellow)]",
    yellow:
      "bg-pastel-yellow shadow-[var(--hand-shadow-x)_var(--hand-shadow-y)_0_var(--ink)]",
  };
  const classes = [
    "relative inline-flex min-h-12 items-center justify-center gap-[9px] rounded-[var(--hand-radius)] border-[2.5px] border-transparent px-5 py-[11px] font-black leading-none text-ink transition-[translate_160ms_ease,rotate_160ms_ease,box-shadow_160ms_ease] max-[430px]:min-h-[50px] max-[430px]:w-full",
    "[&[href]]:hover:[rotate:-0.25deg] [&[href]]:hover:[translate:1px_-2px] [&[href]]:focus-visible:[rotate:-0.25deg] [&[href]]:focus-visible:[translate:1px_-2px]",
    "aria-disabled:cursor-default",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
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
