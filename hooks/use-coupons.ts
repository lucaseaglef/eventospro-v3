"use client"

import { useLocalStorage } from "./use-local-storage"
import { useState } from "react"

export interface Coupon {
  id: string
  code: string
  discountType: "percentage" | "fixed"
  discountValue: number
  usageLimit: number
  usedCount: number
  expiresAt: string
  minPurchase: number
  active: boolean
  eventId: string
}

export function useCoupons(eventId: string) {
  const [coupons, setCoupons] = useLocalStorage<Coupon[]>(`coupons_${eventId}`, [
    {
      id: "1",
      code: "EARLY20",
      discountType: "percentage",
      discountValue: 20,
      usageLimit: 100,
      usedCount: 23,
      expiresAt: "2024-12-01T23:59",
      minPurchase: 100,
      active: true,
      eventId,
    },
    {
      id: "2",
      code: "VIP50",
      discountType: "fixed",
      discountValue: 50,
      usageLimit: 50,
      usedCount: 8,
      expiresAt: "2024-12-15T23:59",
      minPurchase: 200,
      active: true,
      eventId,
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)

  const createCoupon = (coupon: Omit<Coupon, "id" | "usedCount">) => {
    const newCoupon: Coupon = {
      ...coupon,
      id: Date.now().toString(),
      usedCount: 0,
    }
    setCoupons((prev) => [...prev, newCoupon])
    return newCoupon
  }

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons((prev) => prev.map((coupon) => (coupon.id === id ? { ...coupon, ...updates } : coupon)))
  }

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== id))
  }

  const getCoupon = (id: string) => {
    return coupons.find((coupon) => coupon.id === id)
  }

  return {
    coupons,
    createCoupon,
    addCoupon: createCoupon,
    updateCoupon,
    deleteCoupon,
    getCoupon,
    isModalOpen,
    setIsModalOpen,
    editingCoupon,
    setEditingCoupon,
  }
}
