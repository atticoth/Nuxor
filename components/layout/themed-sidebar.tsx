"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeCard } from "../ui/theme-card"
import { ThemeButton } from "../ui/theme-button"
import { ThemeToggle } from "../ui/theme-toggle"
import { useAuth } from "../../hooks/use-auth"
import { useData } from "../../hooks/use-data"
import {
  LayoutDashboard,
  Users,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  Bell,
  ChevronRight,
} from "lucide-react"

interface ThemedSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function ThemedSidebar({ activeTab, onTabChange }: ThemedSidebarProps) {
  const { user, logout } = useAuth()
  const { getDashboardData } = useData()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const dashboardData = getDashboardData()

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "clients",
      label: "Clientes",
      icon: Users,
      badge: dashboardData.overduePayments > 0 ? dashboardData.overduePayments : null,
    },
    {
      id: "expenses",
      label: "Despesas",
      icon: Receipt,
      badge: null,
    },
    {
      id: "reports",
      label: "Relatórios",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "settings",
      label: "Configurações",
      icon: Settings,
      badge: null,
    },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 transition-colors duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Expensive Tracker</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gestão Financeira</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* User Profile */}
        <ThemeCard className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 border-2 border-cyan-200 dark:border-slate-600">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-cyan-100 dark:bg-slate-700 text-cyan-700 dark:text-cyan-400 font-semibold">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.businessType}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </ThemeCard>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
              activeTab === item.id
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
            onClick={() => {
              onTabChange(item.id)
              setIsMobileOpen(false)
            }}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="h-5 w-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.badge && (
                <Badge variant="destructive" className="text-xs">
                  {item.badge}
                </Badge>
              )}
              <ChevronRight
                className={`h-4 w-4 transition-transform ${
                  activeTab === item.id ? "rotate-90" : "group-hover:translate-x-1"
                }`}
              />
            </div>
          </button>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <ThemeCard variant="primary" className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status Financeiro</h4>
            <Bell className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Receitas</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {dashboardData.totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Despesas</span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                {dashboardData.totalExpenses.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-gray-200 dark:border-slate-600">
              <span className="text-gray-600 dark:text-gray-400">Saldo</span>
              <span
                className={`font-semibold ${
                  dashboardData.monthlyBalance >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {dashboardData.monthlyBalance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
          </div>
        </ThemeCard>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <ThemeButton
          variant="ghost"
          className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair da Conta
        </ThemeButton>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <ThemeButton
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white dark:bg-slate-800 shadow-lg"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </ThemeButton>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 shadow-lg">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 shadow-xl">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  )
}
