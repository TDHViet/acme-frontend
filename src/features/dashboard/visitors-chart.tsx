import { useMemo, useState } from "react"
import { format, parseISO } from "date-fns"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import type { CompleteRange } from "./date-range"
import { generateVisitorData } from "./visitors-data"

const chartConfig = {
  views: { label: "Page views" },
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

type Series = "desktop" | "mobile"

const allData = generateVisitorData()

export function VisitorsChart({ range }: { range: CompleteRange }) {
  const [activeSeries, setActiveSeries] = useState<Series>("desktop")

  const data = useMemo(() => {
    const from = format(range.from, "yyyy-MM-dd")
    const to = format(range.to, "yyyy-MM-dd")
    // ISO date strings compare correctly as plain strings.
    return allData.filter((d) => d.date >= from && d.date <= to)
  }, [range])

  const totals = useMemo(
    () => ({
      desktop: data.reduce((sum, d) => sum + d.desktop, 0),
      mobile: data.reduce((sum, d) => sum + d.mobile, 0),
    }),
    [data]
  )

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Visitors</CardTitle>
          <CardDescription>
            {data.length} day{data.length === 1 ? "" : "s"} · {format(range.from, "MMM d")} – {format(range.to, "MMM d, yyyy")}
          </CardDescription>
        </div>
        <div className="flex">
          {(["desktop", "mobile"] as const).map((key) => (
            <button
              key={key}
              type="button"
              data-active={activeSeries === key}
              aria-pressed={activeSeries === key}
              className="data-[active=true]:bg-muted/50 hover:bg-muted/30 relative z-10 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left transition-colors even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
              onClick={() => setActiveSeries(key)}
            >
              <span className="text-muted-foreground text-xs">{chartConfig[key].label}</span>
              <span className="text-lg leading-none font-bold tabular-nums sm:text-3xl">
                {totals[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {data.length === 0 ? (
          <div className="text-muted-foreground flex h-[250px] items-center justify-center text-sm">
            No data for this period.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <BarChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value: string) => format(parseISO(value), "MMM d")}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => format(parseISO(String(value)), "MMM d, yyyy")}
                  />
                }
              />
              <Bar dataKey={activeSeries} fill={`var(--color-${activeSeries})`} radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
