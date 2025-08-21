"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Mail, Settings, FileText, Users } from "lucide-react"

interface CertificatesSectionProps {
  eventId: string
}

const certificateStats = {
  totalEligible: 156,
  generated: 89,
  sent: 67,
  pending: 89,
}

export function CertificatesSection({ eventId }: CertificatesSectionProps) {
  return (
    <div className="space-y-6">
      {/* Certificate Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Elegíveis</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateStats.totalEligible}</div>
            <p className="text-xs text-muted-foreground">Fizeram check-in</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gerados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateStats.generated}</div>
            <p className="text-xs text-muted-foreground">57% dos elegíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enviados</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateStats.sent}</div>
            <p className="text-xs text-muted-foreground">75% dos gerados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateStats.pending}</div>
            <p className="text-xs text-muted-foreground">Aguardando geração</p>
          </CardContent>
        </Card>
      </div>

      {/* Certificate Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Template do Certificado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Template atual: Certificado Padrão</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Editar Template
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações em Lote</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Gere e envie certificados para todos os participantes elegíveis
              </p>
            </div>
            <div className="space-y-2">
              <Button className="w-full">
                <Award className="h-4 w-4 mr-2" />
                Gerar Todos os Certificados
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Mail className="h-4 w-4 mr-2" />
                Enviar por Email
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download em Lote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificate Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Certificado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Título do Certificado</label>
                <p className="text-sm text-muted-foreground">Certificado de Participação - Tech Conference 2024</p>
              </div>
              <div>
                <label className="text-sm font-medium">Carga Horária</label>
                <p className="text-sm text-muted-foreground">8 horas</p>
              </div>
              <div>
                <label className="text-sm font-medium">Critério de Elegibilidade</label>
                <p className="text-sm text-muted-foreground">Participante deve ter feito check-in no evento</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Assinatura Digital</label>
                <p className="text-sm text-muted-foreground">João Silva - Organizador</p>
              </div>
              <div>
                <label className="text-sm font-medium">Código de Verificação</label>
                <Badge variant="outline">Habilitado</Badge>
              </div>
              <div>
                <label className="text-sm font-medium">Envio Automático</label>
                <Badge variant="outline">Após check-in</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
