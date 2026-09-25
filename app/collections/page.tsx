import React from "react";
import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-data";
import { CollectionsClient } from "./CollectionsClient";

export const metadata: Metadata = {
  title: "Export Collections & Products Catalog | Deepam Textile Solapur",
  description:
    "Explore our 12 export-grade towel and hotel linen categories: Bath Sheets, Cabana Pool Towels, Velvet Velour Bathrobes, Spa Linens, and Organic Waffle Terry calibrated for global hospitality.",
};

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const products = await getAllProducts();

  return <CollectionsClient initialProducts={products} />;
}
