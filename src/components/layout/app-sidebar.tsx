import type { ComponentProps } from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { NavGroup } from "./nav-group"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { navFavorites, navMain, navSecondary } from "./nav-config"

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavGroup items={navMain} />
        <NavGroup label="Favorites" items={navFavorites} />
        <NavGroup items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
