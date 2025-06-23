"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GlassCard } from "../ui/glass-card"
import { NeonText } from "../ui/neon-text"
import { useAuth } from "../../hooks/use-auth"
import { useData } from "../../hooks/use-data"
import { useGamification } from "../../hooks/use-gamification"
import {
  LayoutDashboard,
  Users,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  Star,
  Bell,
  Crown,
} from "lucide-react"

interface FuturisticSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function FuturisticSidebar({ activeTab, onTabChange }: FuturisticSidebarProps) {
  const { user, logout } = useAuth()
  const { getDashboardData } = useData()
  const { userLevel, userXP } = useGamification()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const dashboardData = getDashboardData()

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "clients",
      label: "Clientes",
      icon: Users,
      badge: dashboardData.overduePayments > 0 ? dashboardData.overduePayments : null,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "expenses",
      label: "Despesas",
      icon: Receipt,
      badge: null,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "reports",
      label: "Relatórios",
      icon: BarChart3,
      badge: null,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "settings",
      label: "Configurações",
      icon: Settings,
      badge: null,
      gradient: "from-gray-500 to-gray-600",
    },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <GlassCard variant="premium" className="m-4 mb-6">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <NeonText color="purple" className="text-lg">
                Expensive Tracker
              </NeonText>
              <p className="text-purple-200 text-xs">{user?.businessType}</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <Avatar className="w-12 h-12 border-2 border-purple-400/50">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">{user?.name}</p>
              <div className="flex items-center gap-2">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-yellow-400 text-xs font-bold">Nível {userLevel}</span>
                <Crown className="w-3 h-3 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start h-14 transition-all duration-300 relative overflow-hidden group ${
              activeTab === item.id
                ? `bg-gradient-to-r ${item.gradient} text-white shadow-2xl scale-105`
                : "hover:bg-white/10 text-white/80 hover:text-white hover:scale-102"
            }`}
            onClick={() => {
              onTabChange(item.id)
              setIsMobileOpen(false)
            }}
          >
            {/* Glow effect */}
            {activeTab === item.id && (
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-20 blur-xl`} />
            )}

            <item.icon className="mr-3 h-5 w-5 relative z-10" />
            <span className="flex-1 text-left font-medium relative z-10">{item.label}</span>
            {item.badge && (
              <Badge variant="destructive" className="ml-2 relative z-10 animate-pulse bg-red-500 text-white shadow-lg">
                {item.badge}
              </Badge>
            )}

            {/* Hover glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />
          </Button>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="p-4">
        <GlassCard variant="success" className="p-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-bold text-sm">Status do Sistema</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-white/70">
                <p>Receitas</p>
                <p className="text-green-400 font-bold">
                  {dashboardData.totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </div>
              <div className="text-white/70">
                <p>Despesas</p>
                <p className="text-red-400 font-bold">
                  {dashboardData.totalExpenses.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 h-12 transition-all duration-300"
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Desconectar
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
          className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 bg-gradient-to-b from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-r border-white/10">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-r border-white/10">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  )
}
