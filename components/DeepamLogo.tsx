import React from "react";
import Image from "next/image";

interface DeepamLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
  variant?: "horizontal" | "badge" | "emblem";
  dark?: boolean;
}

export function DeepamLogoEmblem({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative shrink-0 transition-transform duration-300 ${className}`}
    >
      <Image
        src="/images/logo-circle-only.png"
        alt="Deepam Textiles Official Brand Emblem"
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(196,154,69,0.35)]"
        priority
      />
    </div>
  );
}

export function DeepamLogo({
  className = "",
  size = 46,
  showText = true,
  textColor = "text-white",
  subtextColor = "text-[#dfba77]",
  variant = "horizontal",
  dark = true,
}: DeepamLogoProps) {
  if (variant === "badge") {
    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        <div className="relative mb-2 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={dark ? "/images/logo-dark-mode.png" : "/images/logo-transparent.png"}
            alt="Deepam Textiles - Experience The Luxury"
            width={180}
            height={180}
            className="w-auto h-auto max-h-[160px] object-contain drop-shadow-md"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 group ${className}`}>
      {/* Authentic Circular Flame & Loom Emblem */}
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <DeepamLogoEmblem size={size} />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          {/* Main Brand Title */}
          <div className="flex items-baseline gap-2">
            <span
              className={`font-display text-[22px] font-bold tracking-[0.18em] ${textColor} transition-colors`}
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              DEEPAM
            </span>
            <span className="font-body text-[9px] font-semibold text-[#c49a45] tracking-widest opacity-90">
              EST. 1998
            </span>
          </div>

          {/* Subtitle Line with Flanking Rules */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-[0.5px] w-3 bg-[#c49a45]/60" />
            <span className={`font-body text-[8.5px] uppercase tracking-[0.32em] font-semibold ${subtextColor}`}>
              TEXTILES
            </span>
            <span className="h-[0.5px] w-3 bg-[#c49a45]/60" />
          </div>

          {/* Tagline */}
          <span className="font-body text-[7px] uppercase tracking-[0.28em] text-[#dfba77]/75 mt-0.5">
            Experience The Luxury
          </span>
        </div>
      )}
    </div>
  );
}
