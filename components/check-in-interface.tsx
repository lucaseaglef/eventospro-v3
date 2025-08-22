"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import { QrCode, Search, UserCheck, CheckCircle, Camera, AlertCircle, Printer } from "lucide-react"
import { useCheckInParticipant, useEventMetrics, useParticipants } from "@/lib/api-hooks"
import { debounce } from "@/lib/utils"
import type { Participant } from "@/lib/types"

interface CheckInInterfaceProps {
  eventId: string
}

export function CheckInInterface({ eventId }: CheckInInterfaceProps) {
  const [qrCode, setQrCode] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [scannerActive, setScannerActive] = useState(false)
  const [lastCheckIn, setLastCheckIn] = useState<Participant | null>(null)
  const [searchResults, setSearchResults] = useState<Participant[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const { checkIn, isLoading: checkInLoading, error: checkInError } = useCheckInParticipant()
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useEventMetrics(eventId)
  const { data: participantsData } = useParticipants(eventId, { limit: 1000 }) // Cache for search

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term.trim() || !participantsData?.items) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)
      try {
        const filtered = participantsData.items.filter(
          (p) =>
            p.name.toLowerCase().includes(term.toLowerCase()) ||
            p.email.toLowerCase().includes(term.toLowerCase()) ||
            (p.company && p.company.toLowerCase().includes(term.toLowerCase())),
        )
        setSearchResults(filtered.slice(0, 5)) // Limit to 5 results
      } catch (error) {
        console.error("Search error:", error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300),
    [participantsData],
  )

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  const handleQRScan = async () => {
    if (!qrCode.trim()) return

    try {
      const participant = await checkIn("", qrCode)
      setLastCheckIn(participant)
      setQrCode("")
      setScannerActive(false)
    } catch (error) {
      console.error("QR scan error:", error)
    }
  }

  const handleParticipantSelect = (participant: Participant) => {
    setLastCheckIn(participant)
    setSearchTerm("")
    setSearchResults([])
  }

  const handleConfirmCheckIn = async () => {
    if (!lastCheckIn) return

    try {
      const updatedParticipant = await checkIn(lastCheckIn.id)
      setLastCheckIn(updatedParticipant)

      setTimeout(() => {
        setLastCheckIn(null)
      }, 3000)
    } catch (error) {
      console.error("Check-in confirmation error:", error)
    }
  }

  const handlePrintBadge = () => {
    if (!lastCheckIn) return
    console.log("[v0] Printing badge for:", lastCheckIn.name)
    // TODO: Implement actual badge printing
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && qrCode && !checkInLoading) {
        handleQRScan()
      }
      if (e.key === "Escape") {
        setLastCheckIn(null)
        setSearchResults([])
        setQrCode("")
        setSearchTerm("")
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [qrCode, checkInLoading])

  if (metricsError) {
    return <ErrorState message="Erro ao carregar dados do evento" />
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
                  placeholder="Escaneie ou digite o código QR (Enter para confirmar)"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  className="bg-input"
                  disabled={checkInLoading}
                  onKeyPress={(e) => e.key === "Enter" && handleQRScan()}
                />
                <Button onClick={handleQRScan} disabled={!qrCode || checkInLoading}>
                  {checkInLoading ? <LoadingSpinner size="sm" /> : <QrCode className="h-4 w-4" />}
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setScannerActive(!scannerActive)}
                disabled={checkInLoading}
              >
                <Camera className="mr-2 h-4 w-4" />
                {scannerActive ? "Parar Scanner" : "Ativar Scanner de Câmera"}
              </Button>

              {scannerActive && (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Scanner de QR Code Ativo</p>
                    <p className="text-xs text-muted-foreground mt-1">Posicione o QR code na frente da câmera</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Manual Search */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Busca Manual</h3>

            <div className="space-y-3 relative">
              <div className="flex space-x-2">
                <Input
                  placeholder="Nome, email ou empresa"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-input"
                  disabled={checkInLoading}
                />
                <Button disabled={!searchTerm || isSearching}>
                  {isSearching ? <LoadingSpinner size="sm" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map((participant) => (
                    <button
                      key={participant.id}
                      className="w-full p-3 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0"
                      onClick={() => handleParticipantSelect(participant)}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                          <AvatarFallback className="text-xs">
                            {participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{participant.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{participant.email}</p>
                        </div>
                        <Badge variant={participant.checkedIn ? "default" : "secondary"} className="text-xs">
                          {participant.checkedIn ? "Check-in feito" : participant.ticketType}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                <p>• Digite para buscar em tempo real</p>
                <p>• Use ESC para limpar a busca</p>
                <p>• Enter no QR code para confirmar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {checkInError && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <span className="text-destructive font-medium">{checkInError}</span>
            </div>
          </div>
        )}

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
                  <p className="text-sm font-mono text-foreground">{lastCheckIn.ticketCode}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-chart-1" />
                  <span className="text-foreground font-medium">
                    {lastCheckIn.checkedIn ? "Check-in já realizado!" : "Pronto para check-in!"}
                  </span>
                  {lastCheckIn.checkedIn && (
                    <span className="text-sm text-muted-foreground">
                      em {new Date(lastCheckIn.checkedInAt || "").toLocaleString("pt-BR")}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handlePrintBadge}>
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir Crachá
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground"
                    onClick={handleConfirmCheckIn}
                    disabled={lastCheckIn.checkedIn || checkInLoading}
                  >
                    {checkInLoading ? <LoadingSpinner size="sm" /> : "Confirmar Check-in"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {metricsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center p-4 bg-muted rounded-lg">
                <div className="h-8 w-12 bg-muted-foreground/20 animate-pulse rounded mx-auto mb-2" />
                <div className="h-4 w-24 bg-muted-foreground/20 animate-pulse rounded mx-auto" />
              </div>
            ))
          ) : (
            <>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-chart-1">{metrics?.currentHourCheckIns || 0}</div>
                <p className="text-sm text-muted-foreground">Check-ins na última hora</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-chart-2">{metrics?.avgCheckInTime || "0 min"}</div>
                <p className="text-sm text-muted-foreground">Tempo médio por check-in</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-chart-3">{(metrics?.checkInRate || 0).toFixed(1)}%</div>
                <p className="text-sm text-muted-foreground">Taxa de check-in</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
