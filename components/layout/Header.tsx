"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { navigation } from "@/data/navigation";
import { BrandLockup } from "./BrandLockup";
import { MobileMenu } from "./MobileMenu";
import { useInquiryModal } from "@/components/context/InquiryContext";

function NavbarPaper() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <defs>
        <pattern height="9" id="navbar-grain" patternUnits="userSpaceOnUse" width="11">
          <circle cx="2" cy="2.5" fill="#111" opacity="0.08" r="0.12" />
          <circle cx="8.4" cy="6.3" fill="#a85565" opacity="0.13" r="0.14" />
        </pattern>
      </defs>
      <path d="M2.2 5C22 1.8 40 4 60.5 2.6 77 1.4 91 2.2 97.4 5.5c1.1 20.5.5 48.5 1 73.2.2 10.5-1.3 15-5.6 16.3-23.2 2.4-48.6-.6-73.8 1.2-9.8.7-15.3-.2-17.4-3.3C.3 68 1.6 35.5 1.1 12.8.9 8.8 1.2 6.2 2.2 5Z" fill="#7653d8" transform="translate(.45 3.8)" />
      <path d="M2.2 5C22 1.8 40 4 60.5 2.6 77 1.4 91 2.2 97.4 5.5c1.1 20.5.5 48.5 1 73.2.2 10.5-1.3 15-5.6 16.3-23.2 2.4-48.6-.6-73.8 1.2-9.8.7-15.3-.2-17.4-3.3C.3 68 1.6 35.5 1.1 12.8.9 8.8 1.2 6.2 2.2 5Z" fill="#f7c3c5" stroke="#111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      <path d="M2.2 5C22 1.8 40 4 60.5 2.6 77 1.4 91 2.2 97.4 5.5c1.1 20.5.5 48.5 1 73.2.2 10.5-1.3 15-5.6 16.3-23.2 2.4-48.6-.6-73.8 1.2-9.8.7-15.3-.2-17.4-3.3C.3 68 1.6 35.5 1.1 12.8.9 8.8 1.2 6.2 2.2 5Z" fill="url(#navbar-grain)" />
    </svg>
  );
}

function TalkSticker() {
  const { openInquiry } = useInquiryModal();

  return (
    <button
      className="group relative isolate flex min-h-12 items-center gap-2 px-6 py-3 font-hand text-lg font-bold text-[#17172A] transition-transform hover:-translate-y-0.5 cursor-pointer bg-transparent border-0"
      onClick={() => openInquiry()}
      type="button"
    >
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <pattern height="10" id="talk-grain" patternUnits="userSpaceOnUse" width="12">
            <circle cx="3" cy="4" fill="#111" opacity="0.08" r="0.16" />
          </pattern>
        </defs>
        <path d="M6 5C29 2 71 5 94 3c3 20 .5 59 2 88-23 5-65 1-91 4C1 73 4 29 6 5Z" fill="#7653d8" transform="translate(2.7 7)" />
        <path d="M6 5C29 2 71 5 94 3c3 20 .5 59 2 88-23 5-65 1-91 4C1 73 4 29 6 5Z" fill="#fff9e9" stroke="#111" strokeLinejoin="round" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
        <path d="M6 5C29 2 71 5 94 3c3 20 .5 59 2 88-23 5-65 1-91 4C1 73 4 29 6 5Z" fill="url(#talk-grain)" />
      </svg>
      LET&apos;S TALK
      <MessageCircle aria-hidden="true" className="fill-[#bda5ef] transition-transform group-hover:rotate-[-8deg]" size={19} strokeWidth={2.5} />
    </button>
  );
}

const linkSpacing = ["-translate-y-px", "translate-y-[1px] ml-1", "-translate-y-[2px]", "translate-y-px ml-0.5", "-translate-y-px", "translate-y-[2px]"] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream/95 px-3 pt-2 pb-1 max-[850px]:px-2 max-[850px]:pt-1">
      <div className="relative isolate mx-auto grid min-h-[var(--header-height)] w-full max-w-[1480px] grid-cols-[1fr_auto_1fr] items-center gap-7 px-8 max-[1024px]:grid-cols-[auto_1fr_auto] max-[850px]:flex max-[850px]:justify-between max-[850px]:px-5">
        <NavbarPaper />
        <div className="relative z-[1] -rotate-[0.35deg]"><BrandLockup compact /></div>
        <nav
          aria-label="Primary navigation"
          className="relative z-[1] flex items-center gap-[clamp(18px,2.45vw,42px)] font-hand text-[1.08rem] font-bold max-[1024px]:gap-[17px] max-[850px]:hidden"
        >
          {navigation.map((link, index) => (
            <a
              aria-current={link.href === "#home" ? "page" : undefined}
              className={`relative px-px py-2 ${linkSpacing[index]}`}
              href={link.href}
              key={link.href}
            >
              {link.label}
              {link.href === "#home" ? (
                <svg aria-hidden="true" className="absolute right-[-5px] bottom-0 left-[-4px] h-2 w-[calc(100%+9px)]" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <path d="M3 5C24 8 54 2 97 5M12 8c29 1 50-3 79-1" fill="none" stroke="#111" strokeLinecap="round" strokeWidth="2.2" />
                </svg>
              ) : null}
            </a>
          ))}
        </nav>
        <div className="relative z-[1] justify-self-end rotate-[0.45deg] max-[1024px]:hidden"><TalkSticker /></div>
        <div className="z-[1]"><MobileMenu links={navigation} /></div>
      </div>
    </header>
  );
}
