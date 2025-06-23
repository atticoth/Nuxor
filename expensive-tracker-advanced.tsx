"use client"

import { useState, useEffect } from "react"
import { AuthProvider, useAuth } from "./hooks/use-auth"
import { ThemeProvider } from "./hooks/use-theme"
import { ModernLoginForm } from "./components/auth/modern-login-form"
import { ModernSidebar } from "./components/layout/modern-sidebar"
import { ModernDashboard } from "./components/dashboard/modern-dashboard"
import { AIInsightsPanel } from "./components/dashboard/ai-insights-panel"
import { GamificationPanel } from "./components/dashboard/gamification-panel"
import { ModernClientForm } from "./components/clients/modern-client-form"
import { ClientList } from "./components/clients/client-list"
import { SmartExpenseForm } from "./components/expenses/smart-expense-form"
import { Reports } from "./components/reports/reports"
import { ThemeSwitcher } from "./components/layout/theme-switcher"
import { AchievementToast } from "./components/ui/achievement-toast"
import { useGamification } from "./hooks/use-gamification"
import type { Achievement } from "./types/advanced"

function AppContent() {
  const { user, isLoading } = useAuth()
  const { achievements } = useGamification()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)

  // Check for new achievements
  useEffect(() => {
    const unlockedAchievements = achievements.filter((a) => a.unlockedAt)
    const lastAchievement = unlockedAchievements[unlockedAchievements.length - 1]

    if (lastAchievement && !newAchievement) {
      const achievementTime = new Date(lastAchievement.unlockedAt!).getTime()
      const now = new Date().getTime()

      // Show toast for achievements unlocked in the last 5 seconds
      if (now - achievementTime < 5000) {
        setNewAchievement(lastAchievement)
      }
    }
  }, [achievements, newAchievement])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Carregando sua conta...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <ModernLoginForm />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard Inteligente
                </h1>
                <p className="text-gray-600 mt-2">Visão completa com insights de IA</p>
              </div>
              <ThemeSwitcher />
            </div>
            <ModernDashboard />
            <div className="grid gap-6 lg:grid-cols-2">
              <AIInsightsPanel />
              <GamificationPanel />
            </div>
          </div>
        )
      case "clients":
        return (
          <div className="space-y-8 p-6">
            <ModernClientForm />
            <ClientList />
          </div>
        )
      case "expenses":
        return (
          <div className="p-6">
            <SmartExpenseForm />
          </div>
        )
      case "reports":
        return (
          <div className="p-6">
            <Reports />
          </div>
        )
      default:
        return (
          <div className="space-y-8">
            <ModernDashboard />
            <div className="grid gap-6 lg:grid-cols-2">
              <AIInsightsPanel />
              <GamificationPanel />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ModernSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="lg:pl-80">
        <main className="pt-16 lg:pt-0">{renderContent()}</main>
      </div>

      {/* Achievement Toast */}
      {newAchievement && <AchievementToast achievement={newAchievement} onClose={() => setNewAchievement(null)} />}
    </div>
  )
}

export default function ExpensiveTrackerAdvanced() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}
