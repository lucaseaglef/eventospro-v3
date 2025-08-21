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
  {
    id: "5",
    name: "Seminário de Vendas",
    date: "2024-04-18",
    time: "13:30",
    location: "Auditório Corporate Center",
    banner: "/sales-seminar-presentation.png",
    totalTickets: 200,
    soldTickets: 156,
    status: "active",
  },
  {
    id: "6",
    name: "Curso de Liderança",
    date: "2024-04-25",
    time: "09:00",
    location: "Instituto de Desenvolvimento",
    banner: "/leadership-course-classroom.png",
    totalTickets: 80,
    soldTickets: 23,
    status: "draft",
  },
]

export function EventsPageGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0">
          <div className="relative h-40 overflow-hidden">
            <img
              src={event.banner || "/placeholder.svg?height=160&width=320&query=event banner"}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <Badge variant={event.status === "active" ? "default" : "secondary"}>
                {event.status === "active" ? "Ativo" : "Rascunho"}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-foreground text-lg line-clamp-2">{event.name}</h3>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString("pt-BR")}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">{event.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {event.soldTickets}/{event.totalTickets} ingressos
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              {/* Removed "Ver Detalhes" button */}
              <Link href={`/events/${event.id}/manage`}>
                <Button className="w-full" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Gerenciar Evento
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
