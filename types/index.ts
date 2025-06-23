export interface User {
  id: string
  name: string
  email: string
  businessType: string
  phone?: string
}

export interface Client {
  id: string
  name: string
  contact: string
  amount: number
  dueDate: string
  status: "pending" | "paid" | "overdue"
  createdAt: string
}

export interface Expense {
  id: string
  date: string
  amount: number
  description: string
  category: string
  receipt?: string
  createdAt: string
}

export interface Payment {
  id: string
  clientId: string
  amount: number
  date: string
  description?: string
  createdAt: string
}

export interface DashboardData {
  totalExpenses: number
  totalRevenue: number
  monthlyBalance: number
  overduePayments: number
  pendingPayments: number
}
