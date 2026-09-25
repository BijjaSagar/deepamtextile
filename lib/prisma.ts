import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";

// Ensure data directory exists for local fallback
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch {
    // Read-only or existing environment
  }
}

const current = (process.env.DATABASE_URL ?? "").trim();

// Only apply SQLite fallback if no external MySQL/PostgreSQL connection string is provided
if (!current || (!current.startsWith("mysql://") && !current.startsWith("postgresql://") && !current.startsWith("postgres://"))) {
  if (!current.startsWith("file:/")) {
    const dbFile = path.join(dataDir, "cms.db");
    process.env.DATABASE_URL = `file:${dbFile}`;
  }
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
