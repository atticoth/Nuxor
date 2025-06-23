"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "../../hooks/use-theme"
import { Palette, Sun, Moon, Briefcase } from "lucide-react"

export function ThemeSwitcher() {
  const { themeName, setTheme, toggleTheme } = useTheme()

  const themes = [
    { name: "light", label: "Claro", icon: Sun },
    { name: "dark", label: "Escuro", icon: Moon },
    { name: "business", label: "Empresarial", icon: Briefcase },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Palette className="w-4 h-4 mr-2" />
          Tema
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => {
          const Icon = theme.icon
          return (
            <DropdownMenuItem
              key={theme.name}
              onClick={() => setTheme(theme.name)}
              className={themeName === theme.name ? "bg-blue-50" : ""}
            >
              <Icon className="w-4 h-4 mr-2" />
              {theme.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
