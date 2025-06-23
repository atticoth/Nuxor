"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "./hooks/use-auth"
import { ExecutiveLogin } from "./components/auth/executive-login"
import { ExecutiveSidebar } from "./components/layout/executive-sidebar"
import { ExecutiveDashboard } from "./components/dashboard/executive-dashboard"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <div className="space-y-2">
            <div className="w-32 h-4 bg-blue-200 rounded animate-pulse mx-auto"></div>
            <div className="w-24 h-3 bg-blue-100 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <ExecutiveLogin />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <ExecutiveDashboard />
      case "clients":
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 space-y-8 p-6">
            <ModernClientForm />
            <ClientList />
          </div>
        )
      case "expenses":
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <SmartExpenseForm />
          </div>
        )
      case "reports":
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <Reports />
          </div>
        )
      case "settings":
        return <ExecutiveSettings />
      default:
        return <ExecutiveDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ExecutiveSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="lg:pl-80">
        <main className="pt-16 lg:pt-0">{renderContent()}</main>
      </div>
    </div>
  )
}

export default function ExpensiveTrackerExecutive() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
