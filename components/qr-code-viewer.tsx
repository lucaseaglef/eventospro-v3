import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  QrCode,
  Calendar,
  MapPin,
  Clock,
  User,
  Building,
  Ticket,
  Check,
  Download,
  PrinterIcon as Print,
} from "lucide-react"

interface QRCodeViewerProps {
  data: {
    code: string
    participant: {
      name: string
      email: string
      company: string
      position: string
      avatar: string
    }
    event: {
      name: string
      date: string
      time: string
      location: string
      address: string
    }
    ticket: {
      type: string
      price: string
      features: string[]
    }
    status: string
    generatedAt: string
    validUntil: string
  }
}

export function QRCodeViewer({ data }: QRCodeViewerProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Válido":
        return "bg-chart-1 text-white"
      case "Usado":
        return "bg-chart-4 text-white"
      case "Expirado":
        return "bg-chart-3 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Ingresso Digital</h1>
          <p className="text-muted-foreground">Apresente este QR code na entrada do evento</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center text-foreground">
                <QrCode className="mr-2 h-6 w-6" />
                QR Code do Ingresso
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="w-64 h-64 mx-auto bg-white rounded-lg flex items-center justify-center border-2 border-border">
                <QrCode className="h-48 w-48 text-foreground" />
              </div>

              <div>
                <p className="text-lg font-mono font-bold text-foreground">{data.code}</p>
                <Badge className={getStatusColor(data.status)}>{data.status}</Badge>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Gerado em: {data.generatedAt}</p>
                <p>Válido até: {data.validUntil}</p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Print className="mr-2 h-4 w-4" />
                  Imprimir
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Dados do Participante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={data.participant.avatar || "/placeholder.svg"} alt={data.participant.name} />
                    <AvatarFallback>
                      {data.participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{data.participant.name}</h3>
                    <p className="text-muted-foreground">{data.participant.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-chart-1" />
                    <span className="text-sm text-card-foreground">{data.participant.company}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-chart-2" />
                    <span className="text-sm text-card-foreground">{data.participant.position}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Informações do Evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">{data.event.name}</h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-chart-1" />
                    <span className="text-sm text-card-foreground">
                      {new Date(data.event.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-chart-2" />
                    <span className="text-sm text-card-foreground">{data.event.time}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-chart-3" />
                    <div>
                      <p className="text-sm text-card-foreground">{data.event.location}</p>
                      <p className="text-xs text-muted-foreground">{data.event.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Ticket className="mr-2 h-5 w-5" />
                  Tipo de Ingresso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{data.ticket.type}</h3>
                  <span className="text-lg font-bold text-primary">{data.ticket.price}</span>
                </div>

                <div className="space-y-2">
                  {data.ticket.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-chart-1" />
                      <span className="text-sm text-card-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
