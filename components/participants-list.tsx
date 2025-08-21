"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, QrCode } from "lucide-react"
import { ParticipantDetailsModal } from "./participant-details-modal"
import { useState } from "react"

interface ParticipantsListProps {
  eventId: string
}

const participants = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    company: "TechCorp",
    status: "Confirmado",
    checkedIn: false,
    avatar: "/professional-woman.png",
    numeroPedido: "VENDA-001", // Vinculação com pedido existente
    tipoIngresso: "Ingresso VIP",
    codigoIngresso: "VIP2024-001",
  },
  {
    id: 2,
    name: "Carlos Santos",
    email: "carlos@startup.com",
    company: "StartupXYZ",
    status: "Pendente",
    checkedIn: false,
    avatar: "/professional-man.png",
    numeroPedido: "VENDA-002",
    tipoIngresso: "Ingresso Regular",
    codigoIngresso: "REG2024-002",
  },
  {
    id: 3,
    name: "Maria Oliveira",
    email: "maria@empresa.com",
    company: "Empresa ABC",
    status: "Confirmado",
    checkedIn: true,
    avatar: "/business-woman.png",
    numeroPedido: "VENDA-003",
    tipoIngresso: "Ingresso Premium",
    codigoIngresso: "PREM2024-003",
  },
  {
    id: 4,
    name: "João Costa",
    email: "joao@tech.com",
    company: "TechSolutions",
    status: "Confirmado",
    checkedIn: false,
    avatar: "/man-tech.png",
    numeroPedido: "VENDA-004",
    tipoIngresso: "Ingresso Estudante",
    codigoIngresso: "EST2024-004",
  },
]

export function ParticipantsList({ eventId }: ParticipantsListProps) {
  const [selectedParticipant, setSelectedParticipant] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatusColor = (status: string, checkedIn: boolean) => {
    if (checkedIn) return "bg-chart-1 text-white"
    if (status === "Confirmado") return "bg-chart-2 text-white"
    return "bg-chart-4 text-white"
  }

  const getStatusText = (status: string, checkedIn: boolean) => {
    if (checkedIn) return "Check-in Feito"
    return status
  }

  const handleParticipantClick = (participantId: number) => {
    console.log("[v0] Clique no participante detectado:", participantId)
    console.log("[v0] Estado atual do modal:", isModalOpen)

    setSelectedParticipant(participantId)
    setIsModalOpen(true)

    console.log("[v0] Participante selecionado:", participantId)
    console.log("[v0] Modal deve abrir agora")
  }

  const handleNavigateToOrder = (orderId: string) => {
    console.log("Navegando para pedido:", orderId)
    // Navega para página de vendas e abre o modal do pedido específico
    window.location.href = `/sales?order=${orderId}`
  }

  const getSelectedParticipantData = () => {
    if (!selectedParticipant) return null

    const participant = participants.find((p) => p.id === selectedParticipant)
    if (!participant) return null

    return {
      id: `PART-${participant.id.toString().padStart(3, "0")}`,
      nome: participant.name,
      email: participant.email,
      telefone: "(11) 99999-9999",
      documento: "123.456.789-00",
      empresa: participant.company,
      cargo: "Desenvolvedor Senior",
      endereco: "Rua das Flores, 123",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",

      ingressoId: `REG${participant.id.toString().padStart(3, "0")}-245E166F`,
      tipoIngresso: participant.tipoIngresso,
      codigoIngresso: participant.codigoIngresso,
      qrCode:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+",

      numeroPedido: participant.numeroPedido,
      valorIngresso: 149.9,

      status: participant.status.toLowerCase() as "confirmado" | "pendente" | "cancelado",
      checkinRealizado: participant.checkedIn,
      dataRegistro: "2024-11-15T14:30:00Z",
      dataCheckin: participant.checkedIn ? "2024-11-20T09:15:00Z" : undefined,

      historico: [
        {
          id: "1",
          acao: "Inscrição realizada",
          data: "2024-11-15T14:30:00Z",
          detalhes: "Participante se inscreveu no evento",
          tipo: "info" as const,
        },
        {
          id: "2",
          acao: "Pagamento confirmado",
          data: "2024-11-15T14:35:00Z",
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

      avatar: participant.avatar,
    }
  }

  return (
    <>
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Participantes</CardTitle>
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => {
                console.log("[v0] Div clicada, chamando handleParticipantClick")
                handleParticipantClick(participant.id)
              }}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                  <AvatarFallback>
                    {participant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{participant.name}</p>
                  <p className="text-xs text-muted-foreground">{participant.company}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(participant.status, participant.checkedIn)}>
                  {getStatusText(participant.status, participant.checkedIn)}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <div className="flex space-x-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Mail className="mr-2 h-4 w-4" />
              Enviar Email
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <QrCode className="mr-2 h-4 w-4" />
              Gerar QR Codes
            </Button>
          </div>
        </CardContent>
      </Card>

      <ParticipantDetailsModal
        open={isModalOpen}
        onOpenChange={(open) => {
          console.log("[v0] Modal onOpenChange chamado:", open)
          setIsModalOpen(open)
        }}
        participante={getSelectedParticipantData()}
        onNavigateToOrder={handleNavigateToOrder}
      />
    </>
  )
}
