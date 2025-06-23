export interface Expense {
  id: string
  amount: number
  description: string
  category: string
  date: string
  createdAt: string
}

export interface CategorySummary {
  category: string
  total: number
  count: number
}
