"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"

interface Participante {
  id: string
  nome: string
  email: string
  telefone?: string
  documento?: string
  empresa?: string
  cargo?: string
  endereco?: string
  cidade?: string
  estado?: string
  cep?: string

  // Dados do Ingresso
  ingressoId: string
  tipoIngresso: string
  codigoIngresso: string
  qrCode: string

  // Vinculação com Pedido
  numeroPedido: string
  valorIngresso: number

  // Status e Histórico
  status: "confirmado" | "pendente" | "cancelado"
  checkinRealizado: boolean
  dataRegistro: string
  dataCheckin?: string
  historico: HistoricoItem[]

  avatar?: string
}

interface HistoricoItem {
  id: string
  acao: string
  data: string
  detalhes?: string
  tipo: "info" | "success" | "warning" | "error"
}

interface ParticipantDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  participante?: Participante | null
  onNavigateToOrder?: (orderId: string) => void
}

// Mock data para demonstração
const mockParticipante: Participante = {
  id: "PART-001",
  nome: "João Silva Santos",
  email: "joao.silva@email.com",
  telefone: "(11) 99999-9999",
  documento: "123.456.789-00",
  empresa: "TechCorp Solutions",
  cargo: "Desenvolvedor Senior",
  endereco: "Rua das Flores, 123",
  cidade: "São Paulo",
  estado: "SP",
  cep: "01234-567",

  ingressoId: "REG001-245E166F",
  tipoIngresso: "Ingresso VIP",
  codigoIngresso: "VIP2024-001",
  qrCode:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+",

  numeroPedido: "VENDA-001",
  valorIngresso: 149.9,

  status: "confirmado",
  checkinRealizado: true,
  dataRegistro: "2024-11-15T14:30:00Z",
  dataCheckin: "2024-11-20T09:15:00Z",

  historico: [
    {
      id: "1",
      acao: "Inscrição realizada",
      data: "2024-11-15T14:30:00Z",
      detalhes: "Participante se inscreveu no evento",
      tipo: "info",
    },
    {
      id: "2",
      acao: "Pagamento confirmado",
      data: "2024-11-15T14:35:00Z",
      detalhes: "Pagamento via cartão de crédito aprovado",
      tipo: "success",
    },
    {
      id: "3",
      acao: "Check-in realizado",
      data: "2024-11-20T09:15:00Z",
      detalhes: "Check-in realizado na recepção do evento",
      tipo: "success",
    },
  ],

  avatar: "/professional-man.png",
}

export function ParticipantDetailsModal({
  open,
  onOpenChange,
  participante = mockParticipante,
  onNavigateToOrder,
}: ParticipantDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("dados-pessoais")

  if (!participante || !open) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR")
  }

  const getStatusColor = (status: string, checkedIn: boolean) => {
    if (checkedIn) return "bg-green-100 text-green-800 border-green-200"
    if (status === "confirmado") return "bg-blue-100 text-blue-800 border-blue-200"
    if (status === "pendente") return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  const getStatusText = (status: string, checkedIn: boolean) => {
    if (checkedIn) return "Check-in Realizado"
    if (status === "confirmado") return "Confirmado"
    if (status === "pendente") return "Pendente"
    return "Cancelado"
  }

  const getHistoricoIcon = (tipo: string) => {
    switch (tipo) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-blue-600" />
    }
  }

  const handleNavigateToOrder = () => {
    if (onNavigateToOrder) {
      onNavigateToOrder(participante.numeroPedido)
      onOpenChange(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col m-4">
        {/* Modal Header - altura fixa */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={participante.avatar || "/placeholder.svg"} alt={participante.nome} />
              <AvatarFallback>
                {participante.nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{participante.nome}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getStatusColor(participante.status, participante.checkinRealizado)}>
                  {getStatusText(participante.status, participante.checkinRealizado)}
                </Badge>
                <span className="text-sm text-muted-foreground">ID: {participante.id}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
              <span className="text-lg font-semibold text-blue-600">{participante.id}</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
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
                  {/* Informações Básicas - Layout horizontal como no modal de vendas */}
                  <div className="bg-gray-50 border rounded-xl p-6">
                    <div className="grid grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Nome Completo</p>
                        <p className="text-sm font-semibold text-gray-900">{participante.nome}</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Mail className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</p>
                        <p className="text-sm font-semibold text-gray-900">{participante.email}</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Phone className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Telefone</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {participante.telefone || "Não informado"}
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <FileText className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">CPF</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {participante.documento || "Não informado"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Informações Adicionais - Layout de duas colunas */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Informações Profissionais */}
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
                            <p className="font-medium text-gray-900">{participante.empresa || "Não informado"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <User className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Cargo</p>
                            <p className="font-medium text-gray-900">{participante.cargo || "Não informado"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Informações de Endereço */}
                    <div className="bg-white border rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <FileText className="h-4 w-4 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Endereço</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Endereço</p>
                          <p className="font-medium text-gray-900">{participante.endereco || "Não informado"}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Cidade</p>
                            <p className="font-medium text-gray-900">{participante.cidade || "Não informado"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Estado</p>
                            <p className="font-medium text-gray-900">{participante.estado || "Não informado"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ingresso" className="h-full overflow-y-auto space-y-6 pr-2 m-0">
                  {/* Detalhes do Ingresso - Layout horizontal */}
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
                        <p className="text-sm font-semibold text-gray-900">{participante.tipoIngresso}</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <FileText className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Código</p>
                        <p className="text-sm font-mono text-gray-900">{participante.codigoIngresso}</p>
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
                        >
                          {participante.numeroPedido}
                          <ExternalLink className="h-3 w-3 ml-1" />
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
                          R$ {participante.valorIngresso.toFixed(2).replace(".", ",")}
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {participante.checkinRealizado ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Check-in</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {participante.checkinRealizado ? "Realizado" : "Pendente"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code e Check-in */}
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
                          <img
                            src={participante.qrCode || "/placeholder.svg"}
                            alt="QR Code do Ingresso"
                            className="w-32 h-32"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">ID do Ingresso</p>
                          <p className="font-mono text-sm">{participante.ingressoId}</p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <QrCode className="h-4 w-4" />
                          Baixar QR Code
                        </Button>
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
                          {participante.checkinRealizado ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : (
                            <XCircle className="h-6 w-6 text-gray-400" />
                          )}
                          <div>
                            <p className="font-medium">
                              {participante.checkinRealizado ? "Check-in Realizado" : "Check-in Pendente"}
                            </p>
                            {participante.dataCheckin && (
                              <p className="text-sm text-muted-foreground">{formatDate(participante.dataCheckin)}</p>
                            )}
                          </div>
                        </div>
                        {!participante.checkinRealizado && (
                          <Button variant="outline" size="sm">
                            Realizar Check-in
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
                      {participante.historico.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0"
                        >
                          <div className="flex-shrink-0 mt-1">{getHistoricoIcon(item.tipo)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm">{item.acao}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(item.data)}</p>
                            </div>
                            {item.detalhes && <p className="text-sm text-muted-foreground mt-1">{item.detalhes}</p>}
                          </div>
                        </div>
                      ))}
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
