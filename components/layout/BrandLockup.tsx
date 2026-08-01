import { siteConfig } from "@/config/site";

import styles from "./BrandLockup.module.css";

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <a
      aria-label={`${siteConfig.name} home`}
      className={`${styles.brand} ${compact ? styles.compact : ""}`}
      href="#home"
    >
      <strong>{siteConfig.initials}</strong>
      <span>
        <b>{siteConfig.name.toUpperCase()}</b>
        <small>{siteConfig.role}</small>
      </span>
    </a>
  );
}
