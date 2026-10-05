import { useState } from "react"
import { format, subDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { PRESETS, rangeForPreset, type CompleteRange, type Preset } from "./date-range"

function formatRange({ from, to }: CompleteRange) {
  return from.getTime() === to.getTime() ? format(from, "MMM d, yyyy") : `${format(from, "MMM d")} – ${format(to, "MMM d, yyyy")}`
}

export function DateRangeFilter({
  preset,
  range,
  onChange,
}: {
  preset: Preset
  range: CompleteRange
  onChange: (preset: Preset, range: CompleteRange) => void
}) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<DateRange | undefined>(range)

  function handleOpenChange(next: boolean) {
    if (next) setDraft(range)
    setOpen(next)
  }

  function applyDraft() {
    if (!draft?.from) return
    onChange("custom", { from: draft.from, to: draft.to ?? draft.from })
    setOpen(false)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={preset === "custom" ? "" : preset}
        onValueChange={(value) => {
          // Radix emits "" when the active item is clicked again; keep the current selection.
          if (value) onChange(value as Preset, rangeForPreset(value as Exclude<Preset, "custom">))
        }}
      >
        {PRESETS.map((p) => (
          <ToggleGroupItem key={p.value} value={p.value} className="px-3" aria-label={`Last ${p.days} days`}>
            {p.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("min-w-52 justify-start font-normal", preset === "custom" && "border-primary")}
          >
            <CalendarIcon />
            {formatRange(range)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            numberOfMonths={2}
            defaultMonth={subDays(range.to, 31)}
            selected={draft}
            onSelect={setDraft}
            disabled={{ after: new Date() }}
          />
          <div className="flex items-center justify-end gap-2 border-t p-3">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={applyDraft} disabled={!draft?.from}>
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
