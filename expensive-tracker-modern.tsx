"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "./hooks/use-auth"
import { ModernLoginForm } from "./components/auth/modern-login-form"
import { ModernSidebar } from "./components/layout/modern-sidebar"
import { ModernDashboard } from "./components/dashboard/modern-dashboard"
import { ModernClientForm } from "./components/clients/modern-client-form"
import { ClientList } from "./components/clients/client-list"
import { ExpenseForm } from "./components/expenses/expense-form"
import { Reports } from "./components/reports/reports"

function AppContent() {
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

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
        return <ModernDashboard />
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
            <ExpenseForm />
          </div>
        )
      case "reports":
        return (
          <div className="p-6">
            <Reports />
          </div>
        )
      default:
        return <ModernDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ModernSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="lg:pl-80">
        <main className="pt-16 lg:pt-0">{renderContent()}</main>
      </div>
    </div>
  )
}

export default function ExpensiveTrackerModern() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
