"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tag, Monitor, MapPin, UserCog } from "lucide-react"
import { LabelEditorSection } from "./label-editor-section"

interface CredentialingSectionProps {
  eventId: string
}

export function CredentialingSection({ eventId }: CredentialingSectionProps) {
  const [activeView, setActiveView] = useState<"main" | "label-editor">("main")

  if (activeView === "label-editor") {
    return <LabelEditorSection eventId={eventId} onBack={() => setActiveView("main")} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Credenciamento</h2>
        <p className="text-muted-foreground">Credenciar participantes no evento</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <Tag className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Editor de Etiquetas</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Configure o layout das etiquetas de credenciamento. Ajuste tamanhos, formatos e personalize os campos
              exibidos.
            </p>
            <Button className="w-full bg-black hover:bg-gray-800" onClick={() => setActiveView("label-editor")}>
              Configurar Etiquetas
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <Monitor className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Estações de Credenciamento</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Gerencie e visualize todas as estações de credenciamento. Configure operadores, impressoras e monitore
              atividade em tempo real.
            </p>
            <Button className="w-full bg-black hover:bg-gray-800">Acessar Estações</Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Zonas de Acesso</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Controle e configuração das diferentes zonas do evento. Defina permissões de acesso e mapeie o fluxo entre
              áreas.
            </p>
            <Button className="w-full bg-black hover:bg-gray-800">Acessar Zonas</Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <UserCog className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Operadores</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Cadastre e gerencie os operadores de credenciamento. Defina permissões e acompanhe o histórico de
              atividades.
            </p>
            <Button className="w-full bg-black hover:bg-gray-800">Acessar Operadores</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
