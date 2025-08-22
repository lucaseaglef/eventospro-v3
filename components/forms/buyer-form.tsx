"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BuyerData {
  name: string
  email: string
  phone: string
  document: string
}

interface BuyerFormProps {
  data: BuyerData
  onChange: (data: BuyerData) => void
}

export function BuyerForm({ data, onChange }: BuyerFormProps) {
  const handleChange = (field: keyof BuyerData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dados do comprador</h2>
        <p className="text-muted-foreground">Preencha suas informações pessoais</p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document">CPF *</Label>
            <Input
              id="document"
              value={data.document}
              onChange={(e) => handleChange("document", e.target.value)}
              placeholder="000.000.000-00"
              required
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Importante:</strong> Estes dados serão utilizados para emissão dos ingressos e comunicações sobre o
            evento.
          </p>
        </div>
      </Card>
    </div>
  )
}
