"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, CreditCard, TrendingUp } from "lucide-react"
import { useEventMetrics } from "@/lib/api-hooks"

interface MetricsCardsProps {
  eventId?: string
}

export function MetricsCards({ eventId }: MetricsCardsProps) {
  const { data: metrics, isLoading } = useEventMetrics(eventId)

  const defaultMetrics = {
    activeEvents: 0,
    totalParticipants: 0,
    totalRevenue: 0,
    averageTicketValue: 0,
    conversionRate: 0,
    totalOrders: 0,
  }

  const currentMetrics = metrics || defaultMetrics

  const metricsData = [
    {
      title: "Eventos Ativos",
      value: isLoading ? "..." : currentMetrics.activeEvents.toString(),
      change: isLoading
        ? "Carregando..."
        : currentMetrics.activeEvents === 0
          ? "Nenhum evento ativo"
          : "Eventos em andamento",
      icon: Calendar,
      color: "text-chart-1",
    },
    {
      title: "Total de Participantes",
      value: isLoading ? "..." : currentMetrics.totalParticipants.toLocaleString("pt-BR"),
      change: isLoading
        ? "Carregando..."
        : currentMetrics.totalParticipants === 0
          ? "Aguardando inscrições"
          : `${currentMetrics.totalParticipants} inscritos`,
      icon: Users,
      color: "text-chart-2",
    },
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
        : currentMetrics.totalRevenue === 0
          ? "Nenhuma venda ainda"
          : `Ticket médio: R$ ${currentMetrics.averageTicketValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
      icon: CreditCard,
      color: "text-chart-3",
    },
    {
      title: "Taxa de Conversão",
      value: isLoading ? "..." : `${currentMetrics.conversionRate.toFixed(1)}%`,
      change: isLoading
        ? "Carregando..."
        : currentMetrics.totalOrders === 0
          ? "Nenhum pedido ainda"
          : `${currentMetrics.totalOrders} pedidos realizados`,
      icon: TrendingUp,
      color: "text-chart-4",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metricsData.map((metric) => (
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
