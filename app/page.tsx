import { prisma } from "@/lib/prisma";
import { HomePageClient } from "./home-client";
import { ProductItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let products: ProductItem[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });

    products = dbProducts.map((p) => ({
      ...p,
      features: JSON.parse(p.features || "[]"),
    }));
  } catch (error) {
    console.error("Error loading products on page:", error);
  }

  return <HomePageClient initialProducts={products} />;
}
