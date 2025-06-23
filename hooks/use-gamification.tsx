"use client"

import { useState, useEffect } from "react"
import type { Achievement } from "../types/advanced"
import { useData } from "./use-data"

export function useGamification() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [userLevel, setUserLevel] = useState(1)
  const [userXP, setUserXP] = useState(0)
  const { expenses, clients } = useData()

  const allAchievements: Achievement[] = [
    {
      id: "first-expense",
      title: "Primeiro Passo",
      description: "Registre sua primeira despesa",
      icon: "🎯",
      progress: 0,
      maxProgress: 1,
    },
    {
      id: "first-client",
      title: "Empreendedor",
      description: "Cadastre seu primeiro cliente",
      icon: "👥",
      progress: 0,
      maxProgress: 1,
    },
    {
      id: "expense-master",
      title: "Organizador",
      description: "Registre 50 despesas",
      icon: "📊",
      progress: 0,
      maxProgress: 50,
    },
    {
      id: "client-network",
      title: "Networking",
      description: "Tenha 20 clientes cadastrados",
      icon: "🌟",
      progress: 0,
      maxProgress: 20,
    },
    {
      id: "consistent-user",
      title: "Consistência",
      description: "Use o app por 30 dias seguidos",
      icon: "🔥",
      progress: 0,
      maxProgress: 30,
    },
  ]

  useEffect(() => {
    updateAchievements()
  }, [expenses, clients])

  const updateAchievements = () => {
    const updatedAchievements = allAchievements.map((achievement) => {
      let progress = 0

      switch (achievement.id) {
        case "first-expense":
          progress = expenses.length > 0 ? 1 : 0
          break
        case "first-client":
          progress = clients.length > 0 ? 1 : 0
          break
        case "expense-master":
          progress = Math.min(expenses.length, 50)
          break
        case "client-network":
          progress = Math.min(clients.length, 20)
          break
        case "consistent-user":
          progress = Math.min(Math.floor(Math.random() * 15), 30) // Simular dias de uso
          break
      }

      const isUnlocked = progress >= achievement.maxProgress
      return {
        ...achievement,
        progress,
        unlockedAt: isUnlocked && !achievement.unlockedAt ? new Date().toISOString() : achievement.unlockedAt,
      }
    })

    setAchievements(updatedAchievements)

    // Calcular XP e nível
    const totalXP = updatedAchievements.reduce((sum, achievement) => {
      return sum + achievement.progress * 10
    }, 0)

    setUserXP(totalXP)
    setUserLevel(Math.floor(totalXP / 100) + 1)
  }

  return { achievements, userLevel, userXP }
}
