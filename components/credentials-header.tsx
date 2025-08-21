"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, Download, RefreshCw, Play, Pause } from "lucide-react"

export function CredentialsHeader() {
  const [selectedEvent, setSelectedEvent] = useState("tech-summit-2024")
  const [credentialingActive, setCredentialingActive] = useState(true)

  const events = [
    { id: "tech-summit-2024", name: "Tech Summit 2024", status: "Ativo" },
    { id: "feira-negocios", name: "Feira de Negócios", status: "Programado" },
    { id: "congresso-medico", name: "Congresso Médico", status: "Programado" },
  ]

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Credenciamento</h1>
          <p className="text-muted-foreground">Sistema de check-in e controle de acesso</p>
        </div>

        <div className="flex items-center space-x-2">
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="w-64 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  <div className="flex items-center space-x-2">
                    <span>{event.name}</span>
                    <Badge className={event.status === "Ativo" ? "bg-chart-1 text-white" : "bg-chart-4 text-white"}>
                      {event.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant={credentialingActive ? "destructive" : "default"}
          size="sm"
          onClick={() => setCredentialingActive(!credentialingActive)}
        >
          {credentialingActive ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pausar Credenciamento
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Iniciar Credenciamento
            </>
          )}
        </Button>

        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Atualizar
        </Button>

        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Relatório
        </Button>

        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Configurações
        </Button>
      </div>
    </div>
  )
}
