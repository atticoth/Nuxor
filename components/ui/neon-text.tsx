"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface NeonTextProps {
  children: React.ReactNode
  className?: string
  color?: "blue" | "purple" | "green" | "pink" | "yellow"
}

export function NeonText({ children, className, color = "blue" }: NeonTextProps) {
  const colors = {
    blue: "text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]",
    purple: "text-purple-400 drop-shadow-[0_0_10px_rgba(147,51,234,0.8)]",
    green: "text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]",
    pink: "text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]",
    yellow: "text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]",
  }

  return <span className={cn("font-bold animate-pulse", colors[color], className)}>{children}</span>
}
