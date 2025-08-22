"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import { EmptyState } from "@/components/ui/empty-state"
import { Search, Download, Mail, MoreHorizontal, Eye, RefreshCw, Filter, QrCode, Send, FileDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useParticipants } from "@/lib/api-hooks"
import { debounce } from "@/lib/utils"

interface ParticipantsQRListProps {
  eventId: string
}

export function ParticipantsQRList({ eventId }: ParticipantsQRListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState<"all" | "confirmed" | "pending" | "cancelled">("all")
  const [isProcessing, setIsProcessing] = useState(false)

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      // Search will be handled by the API hook
    }, 300),
    [],
  )

  const {
    data: participantsResponse,
    isLoading,
    error,
    refetch,
  } = useParticipants(eventId, {
    search: searchTerm || undefined,
    status: filterStatus === "all" ? undefined : filterStatus,
    limit: 50,
  })

  const participants = participantsResponse?.items || []

  const toggleParticipant = useCallback((id: string) => {
    setSelectedParticipants((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }, [])

  const toggleAll = useCallback(() => {
    setSelectedParticipants((prev) => (prev.length === participants.length ? [] : participants.map((p) => p.id)))
  }, [participants])

  const clearSelection = useCallback(() => {
    setSelectedParticipants([])
  }, [])

  const handleBulkEmail = useCallback(async () => {
    if (selectedParticipants.length === 0) return

    try {
      setIsProcessing(true)
      // TODO: Implement bulk email API call
      console.log("[v0] Sending emails to:", selectedParticipants)
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      clearSelection()
    } catch (error) {
      console.error("Failed to send emails:", error)
    } finally {
      setIsProcessing(false)
    }
  }, [selectedParticipants, clearSelection])

  const handleBulkDownload = useCallback(async () => {
    if (selectedParticipants.length === 0) return

    try {
      setIsProcessing(true)
      // TODO: Implement bulk download API call
      console.log("[v0] Downloading QR codes for:", selectedParticipants)
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
      clearSelection()
    } catch (error) {
      console.error("Failed to download QR codes:", error)
    } finally {
      setIsProcessing(false)
    }
  }, [selectedParticipants, clearSelection])

  const handleIndividualAction = useCallback(async (participantId: string, action: string) => {
    try {
      setIsProcessing(true)
      // TODO: Implement individual actions
      console.log(`[v0] ${action} for participant:`, participantId)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    } catch (error) {
      console.error(`Failed to ${action}:`, error)
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const statusConfig = useMemo(
    () => ({
      confirmed: { color: "bg-chart-1 text-white", label: "Gerado" },
      pending: { color: "bg-chart-4 text-white", label: "Pendente" },
      cancelled: { color: "bg-chart-3 text-white", label: "Erro" },
      default: { color: "bg-muted text-muted-foreground", label: "Desconhecido" },
    }),
    [],
  )

  const getStatusDisplay = useCallback(
    (status: string) => {
      return statusConfig[status as keyof typeof statusConfig] || statusConfig.default
    },
    [statusConfig],
  )

  if (error) {
    return <ErrorState message={error} onRetry={() => refetch()} />
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">QR Codes dos Participantes</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={selectedParticipants.length === 0 || isProcessing}
              onClick={handleBulkEmail}
            >
              {isProcessing ? <LoadingSpinner size="sm" className="mr-2" /> : <Send className="mr-2 h-4 w-4" />}
              Enviar Selecionados ({selectedParticipants.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedParticipants.length === 0 || isProcessing}
              onClick={handleBulkDownload}
            >
              {isProcessing ? <LoadingSpinner size="sm" className="mr-2" /> : <FileDown className="mr-2 h-4 w-4" />}
              Download Selecionados
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar participantes por nome, email ou empresa..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                debouncedSearch(e.target.value)
              }}
              className="pl-10 bg-input"
              disabled={isLoading}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={isLoading}>
                <Filter className="mr-2 h-4 w-4" />
                {filterStatus === "all" ? "Todos" : statusConfig[filterStatus]?.label || "Filtrar"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>Todos os Status</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("confirmed")}>QR Codes Gerados</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Pendentes</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("cancelled")}>Com Erro</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {!isLoading && participants.length === 0 && (
          <EmptyState
            icon={QrCode}
            title={searchTerm ? "Nenhum participante encontrado" : "Nenhum participante cadastrado"}
            description={
              searchTerm
                ? "Tente ajustar os filtros ou termos de busca."
                : "Os participantes aparecerão aqui conforme se inscreverem no evento."
            }
          />
        )}

        {!isLoading && participants.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedParticipants.length === participants.length && participants.length > 0}
                  onCheckedChange={toggleAll}
                  disabled={isProcessing}
                />
                <span className="text-sm text-muted-foreground">
                  {selectedParticipants.length} de {participants.length} selecionados
                </span>
              </div>
              {selectedParticipants.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearSelection} disabled={isProcessing}>
                  Limpar Seleção
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {participants.map((participant) => {
                const statusDisplay = getStatusDisplay(participant.status)
                return (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        checked={selectedParticipants.includes(participant.id)}
                        onCheckedChange={() => toggleParticipant(participant.id)}
                        disabled={isProcessing}
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

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{participant.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{participant.email}</p>
                        {participant.company && (
                          <p className="text-xs text-muted-foreground truncate">{participant.company}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-center min-w-0">
                        <p className="text-xs font-mono text-foreground">{participant.ticketCode}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(participant.registeredAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        {participant.qrCode && (
                          <Badge variant="secondary" className="bg-chart-2 text-white text-xs">
                            QR Gerado
                          </Badge>
                        )}
                        {participant.checkedIn && (
                          <Badge variant="secondary" className="bg-chart-1 text-white text-xs">
                            Check-in Feito
                          </Badge>
                        )}
                      </div>

                      <Badge className={statusDisplay.color}>{statusDisplay.label}</Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" disabled={isProcessing}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleIndividualAction(participant.id, "view")}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar QR Code
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleIndividualAction(participant.id, "download")}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleIndividualAction(participant.id, "email")}>
                            <Mail className="mr-2 h-4 w-4" />
                            Enviar por Email
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleIndividualAction(participant.id, "regenerate")}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Regenerar QR Code
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
            </div>

            {participantsResponse?.hasMore && (
              <div className="text-center pt-4">
                <Button variant="outline" disabled={isLoading}>
                  Carregar Mais Participantes
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
