"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";
import type { NavItem } from "@/types/content";

import styles from "./MobileMenu.module.css";

export function MobileMenu({ links }: { links: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

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
        return;
      }

      if (event.key === "Tab") {
        const focusable = rootRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href]",
        );

        if (!focusable?.length) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
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

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 850px)");
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        close(false);
      }
    };

    mobileViewport.addEventListener("change", onViewportChange);
    return () => mobileViewport.removeEventListener("change", onViewportChange);
  }, [close]);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        style={handDrawnBorderStyle("mobile-menu-trigger", "subtle")}
        type="button"
      >
        <span />
        <span />
        <span />
        <HandDrawnBorder seed="mobile-menu-trigger" strength="subtle" />
      </button>
      {open ? (
        <nav
          aria-label="Mobile navigation"
          className={styles.panel}
          id="mobile-navigation"
          style={handDrawnBorderStyle("mobile-menu-panel", "subtle")}
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
          <HandDrawnBorder seed="mobile-menu-panel" strength="subtle" />
        </nav>
      ) : null}
    </div>
  );
}
