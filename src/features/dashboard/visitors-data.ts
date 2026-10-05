import { format, startOfDay, subDays } from "date-fns"

export type VisitorPoint = { date: string; desktop: number; mobile: number }

// Deterministic PRNG so the mock series stays stable across renders and reloads.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// TODO: replace with a real analytics endpoint once the backend exposes one.
export function generateVisitorData(days = 180, today = startOfDay(new Date())): VisitorPoint[] {
  const random = mulberry32(42)
  return Array.from({ length: days }, (_, i) => ({
    date: format(subDays(today, days - 1 - i), "yyyy-MM-dd"),
    desktop: Math.round(80 + random() * 420),
    mobile: Math.round(100 + random() * 400),
  }))
}
