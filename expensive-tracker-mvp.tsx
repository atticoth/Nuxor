"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "./hooks/use-auth"
import { LoginForm } from "./components/auth/login-form"
import { Sidebar } from "./components/layout/sidebar"
import { Dashboard } from "./components/dashboard/dashboard"
import { ClientForm } from "./components/clients/client-form"
import { ClientList } from "./components/clients/client-list"
import { ExpenseForm } from "./components/expenses/expense-form"
import { Reports } from "./components/reports/reports"

function AppContent() {
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "clients":
        return (
          <div className="space-y-6">
            <ClientForm />
            <ClientList />
          </div>
        )
      case "expenses":
        return <ExpenseForm />
      case "reports":
        return <Reports />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8 pt-16 lg:pt-8">{renderContent()}</main>
      </div>
    </div>
  )
}

export default function ExpensiveTrackerMVP() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
