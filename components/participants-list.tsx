"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ParticipantDetailsModal } from "./participant-details-modal"
import { useState } from "react"
import { useParticipants } from "@/lib/api-hooks"
import { getParticipantStatusDisplay } from "@/lib/status-utils"
import { handleParticipantClick, navigateToOrder } from "@/lib/navigation-utils"
import { Users, Mail, QrCode } from "lucide-react"

interface ParticipantsListProps {
  eventId: string
}

export function ParticipantsList({ eventId }: ParticipantsListProps) {
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: participantsResponse, isLoading } = useParticipants(eventId)
  const participants = participantsResponse?.data || []

  const onParticipantClick = (participantId: string) => {
    handleParticipantClick(participantId, setSelectedParticipant, setIsModalOpen)
  }

  const onNavigateToOrder = (orderId: string) => {
    navigateToOrder(orderId)
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
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner />
            </div>
          )}

          {!isLoading && participants.length === 0 && (
            <div className="text-center py-8 space-y-3">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">Aguardando participantes</h3>
                <p className="text-sm text-muted-foreground">
                  Os participantes aparecerão aqui conforme se inscreverem no evento.
                </p>
              </div>
            </div>
          )}

          {!isLoading && participants.length > 0 && (
            <>
              {participants.slice(0, 5).map((participant) => {
                const statusDisplay = getParticipantStatusDisplay(participant.status, participant.checkedIn)
                return (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => onParticipantClick(participant.id)}
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
                      <Badge className={statusDisplay.color}>{statusDisplay.text}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}

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
            </>
          )}
        </CardContent>
      </Card>

      <ParticipantDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        participantId={selectedParticipant}
        onNavigateToOrder={onNavigateToOrder}
      />
    </>
  )
}
