"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { NavItem } from "@/types/content";

import styles from "./MobileMenu.module.css";

export function MobileMenu({ links }: { links: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);

    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      firstLinkRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close(true);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [close, open]);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.nav
            animate={{ opacity: 1, y: 0 }}
            aria-label="Mobile navigation"
            className={styles.panel}
            exit={{ opacity: 0, y: -10 }}
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            {links.map((link, index) => (
              <a
                href={link.href}
                key={link.href}
                onClick={() => close(false)}
                ref={index === 0 ? firstLinkRef : undefined}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
