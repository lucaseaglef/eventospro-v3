"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface SectionConfig {
  id: string
  name: string
  visible: boolean
  order: number
}

interface CheckoutConfigContextType {
  sections: SectionConfig[]
  setSections: (sections: SectionConfig[]) => void
  getSortedVisibleSections: () => SectionConfig[]
  isSectionVisible: (sectionId: string) => boolean
}

const CheckoutConfigContext = createContext<CheckoutConfigContextType | undefined>(undefined)

export function CheckoutConfigProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<SectionConfig[]>([
    { id: "event-info", name: "Informações do Evento", visible: true, order: 0 },
    { id: "highlights", name: "Destaques", visible: true, order: 1 },
    { id: "sponsors", name: "Patrocinadores", visible: true, order: 2 },
    { id: "schedule", name: "Programação", visible: true, order: 3 },
  ])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("checkout-sections-config")
    if (saved) {
      try {
        setSections(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading checkout config:", error)
      }
    }
  }, [])

  // Save to localStorage when sections change
  useEffect(() => {
    localStorage.setItem("checkout-sections-config", JSON.stringify(sections))
  }, [sections])

  const getSortedVisibleSections = () => {
    return sections.filter((section) => section.visible).sort((a, b) => a.order - b.order)
  }

  const isSectionVisible = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId)
    return section?.visible ?? true
  }

  return (
    <CheckoutConfigContext.Provider
      value={{
        sections,
        setSections,
        getSortedVisibleSections,
        isSectionVisible,
      }}
    >
      {children}
    </CheckoutConfigContext.Provider>
  )
}

export function useCheckoutConfig() {
  const context = useContext(CheckoutConfigContext)
  if (context === undefined) {
    throw new Error("useCheckoutConfig must be used within a CheckoutConfigProvider")
  }
  return context
}
