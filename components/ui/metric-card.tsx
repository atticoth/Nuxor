"use client"

import type React from "react"

import { ExecutiveCard } from "./executive-card"
import { CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
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

export function MetricCard({ title, value, subtitle, icon, trend, className }: MetricCardProps) {
  return (
    <ExecutiveCard className={cn("overflow-hidden", className)} elevated>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
            {trend && (
              <div className="flex items-center mt-3">
                <span className={cn("text-sm font-semibold", trend.isPositive ? "text-emerald-600" : "text-red-600")}>
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
                <span className="text-sm text-slate-500 ml-2">vs mês anterior</span>
              </div>
            )}
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <div className="text-blue-600">{icon}</div>
          </div>
        </div>
      </CardContent>
    </ExecutiveCard>
  )
}
