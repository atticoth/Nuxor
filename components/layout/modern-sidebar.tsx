"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "../../hooks/use-auth"
import { useData } from "../../hooks/use-data"
import { LayoutDashboard, Users, Receipt, BarChart3, LogOut, Menu, X, Settings, Bell, Sparkles } from "lucide-react"

interface ModernSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function ModernSidebar({ activeTab, onTabChange }: ModernSidebarProps) {
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
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Expensive Tracker</h2>
            <p className="text-blue-100 text-sm">{user?.businessType}</p>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-white font-medium">{user?.name}</p>
          <p className="text-blue-100 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start h-12 transition-all duration-200 ${
              activeTab === item.id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => {
              onTabChange(item.id)
              setIsMobileOpen(false)
            }}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <Badge variant={activeTab === item.id ? "secondary" : "destructive"} className="ml-2">
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t bg-gray-50">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notificações
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 h-12"
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair da Conta
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white shadow-lg"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 shadow-xl">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 shadow-xl">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  )
}
