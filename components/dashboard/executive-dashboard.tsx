"use client"

import { ExecutiveCard } from "../ui/executive-card"
import { MetricCard } from "../ui/metric-card"
import { ProfessionalButton } from "../ui/professional-button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useData } from "../../hooks/use-data"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  Calendar,
  FileText,
  Download,
  Filter,
  BarChart3,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts"

export function ExecutiveDashboard() {
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

  const COLORS = ["#2563eb", "#059669", "#dc2626", "#d97706", "#7c3aed", "#0891b2"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Executivo</h1>
          <p className="text-slate-600 mt-1">Visão estratégica do desempenho financeiro</p>
        </div>
        <div className="flex items-center space-x-3">
          <ProfessionalButton variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </ProfessionalButton>
          <ProfessionalButton variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </ProfessionalButton>
          <ProfessionalButton size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Relatório
          </ProfessionalButton>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <MetricCard
          title="Receita Mensal"
          value={formatCurrency(dashboardData.totalRevenue)}
          subtitle="Faturamento do período"
          icon={<TrendingUp className="w-6 h-6" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Despesas Mensais"
          value={formatCurrency(dashboardData.totalExpenses)}
          subtitle="Custos operacionais"
          icon={<TrendingDown className="w-6 h-6" />}
          trend={{ value: 3.2, isPositive: false }}
        />
        <MetricCard
          title="Margem Líquida"
          value={formatCurrency(dashboardData.monthlyBalance)}
          subtitle="Resultado do período"
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ value: 8.7, isPositive: dashboardData.monthlyBalance >= 0 }}
        />
        <MetricCard
          title="Clientes Ativos"
          value={clients.length}
          subtitle={`${dashboardData.pendingPayments} pendentes`}
          icon={<Users className="w-6 h-6" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Revenue Trend */}
        <ExecutiveCard elevated>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-slate-900">Evolução Financeira</CardTitle>
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} name="Receitas" />
                <Line type="monotone" dataKey="expenses" stroke="#dc2626" strokeWidth={3} name="Despesas" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </ExecutiveCard>

        {/* Expense Distribution */}
        <ExecutiveCard elevated>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-slate-900">Distribuição de Despesas</CardTitle>
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
              <div className="flex items-center justify-center h-[300px] text-slate-500">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>Nenhuma despesa registrada</p>
                </div>
              </div>
            )}
          </CardContent>
        </ExecutiveCard>
      </div>

      {/* Alerts and Actions */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Overdue Payments */}
        {dashboardData.overduePayments > 0 && (
          <ExecutiveCard className="border-red-200 bg-red-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                Pagamentos Vencidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600">Total em atraso:</span>
                  <Badge variant="destructive">{dashboardData.overduePayments} cliente(s)</Badge>
                </div>
                {overdueClients.slice(0, 2).map((client) => (
                  <div key={client.id} className="p-3 bg-white rounded-lg border border-red-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{client.name}</p>
                        <p className="text-xs text-slate-600">
                          Venceu em {new Date(client.dueDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-red-600">{formatCurrency(client.amount)}</span>
                    </div>
                  </div>
                ))}
                <ProfessionalButton variant="outline" size="sm" className="w-full text-red-600 border-red-300">
                  Ver Todos os Vencidos
                </ProfessionalButton>
              </div>
            </CardContent>
          </ExecutiveCard>
        )}

        {/* Upcoming Payments */}
        <ExecutiveCard>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <Calendar className="h-5 w-5" />
              Próximos Vencimentos
            </CardTitle>
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
                  <div key={client.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{client.name}</p>
                        <p className="text-xs text-slate-600">
                          Vence em {new Date(client.dueDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">{formatCurrency(client.amount)}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </ExecutiveCard>

        {/* Performance Goals */}
        <ExecutiveCard variant="primary">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <TrendingUp className="h-5 w-5" />
              Meta Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">Receita: R$ 50.000</span>
                <span className="text-sm text-slate-600">
                  {Math.round((dashboardData.totalRevenue / 50000) * 100)}%
                </span>
              </div>
              <Progress value={(dashboardData.totalRevenue / 50000) * 100} className="h-3" />
              <p className="text-sm text-slate-600">
                Faltam {formatCurrency(Math.max(0, 50000 - dashboardData.totalRevenue))} para atingir a meta
              </p>
              <div className="pt-2 border-t border-slate-200">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Margem alvo: 25%</span>
                  <span
                    className={
                      dashboardData.monthlyBalance / dashboardData.totalRevenue >= 0.25
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }
                  >
                    Atual: {((dashboardData.monthlyBalance / dashboardData.totalRevenue) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </ExecutiveCard>
      </div>
    </div>
  )
}
