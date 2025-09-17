import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type DateRange = { from: Date; to: Date }

function startOfMonth(date: Date) { 
  return new Date(date.getFullYear(), date.getMonth(), 1) 
}

function addMonths(date: Date, n: number) { 
  return new Date(date.getFullYear(), date.getMonth() + n, 1) 
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isDateInRange(d: Date, r: DateRange) { 
  if (!r.from || !r.to) return false
  const time = d.getTime()
  const fromTime = new Date(r.from.getFullYear(), r.from.getMonth(), r.from.getDate()).getTime()
  const toTime = new Date(r.to.getFullYear(), r.to.getMonth(), r.to.getDate()).getTime()
  return time >= fromTime && time <= toTime
}


function MonthGrid({ 
  month, 
  range, 
  onPick, 
  onPrevMonth, 
  onNextMonth,
  isSelecting,
  hoveredDate,
  onDateHover
}: { 
  month: Date; 
  range: DateRange; 
  onPick: (d: Date) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  isSelecting?: boolean;
  hoveredDate?: Date | null;
  onDateHover?: (d: Date | null) => void;
}) {
  const first = startOfMonth(month)
  const startWeekday = first.getDay() // 0..6
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const daysInPrevMonth = new Date(month.getFullYear(), month.getMonth(), 0).getDate()
  
  const days: (Date | null)[] = []
  
  // Previous month's trailing days
  for (let i = startWeekday - 1; i >= 0; i--) {
    days.push(new Date(month.getFullYear(), month.getMonth() - 1, daysInPrevMonth - i))
  }
  
  // Current month's days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(month.getFullYear(), month.getMonth(), d))
  }
  
  // Next month's leading days to fill the grid
  const remainingCells = 42 - days.length // 6 rows * 7 days = 42 cells
  for (let d = 1; d <= remainingCells; d++) {
    days.push(new Date(month.getFullYear(), month.getMonth() + 1, d))
  }

  return (
    <div className="w-[280px]">
      {/* Month header with navigation */}
      <div className="flex items-center justify-between mb-4">
        {onPrevMonth && (
          <button 
            onClick={onPrevMonth}
            className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        )}
        <div className="text-center font-medium text-foreground">
          {month.toLocaleString("en-US", { month: "long", year: "numeric" })}
        </div>
        {onNextMonth && (
          <button 
            onClick={onNextMonth}
            className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        )}
        {!onPrevMonth && !onNextMonth && <div className="w-8" />}
      </div>
      
      {/* Days of week header */}
      <div className="grid grid-cols-7 text-center text-xs text-muted-foreground mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="h-8 flex items-center justify-center font-medium">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0">
        {days.map((d, i) => {
          if (!d) return <div key={i} className="h-8" />
          
          const isCurrentMonth = d.getMonth() === month.getMonth()
          const isStartDate = isSameDay(d, range.from)
          const isEndDate = isSameDay(d, range.to)
          const isInRange = isDateInRange(d, range) && !isStartDate && !isEndDate
          const isToday = isSameDay(d, new Date())
          
          // Determine if this is a previous/next month day
          const isOtherMonth = !isCurrentMonth
          
          // Preview range when hovering during selection
          const isInPreviewRange = isSelecting && range.from && hoveredDate && 
            !range.to && // Only show preview when we don't have an end date yet
            ((d.getTime() >= range.from.getTime() && d.getTime() <= hoveredDate.getTime()) || 
             (d.getTime() >= hoveredDate.getTime() && d.getTime() <= range.from.getTime())) &&
            !isSameDay(d, range.from) && !isSameDay(d, hoveredDate)
          
          return (
            <button
              key={i}
              onClick={() => onPick(d)}
              onMouseEnter={() => onDateHover?.(d)}
              onMouseLeave={() => onDateHover?.(null)}
              className={`
                h-8 w-8 rounded-md text-sm transition-all duration-200 font-medium relative
                ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/50'}
                ${isStartDate || isEndDate || (isSelecting && hoveredDate && isSameDay(d, hoveredDate))
                  ? 'bg-black dark:bg-white text-white dark:text-black font-semibold' 
                  : isInRange || isInPreviewRange
                    ? 'bg-gray-200 dark:bg-gray-700 text-foreground' 
                    : isOtherMonth
                      ? 'text-muted-foreground/30 hover:bg-gray-100 dark:hover:bg-gray-800'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-foreground'
                }
                ${isToday && isCurrentMonth && !isStartDate && !isEndDate && !isInRange && !isInPreviewRange
                  ? 'ring-1 ring-gray-300 dark:ring-gray-600' 
                  : ''
                }
              `}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function RangePicker({ 
  value, 
  onChange, 
  open, 
  onClose 
}: { 
  value: DateRange; 
  onChange: (r: DateRange) => void;
  open: boolean;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<DateRange>(value)
  const [leftMonth, setLeftMonth] = useState(startOfMonth(value.from))
  const [isSelecting, setIsSelecting] = useState(false)
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  // Update draft when value changes
  useEffect(() => {
    setDraft(value)
    setLeftMonth(startOfMonth(value.from))
  }, [value])

  useEffect(() => {
    function onDoc(e: MouseEvent) { 
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        // Only close if we're not in the middle of selecting
        if (!isSelecting) {
          onClose()
        }
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, onClose, isSelecting])

  function pickDay(d: Date) {
    if (!draft.from || (draft.from && draft.to)) {
      // Start new selection
      setDraft({ from: d, to: d })
      setIsSelecting(true)
    } else if (isSameDay(d, draft.from)) {
      // Clicking on the same start date, do nothing
      return
    } else if (d < draft.from) {
      // Selected date is before start date, make it the new start
      const newRange = { from: d, to: draft.from }
      setDraft(newRange)
      setIsSelecting(false)
      // Apply the range immediately
      onChange(newRange)
      onClose()
    } else {
      // Complete the range - this is the main fix
      const newRange = { from: draft.from, to: d }
      setDraft(newRange)
      setIsSelecting(false)
      // Apply the range immediately
      onChange(newRange)
      onClose()
    }
  }



  const rightMonth = addMonths(leftMonth, 1)

  if (!open) return null

  return (
    <div className="absolute z-50 mt-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-4" ref={ref}>
      <div className="flex gap-6">
        <MonthGrid 
          month={leftMonth} 
          range={draft} 
          onPick={pickDay}
          onPrevMonth={() => setLeftMonth(addMonths(leftMonth, -1))}
          isSelecting={isSelecting}
          hoveredDate={hoveredDate}
          onDateHover={setHoveredDate}
        />
        <MonthGrid 
          month={rightMonth} 
          range={draft} 
          onPick={pickDay}
          onNextMonth={() => setLeftMonth(addMonths(leftMonth, 1))}
          isSelecting={isSelecting}
          hoveredDate={hoveredDate}
          onDateHover={setHoveredDate}
        />
      </div>
    </div>
  )
}


