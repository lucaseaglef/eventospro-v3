import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Share2 } from "lucide-react"
import type React from "react"
import { EventSchedule } from "@/components/event-schedule" // Import new EventSchedule component

interface EventAboutSectionProps {
  event: {
    name: string
    subtitle: string
    description: string
    date: string
    time: string
    location: string
    images?: string[]
    organizer?: string
    capacity?: number
    category?: string
    website?: string
    socialLinks?: {
      instagram?: string
      facebook?: string
      twitter?: string
    }
    highlights?: string[]
    agenda?: {
      time: string
      title: string
      speaker?: string
    }[]
  }
  children?: React.ReactNode
}

export function EventAboutSection({ event, children }: EventAboutSectionProps) {
  const highlights = event.highlights || [
    "Palestrantes renomados do mercado tech",
    "Networking com profissionais da área",
    "Workshops práticos e hands-on",
    "Certificado de participação",
    "Kit exclusivo para participantes",
  ]

  return (
    <div className="space-y-8">
      {/* About Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Sobre o Evento</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{event.description}</p>

          {children && <div className="mb-8">{children}</div>}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Destaques do Evento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New EventSchedule Component */}
      <EventSchedule agenda={event.agenda} />

      {/* Organizer & Links */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-semibold mb-1">Organizador</h3>
              <p className="text-muted-foreground">{event.organizer || "TechEvents Brasil"}</p>
            </div>

            <div className="flex gap-2">
              {event.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={event.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Site do Evento
                  </a>
                </Button>
              )}

              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
