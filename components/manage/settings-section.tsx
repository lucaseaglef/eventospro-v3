"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Save, Trash2, Copy, Eye } from "lucide-react"

interface SettingsSectionProps {
  eventId: string
}

export function SettingsSection({ eventId }: SettingsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Event Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status do Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="default">Ativo</Badge>
                <span className="text-sm text-muted-foreground">Evento publicado e vendas ativas</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Duplicar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="event-name">Nome do Evento</Label>
              <Input id="event-name" defaultValue="Tech Conference 2024" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-category">Categoria</Label>
              <Input id="event-category" defaultValue="Tecnologia" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-description">Descrição</Label>
            <Textarea
              id="event-description"
              defaultValue="O maior evento de tecnologia do ano, reunindo os principais especialistas da área para compartilhar conhecimento e networking."
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="event-date">Data</Label>
              <Input id="event-date" type="date" defaultValue="2024-03-15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-time">Horário</Label>
              <Input id="event-time" type="time" defaultValue="09:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-duration">Duração (horas)</Label>
              <Input id="event-duration" type="number" defaultValue="8" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-location">Local</Label>
            <Input id="event-location" defaultValue="Centro de Convenções São Paulo" />
          </div>
        </CardContent>
      </Card>

      {/* Sales Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Vendas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Vendas Ativas</Label>
              <p className="text-sm text-muted-foreground">Permitir a venda de ingressos para este evento</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sales-start">Início das Vendas</Label>
              <Input id="sales-start" type="datetime-local" defaultValue="2024-02-01T00:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sales-end">Fim das Vendas</Label>
              <Input id="sales-end" type="datetime-local" defaultValue="2024-03-14T23:59" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Permitir Lista de Espera</Label>
              <p className="text-sm text-muted-foreground">
                Quando os ingressos esgotarem, permitir inscrição em lista de espera
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Check-in Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Credenciamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Check-in Automático</Label>
              <p className="text-sm text-muted-foreground">Permitir check-in automático via QR Code</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Múltiplos Check-ins</Label>
              <p className="text-sm text-muted-foreground">Permitir que participantes façam check-in múltiplas vezes</p>
            </div>
            <Switch />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="checkin-start">Início do Check-in</Label>
              <Input id="checkin-start" type="datetime-local" defaultValue="2024-03-15T08:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkin-end">Fim do Check-in</Label>
              <Input id="checkin-end" type="datetime-local" defaultValue="2024-03-15T18:00" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Certificados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Gerar Certificados</Label>
              <p className="text-sm text-muted-foreground">Gerar certificados automaticamente para participantes</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Envio Automático</Label>
              <p className="text-sm text-muted-foreground">Enviar certificados por email após check-in</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificate-hours">Carga Horária</Label>
            <Input id="certificate-hours" type="number" defaultValue="8" />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-destructive">Excluir Evento</Label>
              <p className="text-sm text-muted-foreground">
                Esta ação não pode ser desfeita. Todos os dados serão perdidos.
              </p>
            </div>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
