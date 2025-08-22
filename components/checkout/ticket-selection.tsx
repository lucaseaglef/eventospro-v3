"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface TicketType {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  available: number
  features: string[]
}

interface SelectedTicket {
  id: string
  name: string
  price: number
  quantity: number
}

interface TicketSelectionProps {
  event: {
    name: string
    ticketTypes: TicketType[]
  }
  selectedTickets: SelectedTicket[]
  onTicketSelect: (ticketId: string) => void
}

export function TicketSelection({ event, selectedTickets, onTicketSelect }: TicketSelectionProps) {
  const isTicketSelected = (ticketId: string) => {
    return selectedTickets.some((t) => t.id === ticketId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Selecione seus ingressos</h2>
        <p className="text-muted-foreground">Clique no ingresso para adicioná-lo ao seu pedido</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {event.ticketTypes.map((ticket) => (
          <Card
            key={ticket.id}
            className={`cursor-pointer transition-all hover:border-primary/50 hover:shadow-md ${
              isTicketSelected(ticket.id) ? "border-primary bg-primary/5" : ""
            }`}
            onClick={() => onTicketSelect(ticket.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-card-foreground">{ticket.name}</h3>
                {ticket.originalPrice && (
                  <Badge className="bg-secondary text-secondary-foreground text-xs">
                    {Math.round(((ticket.originalPrice - ticket.price) / ticket.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{ticket.description}</p>

              <div className="space-y-1 mb-4">
                {ticket.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-3 w-3 text-primary flex-shrink-0" />
                    <span className="text-xs text-card-foreground">{feature}</span>
                  </div>
                ))}
                {ticket.features.length > 2 && (
                  <p className="text-xs text-muted-foreground">+{ticket.features.length - 2} benefícios</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-primary">R$ {ticket.price.toFixed(2)}</span>
                  {ticket.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      R$ {ticket.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{ticket.available} disponíveis</p>
              </div>

              {isTicketSelected(ticket.id) && (
                <div className="mt-3 flex items-center justify-center">
                  <div className="flex items-center space-x-1 text-primary text-sm font-medium">
                    <Check className="h-4 w-4" />
                    <span>Adicionado ao pedido</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
