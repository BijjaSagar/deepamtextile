import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "deepam_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.SESSION_SECRET || "deepam_textile_default_secure_secret_key_2026_salt";
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  const email = typeof payload.email === "string" ? payload.email : null;
  if (!email) throw new Error("Invalid session");
  return { email };
}
