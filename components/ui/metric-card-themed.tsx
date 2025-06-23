"use client"

import type React from "react"
import { ThemeCard } from "./theme-card"
import { CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardThemedProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function MetricCardThemed({ title, value, subtitle, icon, trend, className }: MetricCardThemedProps) {
  return (
    <ThemeCard className={cn("overflow-hidden", className)} elevated>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
            {trend && (
              <div className="flex items-center mt-3">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
                  )}
                >
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">vs mês anterior</span>
              </div>
            )}
          </div>
          <div className="w-12 h-12 bg-cyan-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
            <div className="text-cyan-600 dark:text-cyan-400">{icon}</div>
          </div>
        </div>
      </CardContent>
    </ThemeCard>
  )
}
