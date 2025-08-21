"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QrCode, Camera, CheckCircle, AlertCircle, User } from "lucide-react"

interface CheckInKioskProps {
  eventId: string
}

export function CheckInKiosk({ eventId }: CheckInKioskProps) {
  const [step, setStep] = useState<"scan" | "confirm" | "success" | "error">("scan")
  const [qrCode, setQrCode] = useState("")
  const [participant, setParticipant] = useState(null)

  const mockParticipant = {
    name: "Ana Silva",
    email: "ana.silva@email.com",
    company: "TechCorp",
    ticketType: "VIP Experience",
    qrCode: "QR001234",
    avatar: "/professional-woman.png",
  }

  const handleScan = () => {
    if (qrCode) {
      setParticipant(mockParticipant)
      setStep("confirm")
    }
  }

  const handleConfirm = () => {
    setStep("success")
    setTimeout(() => {
      setStep("scan")
      setQrCode("")
      setParticipant(null)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Tech Summit 2024</h1>
          <p className="text-xl text-muted-foreground">Sistema de Check-in</p>
        </div>

        {/* Main Card */}
        <Card className="bg-card">
          <CardContent className="p-8">
            {step === "scan" && (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-primary" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Bem-vindo ao Evento!</h2>
                  <p className="text-muted-foreground">Escaneie seu QR code ou digite o código para fazer check-in</p>
                </div>

                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Digite ou escaneie seu código QR"
                      value={qrCode}
                      onChange={(e) => setQrCode(e.target.value)}
                      className="text-lg h-12 bg-input"
                    />
                    <Button onClick={handleScan} disabled={!qrCode} size="lg">
                      <QrCode className="h-5 w-5" />
                    </Button>
                  </div>

                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    <Camera className="mr-2 h-5 w-5" />
                    Usar Câmera para Escanear
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Precisa de ajuda? Procure um organizador do evento.</p>
                </div>
              </div>
            )}

            {step === "confirm" && participant && (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-chart-2/10 rounded-full flex items-center justify-center">
                  <User className="h-16 w-16 text-chart-2" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Confirme seus Dados</h2>

                  <div className="bg-muted rounded-lg p-6 space-y-4">
                    <Avatar className="h-20 w-20 mx-auto">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                      <AvatarFallback className="text-lg">
                        {participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{participant.name}</h3>
                      <p className="text-muted-foreground">{participant.email}</p>
                      <p className="text-sm text-muted-foreground">{participant.company}</p>
                    </div>

                    <Badge className="bg-chart-1 text-white">{participant.ticketType}</Badge>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" size="lg" onClick={() => setStep("scan")} className="flex-1 bg-transparent">
                    Cancelar
                  </Button>
                  <Button size="lg" onClick={handleConfirm} className="flex-1 bg-primary text-primary-foreground">
                    Confirmar Check-in
                  </Button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-chart-1/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-16 w-16 text-chart-1" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-chart-1 mb-2">Check-in Realizado!</h2>
                  <p className="text-lg text-foreground">Bem-vindo ao Tech Summit 2024</p>
                  <p className="text-muted-foreground">Aproveite o evento!</p>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Seu crachá será enviado por email. Guarde este comprovante de check-in.
                  </p>
                </div>
              </div>
            )}

            {step === "error" && (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-chart-3/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-16 w-16 text-chart-3" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-chart-3 mb-2">Erro no Check-in</h2>
                  <p className="text-muted-foreground">
                    Não foi possível validar seu QR code. Verifique o código ou procure um organizador.
                  </p>
                </div>

                <Button size="lg" onClick={() => setStep("scan")} className="bg-primary text-primary-foreground">
                  Tentar Novamente
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>EventPro - Sistema de Credenciamento</p>
        </div>
      </div>
    </div>
  )
}
