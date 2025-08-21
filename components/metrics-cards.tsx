import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, CreditCard, TrendingUp } from "lucide-react"

const metrics = [
  {
    title: "Eventos Ativos",
    value: "12",
    change: "+2 este mês",
    icon: Calendar,
    color: "text-chart-1",
  },
  {
    title: "Total de Participantes",
    value: "2,847",
    change: "+18% vs mês anterior",
    icon: Users,
    color: "text-chart-2",
  },
  {
    title: "Receita Total",
    value: "R$ 89.420",
    change: "+12% vs mês anterior",
    icon: CreditCard,
    color: "text-chart-3",
  },
  {
    title: "Taxa de Conversão",
    value: "68%",
    change: "+5% vs mês anterior",
    icon: TrendingUp,
    color: "text-chart-4",
  },
]

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
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
