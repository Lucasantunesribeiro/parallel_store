const WINDOW_MS = 60_000;
const MAX_REQUESTS = 60;
const buckets = new Map<string, { count: number; expires: number }>();

export function enforceRateLimit(identifier: string) {
  const now = Date.now();
  const entry = buckets.get(identifier);
  if (!entry || entry.expires < now) {
    buckets.set(identifier, { count: 1, expires: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  return true;
}
