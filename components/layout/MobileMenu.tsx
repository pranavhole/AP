"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { NavItem } from "@/types/content";

const linkColors = ["#fff4c8", "#ccefe5", "#f8c8cc", "#ded0f7", "#d9e8ff", "#ffe3a7"] as const;

function MenuTriggerPaper() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 50 48"
    >
      <defs>
        <pattern height="8" id="mobile-trigger-grain" patternUnits="userSpaceOnUse" width="9">
          <circle cx="2.2" cy="3" fill="#111" opacity="0.09" r="0.12" />
        </pattern>
      </defs>
      <path d="M5 3C16 1 35 2 45 4c1 10 0 27 1 38-11 3-30 1-41 2C2 33 3 14 5 3Z" fill="#7653d8" transform="translate(2 3)" />
      <path d="M5 3C16 1 35 2 45 4c1 10 0 27 1 38-11 3-30 1-41 2C2 33 3 14 5 3Z" fill="#fff9e9" stroke="#111" strokeLinejoin="round" strokeWidth="2.3" />
      <path d="M5 3C16 1 35 2 45 4c1 10 0 27 1 38-11 3-30 1-41 2C2 33 3 14 5 3Z" fill="url(#mobile-trigger-grain)" />
    </svg>
  );
}

function MobileMenuPaper() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <defs>
        <pattern height="8" id="mobile-panel-grain" patternUnits="userSpaceOnUse" width="10">
          <circle cx="2" cy="2.5" fill="#111" opacity="0.08" r="0.1" />
          <circle cx="7.4" cy="6" fill="#a85565" opacity="0.12" r="0.13" />
        </pattern>
      </defs>
      <path d="M3 3C24 .5 46 2 68 1c16-.8 25 .2 29 3 1.4 21 .3 48 1 72 .5 12-1 18-5 20-25 2-51-.5-78 1-8 .5-12-.7-13.5-4C.4 69 1.8 38 1.2 12 1 6 1.7 3.5 3 3Z" fill="#7653d8" transform="translate(.8 2.7)" />
      <path d="M3 3C24 .5 46 2 68 1c16-.8 25 .2 29 3 1.4 21 .3 48 1 72 .5 12-1 18-5 20-25 2-51-.5-78 1-8 .5-12-.7-13.5-4C.4 69 1.8 38 1.2 12 1 6 1.7 3.5 3 3Z" fill="#f7c3c5" stroke="#111" strokeLinejoin="round" strokeWidth="2.3" vectorEffect="non-scaling-stroke" />
      <path d="M3 3C24 .5 46 2 68 1c16-.8 25 .2 29 3 1.4 21 .3 48 1 72 .5 12-1 18-5 20-25 2-51-.5-78 1-8 .5-12-.7-13.5-4C.4 69 1.8 38 1.2 12 1 6 1.7 3.5 3 3Z" fill="url(#mobile-panel-grain)" />
    </svg>
  );
}

function MenuLinkPaper({ color, index }: { color: string; index: number }) {
  const paths = [
    "M4 8C25 4 74 7 96 5c1 23 0 58-2 84-25 4-65 1-90 4C2 70 3 31 4 8Z",
    "M5 5C31 7 71 3 95 7c2 27-1 58 0 83-28 2-62-2-90 2C3 67 5 32 5 5Z",
    "M3 7C27 3 72 5 97 8c-1 24 1 57-3 83-25 1-64-1-89 2C2 68 4 30 3 7Z",
    "M6 4C29 7 67 3 94 6c3 26 0 59 2 84-27 4-64 0-91 3C3 70 5 29 6 4Z",
    "M4 6C30 4 72 7 96 4c1 25 0 62-2 87-28 2-63-2-90 1C2 66 5 31 4 6Z",
    "M5 5C27 8 70 4 95 7c2 22 0 61 1 83-27 4-65 0-91 3C3 69 4 31 5 5Z",
  ] as const;
  const path = paths[index % paths.length];

  return (
    <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
      <path d={path} fill="#7653d8" transform="translate(1.3 3.5)" />
      <path d={path} fill={color} stroke="#111" strokeLinejoin="round" strokeWidth="1.7" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

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
    <div className="static hidden max-[850px]:block" ref={rootRef}>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="relative isolate grid h-11 w-[46px] cursor-pointer place-content-center gap-[5px] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
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
        <MenuTriggerPaper />
      </button>
      {open ? (
        <nav
          aria-label="Mobile navigation"
          className="absolute top-[calc(100%+5px)] right-1 left-1 z-[30] isolate grid grid-cols-2 animate-[panel-in_180ms_cubic-bezier(0.22,1,0.36,1)_both] gap-x-3 gap-y-2 px-5 pt-6 pb-7 motion-reduce:animate-none"
          id="mobile-navigation"
        >
          {links.map((link, index) => (
            <a
              className={`relative isolate flex min-h-12 items-center justify-center px-3 py-3 font-hand text-[1.2rem] font-bold transition-transform hover:-translate-y-0.5 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${index % 2 === 0 ? "-rotate-[0.45deg]" : "rotate-[0.35deg]"}`}
              href={link.href}
              key={link.href}
              onClick={() => close(false)}
              ref={index === 0 ? firstLinkRef : undefined}
            >
              <MenuLinkPaper color={linkColors[index % linkColors.length]} index={index} />
              <span className="relative z-[1]">{link.label}</span>
            </a>
          ))}
          <svg aria-hidden="true" className="pointer-events-none absolute top-2 left-5 h-3 w-4 text-purple" viewBox="0 0 20 16">
            <path d="M2 14 6 7m5-4-1 7m8-4-5 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
          </svg>
          <svg aria-hidden="true" className="pointer-events-none absolute right-5 bottom-2 h-5 w-5 text-ink" viewBox="0 0 24 24">
            <path d="m12 2 2.4 6.6 6.6 2.5-6.6 2.4L12 20l-2.5-6.5L3 11l6.5-2.4L12 2Z" fill="#fff4c8" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
          </svg>
          <MobileMenuPaper />
        </nav>
      ) : null}
    </div>
  );
}
