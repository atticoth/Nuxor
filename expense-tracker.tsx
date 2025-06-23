"use client"

import { ExpenseForm } from "./components/expense-form"
import { ExpenseList } from "./components/expense-list"
import { ExpenseSummary } from "./components/expense-summary"
import { useExpenses } from "./hooks/use-expenses"

export default function ExpenseTracker() {
  const { expenses, addExpense, deleteExpense } = useExpenses()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Expense Tracker</h1>
          <p className="text-muted-foreground mt-2">Track your spending and manage your budget effectively</p>
        </div>

        <div className="space-y-8">
          {/* Summary Section */}
          <ExpenseSummary expenses={expenses} />

          {/* Add Expense Form */}
          <ExpenseForm onAddExpense={addExpense} />

          {/* Expense List */}
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        </div>
      </div>
    </div>
  )
}
