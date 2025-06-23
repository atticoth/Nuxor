"use client"

import { useState, useEffect } from "react"
import type { AIInsight } from "../types/advanced"
import { useData } from "./use-data"

export function useAIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const { expenses, clients, getDashboardData } = useData()

  useEffect(() => {
    generateInsights()
  }, [expenses, clients])

  const generateInsights = () => {
    const dashboardData = getDashboardData()
    const newInsights: AIInsight[] = []

    // Análise de gastos
    if (dashboardData.totalExpenses > 0) {
      const avgExpense = dashboardData.totalExpenses / Math.max(expenses.length, 1)
      if (avgExpense > 500) {
        newInsights.push({
          id: crypto.randomUUID(),
          type: "warning",
          title: "Gastos Elevados",
          description: `Sua média de gastos está em ${avgExpense.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}. Considere revisar suas despesas.`,
          priority: "high",
          createdAt: new Date().toISOString(),
        })
      }
    }

    // Análise de clientes em atraso
    if (dashboardData.overduePayments > 0) {
      newInsights.push({
        id: crypto.randomUUID(),
        type: "warning",
        title: "Pagamentos Vencidos",
        description: `Você tem ${dashboardData.overduePayments} pagamento(s) vencido(s). Entre em contato com os clientes.`,
        action: "Ver clientes",
        priority: "high",
        createdAt: new Date().toISOString(),
      })
    }

    // Sugestão de economia
    const fuelExpenses = expenses.filter((e) => e.category === "Combustível")
    if (fuelExpenses.length > 5) {
      const totalFuel = fuelExpenses.reduce((sum, e) => sum + e.amount, 0)
      newInsights.push({
        id: crypto.randomUUID(),
        type: "suggestion",
        title: "Otimização de Combustível",
        description: `Você gastou ${totalFuel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} em combustível. Considere rotas mais eficientes.`,
        priority: "medium",
        createdAt: new Date().toISOString(),
      })
    }

    // Conquista por meta
    if (dashboardData.monthlyBalance > 0) {
      newInsights.push({
        id: crypto.randomUUID(),
        type: "achievement",
        title: "Mês Positivo!",
        description: `Parabéns! Você teve lucro de ${dashboardData.monthlyBalance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} este mês.`,
        priority: "low",
        createdAt: new Date().toISOString(),
      })
    }

    setInsights(newInsights)
  }

  return { insights, generateInsights }
}
