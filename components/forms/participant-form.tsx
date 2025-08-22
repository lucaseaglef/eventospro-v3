"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export function ParticipantForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    dietary: "",
    newsletter: false,
    terms: false,
  })

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Dados do Participante</CardTitle>
        <p className="text-muted-foreground">Preencha seus dados para finalizar a inscrição</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-card-foreground">
              Nome *
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              placeholder="Seu primeiro nome"
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-card-foreground">
              Sobrenome *
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              placeholder="Seu sobrenome"
              className="bg-input"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-card-foreground">
              E-mail *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="seu@email.com"
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-card-foreground">
              Telefone *
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="(11) 99999-9999"
              className="bg-input"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-card-foreground">
              Empresa
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => updateField("company", e.target.value)}
              placeholder="Nome da sua empresa"
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="text-card-foreground">
              Cargo
            </Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => updateField("position", e.target.value)}
              placeholder="Seu cargo na empresa"
              className="bg-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dietary" className="text-card-foreground">
            Restrições Alimentares
          </Label>
          <Textarea
            id="dietary"
            value={formData.dietary}
            onChange={(e) => updateField("dietary", e.target.value)}
            placeholder="Descreva suas restrições alimentares, se houver"
            className="bg-input"
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => updateField("newsletter", checked as boolean)}
            />
            <Label htmlFor="newsletter" className="text-sm text-card-foreground">
              Quero receber novidades sobre eventos futuros
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.terms}
              onCheckedChange={(checked) => updateField("terms", checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm text-card-foreground">
              Aceito os{" "}
              <a href="#" className="text-primary hover:underline">
                termos de uso
              </a>{" "}
              e{" "}
              <a href="#" className="text-primary hover:underline">
                política de privacidade
              </a>{" "}
              *
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
