"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "premium" | "success" | "warning" | "danger"
}

export function GlassCard({ children, className, variant = "default" }: GlassCardProps) {
  const variants = {
    default: "bg-white/10 border-white/20 backdrop-blur-xl",
    premium: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-300/30 backdrop-blur-xl",
    success: "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-300/30 backdrop-blur-xl",
    warning: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-300/30 backdrop-blur-xl",
    danger: "bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-300/30 backdrop-blur-xl",
  }

  return (
    <Card
      className={cn(
        "shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1",
        variants[variant],
        className,
      )}
    >
      {children}
    </Card>
  )
}
