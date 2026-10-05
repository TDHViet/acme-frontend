import { useState } from "react"
import { Check, ChevronsUpDown, Plus, Settings, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { organizations, type Organization } from "./nav-config"

function OrgAvatar({ org }: { org: Organization }) {
  return (
    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg text-sm font-semibold">
      {org.name[0]}
    </div>
  )
}

export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const [activeOrg, setActiveOrg] = useState(organizations[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <OrgAvatar org={activeOrg} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeOrg.name}</span>
                <span className="text-muted-foreground truncate text-xs">{activeOrg.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">Organizations</DropdownMenuLabel>
            {organizations.map((org) => (
              <DropdownMenuItem key={org.id} onSelect={() => setActiveOrg(org)} className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border text-xs font-semibold">
                  {org.name[0]}
                </div>
                {org.name}
                {org.id === activeOrg.id && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User />
              Account settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Organization settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Plus />
              Add organization
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
