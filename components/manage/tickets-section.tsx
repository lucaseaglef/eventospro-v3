"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Ticket, TrendingUp, Users, DollarSign } from "lucide-react"
import { useState } from "react"
import { CreateTicketForm } from "@/components/create-ticket-form"
import { useTickets } from "@/hooks/use-tickets"

interface TicketsSectionProps {
  eventId: string
}

export function TicketsSection({ eventId }: TicketsSectionProps) {
  const { tickets, addTicket, updateTicket, deleteTicket } = useTickets(eventId)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingTicket, setEditingTicket] = useState<any>(null)

  const handleCreateTicket = (ticketData: any) => {
    addTicket(ticketData)
    setShowCreateForm(false)
  }

  const handleEditTicket = (ticketData: any) => {
    updateTicket(editingTicket.id, ticketData)
    setEditingTicket(null)
  }

  const handleStartEdit = (ticket: any) => {
    setEditingTicket(ticket)
  }

  const handleDeleteTicket = (ticketId: string) => {
    if (confirm("Tem certeza que deseja excluir este ingresso?")) {
      deleteTicket(ticketId)
    }
  }

  if (showCreateForm || editingTicket) {
    return (
      <CreateTicketForm
        initialData={editingTicket}
        onSubmit={editingTicket ? handleEditTicket : handleCreateTicket}
        onCancel={() => {
          setShowCreateForm(false)
          setEditingTicket(null)
        }}
      />
    )
  }

  const totalSold = tickets.reduce((sum, ticket) => {
    const sold = Number(ticket.sold) || 0
    return sum + (isNaN(sold) ? 0 : sold)
  }, 0)

  const totalQuantity = tickets.reduce((sum, ticket) => {
    const quantity = Number(ticket.quantity) || 0
    return sum + (isNaN(quantity) ? 0 : quantity)
  }, 0)

  const totalRevenue = tickets.reduce((sum, ticket) => {
    const price = Number(ticket.price) || 0
    const sold = Number(ticket.sold) || 0
    if (isNaN(price) || isNaN(sold)) return sum
    return sum + sold * price
  }, 0)

  const conversionRate = totalQuantity > 0 ? (totalSold / totalQuantity) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tipos de Ingresso</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.length}</div>
            <p className="text-xs text-muted-foreground">Ativos no evento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendido</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSold}</div>
            <p className="text-xs text-muted-foreground">
              {isNaN(conversionRate) ? "0" : Math.round(conversionRate)}% da capacidade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {isNaN(totalRevenue) ? "0,00" : totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Receita atual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNaN(conversionRate) ? "0.0" : conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Vendidos vs Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Types */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tipos de Ingresso</CardTitle>
            <div className="flex items-center gap-2">
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Tipo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => {
              const ticketPrice = Number(ticket.price) || 0
              const ticketSold = Number(ticket.sold) || 0
              const ticketQuantity = Number(ticket.quantity) || 0
              const ticketProgress = ticketQuantity > 0 ? (ticketSold / ticketQuantity) * 100 : 0

              return (
                <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Ticket className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{ticket.name}</div>
                      <div className="text-sm text-muted-foreground">{ticket.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-medium">R$ {isNaN(ticketPrice) ? "0,00" : ticketPrice.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Preço unitário</div>
                    </div>

                    <div className="text-right">
                      <div className="font-medium">
                        {isNaN(ticketSold) ? "0" : ticketSold}/{isNaN(ticketQuantity) ? "0" : ticketQuantity}
                      </div>
                      <div className="text-sm text-muted-foreground">Vendidos</div>
                    </div>

                    <div className="w-24">
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${Math.min(isNaN(ticketProgress) ? 0 : ticketProgress, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {isNaN(ticketProgress) ? "0" : Math.round(ticketProgress)}%
                      </div>
                    </div>

                    <Badge variant={ticket.active ? "default" : "secondary"}>
                      {ticket.active ? "Ativo" : "Inativo"}
                    </Badge>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleStartEdit(ticket)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteTicket(ticket.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
