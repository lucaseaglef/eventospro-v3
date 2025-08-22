import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, Edit, Share2 } from "lucide-react"

interface EventHeaderProps {
  event: {
    name: string
    date: string
    endDate: string
    time: string
    endTime: string
    location: string
    address: string
    capacity: number
    status: string
    image: string
    category: string
  }
}

export function EventHeader({ event }: EventHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-chart-1 text-white"
      case "Vendas Abertas":
        return "bg-chart-2 text-white"
      case "Finalizado":
        return "bg-chart-4 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="aspect-[2/1] relative">
        <img src={event.image || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{event.name}</h1>
              <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
              <Button size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-chart-1" />
            <div>
              <p className="text-sm font-medium text-foreground">Data</p>
              <p className="text-sm text-muted-foreground">
                {new Date(event.date).toLocaleDateString("pt-BR")} -{" "}
                {new Date(event.endDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-chart-2" />
            <div>
              <p className="text-sm font-medium text-foreground">Horário</p>
              <p className="text-sm text-muted-foreground">
                {event.time} - {event.endTime}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-chart-3" />
            <div>
              <p className="text-sm font-medium text-foreground">Local</p>
              <p className="text-sm text-muted-foreground">{event.location}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-chart-4" />
            <div>
              <p className="text-sm font-medium text-foreground">Capacidade</p>
              <p className="text-sm text-muted-foreground">{event.capacity} pessoas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
