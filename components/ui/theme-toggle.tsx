"use client"

import { useTheme } from "../../hooks/use-theme"
import { ThemeButton } from "./theme-button"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <ThemeButton variant="outline" size="sm" onClick={toggleTheme} className="w-10 h-10 p-0">
      {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </ThemeButton>
  )
}
