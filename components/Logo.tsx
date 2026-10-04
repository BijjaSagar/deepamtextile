"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveCmsImage, type CacheVersion } from "@/lib/image-props";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 410;
const LOGO_HEIGHT = 416;

type LogoProps = {
  className?: string;
  /** default: transparent logo for light surfaces; light: pearl logo for dark backgrounds */
  variant?: "default" | "light";
  priority?: boolean;
  onNavigate?: () => void;
  logoUrl?: string;
  logoLightUrl?: string;
  siteName?: string;
  /** DB updatedAt — busts cache for static `/logo.png` paths after settings save. */
  logoCacheVersion?: CacheVersion;
};

export function Logo({
  className,
  variant = "default",
  priority = false,
  onNavigate,
  logoUrl = "/images/logo-transparent.png",
  logoLightUrl = "/images/logo-dark-mode.png",
  siteName = "Deepam Textiles",
  logoCacheVersion,
}: LogoProps) {
  const defaultFallback =
    variant === "light"
      ? "/images/logo-dark-mode.png"
      : "/images/logo-transparent.png";
  const targetSrc =
    variant === "light"
      ? logoLightUrl || defaultFallback
      : logoUrl || defaultFallback;
  const resolved = resolveCmsImage(targetSrc, logoCacheVersion);
  const [currentSrc, setCurrentSrc] = useState(resolved.src);

  useEffect(() => {
    const next = resolveCmsImage(targetSrc, logoCacheVersion);
    setCurrentSrc(next.src);
  }, [targetSrc, logoCacheVersion]);

  const alt = `${siteName} — Experience the Luxury`;

  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn(
        "group inline-flex shrink-0 items-center transition-opacity hover:opacity-90",
        className,
      )}
    >
      <Image
        alt={alt}
        src={currentSrc}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        className="h-10 sm:h-12 w-auto object-contain"
        onError={() => {
          if (currentSrc !== defaultFallback) {
            setCurrentSrc(defaultFallback);
          }
        }}
      />
    </Link>
  );
}

export const logoPath = "/images/logo-transparent.png";
