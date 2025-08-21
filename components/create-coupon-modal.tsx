"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tag, Percent, Calendar, Users } from "lucide-react"

interface Coupon {
  id: string
  code: string
  discount: number
  type: "percentage" | "fixed"
  uses: number
  maxUses: number
  status: "active" | "inactive"
  expiresAt: string
  description?: string
  minPurchase?: number
  applicableTickets?: string[]
}

interface CreateCouponModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  coupon?: Coupon | null
  onSave: (coupon: Partial<Coupon>) => void
}

export function CreateCouponModal({ open, onOpenChange, coupon, onSave }: CreateCouponModalProps) {
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    type: "percentage" as "percentage" | "fixed",
    maxUses: "",
    expiresAt: "",
    description: "",
    minPurchase: "",
    status: true,
    applicableTickets: "all" as "all" | "specific",
  })

  const isEditing = !!coupon

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code,
        discount: coupon.discount.toString(),
        type: coupon.type,
        maxUses: coupon.maxUses.toString(),
        expiresAt: coupon.expiresAt,
        description: coupon.description || "",
        minPurchase: coupon.minPurchase?.toString() || "",
        status: coupon.status === "active",
        applicableTickets: "all",
      })
    } else {
      setFormData({
        code: "",
        discount: "",
        type: "percentage",
        maxUses: "",
        expiresAt: "",
        description: "",
        minPurchase: "",
        status: true,
        applicableTickets: "all",
      })
    }
  }, [coupon, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const couponData = {
      ...coupon,
      code: formData.code,
      discount: Number.parseFloat(formData.discount),
      type: formData.type,
      maxUses: Number.parseInt(formData.maxUses),
      expiresAt: formData.expiresAt,
      description: formData.description,
      minPurchase: formData.minPurchase ? Number.parseFloat(formData.minPurchase) : undefined,
      status: formData.status ? "active" : "inactive",
      uses: coupon?.uses || 0,
    }

    onSave(couponData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            {isEditing ? "Editar Cupom" : "Criar Novo Cupom"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código do Cupom *</Label>
                  <Input
                    id="code"
                    placeholder="Ex: EARLY2024"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="font-mono"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Desconto</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "percentage" | "fixed") => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentual (%)</SelectItem>
                      <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount">
                    {formData.type === "percentage" ? "Desconto (%)" : "Desconto (R$)"} *
                  </Label>
                  <div className="relative">
                    <Input
                      id="discount"
                      type="number"
                      placeholder={formData.type === "percentage" ? "20" : "50.00"}
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      min="0"
                      max={formData.type === "percentage" ? "100" : undefined}
                      step={formData.type === "percentage" ? "1" : "0.01"}
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {formData.type === "percentage" ? <Percent className="h-4 w-4" /> : "R$"}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxUses">Limite de Usos *</Label>
                  <div className="relative">
                    <Input
                      id="maxUses"
                      type="number"
                      placeholder="100"
                      value={formData.maxUses}
                      onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                      min="1"
                      required
                    />
                    <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descrição do cupom para os participantes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Configurações Avançadas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Configurações Avançadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiresAt">Data de Expiração *</Label>
                  <Input
                    id="expiresAt"
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minPurchase">Compra Mínima (R$)</Label>
                  <Input
                    id="minPurchase"
                    type="number"
                    placeholder="0.00"
                    value={formData.minPurchase}
                    onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Aplicável a</Label>
                <Select
                  value={formData.applicableTickets}
                  onValueChange={(value: "all" | "specific") => setFormData({ ...formData, applicableTickets: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos de ingresso</SelectItem>
                    <SelectItem value="specific">Tipos específicos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="status">Cupom Ativo</Label>
                  <p className="text-sm text-muted-foreground">Cupom disponível para uso pelos participantes</p>
                </div>
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{isEditing ? "Salvar Alterações" : "Criar Cupom"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
