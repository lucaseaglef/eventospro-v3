import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, CreditCard, Users } from "lucide-react"

const salesMetrics = [
  {
    title: "Receita Total",
    value: "R$ 245.680",
    change: "+12% vs mês anterior",
    icon: DollarSign,
    color: "text-chart-1",
  },
  {
    title: "Vendas Hoje",
    value: "R$ 8.420",
    change: "+5% vs ontem",
    icon: TrendingUp,
    color: "text-chart-2",
  },
  {
    title: "Transações",
    value: "1.247",
    change: "+18% vs mês anterior",
    icon: CreditCard,
    color: "text-chart-3",
  },
  {
    title: "Ticket Médio",
    value: "R$ 297",
    change: "+3% vs mês anterior",
    icon: Users,
    color: "text-chart-4",
  },
]

export function SalesOverview() {
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
