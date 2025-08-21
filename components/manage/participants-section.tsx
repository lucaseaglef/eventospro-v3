"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Mail, Filter, Users, UserCheck, UserX, Clock } from "lucide-react"
import { ParticipantDetailsModal } from "../participant-details-modal"
import { useState } from "react"

interface ParticipantsSectionProps {
  eventId: string
}

const participants = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    ticketType: "VIP",
    registrationDate: "2024-02-15",
    status: "confirmed",
    checkedIn: true,
  },
  {
    id: "2",
    name: "Carlos Santos",
    email: "carlos.santos@email.com",
    ticketType: "Premium",
    registrationDate: "2024-02-18",
    status: "confirmed",
    checkedIn: false,
  },
  {
    id: "3",
    name: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    ticketType: "Standard",
    registrationDate: "2024-02-20",
    status: "pending",
    checkedIn: false,
  },
]

export function ParticipantsSection({ eventId }: ParticipantsSectionProps) {
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleParticipantClick = (participantId: string) => {
    console.log("[v0] Clique no participante (gerenciamento):", participantId)
    setSelectedParticipant(participantId)
    setIsModalOpen(true)
  }

  const handleNavigateToOrder = (orderId: string) => {
    console.log("Navegando para pedido:", orderId)
    window.location.href = `/sales?order=${orderId}`
  }

  const getSelectedParticipantData = () => {
    if (!selectedParticipant) return null

    const participant = participants.find((p) => p.id === selectedParticipant)
    if (!participant) return null

    return {
      id: `PART-${participant.id.padStart(3, "0")}`,
      nome: participant.name,
      email: participant.email,
      telefone: "(11) 99999-9999",
      documento: "123.456.789-00",
      empresa: "TechCorp",
      cargo: "Desenvolvedor Senior",
      endereco: "Rua das Flores, 123",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",

      ingressoId: `REG${participant.id.padStart(3, "0")}-245E166F`,
      tipoIngresso: participant.ticketType,
      codigoIngresso: `${participant.ticketType.toUpperCase()}2024-${participant.id.padStart(3, "0")}`,
      qrCode:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+",

      numeroPedido: `VENDA-${participant.id.padStart(3, "0")}`,
      valorIngresso: participant.ticketType === "VIP" ? 299.9 : participant.ticketType === "Premium" ? 199.9 : 99.9,

      status:
        participant.status === "confirmed" ? "confirmado" : participant.status === "pending" ? "pendente" : "cancelado",
      checkinRealizado: participant.checkedIn,
      dataRegistro: participant.registrationDate + "T14:30:00Z",
      dataCheckin: participant.checkedIn ? "2024-11-20T09:15:00Z" : undefined,

      historico: [
        {
          id: "1",
          acao: "Inscrição realizada",
          data: participant.registrationDate + "T14:30:00Z",
          detalhes: "Participante se inscreveu no evento",
          tipo: "info" as const,
        },
        {
          id: "2",
          acao: "Pagamento confirmado",
          data: participant.registrationDate + "T14:35:00Z",
          detalhes: "Pagamento via cartão de crédito aprovado",
          tipo: "success" as const,
        },
        ...(participant.checkedIn
          ? [
              {
                id: "3",
                acao: "Check-in realizado",
                data: "2024-11-20T09:15:00Z",
                detalhes: "Check-in realizado na recepção do evento",
                tipo: "success" as const,
              },
            ]
          : []),
      ],

      avatar: "/placeholder.svg",
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Participantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">387</div>
              <p className="text-xs text-muted-foreground">+12% desde ontem</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Check-in Realizado</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">40% do total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Aguardando confirmação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2% do total</p>
            </CardContent>
          </Card>
        </div>

        {/* Participants Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Participantes</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Email
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar participantes..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleParticipantClick(participant.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{participant.name}</div>
                      <div className="text-sm text-muted-foreground">{participant.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{participant.ticketType}</Badge>
                    <Badge variant={participant.status === "confirmed" ? "default" : "secondary"}>
                      {participant.status === "confirmed" ? "Confirmado" : "Pendente"}
                    </Badge>
                    {participant.checkedIn && (
                      <Badge variant="default" className="bg-green-500">
                        Check-in
                      </Badge>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {new Date(participant.registrationDate).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participant Details Modal */}
      <ParticipantDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        participante={getSelectedParticipantData()}
        onNavigateToOrder={handleNavigateToOrder}
      />
    </>
  )
}
