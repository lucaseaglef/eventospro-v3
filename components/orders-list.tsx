"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { getOrderStatusDisplay, getPaymentStatusDisplay } from "@/lib/status-utils"
import { Search, Eye, User, CreditCard, Ticket, Grid3X3, List, ShoppingCart, Plus } from "lucide-react"
import { useOrders } from "@/lib/api-hooks"

export function OrdersList() {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const { data: ordersResponse, isLoading } = useOrders()
  const orders = ordersResponse?.data || []

  const filteredOrders = orders.filter(
    (order: any) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.ticketName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {!isLoading && filteredOrders.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {searchTerm ? "Nenhum pedido encontrado" : "Aguardando primeiros pedidos"}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {searchTerm
                ? "Tente ajustar os termos de busca para encontrar pedidos."
                : "Os pedidos aparecerão aqui conforme os participantes comprarem ingressos."}
            </p>
          </div>
          {!searchTerm && (
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Compartilhar Evento
            </Button>
          )}
        </div>
      )}

      {!isLoading && filteredOrders.length > 0 && (
        <>
          {viewMode === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOrders.map((order: any) => {
                const statusDisplay = getOrderStatusDisplay(order.status)
                return (
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
                        <Badge className={`${statusDisplay.color} font-medium`}>{statusDisplay.label}</Badge>
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
                )
              })}
            </div>
          ) : (
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
              {filteredOrders.map((order: any) => {
                const statusDisplay = getOrderStatusDisplay(order.status)
                const paymentDisplay = getPaymentStatusDisplay(order.paymentStatus)
                return (
                  <Card key={order.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-7 gap-4 items-center">
                        <div className="col-span-1">
                          <div className="flex items-center gap-2">
                            <Badge className={`${statusDisplay.color} text-xs`}>{statusDisplay.label}</Badge>
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
                              <Badge className={`${paymentDisplay.color} text-xs`}>{paymentDisplay.label}</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1 text-right">
                          <p className="text-lg font-bold text-primary">
                            R$ {order.totalValue.toFixed(2).replace(".", ",")}
                          </p>
                        </div>

                        <div className="col-span-1 text-center">
                          <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* ... existing modal code ... */}
    </div>
  )
}
