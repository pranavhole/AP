"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import {
  Children,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./ProjectCarousel.module.css";

type ProjectCarouselProps = {
  children: ReactNode;
  count: number;
};

function getSlideElements(viewport: HTMLDivElement) {
  return Array.from(
    viewport.querySelectorAll<HTMLElement>("[data-project-slide]"),
  );
}

function getSlideOffset(viewport: HTMLDivElement, slide: HTMLElement) {
  return (
    viewport.scrollLeft +
    slide.getBoundingClientRect().left -
    viewport.getBoundingClientRect().left
  );
}

export function ProjectCarousel({ children, count }: ProjectCarouselProps) {
  const slides = Children.toArray(children);
  const requestedCount = Number.isFinite(count)
    ? Math.max(0, Math.trunc(count))
    : slides.length;
  const slideCount = Math.min(requestedCount, slides.length);
  const renderedSlides = slides.slice(0, slideCount);
  const [active, setActive] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const boundedActive = Math.min(active, Math.max(0, slideCount - 1));

  const syncActiveSlide = useCallback((viewport: HTMLDivElement) => {
    const slideElements = getSlideElements(viewport);

    if (slideElements.length === 0) {
      setActive(0);
      return;
    }

    const nearest = slideElements.reduce(
      (result, slide, index) => {
        const distance = Math.abs(
          getSlideOffset(viewport, slide) - viewport.scrollLeft,
        );

        return distance < result.distance ? { distance, index } : result;
      },
      { distance: Number.POSITIVE_INFINITY, index: 0 },
    );

    setActive((current) =>
      current === nearest.index ? current : nearest.index,
    );
  }, []);

  const handleScroll = useCallback(
    (viewport: HTMLDivElement) => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        syncActiveSlide(viewport);
        scrollFrameRef.current = null;
      });
    },
    [syncActiveSlide],
  );

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    },
    [],
  );

  const goTo = (index: number) => {
    if (slideCount === 0) {
      return;
    }

    const next = Math.max(0, Math.min(slideCount - 1, index));
    const viewport = viewportRef.current;
    const slide = viewport ? getSlideElements(viewport)[next] : undefined;

    setActive(next);

    if (viewport && slide) {
      viewport.scrollTo({
        behavior: reduceMotion ? "auto" : "smooth",
        left: getSlideOffset(viewport, slide),
      });
    }
  };

  return (
    <div className={styles.carousel}>
      <div
        aria-label="Featured projects"
        aria-roledescription="carousel"
        className={styles.viewport}
        onScroll={(event) => handleScroll(event.currentTarget)}
        ref={viewportRef}
        role="region"
        tabIndex={slideCount > 1 ? 0 : undefined}
      >
        {renderedSlides.map((slide, index) => (
          <div
            aria-label={`${index + 1} of ${slideCount}`}
            aria-roledescription="slide"
            className={styles.slide}
            data-project-slide
            key={index}
            role="group"
          >
            {slide}
          </div>
        ))}
      </div>

      {slideCount > 0 ? (
        <>
          <p aria-atomic="true" aria-live="polite" className="sr-only">
            Showing project {boundedActive + 1} of {slideCount}
          </p>
          <div
            aria-label="Project carousel controls"
            className={styles.controls}
            role="group"
          >
            <button
              aria-label="Previous project"
              className={styles.arrowButton}
              disabled={boundedActive === 0}
              onClick={() => goTo(boundedActive - 1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={20} strokeWidth={2.4} />
            </button>
            <div className={styles.dots}>
              {Array.from({ length: slideCount }, (_, index) => (
                <button
                  aria-current={boundedActive === index ? "true" : undefined}
                  aria-label={`Show project ${index + 1}`}
                  className={styles.dot}
                  key={index}
                  onClick={() => goTo(index)}
                  type="button"
                />
              ))}
            </div>
            <button
              aria-label="Next project"
              className={styles.arrowButton}
              disabled={boundedActive === slideCount - 1}
              onClick={() => goTo(boundedActive + 1)}
              type="button"
            >
              <ArrowRight aria-hidden="true" size={20} strokeWidth={2.4} />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
