"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Eye,
  User,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  Ticket,
  Download,
  Copy,
  X,
  Grid3X3,
  List,
} from "lucide-react"

// Mock data for orders
const mockOrders = [
  {
    id: "VENDA-001",
    ticketName: "Ingresso VIP",
    buyerName: "João Silva",
    quantity: 2,
    paymentMethod: "Cartão de Crédito",
    totalValue: 299.9,
    status: "confirmado",
    paymentStatus: "pago",
    buyerEmail: "joao.silva@email.com",
    buyerPhone: "(11) 99999-9999",
    purchaseDate: "15/11/2024 às 14:30",
    tickets: [
      { id: "REG001-245E166F", type: "Ingresso VIP", participant: "João Silva", email: "joao.silva@email.com" },
      { id: "REG002-245E166G", type: "Ingresso VIP", participant: "Maria Silva", email: "maria.silva@email.com" },
    ],
  },
  {
    id: "VENDA-002",
    ticketName: "Ingresso Regular",
    buyerName: "Ana Costa",
    quantity: 1,
    paymentMethod: "PIX",
    totalValue: 89.9,
    status: "confirmado",
    paymentStatus: "pago",
    buyerEmail: "ana.costa@email.com",
    buyerPhone: "(11) 88888-8888",
    purchaseDate: "14/11/2024 às 10:15",
    tickets: [
      { id: "REG003-245E166H", type: "Ingresso Regular", participant: "Ana Costa", email: "ana.costa@email.com" },
    ],
  },
  {
    id: "VENDA-003",
    ticketName: "Ingresso Premium",
    buyerName: "Roberto Almeida Junior",
    quantity: 1,
    paymentMethod: "Boleto",
    totalValue: 149.0,
    status: "confirmado",
    paymentStatus: "pago",
    buyerEmail: "roberto.almeida@freelancer.com",
    buyerPhone: "(11) 96543-2109",
    purchaseDate: "10/11/2024 às 16:45",
    tickets: [
      {
        id: "REG006-245E166F",
        type: "Ingresso Regular",
        participant: "Roberto Almeida Junior",
        email: "roberto.almeida@freelancer.com",
      },
    ],
  },
  {
    id: "VENDA-004",
    ticketName: "Ingresso Estudante",
    buyerName: "Carlos Mendes",
    quantity: 3,
    paymentMethod: "Cartão de Débito",
    totalValue: 179.7,
    status: "pendente",
    paymentStatus: "processando",
    buyerEmail: "carlos.mendes@email.com",
    buyerPhone: "(11) 77777-7777",
    purchaseDate: "13/11/2024 às 09:20",
    tickets: [
      {
        id: "REG004-245E166I",
        type: "Ingresso Estudante",
        participant: "Carlos Mendes",
        email: "carlos.mendes@email.com",
      },
      {
        id: "REG005-245E166J",
        type: "Ingresso Estudante",
        participant: "Pedro Mendes",
        email: "pedro.mendes@email.com",
      },
      {
        id: "REG006-245E166K",
        type: "Ingresso Estudante",
        participant: "Lucas Mendes",
        email: "lucas.mendes@email.com",
      },
    ],
  },
]

