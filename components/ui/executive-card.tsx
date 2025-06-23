"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ExecutiveCardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "primary" | "secondary" | "accent"
  elevated?: boolean
}

export function ExecutiveCard({ children, className, variant = "default", elevated = false }: ExecutiveCardProps) {
  const variants = {
    default: "bg-white border-slate-200",
    primary: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
    secondary: "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200",
    accent: "bg-gradient-to-br from-blue-600 to-indigo-700 border-blue-500 text-white",
  }

  const shadows = elevated ? "shadow-xl hover:shadow-2xl" : "shadow-sm hover:shadow-md"

  return (
    <Card className={cn("transition-all duration-300 hover:-translate-y-1", variants[variant], shadows, className)}>
      {children}
    </Card>
  )
}
