import type { ReactNode } from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
      <h1 className="text-sm font-medium">{title}</h1>
      {children && <div className="ml-auto flex items-center gap-2">{children}</div>}
    </header>
  )
}
