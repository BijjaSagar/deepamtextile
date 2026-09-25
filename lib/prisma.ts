import { PrismaClient } from "@prisma/client";

// Ensure DATABASE_URL is always populated with the Hostinger MySQL production target if unset
const defaultMysqlUrl = "mysql://u618910819_deepamtextile:RIYA%40lovesdad143@localhost:3306/u618910819_deepamtextile";

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "" || process.env.DATABASE_URL.startsWith("file:")) {
  process.env.DATABASE_URL = defaultMysqlUrl;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
