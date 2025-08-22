"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, CreditCard, Users } from "lucide-react"
import { useEventMetrics } from "@/lib/api-hooks"

interface SalesOverviewProps {
  eventId?: string
}

export function SalesOverview({ eventId }: SalesOverviewProps) {
  const { data: metrics, isLoading } = useEventMetrics(eventId)

  const defaultMetrics = {
    totalRevenue: 0,
    dailySales: 0,
    totalOrders: 0,
    conversionRate: 0,
    averageTicketValue: 0,
  }

  const currentMetrics = metrics || defaultMetrics

  const salesMetrics = [
    {
      title: "Receita Total",
      value: isLoading
        ? "..."
        : `R$ ${currentMetrics.totalRevenue.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      change: isLoading
        ? "Carregando..."
        : currentMetrics.totalOrders === 0
          ? "Nenhuma venda ainda"
          : `${currentMetrics.totalOrders} transações`,
      icon: DollarSign,
      color: "text-chart-1",
    },
    {
      title: "Vendas Diárias",
      value: isLoading
        ? "..."
        : `R$ ${currentMetrics.dailySales.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      change: isLoading ? "Carregando..." : currentMetrics.dailySales === 0 ? "Sem vendas hoje" : "Média diária",
      icon: TrendingUp,
      color: "text-chart-2",
    },
    {
      title: "Total de Pedidos",
      value: isLoading ? "..." : currentMetrics.totalOrders.toLocaleString("pt-BR"),
      change: isLoading
        ? "Carregando..."
        : currentMetrics.totalOrders === 0
          ? "Aguardando pedidos"
          : `${currentMetrics.conversionRate.toFixed(1)}% conversão`,
      icon: CreditCard,
      color: "text-chart-3",
    },
    {
      title: "Ticket Médio",
      value: isLoading
        ? "..."
        : `R$ ${currentMetrics.averageTicketValue.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      change: isLoading
        ? "Carregando..."
        : currentMetrics.averageTicketValue === 0
          ? "Sem dados ainda"
          : "Por participante",
      icon: Users,
      color: "text-chart-4",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {salesMetrics.map((metric) => (
        <Card key={metric.title} className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
