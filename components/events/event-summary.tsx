import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

interface EventSummaryProps {
  event: {
    name: string
    date: string
    endDate: string
    time: string
    location: string
    address: string
    image: string
  }
}

export function EventSummary({ event }: EventSummaryProps) {
  return (
    <div className="sticky top-8">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Resumo do Evento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <img src={event.image || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{event.name}</h3>
            <Badge className="bg-chart-1 text-white">Evento Confirmado</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-chart-1" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Data</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString("pt-BR")} -{" "}
                  {new Date(event.endDate).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-chart-2" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Horário</p>
                <p className="text-sm text-muted-foreground">{event.time} - 18:00</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-chart-3" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Local</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
                <p className="text-xs text-muted-foreground">{event.address}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Mais de 450 pessoas já se inscreveram</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
