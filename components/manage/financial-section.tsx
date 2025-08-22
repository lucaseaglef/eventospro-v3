"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp, DollarSign, CreditCard, Banknote, RefreshCw } from "lucide-react"
import { useEventMetrics, useOrders } from "@/lib/api-hooks"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import { EmptyState } from "@/components/ui/empty-state"

interface FinancialSectionProps {
  eventId: string
}

export function FinancialSection({ eventId }: FinancialSectionProps) {
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useEventMetrics(eventId)
  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
  } = useOrders(eventId, {
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  })

  const transactions = ordersData?.items || []
  const isLoading = metricsLoading || ordersLoading
  const hasError = metricsError || ordersError

  const defaultMetrics = {
    totalRevenue: 0,
    netRevenue: 0,
    creditCardRevenue: 0,
    pixRevenue: 0,
    creditCardPercentage: 0,
    pixPercentage: 0,
    creditCardTransactions: 0,
    pixTransactions: 0,
    platformFee: 0,
    paymentFee: 0,
    totalFees: 0,
  }

  const currentMetrics = metrics || defaultMetrics

  if (hasError) {
    return <ErrorState message="Erro ao carregar dados financeiros" />
  }

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
            <div className="text-2xl font-bold">
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                `R$ ${currentMetrics.totalRevenue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentMetrics.totalRevenue === 0 ? "Nenhuma venda ainda" : "Receita bruta total"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Líquida</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                `R$ ${currentMetrics.netRevenue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">Após taxas e comissões</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cartão de Crédito</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                `R$ ${currentMetrics.creditCardRevenue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">{currentMetrics.creditCardPercentage.toFixed(0)}% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PIX</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                `R$ ${currentMetrics.pixRevenue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">{currentMetrics.pixPercentage.toFixed(0)}% do total</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transações Recentes</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={isLoading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline" size="sm" disabled={transactions.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : transactions.length === 0 ? (
            <EmptyState
              title="Nenhuma transação encontrada"
              description="As transações aparecerão aqui conforme os pedidos forem processados."
            />
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      {transaction.paymentMethod === "credit_card" ? (
                        <CreditCard className="h-5 w-5 text-primary" />
                      ) : (
                        <Banknote className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.participant?.name || "Participante"}</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.ticketType} • {transaction.paymentMethod === "credit_card" ? "Cartão" : "PIX"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">R$ {transaction.total.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(transaction.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </div>

                    <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                      {transaction.status === "completed"
                        ? "Concluída"
                        : transaction.status === "pending"
                          ? "Pendente"
                          : "Cancelada"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Methods Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Métodos de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner size="sm" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Cartão de Crédito</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{currentMetrics.creditCardPercentage.toFixed(0)}%</div>
                    <div className="text-sm text-muted-foreground">
                      {currentMetrics.creditCardTransactions} transações
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4" />
                    <span>PIX</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{currentMetrics.pixPercentage.toFixed(0)}%</div>
                    <div className="text-sm text-muted-foreground">{currentMetrics.pixTransactions} transações</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxas e Comissões</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner size="sm" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Taxa da plataforma (5%)</span>
                  <span className="font-medium">
                    R${" "}
                    {currentMetrics.platformFee.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Taxa de pagamento</span>
                  <span className="font-medium">
                    R${" "}
                    {currentMetrics.paymentFee.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="border-t pt-2 flex items-center justify-between font-medium">
                  <span>Total de taxas</span>
                  <span>
                    R${" "}
                    {currentMetrics.totalFees.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
