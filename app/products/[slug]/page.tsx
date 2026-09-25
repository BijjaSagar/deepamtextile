import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/products-data";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Deepam Textile Solapur",
    };
  }

  return {
    title: `${product.title} (${product.gsmRange}) | Deepam Textile Export Manufacturer`,
    description: `${product.description} Export manufactured in Solapur, India. Minimum order quantity: ${product.minOrderQty}. Direct container port dispatch via JNPT Mumbai.`,
    openGraph: {
      title: `${product.title} | Deepam Textile Solapur`,
      description: product.description,
      images: [
        {
          url: product.image || "/images/products/bath-towels.jpg",
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
