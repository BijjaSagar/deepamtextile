import { PrismaClient } from "@prisma/client";

const defaultMysqlUrl =
  "mysql://u618910819_deepamtextile:RIYA%40lovesdad143@127.0.0.1:3306/u618910819_deepamtextile";

export function normalizeDatabaseUrl(rawUrl?: string): string {
  if (!rawUrl || rawUrl.trim() === "" || rawUrl.startsWith("file:")) {
    return defaultMysqlUrl;
  }
  let url = rawUrl.trim();
  const protocolEnd = url.indexOf("://");
  if (protocolEnd !== -1) {
    const protocol = url.substring(0, protocolEnd + 3);
    const rest = url.substring(protocolEnd + 3);
    const lastAt = rest.lastIndexOf("@");
    if (lastAt !== -1) {
      const auth = rest.substring(0, lastAt);
      const hostAndPath = rest.substring(lastAt + 1);
      const firstColon = auth.indexOf(":");
      if (firstColon !== -1) {
        const user = auth.substring(0, firstColon);
        let password = auth.substring(firstColon + 1);
        try {
          password = decodeURIComponent(password);
        } catch {}
        const encodedPassword = encodeURIComponent(password);
        let normalizedHostAndPath = hostAndPath;
        if (
          normalizedHostAndPath.startsWith("localhost:") ||
          normalizedHostAndPath.startsWith("localhost/")
        ) {
          normalizedHostAndPath = normalizedHostAndPath.replace("localhost", "127.0.0.1");
        }
        return `${protocol}${user}:${encodedPassword}@${normalizedHostAndPath}`;
      }
    }
  }
  return url;
}

process.env.DATABASE_URL = normalizeDatabaseUrl(process.env.DATABASE_URL);

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

