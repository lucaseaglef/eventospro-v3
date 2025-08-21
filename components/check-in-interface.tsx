"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QrCode, Search, UserCheck, CheckCircle, Camera } from "lucide-react"

export function CheckInInterface() {
  const [qrCode, setQrCode] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [scannerActive, setScannerActive] = useState(false)
  const [lastCheckIn, setLastCheckIn] = useState(null)

  // Mock participant data
  const mockParticipant = {
    name: "Ana Silva",
    email: "ana.silva@email.com",
    company: "TechCorp",
    ticketType: "VIP Experience",
    qrCode: "QR001234",
    status: "Válido",
    avatar: "/professional-woman.png",
  }

  const handleQRScan = () => {
    // Simulate QR code scan
    setLastCheckIn(mockParticipant)
    setQrCode("")
  }

  const handleManualSearch = () => {
    // Simulate manual search
    if (searchTerm.toLowerCase().includes("ana")) {
      setLastCheckIn(mockParticipant)
      setSearchTerm("")
    }
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <UserCheck className="mr-2 h-6 w-6" />
          Interface de Check-in
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* QR Code Scanner */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Leitura de QR Code</h3>

            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Escaneie ou digite o código QR"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  className="bg-input"
                />
                <Button onClick={handleQRScan} disabled={!qrCode}>
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setScannerActive(!scannerActive)}
              >
                <Camera className="mr-2 h-4 w-4" />
                {scannerActive ? "Parar Scanner" : "Ativar Scanner de Câmera"}
              </Button>

              {scannerActive && (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Scanner de QR Code Ativo</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Manual Search */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Busca Manual</h3>

            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Nome, email ou empresa"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-input"
                />
                <Button onClick={handleManualSearch} disabled={!searchTerm}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>• Digite o nome completo ou parcial</p>
                <p>• Use o email para busca exata</p>
                <p>• Busque pela empresa do participante</p>
              </div>
            </div>
          </div>
        </div>

        {/* Check-in Result */}
        {lastCheckIn && (
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Resultado do Check-in</h3>

            <div className="bg-muted rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={lastCheckIn.avatar || "/placeholder.svg"} alt={lastCheckIn.name} />
                    <AvatarFallback>
                      {lastCheckIn.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground">{lastCheckIn.name}</h4>
                    <p className="text-muted-foreground">{lastCheckIn.email}</p>
                    <p className="text-sm text-muted-foreground">{lastCheckIn.company}</p>
                  </div>
                </div>

                <div className="text-right">
                  <Badge className="bg-chart-1 text-white mb-2">{lastCheckIn.ticketType}</Badge>
                  <p className="text-sm font-mono text-foreground">{lastCheckIn.qrCode}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-chart-1" />
                  <span className="text-foreground font-medium">Check-in realizado com sucesso!</span>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Imprimir Crachá
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground">
                    Confirmar Check-in
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-chart-1">15</div>
            <p className="text-sm text-muted-foreground">Check-ins na última hora</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-chart-2">2.1 min</div>
            <p className="text-sm text-muted-foreground">Tempo médio por check-in</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-chart-3">98.5%</div>
            <p className="text-sm text-muted-foreground">Taxa de sucesso</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
