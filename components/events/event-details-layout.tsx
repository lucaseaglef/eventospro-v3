"use client"

import type React from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface EventDetailsLayoutProps {
  children: React.ReactNode
}

export function EventDetailsLayout({ children }: EventDetailsLayoutProps) {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Eventos
          </Button>
        </div>
        {children}
      </div>
    </DashboardLayout>
  )
}
