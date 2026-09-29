import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin";
import { getDatabaseHealth } from "@/lib/db/init-tables";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  const authHeader = request.headers.get("authorization");
  const secretKey = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD;

  const isBearerAuth =
    secretKey && authHeader?.replace("Bearer ", "").trim() === secretKey;

  if (!session && !isBearerAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const health = await getDatabaseHealth();
  return NextResponse.json(health);
}
