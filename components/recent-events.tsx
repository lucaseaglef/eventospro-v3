import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"

const recentEvents = [
  {
    id: 1,
    name: "Tech Summit 2024",
    date: "15 Dez 2024",
    location: "São Paulo, SP",
    participants: 450,
    status: "Ativo",
    statusColor: "bg-chart-1",
  },
  {
    id: 2,
    name: "Feira de Negócios",
    date: "20 Dez 2024",
    location: "Rio de Janeiro, RJ",
    participants: 280,
    status: "Vendas Abertas",
    statusColor: "bg-chart-2",
  },
  {
    id: 3,
    name: "Congresso Médico",
    date: "10 Jan 2025",
    location: "Brasília, DF",
    participants: 320,
    status: "Em Breve",
    statusColor: "bg-chart-4",
  },
  {
    id: 4,
    name: "Workshop Design",
    date: "25 Jan 2025",
    location: "Belo Horizonte, MG",
    participants: 120,
    status: "Planejamento",
    statusColor: "bg-chart-5",
  },
]

export function RecentEvents() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Eventos Recentes</CardTitle>
        <CardDescription className="text-muted-foreground">Últimos eventos criados e suas informações</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-foreground">{event.name}</h4>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {event.date}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-3 w-3" />
                  {event.participants}
                </div>
              </div>
            </div>
            <Badge variant="secondary" className={`${event.statusColor} text-white`}>
              {event.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
