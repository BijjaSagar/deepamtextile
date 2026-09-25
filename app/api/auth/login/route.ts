import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { applySessionCookie, createSessionToken } from "@/lib/auth";
import { checkRateLimit, getClientIp, sanitizeString, isValidEmail } from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request.headers);

    // Rate Limiting: Max 5 login attempts per 15 minutes per IP
    const rateCheck = checkRateLimit(`login:${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. For security, please wait ${Math.ceil(rateCheck.resetInSec / 60)} minutes before trying again.`,
        },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request payload." }, { status: 400 });
    }

    const email = sanitizeString(body.email, 150).toLowerCase();
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      // Timing-safe response to prevent username enumeration
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await createSessionToken(admin.email);
    const response = NextResponse.json({
      success: true,
      user: { email: admin.email },
    });

    return applySessionCookie(response, token);
  } catch (error) {
    // Hide sensitive internal error details
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
