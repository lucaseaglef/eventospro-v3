"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Users,
  Ticket,
  DollarSign,
  QrCode,
  Award,
  Tag,
  Settings,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  ShoppingCart,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface EventManageLayoutProps {
  children: React.ReactNode
  eventId: string
  activeSection: string
}

const sections = [
  { id: "participantes", label: "Participantes", icon: Users },
  { id: "ingressos", label: "Ingressos", icon: Ticket },
  { id: "financeiro", label: "Financeiro", icon: DollarSign },
  { id: "credenciamento", label: "Credenciamento", icon: QrCode },
  { id: "certificados", label: "Certificados", icon: Award },
  { id: "cupons", label: "Cupons", icon: Tag },
  { id: "checkout", label: "Checkout", icon: ShoppingCart },
  { id: "formulario", label: "Formulário", icon: FileText }, // Added form builder tab
  { id: "configuracoes", label: "Configurações", icon: Settings },
]

// Mock event data
const eventData = {
  id: "1",
  name: "Tech Conference 2024",
  date: "2024-03-15",
  time: "09:00",
  location: "Centro de Convenções São Paulo",
  banner: "/tech-conference-hall.png",
  status: "active",
  totalTickets: 500,
  soldTickets: 387,
}

export function EventManageLayout({ children, eventId, activeSection }: EventManageLayoutProps) {
  const router = useRouter()

  const handleSectionChange = (section: string) => {
    router.push(`/events/${eventId}/manage?section=${section}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="secondary" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">{eventData.name}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    {new Date(eventData.date).toLocaleDateString("pt-BR")} às {eventData.time}
                  </span>
                  <span>{eventData.location}</span>
                  <Badge variant={eventData.status === "active" ? "default" : "secondary"}>
                    {eventData.status === "active" ? "Ativo" : "Rascunho"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/checkout/${eventId}`}>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Duplicar
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3 flex-wrap">
            {sections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`
                    group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm
                    transition-all duration-300 ease-out whitespace-nowrap min-w-fit
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                        : "bg-white/80 text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-md border border-slate-200/50"
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm" />
                  )}

                  {/* Icon with background */}
                  <div
                    className={`
                    p-1.5 rounded-lg transition-all duration-300
                    ${isActive ? "bg-white/20" : "bg-slate-100 group-hover:bg-blue-100"}
                  `}
                  >
                    <Icon
                      className={`h-4 w-4 transition-all duration-300 ${
                        isActive ? "text-white" : "text-slate-500 group-hover:text-blue-600"
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <span className="font-semibold">{section.label}</span>

                  {/* Hover effect */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 transition-all duration-300" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">{children}</div>
    </div>
  )
}
