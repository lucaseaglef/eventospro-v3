"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Users, Plus, Minus, X } from "lucide-react"

interface TicketType {
  id: string
  name: string
  price: number
  quantity: number
}

interface OrderSummaryProps {
  tickets: TicketType[]
  subtotal: number
  discount: number
  total: number
  couponCode: string
  onCouponChange: (code: string) => void
  onTicketQuantityChange: (ticketId: string, quantity: number) => void
  onTicketRemove: (ticketId: string) => void
  onContinue?: () => void
}

export function OrderSummary({
  tickets,
  subtotal,
  discount,
  total,
  couponCode,
  onCouponChange,
  onTicketQuantityChange,
  onTicketRemove,
  onContinue,
}: OrderSummaryProps) {
  const [couponInput, setCouponInput] = useState("")
  const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0)

  const platformFee = subtotal * 0.1
  const finalTotal = subtotal - discount + platformFee

  const applyCoupon = () => {
    onCouponChange(couponInput)
  }

  return (
    <Card className="p-6 sticky top-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-card-foreground">Resumo do pedido</h3>
        {totalTickets > 0 && (
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {totalTickets} {totalTickets === 1 ? "ingresso" : "ingressos"}
          </Badge>
        )}
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">Nenhum ingresso selecionado</p>
          <p className="text-sm text-muted-foreground mt-1">Clique nos ingressos para adicioná-los</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-0">
            {tickets.map((ticket, index) => (
              <div key={ticket.id}>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-card-foreground">{ticket.name}</p>
                      <p className="text-sm text-muted-foreground">R$ {ticket.price.toFixed(2)} cada</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onTicketRemove(ticket.id)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onTicketQuantityChange(ticket.id, ticket.quantity - 1)}
                        disabled={ticket.quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center font-medium text-foreground">{ticket.quantity}</span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onTicketQuantityChange(ticket.id, ticket.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <p className="font-semibold text-card-foreground">
                      R$ {(ticket.price * ticket.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                {index < tickets.length - 1 && <Separator className="my-3" />}
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Código do cupom"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={applyCoupon} disabled={!couponInput}>
                Aplicar
              </Button>
            </div>
            {couponCode && discount > 0 && (
              <p className="text-sm text-primary">✓ Cupom "{couponCode}" aplicado com sucesso!</p>
            )}
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-card-foreground font-medium">R$ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Taxa da plataforma (10%)</span>
              <span className="text-card-foreground font-medium">R$ {platformFee.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Desconto ({couponCode})</span>
                <span className="text-primary font-medium">-R$ {discount.toFixed(2)}</span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span className="text-card-foreground">Total</span>
              <span className="text-primary">R$ {finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {onContinue && (
            <Button
              onClick={onContinue}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
              size="lg"
            >
              Continuar para dados pessoais
            </Button>
          )}

          <div className="pt-4 border-t space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              <span>Compra 100% segura</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Lock className="h-4 w-4 text-primary" />
              <span>Pagamento protegido</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>+50k clientes satisfeitos</span>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              Os ingressos serão enviados por e-mail após a confirmação do pagamento.
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}
