"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { CalendarDays, MapPin, Clock, Users, Settings, Calendar, Plus } from "lucide-react"
import Link from "next/link"
import { useEvents } from "@/lib/api-hooks"

export function EventsGrid() {
  const { data: events, isLoading } = useEvents({ status: "active" })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Meus Eventos</h2>
        <Link href="/events">
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {!isLoading && (!events || events.length === 0) && (
        <div className="text-center py-12 space-y-4">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Crie seu primeiro evento</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Comece a vender ingressos e gerenciar participantes criando seu primeiro evento.
            </p>
          </div>
          <Button className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Criar Evento
          </Button>
        </div>
      )}

      {!isLoading && events && events.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.slice(0, 8).map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0">
              <div className="relative h-24 overflow-hidden">
                <img
                  src={event.banner || `/placeholder.svg?height=96&width=320&query=event banner for ${event.name}`}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={event.status === "active" ? "default" : "secondary"} className="text-xs">
                    {event.status === "active" ? "Ativo" : event.status === "draft" ? "Rascunho" : "Cancelado"}
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
      )}
    </div>
  )
}
