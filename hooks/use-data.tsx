"use client"

import { useState, useEffect } from "react"
import type { Client, Expense, Payment, DashboardData } from "../types"

export function useData() {
  const [clients, setClients] = useState<Client[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    const savedClients = localStorage.getItem("clients")
    const savedExpenses = localStorage.getItem("expenses")
    const savedPayments = localStorage.getItem("payments")

    if (savedClients) setClients(JSON.parse(savedClients))
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses))
    if (savedPayments) setPayments(JSON.parse(savedPayments))
  }, [])

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients))
  }, [clients])

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments))
  }, [payments])

  const addClient = (client: Omit<Client, "id" | "createdAt">) => {
    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setClients((prev) => [newClient, ...prev])
  }

  const addExpense = (expense: Omit<Expense, "id" | "createdAt">) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setExpenses((prev) => [newExpense, ...prev])
  }

  const addPayment = (payment: Omit<Payment, "id" | "createdAt">) => {
    const newPayment: Payment = {
      ...payment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setPayments((prev) => [newPayment, ...prev])

    // Atualizar status do cliente
    setClients((prev) =>
      prev.map((client) => (client.id === payment.clientId ? { ...client, status: "paid" as const } : client)),
    )
  }

  const updateClientStatus = (clientId: string, status: Client["status"]) => {
    setClients((prev) => prev.map((client) => (client.id === clientId ? { ...client, status } : client)))
  }

  const getDashboardData = (): DashboardData => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const monthlyExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
    })

    const monthlyPayments = payments.filter((payment) => {
      const paymentDate = new Date(payment.date)
      return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear
    })

    const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const totalRevenue = monthlyPayments.reduce((sum, payment) => sum + payment.amount, 0)

    const overduePayments = clients.filter((client) => {
      const dueDate = new Date(client.dueDate)
      return client.status === "pending" && dueDate < new Date()
    }).length

    const pendingPayments = clients.filter((client) => client.status === "pending").length

    return {
      totalExpenses,
      totalRevenue,
      monthlyBalance: totalRevenue - totalExpenses,
      overduePayments,
      pendingPayments,
    }
  }

  return {
    clients,
    expenses,
    payments,
    addClient,
    addExpense,
    addPayment,
    updateClientStatus,
    getDashboardData,
  }
}
