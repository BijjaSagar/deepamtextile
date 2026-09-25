import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const all = await getAllProducts();
    const products = category && category !== "all"
      ? all.filter((p) => p.category === category)
      : all;

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
