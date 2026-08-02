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

const dotPaths = [
  "M11 2C18 1 23 6 22 13c-1 7-6 11-13 10C3 22 1 17 2 10 3 5 6 3 11 2Z",
  "M10 2C16 0 22 4 23 10c1 7-3 12-10 13C6 24 2 20 2 13 2 7 5 3 10 2Z",
  "M12 2C19 2 23 7 22 14c-1 6-6 10-12 9C4 22 1 17 3 10 4 5 7 2 12 2Z",
] as const;

function CarouselDot({ active, index }: { active: boolean; index: number }) {
  return (
    <svg aria-hidden="true" className={`h-4 w-4 ${index === 1 ? "-translate-y-px" : ""}`} viewBox="0 0 25 25">
      <path d={dotPaths[index % dotPaths.length]} fill={active ? "#111" : "#fff9e9"} stroke="#111" strokeWidth="2" />
    </svg>
  );
}

function ArrowButtonPaper() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 50 50">
      <path d="M24 3C38 2 47 12 46 26 45 40 36 47 22 46 9 45 3 36 4 23 5 10 12 4 24 3Z" fill="#7653d8" opacity=".28" transform="translate(2 3)" />
      <path d="M24 3C38 2 47 12 46 26 45 40 36 47 22 46 9 45 3 36 4 23 5 10 12 4 24 3Z" fill="#fff9e9" stroke="#111" strokeWidth="2.2" />
    </svg>
  );
}

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
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-2 pt-3 pb-[18px] scroll-smooth [scroll-padding-inline:8px] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-x-7 sm:gap-y-10 sm:overflow-visible sm:p-0 sm:[&_[data-project-slide]:nth-child(3)]:col-span-2 sm:[&_[data-project-slide]:nth-child(3)]:mx-auto sm:[&_[data-project-slide]:nth-child(3)]:w-[54%] lg:grid-cols-[1.01fr_.98fr_1.03fr] lg:items-start lg:gap-[clamp(22px,2.3vw,34px)] lg:[&_[data-project-slide]:nth-child(2)]:-translate-y-2 lg:[&_[data-project-slide]:nth-child(3)]:col-span-1 lg:[&_[data-project-slide]:nth-child(3)]:mx-0 lg:[&_[data-project-slide]:nth-child(3)]:w-auto"
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
            className="min-w-0 flex-[0_0_calc(100%_-_18px)] snap-start sm:flex-auto"
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
            className="mt-7 hidden items-center justify-center gap-[9px] sm:flex"
          >
            {Array.from({ length: slideCount }, (_, index) => (
              <CarouselDot active={index === boundedActive} index={index} key={index} />
            ))}
          </div>
          <div
            aria-label="Project carousel controls"
            className="mt-2 flex items-center justify-center gap-2.5 sm:hidden"
            role="group"
          >
            <p aria-atomic="true" aria-live="polite" className="sr-only">
              Showing project {boundedActive + 1} of {slideCount}
            </p>
            <button
              aria-label="Previous project"
              className="relative isolate grid aspect-square min-h-11 w-11 min-w-11 cursor-pointer place-items-center border-0 bg-transparent p-0 disabled:cursor-default disabled:opacity-[0.38]"
              disabled={boundedActive === 0}
              onClick={() => goTo(boundedActive - 1)}
              type="button"
            >
              <ArrowButtonPaper />
              <ArrowLeft aria-hidden="true" className="relative z-[1]" size={20} strokeWidth={2.4} />
            </button>
            <div className="flex items-center">
              {Array.from({ length: slideCount }, (_, index) => (
                <button
                  aria-current={boundedActive === index ? "true" : undefined}
                  aria-label={`Show project ${index + 1}`}
                  className="relative grid min-h-11 w-11 cursor-pointer place-items-center border-0 bg-transparent p-0 transition-transform hover:scale-110 motion-reduce:transition-none"
                  key={index}
                  onClick={() => goTo(index)}
                  type="button"
                >
                  <CarouselDot active={boundedActive === index} index={index} />
                </button>
              ))}
            </div>
            <button
              aria-label="Next project"
              className="relative isolate grid aspect-square min-h-11 w-11 min-w-11 cursor-pointer place-items-center border-0 bg-transparent p-0 disabled:cursor-default disabled:opacity-[0.38]"
              disabled={boundedActive === slideCount - 1}
              onClick={() => goTo(boundedActive + 1)}
              type="button"
            >
              <ArrowButtonPaper />
              <ArrowRight aria-hidden="true" className="relative z-[1]" size={20} strokeWidth={2.4} />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
