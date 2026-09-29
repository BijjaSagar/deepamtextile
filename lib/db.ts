import { PrismaClient } from "@prisma/client";

// Ensure DATABASE_URL is populated for Hostinger MySQL production target if unset
const defaultMysqlUrl =
  "mysql://u618910819_deepamtextile:RIYA%40lovesdad143@127.0.0.1:3306/u618910819_deepamtextile";

if (
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL.trim() === "" ||
  process.env.DATABASE_URL.startsWith("file:")
) {
  process.env.DATABASE_URL = defaultMysqlUrl;
} else if (process.env.DATABASE_URL.includes("@localhost:")) {
  // On Hostinger Linux / cPanel, Node.js resolves localhost to IPv6 (::1).
  // Connecting to 127.0.0.1 forces IPv4 loopback to MySQL.
  process.env.DATABASE_URL = process.env.DATABASE_URL.replace(
    "@localhost:",
    "@127.0.0.1:",
  );
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
