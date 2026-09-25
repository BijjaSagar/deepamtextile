import React from "react";

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
      className={`relative shrink-0 flex items-center justify-center transition-transform duration-300 ${className}`}
    >
      {/* Pure Vector SVG Brand Emblem */}
      <img
        src="/icon.svg"
        alt="Deepam Textiles Official Brand Emblem"
        width={size}
        height={size}
        className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(196,154,69,0.35)]"
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
        <div className="relative mb-3 transition-transform duration-300 group-hover:scale-105">
          <div className={`w-20 h-20 rounded-full border border-[#c49a45]/40 p-2.5 ${dark ? "bg-[#06140b]" : "bg-white"} shadow-[0_4px_20px_rgba(196,154,69,0.25)] flex items-center justify-center`}>
            <img
              src="/icon.svg"
              alt="Deepam Textiles Official Brand Emblem"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col items-center leading-none">
          <span
            className={`font-display text-2xl font-bold tracking-[0.2em] ${dark ? "text-white" : "text-[#0d2818]"}`}
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            DEEPAM
          </span>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="h-[1px] w-4 bg-[#c49a45]" />
            <span className="font-body text-[10px] uppercase tracking-[0.32em] font-semibold text-[#c49a45]">
              TEXTILES
            </span>
            <span className="h-[1px] w-4 bg-[#c49a45]" />
          </div>
          <span className="font-body text-[8.5px] uppercase tracking-[0.24em] text-[#c49a45]/80 mt-1 font-medium">
            Experience The Luxury · EST. 1998
          </span>
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
