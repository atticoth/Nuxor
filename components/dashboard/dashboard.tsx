"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useData } from "../../hooks/use-data"
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, Clock, Users } from "lucide-react"

export function Dashboard() {
  const { getDashboardData, clients } = useData()
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das suas finanças</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas do Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(dashboardData.totalRevenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(dashboardData.totalExpenses)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo do Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${dashboardData.monthlyBalance >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatCurrency(dashboardData.monthlyBalance)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.pendingPayments} pendentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      {dashboardData.overduePayments > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              Pagamentos Vencidos
            </CardTitle>
            <CardDescription className="text-red-600">
              Você tem {dashboardData.overduePayments} pagamento(s) em atraso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {overdueClients.slice(0, 3).map((client) => (
                <div key={client.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Vencimento: {new Date(client.dueDate).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <Badge variant="destructive">{formatCurrency(client.amount)}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pagamentos Pendentes */}
      {dashboardData.pendingPayments > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Próximos Vencimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {clients
                .filter((client) => client.status === "pending")
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .slice(0, 5)
                .map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Vencimento: {new Date(client.dueDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <Badge variant="outline">{formatCurrency(client.amount)}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
