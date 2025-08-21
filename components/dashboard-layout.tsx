"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Calendar, BarChart3, Users, Ticket, QrCode, Settings, Menu, Home, CreditCard, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, current: true },
  { name: "Eventos", href: "/events", icon: Calendar, current: false },
  { name: "Vendas", href: "/sales", icon: CreditCard, current: false },
  { name: "Participantes", href: "/participants", icon: Users, current: false },
  { name: "Credenciamento", href: "/credentials", icon: QrCode, current: false },
  { name: "Ingressos", href: "/tickets", icon: Ticket, current: false },
  { name: "Relatórios", href: "/reports", icon: FileText, current: false },
  { name: "Analytics", href: "/analytics", icon: BarChart3, current: false },
  { name: "Configurações", href: "/settings", icon: Settings, current: false },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-auto">{children}</div>
    </div>
  )
}

function Sidebar() {
  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Ticket className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-sidebar-foreground">EventPro</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              item.current
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  )
}
