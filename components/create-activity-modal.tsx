"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, User, X } from "lucide-react"

interface Activity {
  id: string
  title: string
  speaker: string | null
  startTime: string
  endTime: string
  location: string
  type: string
  description: string
}

interface CreateActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (activity: Omit<Activity, "id">) => void
  initialData?: Activity | null
}

const activityTypes = [
  { value: "opening", label: "Abertura" },
  { value: "keynote", label: "Palestra Principal" },
  { value: "workshop", label: "Workshop" },
  { value: "panel", label: "Mesa Redonda" },
  { value: "break", label: "Intervalo" },
  { value: "networking", label: "Networking" },
  { value: "presentation", label: "Apresentação" },
]

const locations = ["Auditório Principal", "Sala 1", "Sala 2", "Sala 3", "Hall de Entrada", "Área Externa", "Sala VIP"]

export function CreateActivityModal({ isOpen, onClose, onSave, initialData }: CreateActivityModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    startTime: "",
    endTime: "",
    location: "",
    type: "",
    description: "",
  })

  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        speaker: initialData.speaker || "",
        startTime: initialData.startTime,
        endTime: initialData.endTime,
        location: initialData.location,
        type: initialData.type,
        description: initialData.description,
      })
    } else {
      setFormData({
        title: "",
        speaker: "",
        startTime: "",
        endTime: "",
        location: "",
        type: "",
        description: "",
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      speaker: formData.speaker || null,
    })
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{isEditing ? "Editar Atividade" : "Nova Atividade"}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title and Type */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Título da Atividade *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ex: Tendências em Tecnologia 2024"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Atividade *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Speaker and Location */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="speaker" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Palestrante
              </Label>
              <Input
                id="speaker"
                value={formData.speaker}
                onChange={(e) => handleInputChange("speaker", e.target.value)}
                placeholder="Nome do palestrante (opcional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Local *
              </Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o local" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Time */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Horário de Início *
              </Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Horário de Término *
              </Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Row 4: Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Descreva brevemente o conteúdo da atividade..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{isEditing ? "Salvar Alterações" : "Criar Atividade"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
