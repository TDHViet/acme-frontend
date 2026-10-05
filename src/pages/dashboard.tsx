import { useState } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { ContactsCard, type ContactStat } from "@/features/dashboard/contacts-card"
import { rangeForPreset, type Preset } from "@/features/dashboard/date-range"
import { DateRangeFilter } from "@/features/dashboard/date-range-filter"
import { VisitorsChart } from "@/features/dashboard/visitors-chart"

// TODO: load from the backend once a contacts API exists.
const contacts: ContactStat[] = [
  { name: "PayPal", visits: 0 },
  { name: "Victoria Ballard", visits: 0 },
  { name: "Netflix", visits: 0 },
]

export default function DashboardPage() {
  const [filter, setFilter] = useState(() => ({ preset: "30d" as Preset, range: rangeForPreset("30d") }))

  return (
    <>
      <SiteHeader title="Overview" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
        <DateRangeFilter
          preset={filter.preset}
          range={filter.range}
          onChange={(preset, range) => setFilter({ preset, range })}
        />
        <VisitorsChart range={filter.range} />
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <ContactsCard title="Most visited contacts" description="Top contacts in this period" contacts={contacts} />
          <ContactsCard title="Least visited contacts" description="Contacts that need attention" contacts={contacts} />
        </div>
      </div>
    </>
  )
}
