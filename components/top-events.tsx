import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const topEvents = [
  {
    id: 1,
    name: "Tech Summit 2024",
    revenue: "R$ 89.420",
    sales: 298,
    growth: "+15%",
  },
  {
    id: 2,
    name: "Feira de Negócios",
    revenue: "R$ 67.890",
    sales: 227,
    growth: "+8%",
  },
  {
    id: 3,
    name: "Congresso Médico",
    revenue: "R$ 45.230",
    sales: 151,
    growth: "+22%",
  },
  {
    id: 4,
    name: "Workshop Design",
    revenue: "R$ 28.560",
    sales: 95,
    growth: "+5%",
  },
]

export function TopEvents() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Eventos com Mais Vendas</CardTitle>
        <CardDescription className="text-muted-foreground">Ranking dos eventos por receita</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {topEvents.map((event, index) => (
          <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                {index + 1}
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{event.name}</h4>
                <p className="text-xs text-muted-foreground">{event.sales} ingressos vendidos</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{event.revenue}</p>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-chart-1" />
                <span className="text-xs text-chart-1">{event.growth}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
