"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ExecutiveCard } from "../ui/executive-card"
import { ProfessionalButton } from "../ui/professional-button"
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

interface ExecutiveSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function ExecutiveSidebar({ activeTab, onTabChange }: ExecutiveSidebarProps) {
  const { user, logout } = useAuth()
  const { getDashboardData } = useData()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const dashboardData = getDashboardData()

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard Executivo",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "clients",
      label: "Gestão de Clientes",
      icon: Users,
      badge: dashboardData.overduePayments > 0 ? dashboardData.overduePayments : null,
    },
    {
      id: "expenses",
      label: "Controle de Despesas",
      icon: Receipt,
      badge: null,
    },
    {
      id: "reports",
      label: "Relatórios Gerenciais",
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
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Expensive Tracker</h2>
            <p className="text-sm text-slate-500">Gestão Empresarial</p>
          </div>
        </div>

        {/* User Profile */}
        <ExecutiveCard className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 border-2 border-blue-200">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.businessType}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
        </ExecutiveCard>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
              activeTab === item.id ? "bg-blue-600 text-white shadow-md" : "text-slate-700 hover:bg-slate-100"
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
      <div className="p-4 border-t border-slate-200">
        <ExecutiveCard variant="primary" className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-700">Status Financeiro</h4>
            <Bell className="w-4 h-4 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Receitas</span>
              <span className="font-semibold text-emerald-600">
                {dashboardData.totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Despesas</span>
              <span className="font-semibold text-red-600">
                {dashboardData.totalExpenses.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-slate-200">
              <span className="text-slate-600">Saldo</span>
              <span
                className={`font-semibold ${dashboardData.monthlyBalance >= 0 ? "text-emerald-600" : "text-red-600"}`}
              >
                {dashboardData.monthlyBalance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
          </div>
        </ExecutiveCard>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200">
        <ProfessionalButton
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair da Conta
        </ProfessionalButton>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <ProfessionalButton
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white shadow-lg"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </ProfessionalButton>
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
