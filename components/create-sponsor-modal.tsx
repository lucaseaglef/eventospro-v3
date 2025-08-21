"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface CreateSponsorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: any
}

const tierOptions = [
  { value: "platinum", label: "Platinum", color: "bg-gray-100 text-gray-800 border-gray-300" },
  { value: "gold", label: "Ouro", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { value: "silver", label: "Prata", color: "bg-slate-100 text-slate-800 border-slate-300" },
  { value: "bronze", label: "Bronze", color: "bg-orange-100 text-orange-800 border-orange-300" },
]

export function CreateSponsorModal({ open, onOpenChange, initialData }: CreateSponsorModalProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    tier: initialData?.tier || "",
    website: initialData?.website || "",
    contact: initialData?.contact || "",
    amount: initialData?.amount || "",
    description: initialData?.description || "",
    benefits: initialData?.benefits || [],
  })

  const [newBenefit, setNewBenefit] = useState("")
  const isEditing = !!initialData

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sponsor data:", formData)
    onOpenChange(false)
  }

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }))
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Patrocinador" : "Novo Patrocinador"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Coluna Esquerda */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Empresa *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: TechCorp Solutions"
                  required
                />
              </div>

              <div>
                <Label htmlFor="tier">Nível de Patrocínio *</Label>
                <Select
                  value={formData.tier}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, tier: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    {tierOptions.map((tier) => (
                      <SelectItem key={tier.value} value={tier.value}>
                        <div className="flex items-center gap-2">
                          <Badge className={tier.color}>{tier.label}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                  placeholder="https://empresa.com"
                />
              </div>

              <div>
                <Label htmlFor="contact">Email de Contato *</Label>
                <Input
                  id="contact"
                  type="email"
                  value={formData.contact}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
                  placeholder="contato@empresa.com"
                  required
                />
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Valor do Patrocínio (R$) *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                  placeholder="15000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição adicional sobre o patrocínio..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Benefícios Inclusos</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Ex: Logo no material"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                  />
                  <Button type="button" onClick={addBenefit} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                      <span className="text-sm">{benefit}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeBenefit(index)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{isEditing ? "Salvar Alterações" : "Criar Patrocinador"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
