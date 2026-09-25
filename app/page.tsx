import { HomePageClient } from "./home-client";
import { getAllProducts } from "@/lib/products-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getAllProducts();

  return <HomePageClient initialProducts={products} />;
}
