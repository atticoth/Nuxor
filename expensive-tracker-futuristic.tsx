"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "./hooks/use-auth"
import { ThemeProvider } from "./hooks/use-theme"
import { FuturisticLogin } from "./components/auth/futuristic-login"
import { FuturisticSidebar } from "./components/layout/futuristic-sidebar"
import { ModernDashboard } from "./components/dashboard/modern-dashboard"
import { ModernClientForm } from "./components/clients/modern-client-form"
import { ClientList } from "./components/clients/client-list"
import { SmartExpenseForm } from "./components/expenses/smart-expense-form"
import { Reports } from "./components/reports/reports"
import { SettingsPage } from "./components/settings/settings-page"
import { FloatingActionButton } from "./components/ui/floating-action-button"
import { Plus } from "lucide-react"

function AppContent() {
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-6"></div>
          <div className="space-y-2">
            <div className="w-32 h-4 bg-purple-400/20 rounded animate-pulse mx-auto"></div>
            <div className="w-24 h-3 bg-purple-400/10 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <FuturisticLogin />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <ModernDashboard />
          </div>
        )
      case "clients":
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 space-y-8 p-6">
            <ModernClientForm />
            <ClientList />
          </div>
        )
      case "expenses":
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 p-6">
            <SmartExpenseForm />
          </div>
        )
      case "reports":
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <Reports />
          </div>
        )
      case "settings":
        return <SettingsPage />
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <ModernDashboard />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen">
      <FuturisticSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="lg:pl-80">
        <main className="pt-16 lg:pt-0">{renderContent()}</main>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => {
          if (activeTab === "clients") {
            // Scroll to client form
            window.scrollTo({ top: 0, behavior: "smooth" })
          } else if (activeTab === "expenses") {
            // Scroll to expense form
            window.scrollTo({ top: 0, behavior: "smooth" })
          } else {
            setActiveTab("expenses")
          }
        }}
        variant="primary"
      >
        <Plus className="w-6 h-6" />
      </FloatingActionButton>
    </div>
  )
}

export default function ExpensiveTrackerFuturistic() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}
