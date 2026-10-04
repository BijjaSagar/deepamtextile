"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { resolveCmsImage, type CacheVersion } from "@/lib/image-props";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "header" | "footer";
  className?: string;
  onNavigate?: () => void;
  logoUrl?: string;
  siteName?: string;
  logoCacheVersion?: CacheVersion;
};

const DEFAULT_EMBLEM = "/images/logo-circle-only.png";

export function BrandLogo({
  variant = "header",
  className,
  onNavigate,
  logoUrl = DEFAULT_EMBLEM,
  siteName = "Deepam Textiles",
  logoCacheVersion,
}: BrandLogoProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isFooter = variant === "footer";

  const resolved = resolveCmsImage(logoUrl || DEFAULT_EMBLEM, logoCacheVersion);
  const [currentLogoSrc, setCurrentLogoSrc] = useState(resolved.src);

  useEffect(() => {
    const res = resolveCmsImage(logoUrl || DEFAULT_EMBLEM, logoCacheVersion);
    setCurrentLogoSrc(res.src);
  }, [logoUrl, logoCacheVersion]);

  // Dynamically derive brand name parts from CMS siteName
  const words = (siteName || "Deepam Textiles").trim().split(/\s+/);
  const brandPrimary = (words[0] || "DEEPAM").toUpperCase();
  const brandSecondary = (words.slice(1).join(" ") || "TEXTILES").toUpperCase();

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
      aria-label={`${siteName} — Home`}
    >
      <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0">
        <Image
          src={currentLogoSrc}
          alt={`${siteName} Emblem`}
          fill
          sizes="40px"
          className="object-contain"
          onError={() => {
            if (currentLogoSrc !== DEFAULT_EMBLEM) {
              setCurrentLogoSrc(DEFAULT_EMBLEM);
            }
          }}
        />
      </div>
      <div className="flex flex-col items-start leading-none">
        <span
          className={cn(
            "mh font-display text-[22px] sm:text-[24px] font-semibold tracking-wide",
            isFooter ? "text-pearl" : "text-taupe",
          )}
        >
          {brandPrimary}
        </span>
        <div className="lv mt-1 flex items-center gap-1.5 font-body text-[8.5px] uppercase tracking-[0.3em]">
          <span className="h-px w-2.5 bg-sage-deep" aria-hidden="true" />
          <span
            className={cn(
              "font-medium",
              isFooter ? "text-pearl/80" : "text-taupe/80",
            )}
          >
            {brandSecondary}
          </span>
          <span className="h-px w-2.5 bg-sage-deep" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
