import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { toast } from "sonner"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { fetchMe } from "@/store/auth-slice"
import { useAppDispatch } from "@/store"
import { AppSidebar } from "./app-sidebar"

// shadcn's SidebarProvider persists its open state in this cookie.
const sidebarDefaultOpen = !document.cookie.includes("sidebar_state=false")

export default function DashboardLayout() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const request = dispatch(fetchMe())
    request.unwrap().catch((e: { message: string; unauthorized: boolean } | { name: string }) => {
      if ("unauthorized" in e && !e.unauthorized) toast.error(e.message)
    })
    return () => request.abort()
  }, [dispatch])

  return (
    <SidebarProvider defaultOpen={sidebarDefaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
