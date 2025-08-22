import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Download, Mail, Copy, Settings, BarChart3 } from "lucide-react"

interface EventActionsProps {
  eventId: string
}

export function EventActions({ eventId }: EventActionsProps) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start bg-transparent" variant="outline">
          <QrCode className="mr-2 h-4 w-4" />
          Gerar QR Codes
        </Button>

        <Button className="w-full justify-start bg-transparent" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Lista
        </Button>

        <Button className="w-full justify-start bg-transparent" variant="outline">
          <Mail className="mr-2 h-4 w-4" />
          Enviar Convites
        </Button>

        <Button className="w-full justify-start bg-transparent" variant="outline">
          <Copy className="mr-2 h-4 w-4" />
          Duplicar Evento
        </Button>

        <Button className="w-full justify-start bg-transparent" variant="outline">
          <BarChart3 className="mr-2 h-4 w-4" />
          Relatório Detalhado
        </Button>

        <Button className="w-full justify-start bg-transparent" variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Configurações
        </Button>
      </CardContent>
    </Card>
  )
}
