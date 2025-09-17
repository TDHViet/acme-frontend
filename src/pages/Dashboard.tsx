import { useEffect, useState, useRef } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import { fetchMe } from "../store"
import { Home, Users, Settings, ChevronRight, MessageSquare, Plus, PanelLeft, Info, Calendar, User } from "lucide-react"
import ChartBarInteractive from "../components/ChartBarInteractive"
import RangePicker from "../components/RangePicker"
import OrganizationDropdown from "../components/OrganizationDropdown"
import UserProfileDropdown from "../components/UserProfileDropdown"
import { GoogleIcon } from "../components/icons/GoogleIcon"
import { MicrosoftIcon } from "../components/icons/MicrosoftIcon"
import type { DateRange as RPRange } from "../components/RangePicker"


export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((s) => s.auth)
  useEffect(() => { dispatch(fetchMe()) }, [dispatch])
  const today = new Date()
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(today.getDate() - 30)
  const [range, setRange] = useState<RPRange>({ from: thirtyDaysAgo, to: today })
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== "undefined" && window.innerWidth < 768)
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const w = window.innerWidth
      if (w < 768) return true // phone: hidden/drawer, treat as collapsed in grid
      if (w >= 768 && w < 1024) return true // tablet: icon rail
      // laptop/desktop: expanded
      const saved = localStorage.getItem("sidebar_collapsed")
      return saved === "1" ? true : false
    }
    return false
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentOrg, setCurrentOrg] = useState({ id: "1", name: "VietHCMUT", initial: "V" })
  const [currentTheme, setCurrentTheme] = useState<"system" | "light" | "dark">(() => 
    (localStorage.getItem("theme") as "system" | "light" | "dark") || "system"
  )
  const [selectedPreset, setSelectedPreset] = useState<"1d" | "3d" | "7d" | "30d" | "custom">("custom")
  const [showCustomPicker, setShowCustomPicker] = useState(false)
  const customPickerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  
  function toggleSidebar() {
    if (isMobile) {
      setMobileOpen((v) => !v)
      return
    }
    setCollapsed((v) => {
      const next = !v
      localStorage.setItem("sidebar_collapsed", next ? "1" : "0")
      return next
    })
  }

  function handleThemeChange(theme: "system" | "light" | "dark") {
    setCurrentTheme(theme)
    localStorage.setItem("theme", theme)
    const root = document.documentElement
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldDark = theme === "dark" || (theme === "system" && prefersDark)
    root.classList.toggle("dark", shouldDark)
  }

  function updateIndicator(preset: "1d" | "3d" | "7d" | "30d" | "custom") {
    if (!navRef.current) return
    
    const buttons = navRef.current.querySelectorAll('button')
    const presetIndex = preset === "1d" ? 0 : preset === "3d" ? 1 : preset === "7d" ? 2 : preset === "30d" ? 3 : preset === "custom" ? 4 : 0
    const activeButton = buttons[presetIndex]
    
    if (activeButton) {
      const rect = activeButton.getBoundingClientRect()
      const navRect = navRef.current.getBoundingClientRect()
      setIndicatorStyle({
        width: rect.width,
        left: rect.left - navRect.left
      })
    }
  }

  function handlePresetChange(preset: "1d" | "3d" | "7d" | "30d" | "custom") {
    setSelectedPreset(preset)
    setShowCustomPicker(false)
    updateIndicator(preset)
    if (preset !== "custom") {
      const days = parseInt(preset)
      const from = new Date(today)
      from.setDate(today.getDate() - days)
      setRange({ from, to: today })
    }
  }

  function formatDateRange(range: RPRange) {
    const formatDate = (date: Date) => date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    return `${formatDate(range.from)} - ${formatDate(range.to)}`
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (customPickerRef.current && !customPickerRef.current.contains(event.target as Node)) {
        setShowCustomPicker(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    // Initialize indicator position
    updateIndicator(selectedPreset)
    
    // Update indicator on window resize
    const handleResize = () => {
      updateIndicator(selectedPreset)
      const w = window.innerWidth
      const nextIsMobile = w < 768
      const nextIsTablet = w >= 768 && w < 1024
      setIsMobile(nextIsMobile)
      if (nextIsMobile) {
        setCollapsed(true)
        setMobileOpen(false)
      } else if (nextIsTablet) {
        setCollapsed(true)
        setMobileOpen(false)
      } else {
        // Laptop/Desktop
        const saved = localStorage.getItem("sidebar_collapsed") === "1"
        setCollapsed(saved)
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [selectedPreset])

  return (
    <div className={`min-h-screen grid ${isMobile ? "grid-cols-1" : collapsed ? "grid-cols-[72px_1fr]" : "grid-cols-[260px_1fr]"}`}>
      {/* Sidebar for md+ (static) */}
      <aside className="border-r p-3 hidden md:block">
        <OrganizationDropdown currentOrg={currentOrg} onOrgChange={setCurrentOrg} collapsed={collapsed} />
        <nav className="space-y-6 mt-2">
          <div>
            <ul className="space-y-1">
              <li><a className={`flex items-center ${collapsed ? "justify-center" : "gap-2"} rounded-md px-2 py-2 bg-secondary`} href="#"><Home className="h-4 w-4"/>{!collapsed && " Home"}</a></li>
              <li><a className={`flex items-center ${collapsed ? "justify-center" : "gap-2"} rounded-md px-2 py-2 hover:bg-secondary`} href="#"><Users className="h-4 w-4"/>{!collapsed && " Contacts"}</a></li>
              <li><a className={`flex items-center ${collapsed ? "justify-center" : "gap-2"} rounded-md px-2 py-2 hover:bg-secondary`} href="#"><Settings className="h-4 w-4"/>{!collapsed && " Settings"}</a></li>
            </ul>
          </div>
          <div>
            {!collapsed && <div className="px-2 text-xs text-muted-foreground mb-2">Favorites</div>}
            <ul className="space-y-1">
              <li><a className={`flex items-center ${collapsed ? "justify-center" : "gap-2"} rounded-md px-2 py-2 hover:bg-secondary`} href="#"><GoogleIcon size={16}/>{!collapsed && " Google"}</a></li>
              <li><a className={`flex items-center ${collapsed ? "justify-center" : "gap-2"} rounded-md px-2 py-2 hover:bg-secondary`} href="#"><MicrosoftIcon size={16}/>{!collapsed && " Microsoft"}</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-1">
              <li><a className={`flex items-center ${collapsed ? "justify-center" : "gap-2"} rounded-md px-2 py-2 hover:bg-secondary`} href="#"><Plus className="h-4 w-4"/>{!collapsed && " Invite member"}</a></li>
              <li><a className={`flex items-center ${collapsed ? "justify-center" : "gap-2"} rounded-md px-2 py-2 hover:bg-secondary`} href="#"><MessageSquare className="h-4 w-4"/>{!collapsed && " Feedback"}</a></li>
            </ul>
          </div>
        </nav>
        <div className="mt-10 border-t pt-3 px-2">
          <UserProfileDropdown 
            user={user || { name: "User", email: "user@example.com" }} 
            onThemeChange={handleThemeChange}
            currentTheme={currentTheme}
            collapsed={collapsed}
          />
        </div>
      </aside>
      {/* Mobile drawer sidebar */}
      {isMobile && mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-[260px] bg-background border-r p-3 z-50">
            <OrganizationDropdown currentOrg={currentOrg} onOrgChange={setCurrentOrg} collapsed={false} />
            <nav className="space-y-6 mt-2">
              <div>
                <ul className="space-y-1">
                  <li><a className={`flex items-center gap-2 rounded-md px-2 py-2 bg-secondary`} href="#"><Home className="h-4 w-4"/>{" Home"}</a></li>
                  <li><a className={`flex items-center gap-2 rounded-md px-2 py-2 hover:bg-secondary`} href="#"><Users className="h-4 w-4"/>{" Contacts"}</a></li>
                  <li><a className={`flex items-center gap-2 rounded-md px-2 py-2 hover:bg-secondary`} href="#"><Settings className="h-4 w-4"/>{" Settings"}</a></li>
                </ul>
              </div>
              <div>
                <div className="px-2 text-xs text-muted-foreground mb-2">Favorites</div>
                <ul className="space-y-1">
                  <li><a className={`flex items-center gap-2 rounded-md px-2 py-2 hover:bg-secondary`} href="#"><GoogleIcon size={16}/>{" Google"}</a></li>
                  <li><a className={`flex items-center gap-2 rounded-md px-2 py-2 hover:bg-secondary`} href="#"><MicrosoftIcon size={16}/>{" Microsoft"}</a></li>
                </ul>
              </div>
              <div>
                <ul className="space-y-1">
                  <li><a className={`flex items-center gap-2 rounded-md px-2 py-2 hover:bg-secondary`} href="#"><Plus className="h-4 w-4"/>{" Invite member"}</a></li>
                  <li><a className={`flex items-center gap-2 rounded-md px-2 py-2 hover:bg-secondary`} href="#"><MessageSquare className="h-4 w-4"/>{" Feedback"}</a></li>
                </ul>
              </div>
            </nav>
            <div className="mt-10 border-t pt-3 px-2">
              <UserProfileDropdown 
                user={user || { name: "User", email: "user@example.com" }} 
                onThemeChange={handleThemeChange}
                currentTheme={currentTheme}
                collapsed={false}
              />
            </div>
          </div>
        </>
      )}
      {/* Main */}
      <div className="grid grid-rows-[auto_auto_1fr]">
        <header className="border-b px-4 md:px-6 py-3 flex items-center gap-3">
          <button 
            aria-expanded={!collapsed} 
            onClick={toggleSidebar} 
            className="group h-8 w-8 grid place-items-center rounded-md border border-border hover:bg-secondary transition-colors"
          >
            <PanelLeft className="h-4 w-4 text-muted-foreground group-hover:hidden" />
            <ChevronRight className={`h-4 w-4 text-muted-foreground hidden group-hover:block transition-transform ${!collapsed ? "rotate-180" : ""}`} />
          </button>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Overview</span>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
        </header>
        <div className="px-4 md:px-6 py-3 border-b">
          <div className="flex items-center gap-6">
            <div className="relative flex items-center gap-6 text-sm" ref={navRef}>
              <button 
                onClick={() => handlePresetChange("1d")}
                className={`pb-2 transition-colors ${
                  selectedPreset === "1d" 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                1d
              </button>
              <button 
                onClick={() => handlePresetChange("3d")}
                className={`pb-2 transition-colors ${
                  selectedPreset === "3d" 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                3d
              </button>
              <button 
                onClick={() => handlePresetChange("7d")}
                className={`pb-2 transition-colors ${
                  selectedPreset === "7d" 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                7d
              </button>
              <button 
                onClick={() => handlePresetChange("30d")}
                className={`pb-2 transition-colors ${
                  selectedPreset === "30d" 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                30d
              </button>
              <button 
                onClick={() => handlePresetChange("custom")}
                className={`pb-2 transition-colors ${
                  selectedPreset === "custom" 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Custom
              </button>
              
              {/* Sliding underline indicator */}
              <div 
                className="absolute bottom-0 h-1 bg-foreground transition-all duration-300 ease-in-out"
                style={{
                  width: `${indicatorStyle.width}px`,
                  left: `${indicatorStyle.left}px`
                }}
              />
            </div>
            {/* Date range button positioned right after presets */}
            <div className="relative" ref={customPickerRef}>
              <button 
                onClick={() => setShowCustomPicker(!showCustomPicker)}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-md bg-background hover:bg-secondary transition-colors min-w-[200px] text-left"
              >
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{formatDateRange(range)}</span>
              </button>
              {showCustomPicker && (
                <RangePicker 
                  value={range} 
                  open={showCustomPicker}
                  onClose={() => setShowCustomPicker(false)}
                  onChange={(newRange) => {
                    setRange(newRange)
                  }} 
                />
              )}
            </div>
          </div>
        </div>
        <main className="p-4 md:p-6 overflow-auto">
          <ChartBarInteractive range={range} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="rounded-md border bg-card text-card-foreground shadow-sm p-4">
              <div className="font-medium mb-2">Most visited contacts</div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between"><span className="flex items-center gap-2"><User className="h-4 w-4"/> PayPal</span><span>0</span></li>
                <li className="flex items-center justify-between"><span className="flex items-center gap-2"><User className="h-4 w-4"/> Victoria Ballard</span><span>0</span></li>
                <li className="flex items-center justify-between"><span className="flex items-center gap-2"><User className="h-4 w-4"/> Netflix</span><span>0</span></li>
              </ul>
            </div>
            <div className="rounded-md border bg-card text-card-foreground shadow-sm p-4">
              <div className="font-medium mb-2">Least visited contacts</div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between"><span className="flex items-center gap-2"><User className="h-4 w-4"/> PayPal</span><span>0</span></li>
                <li className="flex items-center justify-between"><span className="flex items-center gap-2"><User className="h-4 w-4"/> Victoria Ballard</span><span>0</span></li>
                <li className="flex items-center justify-between"><span className="flex items-center gap-2"><User className="h-4 w-4"/> Netflix</span><span>0</span></li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


