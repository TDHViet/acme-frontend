import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function AuthThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="hover:cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border bg-transparent hover:bg-accent dark:hover:bg-gray-800 transition-colors"
      >
        {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </div>
  )
}
