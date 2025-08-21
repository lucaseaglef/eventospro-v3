"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { QrCode, Settings, Palette } from "lucide-react"

interface QRCodeGeneratorProps {
  eventId: string
}

export function QRCodeGenerator({ eventId }: QRCodeGeneratorProps) {
  const [qrSettings, setQrSettings] = useState({
    size: "256",
    format: "PNG",
    errorCorrection: "M",
    foregroundColor: "#000000",
    backgroundColor: "#FFFFFF",
    includeEventInfo: true,
    customMessage: "",
  })

  const updateSetting = (key: string, value: string | boolean) => {
    setQrSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <QrCode className="mr-2 h-5 w-5" />
            Gerador de QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Gerar QR Codes para Todos
          </Button>

          <Button variant="outline" className="w-full bg-transparent">
            Gerar para Selecionados
          </Button>

          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <QrCode className="h-16 w-16 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Preview do QR Code</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <Settings className="mr-2 h-5 w-5" />
            Configurações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="size" className="text-card-foreground">
                Tamanho
              </Label>
              <Select value={qrSettings.size} onValueChange={(value) => updateSetting("size", value)}>
                <SelectTrigger className="bg-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="128">128x128</SelectItem>
                  <SelectItem value="256">256x256</SelectItem>
                  <SelectItem value="512">512x512</SelectItem>
                  <SelectItem value="1024">1024x1024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format" className="text-card-foreground">
                Formato
              </Label>
              <Select value={qrSettings.format} onValueChange={(value) => updateSetting("format", value)}>
                <SelectTrigger className="bg-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PNG">PNG</SelectItem>
                  <SelectItem value="JPG">JPG</SelectItem>
                  <SelectItem value="SVG">SVG</SelectItem>
                  <SelectItem value="PDF">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="errorCorrection" className="text-card-foreground">
              Correção de Erro
            </Label>
            <Select
              value={qrSettings.errorCorrection}
              onValueChange={(value) => updateSetting("errorCorrection", value)}
            >
              <SelectTrigger className="bg-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Baixa (7%)</SelectItem>
                <SelectItem value="M">Média (15%)</SelectItem>
                <SelectItem value="Q">Alta (25%)</SelectItem>
                <SelectItem value="H">Muito Alta (30%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <Palette className="mr-2 h-5 w-5" />
            Personalização
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="foregroundColor" className="text-card-foreground">
                Cor Principal
              </Label>
              <Input
                id="foregroundColor"
                type="color"
                value={qrSettings.foregroundColor}
                onChange={(e) => updateSetting("foregroundColor", e.target.value)}
                className="bg-input h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundColor" className="text-card-foreground">
                Cor de Fundo
              </Label>
              <Input
                id="backgroundColor"
                type="color"
                value={qrSettings.backgroundColor}
                onChange={(e) => updateSetting("backgroundColor", e.target.value)}
                className="bg-input h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customMessage" className="text-card-foreground">
              Mensagem Personalizada
            </Label>
            <Textarea
              id="customMessage"
              value={qrSettings.customMessage}
              onChange={(e) => updateSetting("customMessage", e.target.value)}
              placeholder="Adicione uma mensagem que aparecerá junto com o QR code"
              className="bg-input"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
