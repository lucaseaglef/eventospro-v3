"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import {
  User,
  Mail,
  Phone,
  Building,
  FileText,
  Ticket,
  QrCode,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  X,
  Download,
  Send,
} from "lucide-react"
import { useParticipant, useCheckInParticipant } from "@/lib/api-hooks"

interface ParticipantDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  participantId?: string | null
  onNavigateToOrder?: (orderId: string) => void
}

export function ParticipantDetailsModal({
  open,
  onOpenChange,
  participantId,
  onNavigateToOrder,
}: ParticipantDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("dados-pessoais")
  const [isProcessing, setIsProcessing] = useState(false)

  const { data: participant, isLoading, error } = useParticipant(participantId || "")
  const { checkIn } = useCheckInParticipant()

  const handleCheckIn = useCallback(async () => {
    if (!participant || participant.checkedIn) return

    try {
      setIsProcessing(true)
      await checkIn(participant.id)
    } catch (error) {
      console.error("Check-in failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }, [participant, checkIn])

  const handleNavigateToOrder = useCallback(() => {
    if (onNavigateToOrder && participant?.orderId) {
      onNavigateToOrder(participant.orderId)
      onOpenChange(false)
    }
  }, [onNavigateToOrder, participant, onOpenChange])

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
    }
  }, [])

  const handleDownloadQR = useCallback(async () => {
    if (!participant?.qrCode) return

    try {
      setIsProcessing(true)
      // TODO: Implement QR code download
      console.log("[v0] Downloading QR code for:", participant.id)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Failed to download QR code:", error)
    } finally {
      setIsProcessing(false)
    }
  }, [participant])

  const handleSendEmail = useCallback(async () => {
    if (!participant) return

    try {
      setIsProcessing(true)
      // TODO: Implement email sending
      console.log("[v0] Sending email to:", participant.email)
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } catch (error) {
      console.error("Failed to send email:", error)
    } finally {
      setIsProcessing(false)
    }
  }, [participant])

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR")
  }, [])

  const getStatusDisplay = useCallback((status: string, checkedIn: boolean) => {
    if (checkedIn) return { color: "bg-green-100 text-green-800 border-green-200", text: "Check-in Realizado" }
    if (status === "confirmed") return { color: "bg-blue-100 text-blue-800 border-blue-200", text: "Confirmado" }
    if (status === "pending") return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Pendente" }
    return { color: "bg-red-100 text-red-800 border-red-200", text: "Cancelado" }
  }, [])

  const getHistoryIcon = useCallback((type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-blue-600" />
    }
  }, [])

  if (!open) return null

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (error || !participant) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md">
          <ErrorState message={error || "Participante não encontrado"} onRetry={() => window.location.reload()} />
        </div>
      </div>
    )
  }

  const statusDisplay = getStatusDisplay(participant.status, participant.checkedIn)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col m-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
              <AvatarFallback>
                {participant.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{participant.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={statusDisplay.color}>{statusDisplay.text}</Badge>
                <span className="text-sm text-muted-foreground">ID: {participant.id}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
              <span className="text-lg font-semibold text-blue-600">{participant.id}</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => copyToClipboard(participant.id)}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 hover:bg-red-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-6 flex-1 flex flex-col min-h-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col min-h-0">
              <TabsList className="grid w-full grid-cols-3 mb-6 flex-shrink-0">
                <TabsTrigger value="dados-pessoais" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Dados Pessoais
                </TabsTrigger>
                <TabsTrigger value="ingresso" className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  Ingresso
                </TabsTrigger>
                <TabsTrigger value="historico" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Histórico
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 min-h-0 overflow-hidden">
                <TabsContent value="dados-pessoais" className="h-full overflow-y-auto space-y-6 pr-2 m-0">
                  {/* Basic Information */}
                  <div className="bg-gray-50 border rounded-xl p-6">
                    <div className="grid grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Nome Completo</p>
                        <p className="text-sm font-semibold text-gray-900">{participant.name}</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Mail className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</p>
                        <p className="text-sm font-semibold text-gray-900">{participant.email}</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Phone className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Telefone</p>
                        <p className="text-sm font-semibold text-gray-900">{participant.phone || "Não informado"}</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <FileText className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">CPF</p>
                        <p className="text-sm font-semibold text-gray-900">{participant.document || "Não informado"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Building className="h-4 w-4 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Informações Profissionais</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Building className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Empresa</p>
                            <p className="font-medium text-gray-900">{participant.company || "Não informado"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <User className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Cargo</p>
                            <p className="font-medium text-gray-900">{participant.jobTitle || "Não informado"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <FileText className="h-4 w-4 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Informações Adicionais</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Data de Registro</p>
                          <p className="font-medium text-gray-900">{formatDate(participant.registeredAt)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Última Atualização</p>
                          <p className="font-medium text-gray-900">{formatDate(participant.updatedAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ingresso" className="h-full overflow-y-auto space-y-6 pr-2 m-0">
                  {/* Ticket Details */}
                  <div className="bg-gray-50 border rounded-xl p-6">
                    <div className="grid grid-cols-5 gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Ticket className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Tipo do Ingresso
                        </p>
                        <p className="text-sm font-semibold text-gray-900">{participant.ticketType}</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <FileText className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Código</p>
                        <p className="text-sm font-mono text-gray-900">{participant.ticketCode}</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <ShoppingCart className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Número do Pedido
                        </p>
                        <Button
                          variant="link"
                          className="p-0 h-auto font-semibold text-primary text-sm"
                          onClick={handleNavigateToOrder}
                          disabled={!participant.orderId}
                        >
                          {participant.orderId || "N/A"}
                          {participant.orderId && <ExternalLink className="h-3 w-3 ml-1" />}
                        </Button>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Valor</p>
                        <p className="text-lg font-bold text-primary">
                          R$ {(participant.ticketPrice || 0).toFixed(2).replace(".", ",")}
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {participant.checkedIn ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Check-in</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {participant.checkedIn ? "Realizado" : "Pendente"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code and Check-in */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <QrCode className="h-4 w-4 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">QR Code do Ingresso</h3>
                      </div>
                      <div className="flex flex-col items-center space-y-4">
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                          {participant.qrCode ? (
                            <img
                              src={participant.qrCode || "/placeholder.svg"}
                              alt="QR Code do Ingresso"
                              className="w-32 h-32"
                            />
                          ) : (
                            <div className="w-32 h-32 bg-muted rounded flex items-center justify-center">
                              <QrCode className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">ID do Ingresso</p>
                          <p className="font-mono text-sm">{participant.id}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-transparent"
                            onClick={handleDownloadQR}
                            disabled={!participant.qrCode || isProcessing}
                          >
                            {isProcessing ? <LoadingSpinner size="sm" /> : <Download className="h-4 w-4" />}
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-transparent"
                            onClick={handleSendEmail}
                            disabled={isProcessing}
                          >
                            {isProcessing ? <LoadingSpinner size="sm" /> : <Send className="h-4 w-4" />}
                            Enviar
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Status do Check-in</h3>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          {participant.checkedIn ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : (
                            <XCircle className="h-6 w-6 text-gray-400" />
                          )}
                          <div>
                            <p className="font-medium">
                              {participant.checkedIn ? "Check-in Realizado" : "Check-in Pendente"}
                            </p>
                            {participant.checkedInAt && (
                              <p className="text-sm text-muted-foreground">{formatDate(participant.checkedInAt)}</p>
                            )}
                          </div>
                        </div>
                        {!participant.checkedIn && (
                          <Button variant="outline" size="sm" onClick={handleCheckIn} disabled={isProcessing}>
                            {isProcessing ? <LoadingSpinner size="sm" /> : "Realizar Check-in"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="historico" className="h-full overflow-y-auto space-y-6 pr-2 m-0">
                  <div className="bg-white border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Clock className="h-4 w-4 text-gray-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Histórico de Atividades</h3>
                    </div>
                    <div className="space-y-4">
                      {participant.history && participant.history.length > 0 ? (
                        participant.history.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0"
                          >
                            <div className="flex-shrink-0 mt-1">{getHistoryIcon(item.type)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-sm">{item.action}</p>
                                <p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
                              </div>
                              {item.details && <p className="text-sm text-muted-foreground mt-1">{item.details}</p>}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Nenhuma atividade registrada ainda.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
