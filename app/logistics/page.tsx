import React from "react";
import { Metadata } from "next";
import { LogisticsClient } from "./LogisticsClient";

export const metadata: Metadata = {
  title: "Port Logistics, JNPT Mumbai Shipping & Freight Rates | Deepam Textile",
  description:
    "Direct containerized export shipping from JNPT Mumbai to Singapore, Port Klang, Jebel Ali Dubai, Dammam, Hamburg, and Rotterdam. Real-time transit times, container loadability, and CIF/FOB rates.",
};

export default function LogisticsPage() {
  return <LogisticsClient />;
}
