"use client"

import { useState } from "react"
import { useTheme } from "@/hooks/use-theme"
import ThemedLogin from "@/components/auth/themed-login"
import ThemedSidebar from "@/components/layout/themed-sidebar"
import ThemedDashboard from "@/components/dashboard/themed-dashboard"
import ThemeToggle from "@/components/ui/theme-toggle"

export default function ExpenseTrackerThemed() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { theme } = useTheme()

  if (!isAuthenticated) {
    return (
      <div className={theme === "dark" ? "dark" : ""}>
        <div className="min-h-screen bg-background">
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <ThemedLogin onLogin={() => setIsAuthenticated(true)} />
        </div>
      </div>
    )
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-background flex">
        <ThemedSidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          onLogout={() => setIsAuthenticated(false)}
        />
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Nuxor Expense Tracker</h1>
            <ThemeToggle />
          </div>
          <main className="flex-1 p-6">
            <ThemedDashboard currentView={currentView} />
          </main>
        </div>
      </div>
    </div>
  )
}
