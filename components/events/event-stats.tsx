import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Ticket, DollarSign, TrendingUp, UserCheck } from "lucide-react"

interface EventStatsProps {
  stats: {
    totalSales: number
    revenue: number
    conversionRate: number
    checkedIn: number
  }
  capacity: number
}

export function EventStats({ stats, capacity }: EventStatsProps) {
  const occupancyRate = (stats.totalSales / capacity) * 100

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Ingressos Vendidos</CardTitle>
          <Ticket className="h-4 w-4 text-chart-1" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.totalSales}</div>
          <div className="mt-2">
            <Progress value={occupancyRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{occupancyRate.toFixed(1)}% da capacidade</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Receita Total</CardTitle>
          <DollarSign className="h-4 w-4 text-chart-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">R$ {stats.revenue.toLocaleString("pt-BR")}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Média: R$ {stats.totalSales > 0 ? (stats.revenue / stats.totalSales).toFixed(2) : "0.00"} por ingresso
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Taxa de Conversão</CardTitle>
          <TrendingUp className="h-4 w-4 text-chart-3" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.conversionRate}%</div>
          <p className="text-xs text-muted-foreground mt-1">Visitantes que compraram</p>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Check-ins</CardTitle>
          <UserCheck className="h-4 w-4 text-chart-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.checkedIn}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.totalSales > 0 ? ((stats.checkedIn / stats.totalSales) * 100).toFixed(1) : "0"}% dos participantes
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
