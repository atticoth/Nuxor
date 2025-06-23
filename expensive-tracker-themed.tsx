"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "./hooks/use-auth"
import { ThemeProvider } from "./hooks/use-theme"
import { ThemedLogin } from "./components/auth/themed-login"
import { ThemedSidebar } from "./components/layout/themed-sidebar"
import { ThemedDashboard } from "./components/dashboard/themed-dashboard"
import { ModernClientForm } from "./components/clients/modern-client-form"
import { ClientList } from "./components/clients/client-list"
import { SmartExpenseForm } from "./components/expenses/smart-expense-form"
import { Reports } from "./components/reports/reports"
import { ExecutiveSettings } from "./components/settings/executive-settings"

function AppContent() {
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-200 dark:border-slate-600 border-t-cyan-600 dark:border-t-cyan-400 rounded-full animate-spin mx-auto mb-6"></div>
          <div className="space-y-2">
            <div className="w-32 h-4 bg-cyan-200 dark:bg-slate-700 rounded animate-pulse mx-auto"></div>
            <div className="w-24 h-3 bg-cyan-100 dark:bg-slate-800 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <ThemedLogin />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <ThemedDashboard />
      case "clients":
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 space-y-8 p-6 transition-colors duration-300">
            <ModernClientForm />
            <ClientList />
          </div>
        )
      case "expenses":
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 p-6 transition-colors duration-300">
            <SmartExpenseForm />
          </div>
        )
      case "reports":
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 p-6 transition-colors duration-300">
            <Reports />
          </div>
        )
      case "settings":
        return <ExecutiveSettings />
      default:
        return <ThemedDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <ThemedSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="lg:pl-80">
        <main className="pt-16 lg:pt-0">{renderContent()}</main>
      </div>
    </div>
  )
}

export default function ExpensiveTrackerThemed() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}
