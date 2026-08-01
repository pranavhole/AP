import type { Technology } from "@/types/content";
import styles from "./TechSticker.module.css";

function TechMark({ label }: { label: string }) {
  if (label.startsWith("React")) {
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

  if (label === "Node.js") {
    return (
      <svg viewBox="0 0 48 34">
        <path d="m24 2 18 10v12L24 32 6 23V11Z" fill="none" />
        <text x="24" y="22" textAnchor="middle">
          JS
        </text>
      </svg>
    );
  }

  if (label === "Python") {
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

  if (label === "PostgreSQL") {
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

  return (
    <svg viewBox="0 0 48 34">
      <text x="24" y="18" textAnchor="middle">
        aws
      </text>
      <path d="M10 24c9 5 20 5 29 0" fill="none" />
    </svg>
  );
}

export function TechSticker({
  technology,
  className = "",
}: {
  technology: Technology;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.sticker} ${styles[technology.tone]} ${styles[`variant${technology.variant}`]} ${className}`}
    >
      <TechMark label={technology.label} />
      <span>{technology.shortLabel}</span>
    </div>
  );
}
