import { Laptop, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

function getInitialTheme() {
  if (localStorage.getItem("theme") === "dark") return "dark"
  if (localStorage.getItem("theme") === "light") return "light"
  return "system"
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<"system" | "light" | "dark">(getInitialTheme())

  useEffect(() => {
    const root = document.documentElement
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldDark = mode === "dark" || (mode === "system" && prefersDark)
    root.classList.toggle("dark", shouldDark)
    localStorage.setItem("theme", mode)
  }, [mode])

  return (
    <div className="inline-flex overflow-hidden rounded-md border">
      <Button variant="outline" size="sm" className={mode === "system" ? "bg-secondary" : ""} onClick={() => setMode("system")}> <Laptop className="h-4 w-4" /> </Button>
      <Button variant="outline" size="sm" className={mode === "light" ? "bg-secondary" : ""} onClick={() => setMode("light")}> <Sun className="h-4 w-4" /> </Button>
      <Button variant="outline" size="sm" className={mode === "dark" ? "bg-secondary" : ""} onClick={() => setMode("dark")}> <Moon className="h-4 w-4" /> </Button>
    </div>
  )
}


