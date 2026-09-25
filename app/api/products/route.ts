import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const whereClause: any = { published: true };
    if (category && category !== "all") {
      whereClause.category = category;
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({
      success: true,
      products: products.map((p) => ({
        ...p,
        features: JSON.parse(p.features || "[]"),
      })),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
