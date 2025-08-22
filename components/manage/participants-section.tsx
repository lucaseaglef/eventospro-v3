"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Mail, Filter, Users, UserCheck, UserX, Clock } from "lucide-react"
import { ParticipantDetailsModal } from "../participant-details-modal"
import { useState } from "react"
import { useParticipants, useEventMetrics } from "@/lib/api-hooks"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"

interface ParticipantsSectionProps {
  eventId: string
}

export function ParticipantsSection({ eventId }: ParticipantsSectionProps) {
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data: participantsData,
    isLoading: participantsLoading,
    error: participantsError,
  } = useParticipants(eventId, { limit: 5 })
  const { data: metricsData, isLoading: metricsLoading } = useEventMetrics(eventId)

  const handleParticipantClick = (participantId: string) => {
    setSelectedParticipant(participantId)
    setIsModalOpen(true)
  }

  const handleNavigateToOrder = (orderId: string) => {
    window.location.href = `/sales?order=${orderId}`
  }

  const getSelectedParticipantData = () => {
    if (!selectedParticipant || !participantsData?.data) return null

    const participant = participantsData.data.find((p) => p.id === selectedParticipant)
    if (!participant) return null

    return {
      id: participant.id,
      nome: participant.name,
      email: participant.email,
      telefone: participant.phone || "(11) 99999-9999",
      documento: participant.document || "123.456.789-00",
      empresa: participant.company || "Empresa não informada",
      cargo: participant.position || "Cargo não informado",
      endereco: participant.address || "Endereço não informado",
      cidade: participant.city || "São Paulo",
      estado: participant.state || "SP",
      cep: participant.zipCode || "01234-567",

      ingressoId: participant.ticketId || `REG${participant.id}-245E166F`,
      tipoIngresso: participant.ticketType || "Regular",
      codigoIngresso: participant.ticketCode || `CODE-${participant.id}`,
      qrCode:
        participant.qrCode ||
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+",

      numeroPedido: participant.orderId || `ORDER-${participant.id}`,
      valorIngresso: participant.ticketPrice || 99.9,

      status: participant.status as "confirmado" | "pendente" | "cancelado",
      checkinRealizado: participant.checkedIn || false,
      dataRegistro: participant.createdAt || new Date().toISOString(),
      dataCheckin: participant.checkedInAt,

      historico: participant.history || [
        {
          id: "1",
          acao: "Inscrição realizada",
          data: participant.createdAt || new Date().toISOString(),
          detalhes: "Participante se inscreveu no evento",
          tipo: "info" as const,
        },
      ],

      avatar: participant.avatar,
    }
  }

  if (participantsLoading || metricsLoading) {
    return <LoadingSpinner message="Carregando dados dos participantes..." />
  }

  if (participantsError) {
    return <ErrorState message="Erro ao carregar participantes" />
  }

  const metrics = metricsData || {
    totalParticipants: 0,
    checkedInParticipants: 0,
    pendingParticipants: 0,
    cancelledParticipants: 0,
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
              <div className="text-2xl font-bold">{metrics.totalParticipants}</div>
              <p className="text-xs text-muted-foreground">
                {metrics.totalParticipants === 0 ? "Nenhum participante ainda" : "Participantes confirmados"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Check-in Realizado</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.checkedInParticipants}</div>
              <p className="text-xs text-muted-foreground">
                {metrics.totalParticipants > 0
                  ? `${Math.round((metrics.checkedInParticipants / metrics.totalParticipants) * 100)}% do total`
                  : "Aguardando participantes"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.pendingParticipants}</div>
              <p className="text-xs text-muted-foreground">Aguardando confirmação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.cancelledParticipants}</div>
              <p className="text-xs text-muted-foreground">
                {metrics.totalParticipants > 0
                  ? `${Math.round((metrics.cancelledParticipants / metrics.totalParticipants) * 100)}% do total`
                  : "Nenhum cancelamento"}
              </p>
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
            {!participantsData?.data || participantsData.data.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum participante ainda</h3>
                <p className="text-muted-foreground">
                  Os participantes aparecerão aqui conforme se inscreverem no evento.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {participantsData.data.map((participant) => (
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
                      <Badge variant="outline">{participant.ticketType || "Regular"}</Badge>
                      <Badge variant={participant.status === "confirmado" ? "default" : "secondary"}>
                        {participant.status}
                      </Badge>
                      {participant.checkedIn && (
                        <Badge variant="default" className="bg-green-500">
                          Check-in
                        </Badge>
                      )}
                      <div className="text-sm text-muted-foreground">
                        {new Date(participant.createdAt || Date.now()).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
