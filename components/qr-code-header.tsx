import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Mail, RefreshCw } from "lucide-react"

interface QRCodeHeaderProps {
  event: {
    name: string
    totalParticipants: number
    qrCodesGenerated: number
  }
}

export function QRCodeHeader({ event }: QRCodeHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Evento
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Codes</h1>
          <p className="text-muted-foreground">{event.name}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerar Todos
        </Button>
        <Button variant="outline" size="sm">
          <Mail className="mr-2 h-4 w-4" />
          Enviar por Email
        </Button>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Download className="mr-2 h-4 w-4" />
          Download em Lote
        </Button>
      </div>
    </div>
  )
}
