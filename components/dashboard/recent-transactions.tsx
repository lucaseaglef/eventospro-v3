"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import { EmptyState } from "@/components/ui/empty-state"
import { CreditCard, Smartphone, Receipt } from "lucide-react"
import { useOrders, useEvents } from "@/lib/api-hooks"

export function RecentTransactions() {
  const { data: ordersResponse, isLoading: ordersLoading, error: ordersError } = useOrders()
  const { data: events, isLoading: eventsLoading, error: eventsError } = useEvents()

  const isLoading = ordersLoading || eventsLoading
  const error = ordersError || eventsError

  const orders = ordersResponse?.data || []
  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-chart-1 text-white"
      case "pending":
        return "bg-chart-2 text-white"
      case "cancelled":
        return "bg-chart-3 text-white"
      default:
        return "bg-chart-4 text-white"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Aprovado"
      case "pending":
        return "Processando"
      case "cancelled":
        return "Rejeitado"
      default:
        return status
    }
  }

  const getPaymentIcon = (method: string) => {
    return method === "pix" ? Smartphone : CreditCard
  }

  const getPaymentLabel = (method: string) => {
    switch (method) {
      case "credit_card":
        return "Cartão de Crédito"
      case "pix":
        return "PIX"
      case "bank_transfer":
        return "Transferência"
      default:
        return method
    }
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) return `há ${diffInMinutes} min`
    if (diffInMinutes < 1440) return `há ${Math.floor(diffInMinutes / 60)} h`
    return `há ${Math.floor(diffInMinutes / 1440)} dias`
  }

  const getEventName = (eventId: string) => {
    const event = events?.find((e) => e.id === eventId)
    return event?.name || "Evento"
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        )}

        {error && <ErrorState message={error} onRetry={() => window.location.reload()} />}

        {!isLoading && !error && recentOrders.length === 0 && (
          <EmptyState
            icon={Receipt}
            title="Nenhuma transação encontrada"
            description="Ainda não há transações para exibir."
          />
        )}

        {!isLoading && !error && recentOrders.length > 0 && (
          <div className="space-y-4">
            {recentOrders.map((order) => {
              const PaymentIcon = getPaymentIcon(order.paymentMethod)
              return (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={order.buyerName} />
                      <AvatarFallback>
                        {order.buyerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-medium text-foreground">{order.buyerName}</p>
                      <p className="text-xs text-muted-foreground">{getEventName(order.eventId)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        R$ {order.total.toFixed(2).replace(".", ",")}
                      </p>
                      <div className="flex items-center space-x-1">
                        <PaymentIcon className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{getPaymentLabel(order.paymentMethod)}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{getTimeAgo(order.createdAt)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
