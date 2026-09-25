import React from "react";
import { Metadata } from "next";
import { RfqClient } from "./RfqClient";

export const metadata: Metadata = {
  title: "Request Export Quote & Swatch Box | Deepam Textile Solapur",
  description:
    "Request factory-direct FOB/CIF pricing, customized institutional towel samples, and rapid courier swatch boxes from Deepam Textile Solapur MIDC manufacturing unit.",
};

export default function RfqPage() {
  return <RfqClient />;
}
