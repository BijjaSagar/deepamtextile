"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "header" | "footer";
  className?: string;
  onNavigate?: () => void;
};

export function BrandLogo({
  variant = "header",
  className,
  onNavigate,
}: BrandLogoProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isFooter = variant === "footer";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href="/"
      onClick={onNavigate}
      className={cn(
        "logo rv inline-flex items-center gap-3 transition-opacity hover:opacity-90",
        revealed && "in",
        className,
      )}
      aria-label="Deepam Textiles — Home"
    >
      <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0">
        <Image
          src="/images/logo-circle-only.png"
          alt="Deepam Textiles Emblem"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-start leading-none">
        <span
          className={cn(
            "mh font-display text-[22px] sm:text-[24px] font-semibold tracking-wide",
            isFooter ? "text-pearl" : "text-taupe",
          )}
        >
          DEEPAM
        </span>
        <div className="lv mt-1 flex items-center gap-1.5 font-body text-[8.5px] uppercase tracking-[0.3em]">
          <span className="h-px w-2.5 bg-[#c2a156]" aria-hidden="true" />
          <span
            className={cn(
              "font-medium",
              isFooter ? "text-pearl/80" : "text-taupe/80",
            )}
          >
            TEXTILES
          </span>
          <span className="h-px w-2.5 bg-[#c2a156]" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
