"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !("IntersectionObserver" in window)) {
      return;
    }

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (motionPreference.matches) {
      return;
    }

    const bounds = element.getBoundingClientRect();

    if (bounds.top < window.innerHeight * 0.94 && bounds.bottom > 0) {
      return;
    }

    element.dataset.revealState = "pending";
    let cancelled = false;
    let revealImmediately = false;
    let stopAnimation: (() => void) | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        observer.disconnect();

        void import("motion/react")
          .then(({ animate }) => {
            if (cancelled || revealImmediately || !element.isConnected) {
              return;
            }

            element.dataset.revealState = "animating";
            const playback = animate(
              element,
              {
                opacity: [0, 1],
                transform: ["translateY(18px)", "translateY(0px)"],
              },
              {
                delay,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              },
            );

            stopAnimation = () => playback.stop();
            void playback.finished
              .then(() => {
                if (!cancelled) {
                  element.dataset.revealState = "visible";
                }
              })
              .catch(() => undefined);
          })
          .catch(() => {
            if (!cancelled) {
              element.dataset.revealState = "visible";
            }
          });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    const revealForFocus = () => {
      revealImmediately = true;
      observer.disconnect();
      stopAnimation?.();
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
      element.dataset.revealState = "visible";
    };

    const revealForReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        revealForFocus();
      }
    };

    observer.observe(element);
    element.addEventListener("focusin", revealForFocus);
    motionPreference.addEventListener("change", revealForReducedMotion);

    return () => {
      cancelled = true;
      observer.disconnect();
      stopAnimation?.();
      element.removeEventListener("focusin", revealForFocus);
      motionPreference.removeEventListener("change", revealForReducedMotion);
    };
  }, [delay]);

  return (
    <div
      className={`data-[reveal-state=pending]:translate-y-[18px] data-[reveal-state=pending]:opacity-0 data-[reveal-state=visible]:translate-y-0 data-[reveal-state=visible]:opacity-100 data-[reveal-state=pending]:focus-within:translate-y-0 data-[reveal-state=pending]:focus-within:opacity-100 motion-reduce:data-[reveal-state]:transform-none motion-reduce:data-[reveal-state]:opacity-100 motion-reduce:data-[reveal-state]:transition-none ${className}`.trim()}
      ref={elementRef}
    >
      {children}
    </div>
  );
}
