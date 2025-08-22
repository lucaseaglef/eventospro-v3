"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, FileText } from "lucide-react"

interface CreateTicketFormProps {
  onSubmit?: (ticketData: any) => void
  onCancel?: () => void
  initialData?: any
}

export function CreateTicketForm({ onSubmit, onCancel, initialData }: CreateTicketFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    visibility: initialData?.visibility || "public",
    entryType: initialData?.entryType || "ticket",
    quantity: initialData?.quantity?.toString() || "",
    price: initialData?.price?.toString() || "",
    purchaseLimit: initialData?.purchaseLimit?.toString() || "",
    description: initialData?.description || "",
    salesStart: initialData?.salesStart || "",
    salesEnd: initialData?.salesEnd || "",
    checkinStart: initialData?.checkinStart || "",
    checkinEnd: initialData?.checkinEnd || "",
    isActive: initialData?.status === "active" ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isEditing = !!initialData
  const title = isEditing ? "Editar Tipo de Ingresso" : "Novo Tipo de Ingresso"
  const subtitle = isEditing
    ? "Modifique as configurações do lote de ingressos"
    : "Configure um novo lote de ingressos para o evento"
  const buttonText = isEditing ? "Salvar Alterações" : "Salvar Ingresso"

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>{buttonText}</Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Lote *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Ingresso Regular"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visibility">Visibilidade</Label>
                <Select value={formData.visibility} onValueChange={(value) => updateField("visibility", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a visibilidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Público</SelectItem>
                    <SelectItem value="private">Privado</SelectItem>
                    <SelectItem value="hidden">Oculto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="entryType">Tipo de Entrada</Label>
              <Select value={formData.entryType} onValueChange={(value) => updateField("entryType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ticket">Ingresso</SelectItem>
                  <SelectItem value="courtesy">Cortesia</SelectItem>
                  <SelectItem value="press">Imprensa</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Define a nomenclatura usada em toda a aplicação (botões, textos, etc.)
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade *</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="200"
                  value={formData.quantity}
                  onChange={(e) => updateField("quantity", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="149,00"
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseLimit">Limite por Compra</Label>
                <Input
                  id="purchaseLimit"
                  type="number"
                  placeholder="5"
                  value={formData.purchaseLimit}
                  onChange={(e) => updateField("purchaseLimit", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Acesso completo a todas as palestras e workshops do evento."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Configurações de Data e Hora
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salesStart">Início das Vendas</Label>
                <Input
                  id="salesStart"
                  type="datetime-local"
                  value={formData.salesStart}
                  onChange={(e) => updateField("salesStart", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salesEnd">Fim das Vendas</Label>
                <Input
                  id="salesEnd"
                  type="datetime-local"
                  value={formData.salesEnd}
                  onChange={(e) => updateField("salesEnd", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="checkinStart">Início do Check-in</Label>
                <Input
                  id="checkinStart"
                  type="datetime-local"
                  value={formData.checkinStart}
                  onChange={(e) => updateField("checkinStart", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkinEnd">Fim do Check-in</Label>
                <Input
                  id="checkinEnd"
                  type="datetime-local"
                  value={formData.checkinEnd}
                  onChange={(e) => updateField("checkinEnd", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="isActive" className="text-base font-medium">
                  Lote Ativo
                </Label>
                <p className="text-sm text-muted-foreground">
                  Quando ativo, o lote ficará disponível para venda conforme as datas configuradas
                </p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => updateField("isActive", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
