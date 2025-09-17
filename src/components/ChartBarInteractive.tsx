import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import type { ChartConfig } from "./ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"

export type DateRange = { from: Date; to: Date }

const baseData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 178, mobile: 230 },
  { date: "2024-04-12", desktop: 178, mobile: 200 },
  { date: "2024-04-13", desktop: 470, mobile: 410 },
  { date: "2024-04-14", desktop: 103, mobile: 160 },
  { date: "2024-04-15", desktop: 439, mobile: 380 },
  { date: "2024-04-16", desktop: 88, mobile: 140 },
  { date: "2024-04-17", desktop: 294, mobile: 250 },
  { date: "2024-04-18", desktop: 323, mobile: 370 },
  { date: "2024-04-19", desktop: 385, mobile: 320 },
  { date: "2024-04-20", desktop: 438, mobile: 480 },
  { date: "2024-04-21", desktop: 155, mobile: 200 },
  { date: "2024-04-22", desktop: 92, mobile: 150 },
  { date: "2024-04-23", desktop: 492, mobile: 420 },
  { date: "2024-04-24", desktop: 81, mobile: 130 },
  { date: "2024-04-25", desktop: 426, mobile: 380 },
  { date: "2024-04-26", desktop: 307, mobile: 350 },
  { date: "2024-04-27", desktop: 371, mobile: 310 },
  { date: "2024-04-28", desktop: 475, mobile: 520 },
  { date: "2024-04-29", desktop: 107, mobile: 170 },
  { date: "2024-04-30", desktop: 341, mobile: 290 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-2)" },
  mobile: { label: "Mobile", color: "var(--chart-1)" },
} satisfies ChartConfig

export default function ChartBarInteractive({ range }: { range: DateRange }) {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("desktop")

  const data = React.useMemo(() => {
    const from = new Date(range.from)
    const to = new Date(range.to)
    return baseData.filter((d) => {
      const t = new Date(d.date).getTime()
      return t >= from.getTime() && t <= to.getTime()
    })
  }, [range])

  const total = React.useMemo(
    () => ({
      desktop: data.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: data.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    [data]
  )

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>Showing total visitors for the last 3 months</CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">{chartConfig[chart].label}</span>
                <span className="text-lg leading-none font-bold sm:text-3xl">{total[key as keyof typeof total].toLocaleString()}</span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  className="w-[150px]" 
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              } 
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


