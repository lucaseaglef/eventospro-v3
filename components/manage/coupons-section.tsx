"use client"

import { useCoupons } from "@/hooks/use-coupons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Tag, Percent, Users } from "lucide-react"
import { CreateCouponModal } from "@/components/create-coupon-modal"
import { useState } from "react"

interface CouponsSectionProps {
  eventId: string
}

export function CouponsSection({ eventId }: CouponsSectionProps) {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useCoupons(eventId)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<any>(null)

  const handleCreateCoupon = () => {
    setEditingCoupon(null)
    setIsModalOpen(true)
  }

  const handleEditCoupon = (coupon: any) => {
    setEditingCoupon(coupon)
    setIsModalOpen(true)
  }

  const handleSaveCoupon = (couponData: any) => {
    if (editingCoupon) {
      updateCoupon(editingCoupon.id, couponData)
    } else {
      addCoupon(couponData)
    }
    setIsModalOpen(false)
  }

  const handleDeleteCoupon = (couponId: string) => {
    if (confirm("Tem certeza que deseja excluir este cupom?")) {
      deleteCoupon(couponId)
    }
  }

  const activeCoupons = coupons.filter((c) => c.active).length
  const totalUses = coupons.reduce((acc, c) => acc + (Number(c.usedCount) || 0), 0)
  const averageDiscount =
    coupons.length > 0
      ? Math.round(coupons.reduce((acc, c) => acc + (Number(c.discountValue) || 0), 0) / coupons.length)
      : 0
  const totalSavings = coupons.reduce((acc, c) => {
    const discountValue = Number(c.discountValue) || 0
    const usedCount = Number(c.usedCount) || 0
    return acc + (c.discountType === "fixed" ? discountValue * usedCount : 0)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Coupon Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cupons Ativos</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCoupons}</div>
            <p className="text-xs text-muted-foreground">Disponíveis para uso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUses}</div>
            <p className="text-xs text-muted-foreground">Cupons utilizados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desconto Médio</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageDiscount}%</div>
            <p className="text-xs text-muted-foreground">Desconto aplicado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Economia Total</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalSavings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Valor economizado</p>
          </CardContent>
        </Card>
      </div>

      {/* Coupons List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Cupons de Desconto</CardTitle>
            <Button onClick={handleCreateCoupon}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cupom
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coupons.map((coupon) => {
              const usedCount = Number(coupon.usedCount) || 0
              const usageLimit = Number(coupon.usageLimit) || 0
              const discountValue = Number(coupon.discountValue) || 0
              const usagePercentage = usageLimit > 0 ? Math.round((usedCount / usageLimit) * 100) : 0

              return (
                <div key={coupon.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Tag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium font-mono text-lg">{coupon.code}</div>
                      <div className="text-sm text-muted-foreground">
                        {coupon.discountType === "percentage"
                          ? `${discountValue}% de desconto`
                          : `R$ ${discountValue.toFixed(2)} de desconto`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-medium">
                        {usedCount}/{usageLimit}
                      </div>
                      <div className="text-sm text-muted-foreground">Usos</div>
                    </div>

                    <div className="w-24">
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${usagePercentage}%` }} />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{usagePercentage}%</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {new Date(coupon.expiresAt).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="text-xs text-muted-foreground">Expira em</div>
                    </div>

                    <Badge variant={coupon.active ? "default" : "secondary"}>
                      {coupon.active ? "Ativo" : "Inativo"}
                    </Badge>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditCoupon(coupon)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteCoupon(coupon.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <CreateCouponModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        coupon={editingCoupon}
        onSave={handleSaveCoupon}
      />
    </div>
  )
}
