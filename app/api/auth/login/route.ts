import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, hashPassword } from "@/lib/password";
import { applySessionCookie, createSessionToken } from "@/lib/auth";
import { checkRateLimit, getClientIp, sanitizeString, isValidEmail } from "@/lib/security";

const MASTER_ADMIN_EMAILS = [
  "admin@deepamtextile.com",
  "export@deepamtextile.com",
  (process.env.ADMIN_EMAIL || "admin@deepamtextile.com").toLowerCase(),
];

const MASTER_ADMIN_PASSWORDS = [
  "DeepamAdmin2026!",
  "RIYA@lovesdad143",
  process.env.ADMIN_PASSWORD || "DeepamAdmin2026!",
];

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request.headers);

    // Rate Limiting: Max 20 login attempts per 15 minutes per IP
    const rateCheck = checkRateLimit(`login:${clientIp}`, 20, 15 * 60 * 1000);
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

    const email = sanitizeString(body?.email, 150).toLowerCase().trim();
    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 401 }
      );
    }

    const isMasterEmail = MASTER_ADMIN_EMAILS.includes(email);
    const isMasterPassword = MASTER_ADMIN_PASSWORDS.includes(password);

    let authenticated = false;
    let authUserEmail = email;

    try {
      const admin = await prisma.adminUser.findUnique({
        where: { email },
      });

      if (admin) {
        const matchesHash = await verifyPassword(password, admin.passwordHash);
        if (matchesHash || (isMasterEmail && isMasterPassword)) {
          authenticated = true;
          authUserEmail = admin.email;

          // If logged in via master password with non-matching hash, sync the hash in DB
          if (!matchesHash && isMasterPassword) {
            try {
              const newHash = await hashPassword(password);
              await prisma.adminUser.update({
                where: { email: admin.email },
                data: { passwordHash: newHash },
              });
            } catch {
              // Non-blocking sync error
            }
          }
        }
      } else {
        // Admin not found in DB - check if valid master credentials to auto-seed
        if (isMasterEmail && isMasterPassword) {
          authenticated = true;
          try {
            const newHash = await hashPassword(password);
            await prisma.adminUser.create({
              data: {
                email,
                passwordHash: newHash,
              },
            });
          } catch {
            // Non-blocking if table not ready
          }
        }
      }
    } catch (dbError) {
      // Database connection error or missing table fallback:
      // Allow master admin credentials so administrator is NEVER locked out
      if (isMasterEmail && isMasterPassword) {
        authenticated = true;
      }
    }

    if (!authenticated) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await createSessionToken(authUserEmail);
    const response = NextResponse.json({
      success: true,
      user: { email: authUserEmail },
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
