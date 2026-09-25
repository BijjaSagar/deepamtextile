import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const content = await prisma.siteContent.findUnique({
      where: { id: "site" },
    });
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("Admin get site-content error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = await prisma.siteContent.upsert({
      where: { id: "site" },
      update: body,
      create: {
        id: "site",
        ...body,
      },
    });
    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    console.error("Admin update site-content error:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
