"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Clock, Users, Settings } from "lucide-react"
import Link from "next/link"

const events = [
  {
    id: "1",
    name: "Tech Conference 2024",
    date: "2024-03-15",
    time: "09:00",
    location: "Centro de Convenções São Paulo",
    banner: "/tech-conference-hall.png",
    totalTickets: 500,
    soldTickets: 387,
    status: "active",
  },
  {
    id: "2",
    name: "Feira de Negócios Digital",
    date: "2024-03-22",
    time: "08:30",
    location: "Expo Center Norte",
    banner: "/business-digital-fair.png",
    totalTickets: 800,
    soldTickets: 654,
    status: "active",
  },
  {
    id: "3",
    name: "Congresso de Inovação",
    date: "2024-04-05",
    time: "14:00",
    location: "Hotel Grand Hyatt",
    banner: "/innovation-congress-auditorium.png",
    totalTickets: 300,
    soldTickets: 89,
    status: "draft",
  },
  {
    id: "4",
    name: "Workshop de Marketing",
    date: "2024-04-12",
    time: "10:00",
    location: "Espaço Coworking Premium",
    banner: "/marketing-workshop-meeting-room.png",
    totalTickets: 150,
    soldTickets: 142,
    status: "active",
  },
]

export function EventsGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Meus Eventos</h2>
        <Button variant="outline" size="sm">
          Ver Todos
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0">
            <div className="relative h-24 overflow-hidden">
              <img src={event.banner || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <Badge variant={event.status === "active" ? "default" : "secondary"} className="text-xs">
                  {event.status === "active" ? "Ativo" : "Rascunho"}
                </Badge>
              </div>
            </div>

            <CardContent className="p-3 space-y-2">
              <div>
                <h3 className="font-semibold text-sm text-foreground line-clamp-1">{event.name}</h3>
              </div>

              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  <span>{new Date(event.date).toLocaleDateString("pt-BR")}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>
                    {event.soldTickets}/{event.totalTickets} ingressos
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <Link href={`/events/${event.id}/manage`}>
                  <Button className="w-full text-xs" size="sm">
                    <Settings className="h-3 w-3 mr-1" />
                    Gerenciar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
