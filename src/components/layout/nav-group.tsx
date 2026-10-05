import { Link, useLocation } from "react-router-dom"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { NavItem } from "./nav-config"

export function NavGroup({ label, items, className }: { label?: string; items: NavItem[]; className?: string }) {
  const { pathname } = useLocation()

  return (
    <SidebarGroup className={className}>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
              {item.url.startsWith("/") ? (
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              ) : (
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
