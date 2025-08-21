"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Download, Mail, MoreHorizontal, Eye, RefreshCw, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ParticipantsQRListProps {
  eventId: string
}

const participants = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    company: "TechCorp",
    qrCode: "QR001234",
    status: "Gerado",
    sent: true,
    downloaded: true,
    generatedAt: "2024-12-10 14:30",
    avatar: "/professional-woman.png",
  },
  {
    id: 2,
    name: "Carlos Santos",
    email: "carlos@startup.com",
    company: "StartupXYZ",
    qrCode: "QR001235",
    status: "Gerado",
    sent: true,
    downloaded: false,
    generatedAt: "2024-12-10 14:32",
    avatar: "/professional-man.png",
  },
  {
    id: 3,
    name: "Maria Oliveira",
    email: "maria@empresa.com",
    company: "Empresa ABC",
    qrCode: "QR001236",
    status: "Pendente",
    sent: false,
    downloaded: false,
    generatedAt: null,
    avatar: "/business-woman.png",
  },
  {
    id: 4,
    name: "João Costa",
    email: "joao@tech.com",
    company: "TechSolutions",
    qrCode: "QR001237",
    status: "Gerado",
    sent: false,
    downloaded: true,
    generatedAt: "2024-12-10 14:35",
    avatar: "/man-tech.png",
  },
]

export function ParticipantsQRList({ eventId }: ParticipantsQRListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([])
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || participant.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  const toggleParticipant = (id: number) => {
    setSelectedParticipants((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    setSelectedParticipants(
      selectedParticipants.length === filteredParticipants.length ? [] : filteredParticipants.map((p) => p.id),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Gerado":
        return "bg-chart-1 text-white"
      case "Pendente":
        return "bg-chart-4 text-white"
      case "Erro":
        return "bg-chart-3 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">QR Codes dos Participantes</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled={selectedParticipants.length === 0}>
              <Mail className="mr-2 h-4 w-4" />
              Enviar Selecionados
            </Button>
            <Button variant="outline" size="sm" disabled={selectedParticipants.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              Download Selecionados
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar participantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>Todos</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("gerado")}>Gerados</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("pendente")}>Pendentes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-border">
            <Checkbox
              checked={selectedParticipants.length === filteredParticipants.length && filteredParticipants.length > 0}
              onCheckedChange={toggleAll}
            />
            <span className="text-sm text-muted-foreground">
              {selectedParticipants.length} de {filteredParticipants.length} selecionados
            </span>
          </div>

          {filteredParticipants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedParticipants.includes(participant.id)}
                  onCheckedChange={() => toggleParticipant(participant.id)}
                />

                <Avatar className="h-10 w-10">
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
                  <p className="text-xs text-muted-foreground">{participant.email}</p>
                  <p className="text-xs text-muted-foreground">{participant.company}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-xs font-mono text-foreground">{participant.qrCode}</p>
                  {participant.generatedAt && (
                    <p className="text-xs text-muted-foreground">{participant.generatedAt}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {participant.sent && (
                    <Badge variant="secondary" className="bg-chart-2 text-white text-xs">
                      Enviado
                    </Badge>
                  )}
                  {participant.downloaded && (
                    <Badge variant="secondary" className="bg-chart-1 text-white text-xs">
                      Baixado
                    </Badge>
                  )}
                </div>

                <Badge className={getStatusColor(participant.status)}>{participant.status}</Badge>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar QR Code
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar por Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