export function OrdersList() {
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.ticketName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-800 border-green-200"
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-green-100 text-green-800 border-green-200"
      case "processando":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "falhou":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Bar and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por número do pedido, comprador ou ingresso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="gap-2"
          >
            <Grid3X3 className="h-4 w-4" />
            Grade
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            Lista
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        /* Orders Grid */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary bg-white"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {order.id}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Pedido #{order.id.split("-")[1]}</p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} font-medium`}>{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-white rounded-md shadow-sm">
                      <Ticket className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Ingresso</p>
                      <p className="font-semibold text-gray-900 truncate">{order.ticketName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-white rounded-md shadow-sm">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Comprador</p>
                      <p className="font-semibold text-gray-900 truncate">{order.buyerName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Quantidade</p>
                      <p className="text-lg font-bold text-blue-700">{order.quantity}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">Pagamento</p>
                      <p className="text-xs font-semibold text-green-700">{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Valor Total</p>
                    <p className="text-2xl font-bold text-primary">
                      R$ {order.totalValue.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                    className="gap-2 hover:bg-primary hover:text-white transition-colors shadow-sm"
                  >
                    <Eye className="h-4 w-4" />
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Orders List View */
        <div className="space-y-3">
          {/* List Header */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <div className="grid grid-cols-7 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
              <div className="col-span-1">Pedido</div>
              <div className="col-span-1">Ingresso</div>
              <div className="col-span-1">Comprador</div>
              <div className="col-span-1 text-center">Qtd</div>
              <div className="col-span-1">Pagamento</div>
              <div className="col-span-1 text-right">Valor</div>
              <div className="col-span-1 text-center">Ações</div>
            </div>
          </div>

          {/* List Items */}
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-4 items-center">
                  <div className="col-span-1">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(order.status)} text-xs`}>{order.status}</Badge>
                    </div>
                    <p className="font-semibold text-sm mt-1">{order.id}</p>
                  </div>

                  <div className="col-span-1">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-primary" />
                      <p className="font-medium text-sm truncate">{order.ticketName}</p>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <p className="font-medium text-sm truncate">{order.buyerName}</p>
                    </div>
                  </div>

                  <div className="col-span-1 text-center">
                    <p className="text-lg font-bold text-blue-700">{order.quantity}</p>
                  </div>

                  <div className="col-span-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">{order.paymentMethod}</p>
                        <Badge className={`${getPaymentStatusColor(order.paymentStatus)} text-xs`}>
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 text-right">
                    <p className="text-lg font-bold text-primary">R$ {order.totalValue.toFixed(2).replace(".", ",")}</p>
                  </div>

                  <div className="col-span-1 text-center">
                    <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for Selected Order */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto m-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-2xl font-bold text-gray-900">Detalhes do Pedido</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
                  <span className="text-lg font-semibold text-blue-600">{selectedOrder.id}</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                  className="h-8 w-8 p-0 hover:bg-red-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Horizontal Layout - Main Information */}
            <div className="p-6">
              <div className="bg-gray-50 border rounded-xl p-6 mb-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Número do Pedido</p>
                    <p className="text-lg font-bold text-gray-900">{selectedOrder.id}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Ticket className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Nome do Ingresso</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedOrder.ticketName}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Nome do Comprador</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedOrder.buyerName}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Ticket className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Quantidade</p>
                    <p className="text-xl font-bold text-gray-900">{selectedOrder.quantity}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Tipo de Pagamento</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedOrder.paymentMethod}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Valor Total</p>
                    <p className="text-xl font-bold text-primary">
                      R$ {selectedOrder.totalValue.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information - Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Contact Information */}
                <div className="bg-white border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Informações de Contato</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                        <p className="font-medium text-gray-900">{selectedOrder.buyerEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Telefone</p>
                        <p className="font-medium text-gray-900">{selectedOrder.buyerPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Data da Compra</p>
                        <p className="font-medium text-gray-900">{selectedOrder.purchaseDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Information */}
                <div className="bg-white border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Status do Pedido</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Status Pagamento</p>
                        <Badge className={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                          {selectedOrder.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Status Pedido</p>
                        <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tickets Section */}
              <div className="bg-white border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Ticket className="h-4 w-4 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Ingressos</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded border">
                      {selectedOrder.tickets.length} item(s)
                    </span>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Baixar Ingressos
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {selectedOrder.tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-gray-50 border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-gray-600" />
                          <h4 className="font-semibold text-gray-900">{ticket.type}</h4>
                        </div>
                        <span className="text-xs font-mono bg-white px-2 py-1 rounded border">{ticket.id}</span>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Participante</p>
                            <p className="font-medium text-sm text-gray-900">{ticket.participant}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                            <p className="font-medium text-sm text-gray-900">{ticket.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Tipo</p>
                            <p className="font-medium text-sm text-gray-900">{ticket.type}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
