import Image from "next/image";
import Link from "next/link";
import { resolveCmsImage, type CacheVersion } from "@/lib/image-props";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 682;

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
  siteName = "Deepam Textile",
  logoCacheVersion,
}: LogoProps) {
  const src = variant === "light" ? logoLightUrl : logoUrl;
  const alt = `${siteName} — Luxury in Every Thread`;
  const imageProps = resolveCmsImage(src, logoCacheVersion);

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
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        {...imageProps}
        className="h-10 sm:h-12 w-auto object-contain"
      />
    </Link>
  );
}

export const logoPath = "/images/logo-transparent.png";
