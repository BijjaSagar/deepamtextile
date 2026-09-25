"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/917066148936?text=" +
    encodeURIComponent(
      "Hello Deepam Textile Export Desk, I am inquiring about export of luxury terry towels & hospitality linen for [South East Asia / Middle East / Europe]."
    );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct WhatsApp Contact with Deepam Textile Export Desk"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0d2818] text-[#dfba77] border-2 border-[#c49a45] shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#163824] focus:outline-none focus:ring-2 focus:ring-[#c49a45] group"
    >
      <MessageCircle className="h-7 w-7 text-[#dfba77] group-hover:text-white transition-colors" />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}
