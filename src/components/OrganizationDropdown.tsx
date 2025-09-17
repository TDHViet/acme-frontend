import { useState, useRef, useEffect } from "react"
import { Search, Check, MoreHorizontal, User, Settings, Plus } from "lucide-react"
import { Input } from "./ui/input"

interface Organization {
  id: string
  name: string
  initial: string
}

const organizations: Organization[] = [
  { id: "1", name: "VietHCMUT", initial: "V" },
  { id: "2", name: "Microsoft", initial: "M" },
]

export default function OrganizationDropdown({ 
  currentOrg, 
  onOrgChange,
  collapsed = false
}: { 
  currentOrg: Organization
  onOrgChange: (org: Organization) => void
  collapsed?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredOrgs = organizations.filter(org => 
    org.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center w-full p-2 rounded-md hover:bg-secondary transition-colors ${
          collapsed ? "justify-center" : "gap-2"
        }`}
      >
        <div className="h-8 w-8 rounded-md bg-foreground text-background flex items-center justify-center text-sm font-bold">
          {currentOrg.initial}
        </div>
        {!collapsed && (
          <>
            <span className="font-medium text-foreground">{currentOrg.name}</span>
            <div className="ml-auto">
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-md shadow-lg z-50">
          <div className="p-3">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="space-y-1">
              {filteredOrgs.map((org) => (
                <button
                  key={org.id}
                  onClick={() => {
                    onOrgChange(org)
                    setOpen(false)
                  }}
                  className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-secondary transition-colors"
                >
                  <div className="h-8 w-8 rounded-md bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
                    {org.initial}
                  </div>
                  <span className="flex-1 text-left text-foreground">{org.name}</span>
                  {org.id === currentOrg.id && (
                    <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="border-t border-border my-2" />

            <div className="space-y-1">
              <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-secondary transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">All organizations</span>
              </button>
            </div>

            <div className="border-t border-border my-2" />

            <div className="space-y-1">
              <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-secondary transition-colors">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">Account settings</span>
              </button>
              <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-secondary transition-colors">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">Organization settings</span>
              </button>
            </div>

            <div className="border-t border-border my-2" />

            <div className="space-y-1">
              <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-secondary transition-colors">
                <Plus className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">Add organization</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
