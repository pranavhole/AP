"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Children,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type ProjectCarouselProps = {
  children: ReactNode;
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

export function ProjectCarousel({ children }: ProjectCarouselProps) {
  const slides = Children.toArray(children);
  const slideCount = slides.length;
  const [active, setActive] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const scrollSettleRef = useRef<number | null>(null);
  const programmaticTargetRef = useRef<number | null>(null);
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

  const settleProgrammaticScroll = useCallback(
    (viewport: HTMLDivElement) => {
      programmaticTargetRef.current = null;

      if (scrollSettleRef.current !== null) {
        window.clearTimeout(scrollSettleRef.current);
        scrollSettleRef.current = null;
      }

      syncActiveSlide(viewport);
    },
    [syncActiveSlide],
  );

  const cancelProgrammaticScroll = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport || programmaticTargetRef.current === null) {
      return;
    }

    settleProgrammaticScroll(viewport);
  }, [settleProgrammaticScroll]);

  const handleScroll = useCallback(
    (viewport: HTMLDivElement) => {
      if (programmaticTargetRef.current !== null) {
        const target = getSlideElements(viewport)[programmaticTargetRef.current];

        if (
          target &&
          Math.abs(getSlideOffset(viewport, target) - viewport.scrollLeft) <= 1
        ) {
          settleProgrammaticScroll(viewport);
          return;
        }

        if (scrollSettleRef.current !== null) {
          window.clearTimeout(scrollSettleRef.current);
        }

        scrollSettleRef.current = window.setTimeout(
          () => settleProgrammaticScroll(viewport),
          120,
        );
        return;
      }

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        syncActiveSlide(viewport);
        scrollFrameRef.current = null;
      });
    },
    [settleProgrammaticScroll, syncActiveSlide],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const handleScrollEnd = () => {
      if (viewport && programmaticTargetRef.current !== null) {
        settleProgrammaticScroll(viewport);
      }
    };

    viewport?.addEventListener("scrollend", handleScrollEnd);

    return () => {
      viewport?.removeEventListener("scrollend", handleScrollEnd);

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }

      if (scrollSettleRef.current !== null) {
        window.clearTimeout(scrollSettleRef.current);
      }
    };
  }, [settleProgrammaticScroll]);

  const goTo = (index: number) => {
    if (slideCount === 0) {
      return;
    }

    const next = Math.max(0, Math.min(slideCount - 1, index));
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const viewport = viewportRef.current;
    const slide = viewport ? getSlideElements(viewport)[next] : undefined;

    setActive(next);

    if (viewport && slide) {
      programmaticTargetRef.current = next;
      viewport.scrollTo({
        behavior: reduceMotion ? "auto" : "smooth",
        left: getSlideOffset(viewport, slide),
      });

      if (reduceMotion) {
        settleProgrammaticScroll(viewport);
      }
    }
  };

  return (
    <div className="min-w-0">
      <div
        aria-label="Featured projects"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-2 pt-3 pb-[18px] scroll-smooth [scroll-padding-inline:8px] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-[26px] md:overflow-visible md:p-0"
        onPointerDown={cancelProgrammaticScroll}
        onScroll={(event) => handleScroll(event.currentTarget)}
        onTouchStart={cancelProgrammaticScroll}
        onWheel={cancelProgrammaticScroll}
        ref={viewportRef}
        role="region"
      >
        {slides.map((slide, index) => (
          <div
            aria-label={`${index + 1} of ${slideCount}`}
            className="min-w-0 flex-[0_0_calc(100%_-_10px)] snap-start md:flex-auto"
            data-project-slide
            key={index}
            role="group"
          >
            {slide}
          </div>
        ))}
      </div>

      {slideCount > 1 ? (
        <>
          <div
            aria-hidden="true"
            className="mt-[22px] hidden items-center justify-center gap-2 md:flex"
          >
            {Array.from({ length: slideCount }, (_, index) => (
              <span
                className={`h-[11px] w-[11px] rounded-full border-[1.8px] border-ink ${index === boundedActive ? "bg-ink" : ""}`}
                key={index}
              />
            ))}
          </div>
          <div
            aria-label="Project carousel controls"
            className="mt-1 flex items-center justify-center gap-2.5 md:hidden"
            role="group"
          >
            <p aria-atomic="true" aria-live="polite" className="sr-only">
              Showing project {boundedActive + 1} of {slideCount}
            </p>
            <button
              aria-label="Previous project"
              className="grid aspect-square min-h-11 w-11 min-w-11 cursor-pointer place-items-center rounded-[50%_44%_54%_46%] border-2 border-ink bg-cream p-0 disabled:cursor-default disabled:opacity-[0.38]"
              disabled={boundedActive === 0}
              onClick={() => goTo(boundedActive - 1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={20} strokeWidth={2.4} />
            </button>
            <div className="flex items-center">
              {Array.from({ length: slideCount }, (_, index) => (
                <button
                  aria-current={boundedActive === index ? "true" : undefined}
                  aria-label={`Show project ${index + 1}`}
                  className="relative grid min-h-11 w-11 cursor-pointer place-items-center border-0 bg-transparent p-0 before:h-[11px] before:w-[11px] before:rounded-full before:border-[1.8px] before:border-ink before:bg-transparent before:content-[''] before:transition-[background-color_160ms_ease,scale_160ms_ease] hover:before:scale-[1.13] hover:before:bg-lavender aria-[current=true]:before:scale-[1.08] aria-[current=true]:before:bg-ink aria-[current=true]:hover:before:bg-ink"
                  key={index}
                  onClick={() => goTo(index)}
                  type="button"
                />
              ))}
            </div>
            <button
              aria-label="Next project"
              className="grid aspect-square min-h-11 w-11 min-w-11 cursor-pointer place-items-center rounded-[50%_44%_54%_46%] border-2 border-ink bg-cream p-0 disabled:cursor-default disabled:opacity-[0.38]"
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
