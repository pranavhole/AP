"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";
import type { NavItem } from "@/types/content";

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
    <div className="hidden max-[850px]:block" ref={rootRef}>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="relative grid h-11 w-[46px] cursor-pointer place-content-center gap-[5px] rounded-[var(--hand-radius)] border-2 border-transparent bg-cream shadow-[var(--hand-shadow-x)_var(--hand-shadow-y)_0_var(--purple)]"
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        style={handDrawnBorderStyle("mobile-menu-trigger", "subtle")}
        type="button"
      >
        <span
          className={`h-[2.5px] w-[23px] rounded-full bg-ink transition-[opacity_150ms_ease,translate_150ms_ease,rotate_150ms_ease] motion-reduce:transition-none ${open ? "[rotate:45deg] [translate:0_7.5px]" : ""}`}
        />
        <span
          className={`h-[2.5px] w-[18px] rounded-full bg-ink transition-[opacity_150ms_ease,translate_150ms_ease,rotate_150ms_ease] motion-reduce:transition-none [translate:3px] ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`h-[2.5px] w-[23px] rounded-full bg-ink transition-[opacity_150ms_ease,translate_150ms_ease,rotate_150ms_ease] motion-reduce:transition-none ${open ? "[rotate:-45deg] [translate:0_-7.5px]" : ""}`}
        />
        <HandDrawnBorder seed="mobile-menu-trigger" strength="subtle" />
      </button>
      {open ? (
        <nav
          aria-label="Mobile navigation"
          className="absolute top-[calc(100%+2px)] right-0 left-0 grid animate-[panel-in_180ms_cubic-bezier(0.22,1,0.36,1)_both] gap-1 rounded-[var(--hand-radius)] border-[2.5px] border-transparent bg-soft-pink px-[18px] pt-3.5 pb-5 shadow-[0_8px_0_rgb(118_83_216_/_24%)] motion-reduce:animate-none"
          id="mobile-navigation"
          style={handDrawnBorderStyle("mobile-menu-panel", "subtle")}
        >
          {links.map((link, index) => (
            <a
              className="min-h-11 border-b-[1.5px] border-dashed border-black/35 px-2 py-[11px] font-hand text-[1.35rem] font-bold"
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
