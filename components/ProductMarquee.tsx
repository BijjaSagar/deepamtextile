import React from "react";

export function ProductMarquee() {
  const items = [
    "Bath Towels",
    "Hand Towels",
    "Face Towels & Wash Cloths",
    "Bath Mats",
    "Hotel Linen Programs",
    "Bath Robes",
    "Kitchen Towels",
    "Beach Towels",
    "Pool Towels",
    "Spa Towels",
    "Private Label Manufacturing",
    "Promotional Towels",
  ];

  return (
    <div className="relative overflow-hidden border-y border-[#dfd6c6] bg-[#f2ece1]/60 py-4.5" aria-hidden="true">
      <div className="animate-marquee flex gap-8 whitespace-nowrap">
        {[...items, ...items, ...items].map((name, idx) => (
          <span
            key={idx}
            className="flex items-center font-body text-[11px] uppercase tracking-[0.28em] text-[#857b6c] font-medium"
          >
            {name}
            <span className="mx-8 text-[#c49a45] text-base font-bold">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
