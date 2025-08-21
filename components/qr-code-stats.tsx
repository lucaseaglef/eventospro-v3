import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { QrCode, Mail, Download, Users } from "lucide-react"

interface QRCodeStatsProps {
  stats: {
    totalParticipants: number
    qrCodesGenerated: number
    qrCodesSent: number
    qrCodesDownloaded: number
  }
}

export function QRCodeStats({ stats }: QRCodeStatsProps) {
  const generationRate = (stats.qrCodesGenerated / stats.totalParticipants) * 100
  const sentRate = (stats.qrCodesSent / stats.qrCodesGenerated) * 100
  const downloadRate = (stats.qrCodesDownloaded / stats.qrCodesGenerated) * 100

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Total de Participantes</CardTitle>
          <Users className="h-4 w-4 text-chart-1" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.totalParticipants}</div>
          <p className="text-xs text-muted-foreground mt-1">Inscritos no evento</p>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">QR Codes Gerados</CardTitle>
          <QrCode className="h-4 w-4 text-chart-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.qrCodesGenerated}</div>
          <div className="mt-2">
            <Progress value={generationRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{generationRate.toFixed(1)}% dos participantes</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Enviados por Email</CardTitle>
          <Mail className="h-4 w-4 text-chart-3" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.qrCodesSent}</div>
          <div className="mt-2">
            <Progress value={sentRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{sentRate.toFixed(1)}% dos QR codes</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Downloads</CardTitle>
          <Download className="h-4 w-4 text-chart-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.qrCodesDownloaded}</div>
          <div className="mt-2">
            <Progress value={downloadRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{downloadRate.toFixed(1)}% dos QR codes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
