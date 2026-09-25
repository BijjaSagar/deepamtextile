import React from "react";

export function StatsCounter() {
  const stats = [
    { value: "40", suffix: "+", label: "Years Weaving Heritage" },
    { value: "550", suffix: " Tons", label: "Monthly Output Capacity" },
    { value: "200", suffix: "+", label: "Airjet & Rapier Looms" },
    { value: "35", suffix: "+", label: "Global Export Destinations" },
  ];

  return (
    <section className="bg-[#0d2818] py-16 md:py-20 text-[#faf8f5] border-y border-[#c49a45]/30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:gap-10 lg:grid-cols-4">
          {stats.map((item, idx) => (
            <div key={idx} className="text-center border-r last:border-none border-white/10 pr-4">
              <p className="font-display text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none font-medium text-white">
                <span className="font-body lining-nums tabular-nums">{item.value}</span>
                <span className="text-[#dfba77]">{item.suffix}</span>
              </p>
              <p className="mt-3.5 font-body text-[11px] uppercase tracking-[0.2em] text-[#dfba77] font-semibold">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
