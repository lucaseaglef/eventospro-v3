"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Download,
  Mail,
  Calendar,
  Users,
  CreditCard,
  QrCode,
  Banknote,
  Share2,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// Mock order data - in real app this would come from API
const orderData = {
  id: "VENDA-001",
  status: "confirmed",
  createdAt: "2024-12-15T10:30:00Z",
  event: {
    name: "TechConf São Paulo 2024",
    date: "15 de dezembro de 2024",
    time: "09:00 - 18:00",
    location: "Centro de Convenções Anhembi - São Paulo, SP",
  },
  buyer: {
    name: "João Silva",
    email: "joao.silva@email.com",
  },
  tickets: [
    {
      id: 1,
      name: "Ingresso VIP",
      quantity: 2,
      price: 299,
      participants: ["João Silva", "Maria Silva"],
    },
    {
      id: 2,
      name: "Ingresso Regular",
      quantity: 1,
      price: 149,
      participants: ["Pedro Santos"],
    },
  ],
  payment: {
    method: "credit",
    subtotal: 747,
    fee: 37.35,
    total: 784.35,
  },
}

export default function OrderConfirmationPage({ params }: { params: { eventId: string } }) {
  const [downloadingTickets, setDownloadingTickets] = useState(false)

  const handleDownloadTickets = async () => {
    setDownloadingTickets(true)
    // Simulate download process
    setTimeout(() => {
      setDownloadingTickets(false)
      // In real app, this would trigger actual download
      console.log("Downloading tickets...")
    }, 2000)
  }

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "credit":
        return "Cartão de Crédito"
      case "pix":
        return "PIX"
      case "boleto":
        return "Boleto"
      default:
        return method
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit":
        return <CreditCard className="h-4 w-4" />
      case "pix":
        return <QrCode className="h-4 w-4" />
      case "boleto":
        return <Banknote className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/events/${params.eventId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Evento
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Pedido Confirmado</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="w-full space-y-8">
          {/* Success Message */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Parabéns! Sua compra foi confirmada</h1>
            <p className="text-lg text-gray-600 mb-4">
              Enviamos os detalhes da sua compra para <strong>{orderData.buyer.email}</strong>
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span>Pedido:</span>
              <Badge variant="outline" className="font-mono">
                {orderData.id}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Resumo do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderData.tickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{ticket.name}</h4>
                          <p className="text-sm text-gray-600">Quantidade: {ticket.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            R$ {(ticket.price * ticket.quantity).toFixed(2).replace(".", ",")}
                          </p>
                          <p className="text-sm text-gray-600">R$ {ticket.price.toFixed(2).replace(".", ",")} cada</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Participantes:</p>
                        <div className="space-y-1">
                          {ticket.participants.map((participant, index) => (
                            <p key={index} className="text-sm text-gray-600">
                              • {participant}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>R$ {orderData.payment.subtotal.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxa de serviço</span>
                      <span>R$ {orderData.payment.fee.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Pago</span>
                      <span className="text-green-600">R$ {orderData.payment.total.toFixed(2).replace(".", ",")}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm">
                      {getPaymentMethodIcon(orderData.payment.method)}
                      <span>Pago via {getPaymentMethodName(orderData.payment.method)}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Confirmado
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tickets Download */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Seus Ingressos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Faça o download dos seus ingressos e apresente-os na entrada do evento. Cada participante deve
                    apresentar seu ingresso individual.
                  </p>

                  <div className="space-y-4">
                    {orderData.tickets.map((ticket) =>
                      ticket.participants.map((participant, index) => (
                        <div
                          key={`${ticket.id}-${index}`}
                          className="border rounded-lg p-6 bg-white flex items-center justify-between"
                        >
                          <div className="flex items-center gap-6">
                            <div className="bg-gray-100 w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0">
                              <QrCode className="h-12 w-12 text-gray-400" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{ticket.name}</h4>
                              <p className="text-gray-600 mb-1">{participant}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>Pedido: {orderData.id}</span>
                                <span>•</span>
                                <span>Valor: R$ {ticket.price.toFixed(2).replace(".", ",")}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="lg" className="flex-shrink-0">
                            <Download className="h-4 w-4 mr-2" />
                            Baixar Ingresso
                          </Button>
                        </div>
                      )),
                    )}
                  </div>

                  <Button onClick={handleDownloadTickets} disabled={downloadingTickets} className="w-full" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    {downloadingTickets ? "Preparando Download..." : "Baixar Todos os Ingressos"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Próximos Passos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Confirmação por E-mail</p>
                        <p className="text-xs text-gray-600">Enviado para {orderData.buyer.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Download className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Baixe seus Ingressos</p>
                        <p className="text-xs text-gray-600">Necessário para entrada no evento</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Adicione à Agenda</p>
                        <p className="text-xs text-gray-600">Não perca a data do evento</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Reenviar E-mail
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 text-sm">
                    <p className="font-medium text-blue-900 mb-1">Precisa de Ajuda?</p>
                    <p className="text-blue-700">
                      Entre em contato conosco pelo e-mail{" "}
                      <a href="mailto:suporte@techconf.com" className="underline">
                        suporte@techconf.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
