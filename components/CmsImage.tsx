"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { resolveCmsImage, type CacheVersion } from "@/lib/image-props";
import { cn } from "@/lib/utils";

export type CmsImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
  fallbackSrc?: string;
  cacheVersion?: CacheVersion;
  className?: string;
};

const DEFAULT_FALLBACK = "/images/placeholder.jpg";

/**
 * Universal dynamic image component with CMS cache busting and automatic error fallback.
 * Guarantees no cracked/broken image icon is ever rendered if a CMS image fails to load.
 */
export function CmsImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  cacheVersion,
  alt = "",
  className,
  onError,
  ...props
}: CmsImageProps) {
  const initial = src?.trim() ? resolveCmsImage(src.trim(), cacheVersion) : null;
  const [currentSrc, setCurrentSrc] = useState(initial?.src ?? fallbackSrc);
  const [isFallback, setIsFallback] = useState(!initial);

  useEffect(() => {
    if (src?.trim()) {
      const resolved = resolveCmsImage(src.trim(), cacheVersion);
      setCurrentSrc(resolved.src);
      setIsFallback(false);
    } else {
      setCurrentSrc(fallbackSrc);
      setIsFallback(true);
    }
  }, [src, cacheVersion, fallbackSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      className={cn("transition-opacity duration-300", className)}
      onError={(e) => {
        if (!isFallback && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          setIsFallback(true);
        }
        onError?.(e);
      }}
    />
  );
}
