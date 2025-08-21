"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface ParticipantData {
  name: string
  email: string
  document: string
}

interface BuyerData {
  name: string
  email: string
  phone: string
  document: string
}

interface TicketType {
  id: string
  name: string
  price: number
  quantity: number
}

interface ParticipantsFormProps {
  participants: ParticipantData[]
  onChange: (participants: ParticipantData[]) => void
  totalTickets: number
  buyerData: BuyerData
  selectedTickets: TicketType[]
}

export function ParticipantsForm({
  participants,
  onChange,
  totalTickets,
  buyerData,
  selectedTickets,
}: ParticipantsFormProps) {
  const [useBuyerDataFor, setUseBuyerDataFor] = useState<number | null>(null)

  const ticketList: { name: string; type: string }[] = []
  selectedTickets.forEach((ticket) => {
    for (let i = 0; i < ticket.quantity; i++) {
      ticketList.push({ name: ticket.name, type: ticket.id })
    }
  })

  // Initialize participants array if empty
  if (participants.length === 0 && totalTickets > 0) {
    const newParticipants = Array.from({ length: totalTickets }, () => ({
      name: "",
      email: "",
      document: "",
    }))
    onChange(newParticipants)
  }

  const handleParticipantChange = (index: number, field: keyof ParticipantData, value: string) => {
    const updated = [...participants]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const handleUseBuyerData = (participantIndex: number) => {
    const updated = [...participants]

    // Limpar dados do participante anterior se houver
    if (useBuyerDataFor !== null && useBuyerDataFor !== participantIndex) {
      updated[useBuyerDataFor] = {
        name: "",
        email: "",
        document: "",
      }
    }

    if (useBuyerDataFor === participantIndex) {
      // Desmarcar
      setUseBuyerDataFor(null)
      updated[participantIndex] = {
        name: "",
        email: "",
        document: "",
      }
    } else {
      // Marcar novo participante
      setUseBuyerDataFor(participantIndex)
      updated[participantIndex] = {
        name: buyerData.name,
        email: buyerData.email,
        document: buyerData.document,
      }
    }

    onChange(updated)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dados dos participantes</h2>
        <p className="text-muted-foreground">Preencha os dados de cada participante ({totalTickets} ingressos)</p>
      </div>

      <div className="space-y-6">
        {participants.map((participant, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Participante {index + 1}</h3>
                <p className="text-sm text-muted-foreground font-medium">{ticketList[index]?.name || "Ingresso"}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`use-buyer-data-${index}`}
                  checked={useBuyerDataFor === index}
                  onCheckedChange={() => handleUseBuyerData(index)}
                />
                <Label htmlFor={`use-buyer-data-${index}`} className="text-sm">
                  Usar dados do comprador
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`participant-name-${index}`}>Nome completo *</Label>
                <Input
                  id={`participant-name-${index}`}
                  value={participant.name}
                  onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
                  placeholder="Nome completo"
                  disabled={useBuyerDataFor === index}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`participant-email-${index}`}>E-mail *</Label>
                <Input
                  id={`participant-email-${index}`}
                  type="email"
                  value={participant.email}
                  onChange={(e) => handleParticipantChange(index, "email", e.target.value)}
                  placeholder="email@exemplo.com"
                  disabled={useBuyerDataFor === index}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`participant-document-${index}`}>CPF *</Label>
                <Input
                  id={`participant-document-${index}`}
                  value={participant.document}
                  onChange={(e) => handleParticipantChange(index, "document", e.target.value)}
                  placeholder="000.000.000-00"
                  disabled={useBuyerDataFor === index}
                  required
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
