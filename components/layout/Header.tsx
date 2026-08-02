import { MessageCircle } from "lucide-react";

import { RoughButton } from "@/components/ui/RoughButton";
import { contactLinks } from "@/config/site";
import { navigation } from "@/data/navigation";

import { BrandLockup } from "./BrandLockup";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-[2.5px] border-ink bg-soft-pink">
      <div className="relative mx-auto grid min-h-[var(--header-height)] w-[calc(100%_-_36px)] max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center gap-7 max-[1024px]:grid-cols-[auto_1fr_auto] max-[850px]:flex max-[850px]:w-[calc(100%_-_24px)] max-[850px]:justify-between">
        <BrandLockup compact />
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-[clamp(20px,2.4vw,38px)] font-hand text-[1.05rem] font-bold max-[1024px]:gap-[17px] max-[850px]:hidden"
        >
          {navigation.map((link) => (
            <a
              aria-current={link.href === "#home" ? "page" : undefined}
              className={`relative px-px py-2 ${
                link.href === "#home"
                  ? "after:absolute after:right-[-4px] after:bottom-0.5 after:left-[-3px] after:h-[3px] after:rounded-[42%_58%_47%_53%] after:bg-ink after:content-[''] after:[transform:rotate(-1.2deg)]"
                  : ""
              }`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="justify-self-end max-[1024px]:hidden">
          <RoughButton
            borderSeed="button-lets-talk"
            href={contactLinks.talk}
            variant="paper"
          >
            LET&apos;S TALK
            <MessageCircle aria-hidden="true" size={17} strokeWidth={2.5} />
          </RoughButton>
        </div>
        <MobileMenu links={navigation} />
      </div>
    </header>
  );
}
