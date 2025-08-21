import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, User, Tag, Calendar, Clock, Users } from "lucide-react"

interface EventInfoProps {
  event: {
    name: string
    date: string
    endDate?: string
    time: string
    location: string
    address: string
    description?: string
    organizer?: string
    category?: string
    capacity?: number
    ticketTypes: Array<{
      id: string
      name: string
      description: string
      price: number
      available: number
      features: string[]
    }>
  }
}

export function EventInfo({ event }: EventInfoProps) {
  const totalCapacity = (event.ticketTypes || []).reduce((sum, ticket) => sum + ticket.available, 0)
  const description =
    event.description ||
    "Junte-se a nós para uma experiência única e enriquecedora. Este evento promete oferecer conteúdo de alta qualidade, networking valioso e oportunidades de aprendizado que você não pode perder."

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Sobre o Evento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-card-foreground leading-relaxed">{description}</p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-chart-1" />
              <span className="text-sm text-card-foreground">{event.address}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-chart-2" />
              <span className="text-sm text-card-foreground">
                {new Date(event.date).toLocaleDateString("pt-BR")}
                {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString("pt-BR")}`}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-chart-3" />
              <span className="text-sm text-card-foreground">{event.time}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="h-4 w-4 text-chart-1" />
              <span className="text-sm text-card-foreground">{totalCapacity} vagas disponíveis</span>
            </div>

            {event.organizer && (
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-chart-2" />
                <span className="text-sm text-card-foreground">Organizado por {event.organizer}</span>
              </div>
            )}

            {event.category && (
              <div className="flex items-center space-x-3">
                <Tag className="h-4 w-4 text-chart-3" />
                <Badge variant="secondary">{event.category}</Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Tipos de Ingresso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {(event.ticketTypes || []).map((ticket) => (
              <div key={ticket.id} className="border border-border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{ticket.name}</h4>
                    <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-chart-1">R$ {ticket.price.toFixed(2).replace(".", ",")}</p>
                    <p className="text-xs text-muted-foreground">{ticket.available} disponíveis</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {ticket.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {ticket.features.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{ticket.features.length - 2} mais
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
