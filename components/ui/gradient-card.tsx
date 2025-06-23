"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface GradientCardProps {
  children: React.ReactNode
  className?: string
  gradient?: "blue" | "green" | "purple" | "orange" | "red"
}

export function GradientCard({ children, className, gradient = "blue" }: GradientCardProps) {
  const gradients = {
    blue: "bg-gradient-to-br from-blue-500 to-blue-600",
    green: "bg-gradient-to-br from-green-500 to-green-600",
    purple: "bg-gradient-to-br from-purple-500 to-purple-600",
    orange: "bg-gradient-to-br from-orange-500 to-orange-600",
    red: "bg-gradient-to-br from-red-500 to-red-600",
  }

  return (
    <Card
      className={cn(
        "border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300",
        gradients[gradient],
        className,
      )}
    >
      {children}
    </Card>
  )
}
