import React from "react";

export function ComplianceRibbon() {
  const certifications = [
    { name: "ISO 9001:2015", desc: "Quality Management Certified" },
    { name: "OEKO-TEX® Standard 100", desc: "Class 1 Tested Harm-Free" },
    { name: "BCI-Aligned Cotton", desc: "Better Cotton Initiative" },
    { name: "Sedex / SMETA Audited", desc: "Ethical Trade Audited" },
    { name: "GOTS Organic Certified", desc: "Global Organic Standard" },
  ];

  return (
    <div id="compliance" className="border-y border-[#dfd6c6] bg-white py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 md:px-8">
        <span className="font-body text-[11px] uppercase tracking-[0.24em] text-[#c49a45] font-bold">
          Mill Certifications &amp; Standards:
        </span>

        {certifications.map((cert, idx) => (
          <span key={idx} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c49a45]" aria-hidden="true" />
            <span className="font-display text-[16px] font-semibold text-[#0d2818] tracking-tight">
              {cert.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
