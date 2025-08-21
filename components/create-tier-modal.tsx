"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface CreateTierModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: any
}

export function CreateTierModal({ open, onOpenChange, initialData }: CreateTierModalProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    value: initialData?.value || "",
    color: initialData?.color || "bg-blue-100 text-blue-800 border-blue-300",
    description: initialData?.description || "",
    benefits: initialData?.benefits || [],
  })

  const [newBenefit, setNewBenefit] = useState("")
  const isEditing = !!initialData

  const colorOptions = [
    { value: "bg-gray-100 text-gray-800 border-gray-300", label: "Cinza", preview: "bg-gray-300" },
    { value: "bg-yellow-100 text-yellow-800 border-yellow-300", label: "Amarelo", preview: "bg-yellow-300" },
    { value: "bg-slate-100 text-slate-800 border-slate-300", label: "Prata", preview: "bg-slate-300" },
    { value: "bg-orange-100 text-orange-800 border-orange-300", label: "Laranja", preview: "bg-orange-300" },
    { value: "bg-blue-100 text-blue-800 border-blue-300", label: "Azul", preview: "bg-blue-300" },
    { value: "bg-green-100 text-green-800 border-green-300", label: "Verde", preview: "bg-green-300" },
    { value: "bg-purple-100 text-purple-800 border-purple-300", label: "Roxo", preview: "bg-purple-300" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Tier data:", formData)
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Nível de Patrocínio" : "Novo Nível de Patrocínio"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Coluna Esquerda */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Nível *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Platinum, Ouro, Prata..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="value">Valor (R$) *</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
                  placeholder="15000"
                  required
                />
              </div>

              <div>
                <Label>Cor do Badge</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, color: color.value }))}
                      className={`flex items-center gap-2 p-2 rounded border ${
                        formData.color === color.value ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div className={`w-4 h-4 rounded ${color.preview}`} />
                      <span className="text-sm">{color.label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <Badge className={formData.color}>Preview: {formData.name || "Nome"}</Badge>
                </div>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição do nível de patrocínio..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Benefícios Inclusos *</Label>
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
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                      <span className="text-sm">{benefit}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeBenefit(index)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                {formData.benefits.length === 0 && (
                  <p className="text-sm text-muted-foreground">Adicione pelo menos um benefício</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={formData.benefits.length === 0}>
              {isEditing ? "Salvar Alterações" : "Criar Nível"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
