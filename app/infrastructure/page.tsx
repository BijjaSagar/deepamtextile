import React from "react";
import { Metadata } from "next";
import { InfrastructureClient } from "./InfrastructureClient";

export const metadata: Metadata = {
  title: "Mill Infrastructure, Electronic Looms & Quality Lab | Deepam Textile Solapur",
  description:
    "Inside Deepam Textile's 550 tons/month Solapur manufacturing plant: high-speed airjet looms, electronic jacquards, soft-flow eco dyeing, and ISO/OEKO-TEX certified quality control lab.",
};

export default function InfrastructurePage() {
  return <InfrastructureClient />;
}
