"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useData } from "../../hooks/use-data"
import { GradientCard } from "../ui/gradient-card"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Users,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export function ModernDashboard() {
  const { getDashboardData, clients, expenses } = useData()
  const dashboardData = getDashboardData()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  const overdueClients = clients.filter((client) => {
    const dueDate = new Date(client.dueDate)
    return client.status === "pending" && dueDate < new Date()
  })

  // Dados para gráficos
  const expensesByCategory = expenses.reduce(
    (acc, expense) => {
      const existing = acc.find((item) => item.name === expense.category)
      if (existing) {
        existing.value += expense.amount
      } else {
        acc.push({ name: expense.category, value: expense.amount })
      }
      return acc
    },
    [] as { name: string; value: number }[],
  )

  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const month = date.toLocaleDateString("pt-BR", { month: "short" })

    const monthExpenses = expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getMonth() === date.getMonth() && expenseDate.getFullYear() === date.getFullYear()
      })
      .reduce((sum, expense) => sum + expense.amount, 0)

    return { month, expenses: monthExpenses, revenue: monthExpenses * 1.3 }
  }).reverse()

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"]

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Visão geral completa do seu negócio</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Este mês
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Bell className="w-4 h-4 mr-2" />
            Notificações
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <GradientCard gradient="green">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Receitas do Mês</p>
                <p className="text-3xl font-bold text-white mt-2">{formatCurrency(dashboardData.totalRevenue)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-200" />
                  <span className="text-green-200 text-sm ml-1">+12.5%</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </GradientCard>

        <GradientCard gradient="red">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Despesas do Mês</p>
                <p className="text-3xl font-bold text-white mt-2">{formatCurrency(dashboardData.totalExpenses)}</p>
                <div className="flex items-center mt-2">
                  <ArrowDownRight className="w-4 h-4 text-red-200" />
                  <span className="text-red-200 text-sm ml-1">-3.2%</span>
                </div>
              </div>
              <TrendingDown className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </GradientCard>

        <GradientCard gradient={dashboardData.monthlyBalance >= 0 ? "blue" : "orange"}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Saldo do Mês</p>
                <p className="text-3xl font-bold text-white mt-2">{formatCurrency(dashboardData.monthlyBalance)}</p>
                <div className="flex items-center mt-2">
                  {dashboardData.monthlyBalance >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-white/80" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-white/80" />
                  )}
                  <span className="text-white/80 text-sm ml-1">
                    {dashboardData.monthlyBalance >= 0 ? "Lucro" : "Prejuízo"}
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </GradientCard>

        <GradientCard gradient="purple">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Clientes Ativos</p>
                <p className="text-3xl font-bold text-white mt-2">{clients.length}</p>
                <p className="text-purple-200 text-sm mt-2">{dashboardData.pendingPayments} pendentes</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </GradientCard>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue vs Expenses Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-blue-600" />
              Receitas vs Despesas
            </CardTitle>
            <CardDescription>Comparativo dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="revenue" fill="#10B981" name="Receitas" />
                <Bar dataKey="expenses" fill="#EF4444" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expenses by Category */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Despesas por Categoria
            </CardTitle>
            <CardDescription>Distribuição dos gastos</CardDescription>
          </CardHeader>
          <CardContent>
            {expensesByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                <p>Nenhuma despesa registrada ainda</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Overdue Payments Alert */}
        {dashboardData.overduePayments > 0 && (
          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                Pagamentos Vencidos
              </CardTitle>
              <CardDescription className="text-red-600">
                {dashboardData.overduePayments} pagamento(s) em atraso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {overdueClients.slice(0, 2).map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-600">
                        Venceu em {new Date(client.dueDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <Badge variant="destructive">{formatCurrency(client.amount)}</Badge>
                  </div>
                ))}
                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                  Ver todos os vencidos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Payments */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Clock className="h-5 w-5" />
              Próximos Vencimentos
            </CardTitle>
            <CardDescription>Pagamentos dos próximos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clients
                .filter((client) => {
                  const dueDate = new Date(client.dueDate)
                  const nextWeek = new Date()
                  nextWeek.setDate(nextWeek.getDate() + 7)
                  return client.status === "pending" && dueDate <= nextWeek && dueDate >= new Date()
                })
                .slice(0, 3)
                .map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-600">
                        Vence em {new Date(client.dueDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-blue-300 text-blue-700">
                      {formatCurrency(client.amount)}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Goal */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Target className="h-5 w-5" />
              Meta do Mês
            </CardTitle>
            <CardDescription className="text-green-600">Progresso da receita mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Meta: R$ 10.000</span>
                <span className="text-sm text-gray-600">{Math.round((dashboardData.totalRevenue / 10000) * 100)}%</span>
              </div>
              <Progress value={(dashboardData.totalRevenue / 10000) * 100} className="h-3" />
              <p className="text-sm text-gray-600">
                Faltam {formatCurrency(Math.max(0, 10000 - dashboardData.totalRevenue))} para atingir a meta
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
