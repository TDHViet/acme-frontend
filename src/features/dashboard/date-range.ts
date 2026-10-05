import { startOfDay, subDays } from "date-fns"

export type CompleteRange = { from: Date; to: Date }

export const PRESETS = [
  { value: "1d", label: "1d", days: 1 },
  { value: "3d", label: "3d", days: 3 },
  { value: "7d", label: "7d", days: 7 },
  { value: "30d", label: "30d", days: 30 },
] as const

export type Preset = (typeof PRESETS)[number]["value"] | "custom"

export function rangeForPreset(preset: Exclude<Preset, "custom">): CompleteRange {
  const today = startOfDay(new Date())
  const days = PRESETS.find((p) => p.value === preset)!.days
  return { from: subDays(today, days - 1), to: today }
}
