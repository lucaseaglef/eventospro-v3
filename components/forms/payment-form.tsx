"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Lock, QrCode, Banknote } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PaymentFormProps {
  total: number
}

export function PaymentForm({ total }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    installments: "1",
  })

  const updateCardField = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  const pixTotal = total * 0.95 // 5% discount for PIX

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Método de pagamento</h2>
        <p className="text-muted-foreground">Escolha como deseja pagar seus ingressos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-card-foreground">
            <Lock className="mr-2 h-5 w-5 text-primary" />
            Pagamento Seguro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <button
              onClick={() => setPaymentMethod("credit-card")}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                paymentMethod === "credit-card"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <CreditCard className="h-6 w-6 mb-2" />
              <span className="font-medium">Cartão de Crédito</span>
              <span className="text-xs text-muted-foreground mt-1">Até 12x</span>
            </button>

            <button
              onClick={() => setPaymentMethod("pix")}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                paymentMethod === "pix"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <QrCode className="h-6 w-6 mb-2" />
              <span className="font-medium">PIX</span>
              <Badge className="mt-1 bg-secondary text-secondary-foreground text-xs">5% OFF</Badge>
            </button>

            <button
              onClick={() => setPaymentMethod("boleto")}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                paymentMethod === "boleto"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Banknote className="h-6 w-6 mb-2" />
              <span className="font-medium">Boleto</span>
              <span className="text-xs text-muted-foreground mt-1">À vista</span>
            </button>
          </div>

          {paymentMethod === "credit-card" && (
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-card-foreground">Dados do cartão</h4>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do cartão *</Label>
                  <Input
                    id="cardNumber"
                    value={cardData.number}
                    onChange={(e) => updateCardField("number", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Nome no cartão *</Label>
                  <Input
                    id="cardName"
                    value={cardData.name}
                    onChange={(e) => updateCardField("name", e.target.value)}
                    placeholder="Nome como está no cartão"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Validade *</Label>
                    <Input
                      id="cardExpiry"
                      value={cardData.expiry}
                      onChange={(e) => updateCardField("expiry", e.target.value)}
                      placeholder="MM/AA"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardCvv">CVV *</Label>
                    <Input
                      id="cardCvv"
                      value={cardData.cvv}
                      onChange={(e) => updateCardField("cvv", e.target.value)}
                      placeholder="123"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="installments">Parcelas</Label>
                    <Select
                      value={cardData.installments}
                      onValueChange={(value) => updateCardField("installments", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1x R$ {total.toFixed(2)}</SelectItem>
                        <SelectItem value="2">2x R$ {(total / 2).toFixed(2)}</SelectItem>
                        <SelectItem value="3">3x R$ {(total / 3).toFixed(2)}</SelectItem>
                        <SelectItem value="6">6x R$ {(total / 6).toFixed(2)}</SelectItem>
                        <SelectItem value="12">12x R$ {(total / 12).toFixed(2)}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "pix" && (
            <div className="text-center p-6 bg-muted rounded-lg">
              <QrCode className="mx-auto h-16 w-16 text-primary mb-4" />
              <h4 className="text-lg font-semibold text-card-foreground mb-2">Pagamento via PIX</h4>
              <p className="text-muted-foreground mb-4">
                Após confirmar a compra, você receberá o código PIX para pagamento
              </p>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground line-through">De: R$ {total.toFixed(2)}</p>
                <p className="text-xl font-bold text-primary">Por: R$ {pixTotal.toFixed(2)}</p>
                <Badge className="bg-secondary text-secondary-foreground">
                  Economia de R$ {(total - pixTotal).toFixed(2)}
                </Badge>
              </div>
            </div>
          )}

          {paymentMethod === "boleto" && (
            <div className="text-center p-6 bg-muted rounded-lg">
              <Banknote className="mx-auto h-16 w-16 text-primary mb-4" />
              <h4 className="text-lg font-semibold text-card-foreground mb-2">Pagamento via Boleto</h4>
              <p className="text-muted-foreground mb-4">O boleto será gerado após a confirmação e enviado por e-mail</p>
              <p className="text-xl font-bold text-primary">R$ {total.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-2">Vencimento em 3 dias úteis</p>
            </div>
          )}

          <Button className="w-full" size="lg">
            Finalizar Compra - R$ {paymentMethod === "pix" ? pixTotal.toFixed(2) : total.toFixed(2)}
          </Button>

          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Seus dados estão protegidos com criptografia SSL</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
