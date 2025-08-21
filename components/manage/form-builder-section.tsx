"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Trash2,
  GripVertical,
  Type,
  AlignLeft,
  CheckSquare,
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  CreditCard,
  Hash,
  Clock,
  FileText,
  Star,
  ToggleLeft,
  List,
  ImageIcon,
  LinkIcon,
  Save,
  Sparkles,
} from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useTickets } from "@/hooks/use-tickets"

interface FormField {
  id: string
  type: string
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  linkedTickets: string[]
  description?: string
}

interface FormBuilderSectionProps {
  eventId: string
}

// Predefined field types with icons and configurations
const fieldTypes = [
  // Standard fields
  { id: "text", label: "Texto Curto", icon: Type, category: "basic" },
  { id: "textarea", label: "Texto Longo", icon: AlignLeft, category: "basic" },
  { id: "email", label: "E-mail", icon: Mail, category: "basic" },
  { id: "phone", label: "Telefone", icon: Phone, category: "basic" },
  { id: "number", label: "Número", icon: Hash, category: "basic" },
  { id: "url", label: "URL/Link", icon: LinkIcon, category: "basic" },

  // Date and time
  { id: "date", label: "Data", icon: Calendar, category: "datetime" },
  { id: "datetime", label: "Data e Hora", icon: Clock, category: "datetime" },
  { id: "birthday", label: "Data de Aniversário", icon: Calendar, category: "datetime" },

  // Selection fields
  { id: "select", label: "Lista Suspensa", icon: List, category: "selection" },
  { id: "radio", label: "Múltipla Escolha", icon: ToggleLeft, category: "selection" },
  { id: "checkbox", label: "Caixas de Seleção", icon: CheckSquare, category: "selection" },
  { id: "rating", label: "Avaliação (Estrelas)", icon: Star, category: "selection" },

  // File and media
  { id: "file", label: "Upload de Arquivo", icon: FileText, category: "media" },
  { id: "image", label: "Upload de Imagem", icon: ImageIcon, category: "media" },

  // Address block (predefined)
  { id: "address", label: "Endereço Completo", icon: MapPin, category: "predefined" },
  { id: "personal", label: "Dados Pessoais", icon: User, category: "predefined" },
  { id: "payment", label: "Dados de Pagamento", icon: CreditCard, category: "predefined" },
]

// Predefined field blocks
const predefinedBlocks = {
  address: [
    { type: "text", label: "Rua", placeholder: "Nome da rua", required: true },
    { type: "text", label: "Número", placeholder: "Número", required: true },
    { type: "text", label: "Complemento", placeholder: "Apartamento, bloco, etc.", required: false },
    { type: "text", label: "Bairro", placeholder: "Bairro", required: true },
    { type: "text", label: "CEP", placeholder: "00000-000", required: true },
    { type: "text", label: "Cidade", placeholder: "Cidade", required: true },
    { type: "text", label: "Estado", placeholder: "Estado", required: true },
    { type: "select", label: "País", options: ["Brasil", "Argentina", "Chile", "Uruguai", "Paraguai"], required: true },
  ],
  personal: [
    { type: "text", label: "Nome Completo", placeholder: "Nome completo", required: true },
    { type: "text", label: "CPF", placeholder: "000.000.000-00", required: true },
    { type: "text", label: "RG", placeholder: "00.000.000-0", required: false },
    { type: "birthday", label: "Data de Nascimento", required: false },
    {
      type: "select",
      label: "Gênero",
      options: ["Masculino", "Feminino", "Outro", "Prefiro não informar"],
      required: false,
    },
  ],
  payment: [
    { type: "text", label: "Nome no Cartão", placeholder: "Nome como no cartão", required: true },
    { type: "text", label: "Número do Cartão", placeholder: "0000 0000 0000 0000", required: true },
    { type: "text", label: "Validade", placeholder: "MM/AA", required: true },
    { type: "text", label: "CVV", placeholder: "000", required: true },
  ],
}

