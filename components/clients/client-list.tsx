"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useData } from "../../hooks/use-data"
import { CheckCircle, Phone, Calendar } from "lucide-react"

export function ClientList() {
  const { clients, addPayment, updateClientStatus } = useData()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  const handleMarkAsPaid = (client: any) => {
    addPayment({
      clientId: client.id,
      amount: client.amount,
      date: new Date().toISOString().split("T")[0],
      description: `Pagamento recebido de ${client.name}`,
    })
  }

  const getStatusBadge = (status: string, dueDate: string) => {
    const isOverdue = new Date(dueDate) < new Date() && status === "pending"

    if (status === "paid") {
      return <Badge className="bg-green-100 text-green-800">Pago</Badge>
    }
    if (isOverdue) {
      return <Badge variant="destructive">Vencido</Badge>
    }
    return <Badge variant="outline">Pendente</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        {clients.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Nenhum cliente cadastrado ainda.</p>
        ) : (
          <div className="space-y-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {client.contact}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(client.dueDate).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold text-lg">{formatCurrency(client.amount)}</p>
                    {getStatusBadge(client.status, client.dueDate)}
                  </div>

                  {client.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => handleMarkAsPaid(client)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Marcar como Pago
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
