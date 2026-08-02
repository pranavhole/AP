import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";
import type { Technology } from "@/types/content";

const toneClasses = {
  cream: "bg-cream",
  pink: "bg-soft-pink",
  mint: "bg-mint",
  yellow: "bg-pastel-yellow",
  lavender: "bg-lavender",
  purple: "bg-purple text-white",
  coral: "bg-coral",
} as const;

const variantClasses = {
  1: "[rotate:-1.3deg]",
  2: "[rotate:1deg] [animation-delay:-1.5s]",
  3: "[rotate:-0.6deg] [animation-delay:-3s]",
  4: "[rotate:0.8deg] [animation-delay:-4.5s]",
} as const;

function TechMark({ mark }: { mark: Technology["mark"] }) {
  if (mark === "react") {
    return (
      <svg viewBox="0 0 48 34">
        <ellipse cx="24" cy="17" fill="none" rx="20" ry="7" />
        <ellipse
          cx="24"
          cy="17"
          fill="none"
          rx="20"
          ry="7"
          transform="rotate(60 24 17)"
        />
        <ellipse
          cx="24"
          cy="17"
          fill="none"
          rx="20"
          ry="7"
          transform="rotate(120 24 17)"
        />
        <circle cx="24" cy="17" r="3" />
      </svg>
    );
  }

  if (mark === "node") {
    return (
      <svg viewBox="0 0 48 34">
        <path d="m24 2 18 10v12L24 32 6 23V11Z" fill="none" />
        <text x="24" y="22" textAnchor="middle">
          JS
        </text>
      </svg>
    );
  }

  if (mark === "python") {
    return (
      <svg viewBox="0 0 48 34">
        <path
          d="M12 17V8c0-5 6-6 12-6s10 1 10 7v6H18c-5 0-8 4-8 8"
          fill="none"
        />
        <path
          d="M36 17v9c0 5-6 6-12 6s-10-1-10-7v-6h16c5 0 8-4 8-8"
          fill="none"
        />
      </svg>
    );
  }

  if (mark === "postgres") {
    return (
      <svg viewBox="0 0 48 34">
        <ellipse cx="24" cy="8" fill="none" rx="15" ry="5" />
        <path
          d="M9 8v17c0 3 7 5 15 5s15-2 15-5V8M9 16c0 3 7 5 15 5s15-2 15-5"
          fill="none"
        />
      </svg>
    );
  }

  if (mark === "aws") {
    return (
      <svg viewBox="0 0 48 34">
        <text x="24" y="18" textAnchor="middle">
          aws
        </text>
        <path d="M10 24c9 5 20 5 29 0" fill="none" />
      </svg>
    );
  }

  const exhaustiveMark: never = mark;
  return exhaustiveMark;
}

export function TechSticker({
  technology,
  className = "",
}: {
  technology: Technology;
  className?: string;
}) {
  const borderSeed = `tech-${technology.mark}`;

  return (
    <div
      className={`relative grid min-h-[88px] w-28 animate-[sticker-float_7s_ease-in-out_infinite] place-items-center rounded-[var(--hand-radius)] border-[2.5px] border-transparent p-[9px] text-center font-black leading-none text-ink shadow-[var(--hand-shadow-x)_var(--hand-shadow-y)_0_rgb(17_17_17_/_20%)] max-md:min-h-[65px] max-md:w-[78px] max-md:p-1.5 ${toneClasses[technology.tone]} ${variantClasses[technology.variant]} ${className}`}
      style={handDrawnBorderStyle(borderSeed)}
    >
      <span
        aria-hidden="true"
        className="grid place-items-center [&_svg]:h-[34px] [&_svg]:w-[46px] [&_svg]:overflow-visible [&_svg]:stroke-current [&_svg]:stroke-2 [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_text]:fill-current [&_text]:stroke-none [&_text]:font-hand [&_text]:text-xs [&_text]:font-black max-md:[&_svg]:h-[25px] max-md:[&_svg]:w-[33px]"
      >
        <TechMark mark={technology.mark} />
      </span>
      <span className="text-xs max-md:text-[0.62rem]">
        {technology.shortLabel}
      </span>
      <HandDrawnBorder seed={borderSeed} />
    </div>
  );
}
