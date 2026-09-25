import { NextResponse } from "next/server";
import { getAdminEmailFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const email = await getAdminEmailFromCookies();
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email },
    select: { id: true, email: true, createdAt: true },
  });

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ success: true, user: admin });
}
