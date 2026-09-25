/**
 * Security utilities: Rate Limiting, Input Validation, and Sanitization
 * Built for Deepam Textile Production Deployment
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory rate limit store with automatic sweeping
const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (record.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Check if a request exceeds rate limit
 * @param key Unique identifier (e.g. `ip:action`)
 * @param maxRequests Maximum allowed requests in window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(
  key: string,
  maxRequests: number = 5,
  windowMs: number = 60 * 1000
): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetInSec: Math.ceil(windowMs / 1000) };
  }

  if (existing.count >= maxRequests) {
    const resetInSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return { allowed: false, remaining: 0, resetInSec };
  }

  existing.count += 1;
  const remaining = maxRequests - existing.count;
  const resetInSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  return { allowed: true, remaining, resetInSec };
}

/**
 * Extract client IP address safely from request headers
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Sanitize string to prevent XSS and strip unwanted control/HTML characters
 */
export function sanitizeString(input: unknown, maxLength: number = 255): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Strip angle brackets
    .trim()
    .slice(0, maxLength);
}

/**
 * Validate email format with strict RFC 5322 standard regex
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate phone number format (allows international country codes, spaces, dashes)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || phone.length < 5 || phone.length > 30) return false;
  const phoneRegex = /^[\d\s+\-().]{5,30}$/;
  return phoneRegex.test(phone.trim());
}
