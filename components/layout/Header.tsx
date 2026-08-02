import { MessageCircle } from "lucide-react";

import { RoughButton } from "@/components/ui/RoughButton";
import { contactLinks } from "@/config/site";
import { navigation } from "@/data/navigation";

import { BrandLockup } from "./BrandLockup";
import styles from "./Header.module.css";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <BrandLockup compact />
        <nav aria-label="Primary navigation" className={styles.nav}>
          {navigation.map((link) => (
            <a
              aria-current={link.href === "#home" ? "page" : undefined}
              className={link.href === "#home" ? styles.active : undefined}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.cta}>
          <RoughButton href={contactLinks.talk} variant="paper">
            LET&apos;S TALK
            <MessageCircle aria-hidden="true" size={17} strokeWidth={2.5} />
          </RoughButton>
        </div>
        <MobileMenu links={navigation} />
      </div>
    </header>
  );
}
