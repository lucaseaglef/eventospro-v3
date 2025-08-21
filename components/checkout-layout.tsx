"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"

interface CheckoutLayoutProps {
  children: React.ReactNode
}

export function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Evento
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold text-foreground">Finalizar Inscrição</h1>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-chart-1" />
              <span>Compra 100% Segura</span>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 px-6">{children}</main>
    </div>
  )
}