export function FormBuilderSection({ eventId }: FormBuilderSectionProps) {
  const { tickets } = useTickets(eventId)

  const [fields, setFields] = useState<FormField[]>([])

  useEffect(() => {
    if (tickets.length > 0) {
      const allTicketIds = tickets.map((ticket) => ticket.id)

      setFields([
        // Default required fields - automatically linked to all tickets
        {
          id: "nome",
          type: "text",
          label: "Nome",
          placeholder: "Digite seu nome",
          required: true,
          linkedTickets: allTicketIds, // Link to all tickets by default
          description: "Campo obrigatório padrão",
        },
        {
          id: "sobrenome",
          type: "text",
          label: "Sobrenome",
          placeholder: "Digite seu sobrenome",
          required: true,
          linkedTickets: allTicketIds, // Link to all tickets by default
          description: "Campo obrigatório padrão",
        },
        {
          id: "cpf",
          type: "text",
          label: "CPF",
          placeholder: "000.000.000-00",
          required: true,
          linkedTickets: allTicketIds, // Link to all tickets by default
          description: "Campo obrigatório padrão",
        },
        {
          id: "telefone",
          type: "phone",
          label: "Telefone",
          placeholder: "(00) 00000-0000",
          required: true,
          linkedTickets: allTicketIds, // Link to all tickets by default
          description: "Campo obrigatório padrão",
        },
        {
          id: "email",
          type: "email",
          label: "E-mail",
          placeholder: "seu@email.com",
          required: true,
          linkedTickets: allTicketIds, // Link to all tickets by default
          description: "Campo obrigatório padrão",
        },
      ])
    }
  }, [tickets])

  const [selectedField, setSelectedField] = useState<FormField | null>(null)

  const addField = (fieldType: string) => {
    const fieldConfig = fieldTypes.find((f) => f.id === fieldType)
    if (!fieldConfig) return

    if (fieldType === "address" || fieldType === "personal" || fieldType === "payment") {
      // Add predefined block
      const blockFields = predefinedBlocks[fieldType as keyof typeof predefinedBlocks]
      const newFields = blockFields.map((field, index) => ({
        id: `${fieldType}_${Date.now()}_${index}`,
        type: field.type,
        label: field.label,
        placeholder: field.placeholder,
        required: field.required,
        options: field.options || [],
        linkedTickets: [], // Start with no tickets linked for new fields
        description: `Campo do bloco ${fieldConfig.label}`,
      }))
      setFields([...fields, ...newFields])
    } else {
      // Add single field
      const newField: FormField = {
        id: `field_${Date.now()}`,
        type: fieldType,
        label: fieldConfig.label,
        placeholder: `Digite ${fieldConfig.label.toLowerCase()}`,
        required: false,
        options:
          fieldType === "select" || fieldType === "radio" || fieldType === "checkbox" ? ["Opção 1", "Opção 2"] : [],
        linkedTickets: [], // Start with no tickets linked for new fields
      }
      setFields([...fields, newField])
    }
  }

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFields(fields.map((field) => (field.id === fieldId ? { ...field, ...updates } : field)))
  }

  const removeField = (fieldId: string) => {
    setFields(fields.filter((field) => field.id !== fieldId))
    setSelectedField(null)
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(fields)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFields(items)
  }

  const getFieldIcon = (type: string) => {
    const fieldType = fieldTypes.find((f) => f.id === type)
    return fieldType?.icon || Type
  }

  const isDefaultField = (fieldId: string) => {
    return ["nome", "sobrenome", "cpf", "telefone", "email"].includes(fieldId)
  }

  const toggleAllTickets = (fieldId: string, checked: boolean) => {
    if (!checked && isDefaultField(fieldId)) {
      return // Don't allow unchecking for default fields
    }

    const allTicketIds = tickets.map((ticket) => ticket.id)
    const newLinkedTickets = checked ? allTicketIds : []
    updateField(fieldId, { linkedTickets: newLinkedTickets })
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Construtor de Formulário
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Configure seu Formulário de Checkout
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Personalize os campos que aparecerão no checkout para coleta de dados dos participantes
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Save className="h-5 w-5 mr-2" />
            Salvar Formulário
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Card className="lg:col-span-1 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg p-6">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Plus className="h-5 w-5 text-white" />
                  Tipos de Campo
                </CardTitle>
                <CardDescription className="text-blue-100 text-sm">Clique para adicionar ao formulário</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Basic Fields */}
              <div>
                <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Campos Básicos
                </h4>
                <div className="space-y-2">
                  {fieldTypes
                    .filter((f) => f.category === "basic")
                    .map((fieldType) => {
                      const Icon = fieldType.icon
                      return (
                        <Button
                          key={fieldType.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-10 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                          onClick={() => addField(fieldType.id)}
                        >
                          <Icon className="h-4 w-4 mr-3 text-blue-600" />
                          {fieldType.label}
                        </Button>
                      )
                    })}
                </div>
              </div>

              <Separator className="bg-slate-200" />

              {/* Date/Time Fields */}
              <div>
                <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Data e Hora
                </h4>
                <div className="space-y-2">
                  {fieldTypes
                    .filter((f) => f.category === "datetime")
                    .map((fieldType) => {
                      const Icon = fieldType.icon
                      return (
                        <Button
                          key={fieldType.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-10 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200"
                          onClick={() => addField(fieldType.id)}
                        >
                          <Icon className="h-4 w-4 mr-3 text-indigo-600" />
                          {fieldType.label}
                        </Button>
                      )
                    })}
                </div>
              </div>

              <Separator className="bg-slate-200" />

              {/* Selection Fields */}
              <div>
                <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Seleção
                </h4>
                <div className="space-y-2">
                  {fieldTypes
                    .filter((f) => f.category === "selection")
                    .map((fieldType) => {
                      const Icon = fieldType.icon
                      return (
                        <Button
                          key={fieldType.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-10 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
                          onClick={() => addField(fieldType.id)}
                        >
                          <Icon className="h-4 w-4 mr-3 text-purple-600" />
                          {fieldType.label}
                        </Button>
                      )
                    })}
                </div>
              </div>

              <Separator className="bg-slate-200" />

              {/* Predefined Blocks */}
              <div>
                <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Blocos Prontos
                </h4>
                <div className="space-y-2">
                  {fieldTypes
                    .filter((f) => f.category === "predefined")
                    .map((fieldType) => {
                      const Icon = fieldType.icon
                      return (
                        <Button
                          key={fieldType.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-10 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
                          onClick={() => addField(fieldType.id)}
                        >
                          <Icon className="h-4 w-4 mr-3 text-emerald-600" />
                          {fieldType.label}
                        </Button>
                      )
                    })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg p-6">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-white" />
                  Formulário de Checkout
                </CardTitle>
                <CardDescription className="text-blue-100 text-sm">
                  Arraste os campos para reordenar. Clique para configurar.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="form-fields">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {fields.map((field, index) => {
                        const Icon = getFieldIcon(field.type)
                        const isDefault = isDefaultField(field.id)

                        return (
                          <Draggable key={field.id} draggableId={field.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`p-4 border-2 rounded-xl bg-white cursor-pointer transition-all duration-200 ${
                                  selectedField?.id === field.id
                                    ? "border-blue-400 bg-blue-50 shadow-lg scale-[1.02]"
                                    : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                                } ${snapshot.isDragging ? "shadow-2xl rotate-2" : ""}`}
                                onClick={() => setSelectedField(field)}
                              >
                                <div className="flex items-center gap-4">
                                  <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                                    <GripVertical className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                                  </div>
                                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                                    <Icon className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                      <span className="font-semibold text-slate-800">{field.label}</span>
                                      {field.required && (
                                        <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                                          Obrigatório
                                        </Badge>
                                      )}
                                      {isDefault && (
                                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                                          Padrão
                                        </Badge>
                                      )}
                                    </div>
                                    {field.placeholder && <p className="text-sm text-slate-500">{field.placeholder}</p>}
                                    {field.linkedTickets.length > 0 && (
                                      <div className="flex gap-2 mt-2">
                                        {field.linkedTickets.map((ticketId) => {
                                          const ticket = tickets.find((t) => t.id === ticketId)
                                          return ticket ? (
                                            <Badge
                                              key={ticketId}
                                              variant="outline"
                                              className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                                            >
                                              {ticket.name}
                                            </Badge>
                                          ) : null
                                        })}
                                      </div>
                                    )}
                                  </div>
                                  {!isDefault && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        removeField(field.id)
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg p-6">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-white" />
                  Configurações
                </CardTitle>
                <CardDescription className="text-blue-100 text-sm">
                  {selectedField ? `Editando: ${selectedField.label}` : "Selecione um campo para editar"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {selectedField ? (
                <>
                  <div className="space-y-3">
                    <Label htmlFor="field-label" className="text-sm font-semibold text-slate-700">
                      Rótulo do Campo
                    </Label>
                    <Input
                      id="field-label"
                      value={selectedField.label}
                      onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                      disabled={isDefaultField(selectedField.id)}
                      className="border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="field-placeholder" className="text-sm font-semibold text-slate-700">
                      Placeholder
                    </Label>
                    <Input
                      id="field-placeholder"
                      value={selectedField.placeholder || ""}
                      onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
                      className="border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="field-description" className="text-sm font-semibold text-slate-700">
                      Descrição
                    </Label>
                    <Textarea
                      id="field-description"
                      value={selectedField.description || ""}
                      onChange={(e) => updateField(selectedField.id, { description: e.target.value })}
                      rows={3}
                      className="border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <Switch
                      id="field-required"
                      checked={selectedField.required}
                      onCheckedChange={(checked) => updateField(selectedField.id, { required: checked })}
                      disabled={isDefaultField(selectedField.id)}
                    />
                    <Label htmlFor="field-required" className="text-sm font-medium text-slate-700">
                      Campo obrigatório
                    </Label>
                  </div>

                  {(selectedField.type === "select" ||
                    selectedField.type === "radio" ||
                    selectedField.type === "checkbox") && (
                    <div className="space-y-3">
                      <Label>Opções</Label>
                      <div className="space-y-2">
                        {selectedField.options?.map((option, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(selectedField.options || [])]
                                newOptions[index] = e.target.value
                                updateField(selectedField.id, { options: newOptions })
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => {
                                const newOptions = selectedField.options?.filter((_, i) => i !== index)
                                updateField(selectedField.id, { options: newOptions })
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                          onClick={() => {
                            const newOptions = [
                              ...(selectedField.options || []),
                              `Opção ${(selectedField.options?.length || 0) + 1}`,
                            ]
                            updateField(selectedField.id, { options: newOptions })
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Opção
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Vincular a Ingressos</Label>
                    <p className="text-xs text-slate-500">Selecione em quais ingressos este campo deve aparecer</p>

                    <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <Switch
                        id="toggle-all-tickets"
                        checked={selectedField.linkedTickets.length === tickets.length && tickets.length > 0}
                        onCheckedChange={(checked) => toggleAllTickets(selectedField.id, checked)}
                        disabled={isDefaultField(selectedField.id)}
                      />
                      <Label htmlFor="toggle-all-tickets" className="text-sm font-semibold text-blue-700 flex-1">
                        Todos os ingressos
                      </Label>
                    </div>

                    <div className="space-y-3 max-h-40 overflow-y-auto">
                      {tickets.map((ticket) => (
                        <div key={ticket.id} className="flex items-center space-x-3 p-2 bg-slate-50 rounded-lg">
                          <Switch
                            id={`ticket-${ticket.id}`}
                            checked={selectedField.linkedTickets.includes(ticket.id)}
                            onCheckedChange={(checked) => {
                              if (!checked && isDefaultField(selectedField.id)) {
                                return // Don't allow unchecking for default fields
                              }

                              const newLinkedTickets = checked
                                ? [...selectedField.linkedTickets, ticket.id]
                                : selectedField.linkedTickets.filter((id) => id !== ticket.id)
                              updateField(selectedField.id, { linkedTickets: newLinkedTickets })
                            }}
                            disabled={
                              isDefaultField(selectedField.id) && selectedField.linkedTickets.includes(ticket.id)
                            }
                          />
                          <Label htmlFor={`ticket-${ticket.id}`} className="text-sm font-medium text-slate-700 flex-1">
                            {ticket.name}
                          </Label>
                          <Badge variant="outline" className="text-xs">
                            R$ {ticket.price.toFixed(2)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-500">Clique em um campo no formulário para configurá-lo.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
