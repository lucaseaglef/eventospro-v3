"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorState } from "@/components/ui/error-state"
import { CalendarDays, MapPin, Clock, Users, Settings, Calendar } from "lucide-react"
import Link from "next/link"
import { useEvents } from "@/lib/api-hooks"

export function EventsPageGrid() {
  const { data: events, isLoading, error } = useEvents()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />
  }

  if (!events || events.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="Nenhum evento encontrado"
        description="Você ainda não criou nenhum evento. Comece criando seu primeiro evento."
        action={{
          label: "Criar Evento",
          onClick: () => {
            // TODO: Navigate to create event page
            console.log("Navigate to create event")
          },
        }}
      />
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0">
          <div className="relative h-40 overflow-hidden">
            <img
              src={event.banner || `/placeholder.svg?height=160&width=320&query=event banner for ${event.name}`}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <Badge variant={event.status === "active" ? "default" : "secondary"}>
                {event.status === "active" ? "Ativo" : event.status === "draft" ? "Rascunho" : "Cancelado"}
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
