import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, CreditCard, Command, Laptop, Sun, Moon, LogOut } from "lucide-react"
import { useAppDispatch } from "../pages/hooks"
import { logout } from "../store"

interface UserProfileDropdownProps {
  user: {
    name?: string
    email?: string
  }
  onThemeChange: (theme: "system" | "light" | "dark") => void
  currentTheme: "system" | "light" | "dark"
  collapsed?: boolean
}

export default function UserProfileDropdown({ user, onThemeChange, currentTheme, collapsed = false }: UserProfileDropdownProps) {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = () => {
    console.log("Sign out clicked") // Debug log
    dispatch(logout())
    setOpen(false)
    navigate("/auth/sign-in", { replace: true })
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          console.log("User dropdown clicked, current open state:", open) // Debug log
          setOpen(!open)
        }}
        className={`flex items-center w-full p-2 rounded-md hover:bg-secondary transition-colors ${
          collapsed ? "justify-center" : "gap-2"
        }`}
      >
        <div className="h-8 w-8 aspect-square rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">
          {user.name?.[0] ?? 'U'}
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium leading-tight">{user.name ?? 'User'}</div>
              <div className="text-xs text-muted-foreground">{user.email ?? 'user@example.com'}</div>
            </div>
            <div className="text-muted-foreground">⋯</div>
          </>
        )}
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-popover border border-border rounded-md shadow-lg z-50">
          <div className="p-4">
            <div className="mb-4">
              <div className="text-lg font-semibold text-foreground">{user.name ?? 'User'}</div>
              <div className="text-sm text-muted-foreground">{user.email ?? 'user@example.com'}</div>
            </div>

            <div className="space-y-1">
              <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Profile</span>
                </div>
                <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">⇧⌘P</kbd>
              </button>
              <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Billing</span>
                </div>
                <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">⇧⌘B</kbd>
              </button>
            </div>

            <div className="border-t border-border my-2" />

            <div className="space-y-1">
              <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <Command className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Command Menu</span>
                </div>
                <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
              </button>
              <div className="flex items-center justify-between w-full p-2">
                <div className="flex items-center gap-3">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Theme</span>
                </div>
                <div className="flex items-center border border-border rounded-md overflow-hidden">
                  <button
                    onClick={() => onThemeChange("system")}
                    className={`p-1.5 ${currentTheme === "system" ? "bg-secondary" : "hover:bg-secondary"}`}
                  >
                    <Laptop className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onThemeChange("light")}
                    className={`p-1.5 ${currentTheme === "light" ? "bg-secondary" : "hover:bg-secondary"}`}
                  >
                    <Sun className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onThemeChange("dark")}
                    className={`p-1.5 ${currentTheme === "dark" ? "bg-secondary" : "hover:bg-secondary"}`}
                  >
                    <Moon className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-border my-2" />

            <div className="space-y-1">
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log("Sign out button clicked") // Debug log
                  handleSignOut()
                }}
                className="flex items-center justify-between w-full p-2 rounded-md hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Sign out</span>
                </div>
                <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">⇧⌘S</kbd>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
