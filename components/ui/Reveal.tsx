"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
} from "react";

import styles from "./Reveal.module.css";

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
      className={`${styles.reveal} ${className}`.trim()}
      ref={elementRef}
    >
      {children}
    </div>
  );
}
