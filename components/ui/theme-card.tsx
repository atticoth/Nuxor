"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ThemeCardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "primary" | "secondary" | "accent"
  elevated?: boolean
}

export function ThemeCard({ children, className, variant = "default", elevated = false }: ThemeCardProps) {
  const variants = {
    default: "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700",
    primary:
      "bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border-cyan-200 dark:border-slate-600",
    secondary:
      "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 border-gray-200 dark:border-slate-700",
    accent:
      "bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-slate-700 dark:to-slate-800 border-cyan-400 dark:border-slate-600 text-white",
  }

  const shadows = elevated
    ? "shadow-xl hover:shadow-2xl dark:shadow-slate-900/20"
    : "shadow-sm hover:shadow-md dark:shadow-slate-900/10"

  return (
    <Card className={cn("transition-all duration-300 hover:-translate-y-1", variants[variant], shadows, className)}>
      {children}
    </Card>
  )
}
