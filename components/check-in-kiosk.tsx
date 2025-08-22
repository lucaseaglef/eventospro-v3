"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { QrCode, Camera, CheckCircle, AlertCircle, User, Wifi, WifiOff } from "lucide-react"
import { useCheckInParticipant, useEvent } from "@/lib/api-hooks"
import type { Participant } from "@/lib/types"

interface CheckInKioskProps {
  eventId: string
}

type KioskStep = "scan" | "confirm" | "success" | "error" | "offline"

export const CheckInKiosk = ({ eventId }: CheckInKioskProps) => {
  const [step, setStep] = useState<KioskStep>("scan")
  const [qrCode, setQrCode] = useState("")
  const [participant, setParticipant] = useState<Participant | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [autoResetTimer, setAutoResetTimer] = useState<NodeJS.Timeout | null>(null)

  const { data: event, error: eventError } = useEvent(eventId)
  const { checkIn, isLoading } = useCheckInParticipant()

  const handleOnline = useCallback(() => {
    setIsOnline(true)
    if (step === "offline") {
      setStep("scan")
    }
  }, [step])

  const handleOffline = useCallback(() => {
    setIsOnline(false)
    setStep("offline")
  }, [])

  useEffect(() => {
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [handleOnline, handleOffline])

  const startAutoReset = useCallback(
    (delay = 5000) => {
      if (autoResetTimer) {
        clearTimeout(autoResetTimer)
      }

      const timer = setTimeout(() => {
        resetToScan()
      }, delay)

      setAutoResetTimer(timer)
    },
    [autoResetTimer],
  )

  const clearAutoReset = useCallback(() => {
    if (autoResetTimer) {
      clearTimeout(autoResetTimer)
      setAutoResetTimer(null)
    }
  }, [autoResetTimer])

  const resetToScan = useCallback(() => {
    clearAutoReset()
    setStep("scan")
    setQrCode("")
    setParticipant(null)
    setErrorMessage("")
  }, [clearAutoReset])

  const handleScan = useCallback(async () => {
    if (!qrCode.trim() || !isOnline) return

    try {
      setErrorMessage("")
      clearAutoReset()
      const foundParticipant = await checkIn("", qrCode)
      setParticipant(foundParticipant)
      setStep("confirm")
      startAutoReset(30000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "QR code inválido")
      setStep("error")
      startAutoReset(5000)
    }
  }, [qrCode, isOnline, clearAutoReset, checkIn, startAutoReset])

  const handleConfirm = useCallback(async () => {
    if (!participant || !isOnline) return

    try {
      clearAutoReset()
      const updatedParticipant = await checkIn(participant.id)
      setParticipant(updatedParticipant)
      setStep("success")
      startAutoReset(3000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Erro ao confirmar check-in")
      setStep("error")
      startAutoReset(5000)
    }
  }, [participant, isOnline, clearAutoReset, checkIn, startAutoReset])

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          if (step === "scan" && qrCode && !isLoading) {
            handleScan()
          } else if (step === "confirm" && !isLoading) {
            handleConfirm()
          }
          break
        case "Escape":
          resetToScan()
          break
        case "F5":
          e.preventDefault()
          window.location.reload()
          break
      }
    },
    [step, qrCode, isLoading, handleScan, handleConfirm, resetToScan],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    return () => {
      if (autoResetTimer) {
        clearTimeout(autoResetTimer)
      }
    }
  }, [autoResetTimer])

  const participantInitials = useMemo(() => {
    if (!participant) return ""
    return participant.name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }, [participant])

  const formattedCheckedInDate = useMemo(() => {
    if (!participant?.checkedInAt) return ""
    return new Date(participant.checkedInAt).toLocaleString("pt-BR")
  }, [participant?.checkedInAt])

  if (eventError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="bg-card max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-xl font-bold text-foreground mb-2">Erro ao Carregar Evento</h2>
            <p className="text-muted-foreground">Não foi possível carregar os dados do evento.</p>
            <Button onClick={() => window.location.reload()} aria-label="Recarregar página">
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-4xl font-bold text-foreground">{event?.name || "Carregando..."}</h1>
            {isOnline ? (
              <Wifi className="h-6 w-6 text-chart-1" aria-label="Online" />
            ) : (
              <WifiOff className="h-6 w-6 text-destructive" aria-label="Offline" />
            )}
          </div>
          <p className="text-xl text-muted-foreground">Sistema de Check-in</p>
          {!isOnline && (
            <p className="text-sm text-destructive mt-2" role="alert">
              Sem conexão com a internet
            </p>
          )}
        </div>

        {/* Main Card */}
        <Card className="bg-card">
          <CardContent className="p-8">
            {step === "offline" && (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                  <WifiOff className="h-16 w-16 text-destructive" aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-destructive mb-2">Sem Conexão</h2>
                  <p className="text-muted-foreground">Verifique sua conexão com a internet e tente novamente.</p>
                </div>

                <Button onClick={() => window.location.reload()} size="lg" aria-label="Tentar reconectar">
                  Tentar Reconectar
                </Button>
              </div>
            )}

            {step === "scan" && (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-primary" aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Bem-vindo ao Evento!</h2>
                  <p className="text-muted-foreground">Escaneie seu QR code ou digite o código para fazer check-in</p>
                </div>

                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Digite ou escaneie seu código QR (Enter para confirmar)"
                      value={qrCode}
                      onChange={(e) => setQrCode(e.target.value)}
                      className="text-lg h-12 bg-input"
                      disabled={isLoading || !isOnline}
                      onKeyPress={(e) => e.key === "Enter" && handleScan()}
                      autoFocus
                      aria-label="Código QR do participante"
                    />
                    <Button
                      onClick={handleScan}
                      disabled={!qrCode || isLoading || !isOnline}
                      size="lg"
                      aria-label="Confirmar código QR"
                    >
                      {isLoading ? <LoadingSpinner size="sm" /> : <QrCode className="h-5 w-5" />}
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-transparent"
                    disabled={isLoading || !isOnline}
                    aria-label="Usar câmera para escanear QR code"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Usar Câmera para Escanear
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Precisa de ajuda? Procure um organizador do evento.</p>
                  <p className="text-xs">Pressione F5 para recarregar • ESC para limpar</p>
                </div>
              </div>
            )}

            {step === "confirm" && participant && (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-chart-2/10 rounded-full flex items-center justify-center">
                  <User className="h-16 w-16 text-chart-2" aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Confirme seus Dados</h2>

                  <div className="bg-muted rounded-lg p-6 space-y-4">
                    <Avatar className="h-20 w-20 mx-auto">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={`Foto de ${participant.name}`} />
                      <AvatarFallback className="text-lg">{participantInitials}</AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{participant.name}</h3>
                      <p className="text-muted-foreground">{participant.email}</p>
                      <p className="text-sm text-muted-foreground">{participant.company}</p>
                    </div>

                    <Badge className="bg-chart-1 text-white">{participant.ticketType}</Badge>

                    {participant.checkedIn && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3" role="alert">
                        <p className="text-yellow-800 text-sm">
                          Este participante já fez check-in em {formattedCheckedInDate}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={resetToScan}
                    className="flex-1 bg-transparent"
                    aria-label="Cancelar check-in"
                  >
                    Cancelar (ESC)
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleConfirm}
                    className="flex-1 bg-primary text-primary-foreground"
                    disabled={isLoading || !isOnline}
                    aria-label="Confirmar check-in do participante"
                  >
                    {isLoading ? <LoadingSpinner size="sm" /> : "Confirmar Check-in (Enter)"}
                  </Button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-chart-1/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-16 w-16 text-chart-1" aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-chart-1 mb-2">Check-in Realizado!</h2>
                  <p className="text-lg text-foreground">Bem-vindo ao {event?.name}</p>
                  <p className="text-muted-foreground">Aproveite o evento!</p>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Seu crachá será enviado por email. Guarde este comprovante de check-in.
                  </p>
                </div>

                <div className="text-xs text-muted-foreground" aria-live="polite">
                  Retornando à tela inicial automaticamente...
                </div>
              </div>
            )}

            {step === "error" && (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-chart-3/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-16 w-16 text-chart-3" aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-chart-3 mb-2">Erro no Check-in</h2>
                  <p className="text-muted-foreground" role="alert">
                    {errorMessage || "Erro desconhecido"}
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={resetToScan}
                  className="bg-primary text-primary-foreground"
                  aria-label="Tentar fazer check-in novamente"
                >
                  Tentar Novamente
                </Button>

                <div className="text-xs text-muted-foreground" aria-live="polite">
                  Retornando à tela inicial automaticamente...
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>EventPro - Sistema de Credenciamento</p>
          <p className="text-xs mt-1">Status: {isOnline ? "Online" : "Offline"} • Versão 2.0</p>
        </div>
      </div>
    </div>
  )
}
