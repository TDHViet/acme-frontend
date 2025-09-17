import type { ReactNode } from "react"
import { cn } from "../../lib/utils"

export type ChartConfig = Record<string, { label: string; color?: string }>

export function ChartContainer({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("w-full", className)}>{children}</div>
}

export function ChartTooltip({ content }: { content: ReactNode }) {
  return <>{content}</>
}

export function ChartTooltipContent({ className }: { className?: string }) {
  return <div className={cn(className)} />
}


