"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Tag, QrCode, Settings } from "lucide-react"

interface LabelEditorSectionProps {
  eventId: string
  onBack: () => void
}

type LabelSize = "large" | "medium" | "small"
type LayoutModel = "standard" | "expanded"

const labelSizes = {
  large: {
    name: "Grande",
    dimensions: "62x29mm",
    width: 620,
    height: 290,
    fontSize: 28,
    qrSize: 200,
    padding: 20,
    spacing: 15,
  },
  medium: {
    name: "Média",
    dimensions: "62x20mm",
    width: 500,
    height: 160,
    fontSize: 25,
    qrSize: 120,
    padding: 15,
    spacing: 10,
  },
  small: {
    name: "Pequena",
    dimensions: "29x15mm",
    width: 290,
    height: 150,
    fontSize: 16,
    qrSize: 90,
    padding: 10,
    spacing: 8,
  },
}

const layoutModels = {
  standard: { name: "Modelo Padrão", description: "2 linhas: Nome + 1 campo configurável + QR Code", lines: 2 },
  expanded: { name: "Modelo Expandido", description: "4 linhas: Nome + 3 campos configuráveis + QR Code", lines: 4 },
}

const fieldOptions = [
  { value: "none", label: "Nenhum campo" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Telefone" },
  { value: "document", label: "Documento" },
  { value: "company", label: "Empresa" },
  { value: "position", label: "Cargo" },
  { value: "city", label: "Cidade" },
  { value: "state", label: "Estado" },
]

const sampleData = {
  name: "João Silva Santos",
  email: "joao@empresa.com",
  phone: "(11) 99999-9999",
  document: "123.456.789-00",
  company: "Tech Corp Ltda",
  position: "Desenvolvedor Senior",
  city: "São Paulo",
  state: "SP",
}

export function LabelEditorSection({ eventId, onBack }: LabelEditorSectionProps) {
  const [selectedSize, setSelectedSize] = useState<LabelSize>("large")
  const [selectedModel, setSelectedModel] = useState<LayoutModel>("standard")
  const [selectedFields, setSelectedFields] = useState<string[]>(["email"])
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const currentSize = labelSizes[selectedSize]
      const containerMaxWidth = Math.min(currentSize.width, window.innerWidth - 100)
      const newScale = containerMaxWidth / currentSize.width
      setScale(Math.min(newScale, 1))
    }

    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [selectedSize])

  useEffect(() => {
    const maxFields = selectedModel === "standard" ? 1 : 3
    if (selectedFields.length > maxFields) {
      setSelectedFields(selectedFields.slice(0, maxFields))
    }
  }, [selectedModel, selectedFields])

  const currentSize = labelSizes[selectedSize]
  const currentModel = layoutModels[selectedModel]
  const maxFields = selectedModel === "standard" ? 1 : 3

  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...selectedFields]
    newFields[index] = value
    setSelectedFields(newFields)
  }

  const scaledDimensions = {
    width: currentSize.width * scale,
    height: currentSize.height * scale,
    fontSize: currentSize.fontSize * scale,
    qrSize: currentSize.qrSize * scale,
    padding: currentSize.padding * scale,
    spacing: currentSize.spacing * scale,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button className="bg-[rgba(65,72,248,1)]" variant="secondary" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Editor de Etiquetas</h2>
          <p className="text-muted-foreground">Configure o layout das etiquetas de credenciamento</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configuration Panel - More Compact */}
        <div className="lg:col-span-1 space-y-4">
          {/* Size Selection - Simplified */}
          <Card className="shadow-sm py-px px-0 mx-0 border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 mx-[-1px] rounded-md">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <Tag className="h-4 w-4" />
                Tamanho & Modelo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {/* Size Buttons */}
              <div>
                <label className="text-sm font-medium mb-2 block">Tamanho da Etiqueta</label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(labelSizes).map(([key, size]) => (
                    <Button
                      key={key}
                      variant={selectedSize === key ? "default" : "outline"}
                      size="sm"
                      className="justify-between h-auto p-3"
                      onClick={() => setSelectedSize(key as LabelSize)}
                    >
                      <span className="font-medium">{size.name}</span>
                      <span className="text-xs opacity-75">{size.dimensions}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Model Selection - Simplified */}
              <div>
                <label className="text-sm font-medium mb-2 block">Modelo de Layout</label>
                <div className="space-y-2">
                  {Object.entries(layoutModels).map(([key, model]) => (
                    <Button
                      key={key}
                      variant={selectedModel === key ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => setSelectedModel(key as LayoutModel)}
                    >
                      <div className="text-left">
                        <div className="font-medium text-sm">{model.name}</div>
                        <div className="text-xs opacity-75">{model.lines} linhas</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Field Configuration - Simplified */}
          <Card className="border shadow-sm py-px">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 mx-[-1px] rounded-sm">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <Settings className="h-4 w-4" />
                Campos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {/* Fixed Name Field */}
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Linha 1</label>
                <div className="text-sm bg-gray-50 p-2 rounded border">Nome Completo (fixo)</div>
              </div>

              {/* Configurable Fields */}
              {Array.from({ length: maxFields }, (_, index) => (
                <div key={index}>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Linha {index + 2}</label>
                  <Select
                    value={selectedFields[index] || "none"}
                    onValueChange={(value) => handleFieldChange(index, value)}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Selecione um campo" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700" size="sm">
                Salvar Configuração
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel - Maintained functionality */}
        <div className="lg:col-span-2">
          <Card className="border shadow-sm my-0 py-px">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 mx-[-1px] rounded-md">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <Tag className="h-4 w-4" />
                Pré-visualização
                <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                  {currentSize.name} - {currentModel.name}
                  {scale < 1 && ` (${Math.round(scale * 100)}%)`}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div
                className="flex items-center justify-center"
                style={{ minHeight: `${Math.max(scaledDimensions.height + 60, 250)}px` }}
              >
                <div
                  className="bg-white border-2 border-gray-400 shadow-lg flex"
                  style={{
                    width: `${scaledDimensions.width}px`,
                    height: `${scaledDimensions.height}px`,
                  }}
                >
                  {/* QR Code Section */}
                  <div
                    className="bg-gray-50 border-r border-gray-300 flex items-center justify-center"
                    style={{
                      width: `${scaledDimensions.qrSize + scaledDimensions.padding}px`,
                      padding: `${scaledDimensions.padding / 2}px`,
                    }}
                  >
                    {scaledDimensions.qrSize > 50 ? (
                      <div
                        className="bg-black flex items-center justify-center"
                        style={{
                          width: `${scaledDimensions.qrSize * 0.8}px`,
                          height: `${scaledDimensions.qrSize * 0.8}px`,
                        }}
                      >
                        <QrCode
                          className="text-white"
                          style={{
                            width: `${scaledDimensions.qrSize * 0.6}px`,
                            height: `${scaledDimensions.qrSize * 0.6}px`,
                          }}
                        />
                      </div>
                    ) : (
                      <QrCode
                        className="text-gray-600"
                        style={{
                          width: `${scaledDimensions.qrSize * 0.8}px`,
                          height: `${scaledDimensions.qrSize * 0.8}px`,
                        }}
                      />
                    )}
                  </div>

                  {/* Text Section */}
                  <div
                    className="flex-1 flex flex-col justify-center"
                    style={{ padding: `${scaledDimensions.padding}px` }}
                  >
                    {/* Line 1 - Name (always present) */}
                    <div
                      className="font-bold text-gray-900 truncate"
                      style={{
                        fontSize: `${scaledDimensions.fontSize}px`,
                        lineHeight: 1.2,
                        marginBottom: `${scaledDimensions.spacing * 0.8}px`,
                      }}
                    >
                      {sampleData.name}
                    </div>

                    {/* Configurable Lines */}
                    {selectedFields.slice(0, maxFields).map((fieldId, index) => {
                      if (fieldId === "none" || !fieldId) return null

                      const lineNumber = index + 2
                      let fontSize = scaledDimensions.fontSize
                      let color = "#374151"
                      let marginBottom = scaledDimensions.spacing * 0.6

                      if (lineNumber === 2) {
                        fontSize *= 0.75
                        color = "#374151"
                        marginBottom = scaledDimensions.spacing * 0.6
                      } else if (lineNumber === 3) {
                        fontSize *= 0.65
                        color = "#6b7280"
                        marginBottom = scaledDimensions.spacing * 0.4
                      } else if (lineNumber === 4) {
                        fontSize *= 0.6
                        color = "#6b7280"
                        marginBottom = 0
                      }

                      return (
                        <div
                          key={fieldId}
                          className="truncate"
                          style={{
                            fontSize: `${fontSize}px`,
                            lineHeight: 1.2,
                            color,
                            marginBottom: `${marginBottom}px`,
                          }}
                        >
                          {sampleData[fieldId as keyof typeof sampleData] ||
                            fieldOptions.find((f) => f.value === fieldId)?.label}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
