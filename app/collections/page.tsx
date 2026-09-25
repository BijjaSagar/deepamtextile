import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductItem } from "@/lib/types";
import { CollectionsClient } from "./CollectionsClient";

export const metadata: Metadata = {
  title: "Export Collections & Products Catalog | Deepam Textile Solapur",
  description:
    "Explore our 12 export-grade towel and hotel linen categories: Bath Sheets, Cabana Pool Towels, Velvet Velour Bathrobes, Spa Linens, and Organic Waffle Terry calibrated for global hospitality.",
};

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  let products: ProductItem[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });

    products = dbProducts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      gsmRange: p.gsmRange,
      material: p.material,
      dimensions: p.dimensions,
      weaveType: p.weaveType,
      minOrderQty: p.minOrderQty,
      description: p.description,
      features: (() => {
        try {
          return JSON.parse(p.features);
        } catch {
          return [];
        }
      })(),
      image: p.image,
      published: p.published,
      sortOrder: p.sortOrder,
    }));
  } catch {
    products = [];
  }

  return <CollectionsClient initialProducts={products} />;
}
