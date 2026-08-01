import { Mail } from "lucide-react";

import { siteConfig } from "@/config/site";
import { navigation } from "@/data/navigation";
import { pageContent } from "@/data/page-content";

import { BrandLockup } from "./BrandLockup";
import styles from "./Footer.module.css";

function GitHubMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path
        d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.7 7.7 0 0 1 8 3.86c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M5.34 7.43a2.06 2.06 0 1 0 0-4.12 2.06 2.06 0 0 0 0 4.12ZM6.12 20.45H2.56V9h3.56v11.45ZM20.45 14.17c0-3.09-.67-5.46-4.27-5.46-1.73 0-2.89.95-3.37 1.85h-.05V9H9.35v11.45h3.56v-5.67c0-1.49.28-2.94 2.14-2.94 1.82 0 1.85 1.71 1.85 3.04v5.57h3.55v-6.28Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socialItems = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: LinkedInMark },
  { label: "GitHub", href: siteConfig.socials.github, icon: GitHubMark },
  { label: "X", href: siteConfig.socials.x, icon: null },
  {
    label: "Email",
    href: siteConfig.contact.email
      ? `mailto:${siteConfig.contact.email}`
      : null,
    icon: Mail,
  },
] as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} section-inner`}>
        <BrandLockup />

        <nav aria-label="Footer navigation">
          {navigation
            .filter((item) => item.label !== "Process")
            .map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
        </nav>

        <nav aria-label="Social links" className={styles.socials}>
          {socialItems.map(({ label, href, icon: Icon }) => {
            const content = Icon ? (
              <Icon />
            ) : (
              <b aria-hidden="true">X</b>
            );

            if (!href) {
              return (
                <span aria-disabled="true" aria-label={label} key={label}>
                  {content}
                </span>
              );
            }

            const external = /^https?:\/\//i.test(href);

            return (
              <a
                aria-label={label}
                href={href}
                key={label}
                rel={external ? "noopener noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                {content}
              </a>
            );
          })}
        </nav>

        <small>{pageContent.copyright}</small>
      </div>
    </footer>
  );
}
