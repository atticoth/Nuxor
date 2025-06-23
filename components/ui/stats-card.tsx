"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "./animated-counter"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  prefix?: string
  suffix?: string
  className?: string
}

export function StatsCard({ title, value, icon, trend, prefix = "", suffix = "", className }: StatsCardProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-all duration-300 border-0 shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <div className="text-2xl font-bold text-gray-900">
                <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
              </div>
            </div>
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center">
            <span className={cn("text-sm font-medium", trend.isPositive ? "text-green-600" : "text-red-600")}>
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
            <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
