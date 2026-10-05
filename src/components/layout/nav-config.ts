import { House, MessageSquare, Settings, UserPlus, Users } from "lucide-react"
import type { ComponentType, SVGProps } from "react"
import { GoogleIcon, MicrosoftIcon } from "@/components/icons/brand-icons"

export type NavItem = {
  title: string
  url: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const organizations = [
  { id: "1", name: "VietHCMUT", plan: "Pro" },
  { id: "2", name: "Microsoft", plan: "Free" },
]

export type Organization = (typeof organizations)[number]

export const navMain: NavItem[] = [
  { title: "Home", url: "/dashboard", icon: House },
  { title: "Contacts", url: "/contacts", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
]

export const navFavorites: NavItem[] = [
  { title: "Google", url: "#", icon: GoogleIcon },
  { title: "Microsoft", url: "#", icon: MicrosoftIcon },
]

export const navSecondary: NavItem[] = [
  { title: "Invite member", url: "#", icon: UserPlus },
  { title: "Feedback", url: "#", icon: MessageSquare },
]
