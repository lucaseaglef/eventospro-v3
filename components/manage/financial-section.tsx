"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp, DollarSign, CreditCard, Banknote, RefreshCw } from "lucide-react"

interface FinancialSectionProps {
  eventId: string
}

const transactions = [
  {
    id: "1",
    participant: "Ana Silva",
    ticketType: "VIP",
    amount: 299.99,
    method: "credit_card",
    status: "completed",
    date: "2024-02-15T10:30:00",
  },
  {
    id: "2",
    participant: "Carlos Santos",
    ticketType: "Premium",
    amount: 199.99,
    method: "pix",
    status: "completed",
    date: "2024-02-15T14:22:00",
  },
  {
    id: "3",
    participant: "Maria Oliveira",
    ticketType: "Standard",
    amount: 99.99,
    method: "credit_card",
    status: "pending",
    date: "2024-02-16T09:15:00",
  },
]

export function FinancialSection({ eventId }: FinancialSectionProps) {
  return (
    <div className="space-y-6">
      {/* Financial Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 67.543,00</div>
            <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Líquida</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 63.890,00</div>
            <p className="text-xs text-muted-foreground">Após taxas e comissões</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cartão de Crédito</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.230,00</div>
            <p className="text-xs text-muted-foreground">67% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PIX</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 22.313,00</div>
            <p className="text-xs text-muted-foreground">33% do total</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transações Recentes</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {transaction.method === "credit_card" ? (
                      <CreditCard className="h-5 w-5 text-primary" />
                    ) : (
                      <Banknote className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.participant}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.ticketType} • {transaction.method === "credit_card" ? "Cartão" : "PIX"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">R$ {transaction.amount.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </div>
                  </div>

                  <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                    {transaction.status === "completed" ? "Concluída" : "Pendente"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Métodos de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Cartão de Crédito</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">67%</div>
                  <div className="text-sm text-muted-foreground">259 transações</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  <span>PIX</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">33%</div>
                  <div className="text-sm text-muted-foreground">128 transações</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxas e Comissões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Taxa da plataforma (5%)</span>
                <span className="font-medium">R$ 3.377,15</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxa de pagamento</span>
                <span className="font-medium">R$ 275,85</span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between font-medium">
                <span>Total de taxas</span>
                <span>R$ 3.653,00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
