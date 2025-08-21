"use client"

import type React from "react"

import { useState } from "react"
import { useCheckoutConfig } from "@/contexts/checkout-config-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Edit, Save, X, Clock, MapPin, User, GripVertical, Eye, EyeOff, Settings } from "lucide-react"

interface SectionConfig {
  id: string
  name: string
  visible: boolean
  order: number
}

interface Activity {
  id: string
  time: string
  title: string
  type: "keynote" | "talk" | "workshop" | "panel" | "break" | "networking" | "registration"
  speaker: string
  location: string
  duration: string
  description?: string
}

interface ScheduleDay {
  id: string
  day: string
  date: string
  activities: Activity[]
}

interface Sponsor {
  id: string
  name: string
  logo: string
  tier: "platinum" | "gold" | "silver" | "bronze"
  website?: string
}

interface CheckoutSectionProps {
  eventId: string
}

export function CheckoutSection({ eventId }: CheckoutSectionProps) {
  const { sections, setSections } = useCheckoutConfig()
  const [isEditing, setIsEditing] = useState(false)
  const [editingActivity, setEditingActivity] = useState<{ dayIndex: number; actIndex: number } | null>(null)
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({})

  const [draggedSection, setDraggedSection] = useState<string | null>(null)
  const [showSectionSettings, setShowSectionSettings] = useState(false)

  const [eventInfo, setEventInfo] = useState({
    title: "Tech Conference 2024",
    description:
      "Uma conferência inovadora sobre as últimas tendências em tecnologia, reunindo especialistas e entusiastas para compartilhar conhecimentos e networking.",
    organizer: "TechEvents Brasil",
    website: "https://techevents.com.br",
    location: "Centro de Convenções São Paulo",
    date: "2024-03-15",
    time: "09:00",
  })

  const [highlights, setHighlights] = useState([
    "Palestrantes renomados da indústria",
    "Networking com profissionais experientes",
    "Workshops práticos e interativos",
    "Certificado de participação",
  ])

  const [sponsors, setSponsors] = useState<Sponsor[]>([
    {
      id: "1",
      name: "Microsoft",
      logo: "/microsoft-logo.png",
      tier: "platinum",
      website: "https://microsoft.com",
    },
    {
      id: "2",
      name: "Google",
      logo: "/google-logo.png",
      tier: "platinum",
      website: "https://google.com",
    },
    {
      id: "3",
      name: "Amazon",
      logo: "/amazon-logo.png",
      tier: "gold",
      website: "https://amazon.com",
    },
  ])

  const [newSponsor, setNewSponsor] = useState<Partial<Sponsor>>({})
  const [editingSponsor, setEditingSponsor] = useState<string | null>(null)

  const [schedule, setSchedule] = useState<ScheduleDay[]>([
    {
      id: "day-1",
      day: "Dia 1",
      date: "2024-03-15",
      activities: [
        {
          id: "act-1",
          time: "08:30",
          title: "Credenciamento e Welcome Coffee",
          type: "break",
          speaker: "",
          location: "Hall Principal",
          duration: "30min",
        },
        {
          id: "act-2",
          time: "09:00",
          title: "Abertura Oficial",
          type: "keynote",
          speaker: "Equipe Organizadora",
          location: "Auditório Principal",
          duration: "30min",
        },
        {
          id: "act-3",
          time: "09:30",
          title: "Keynote: O Futuro da Inteligência Artificial",
          type: "keynote",
          speaker: "Dr. Ana Silva",
          location: "Auditório Principal",
          duration: "60min",
        },
        {
          id: "act-4",
          time: "10:30",
          title: "Coffee Break",
          type: "break",
          speaker: "",
          location: "Hall Principal",
          duration: "30min",
        },
        {
          id: "act-5",
          time: "11:00",
          title: "Workshop: React e Next.js na Prática",
          type: "workshop",
          speaker: "João Santos",
          location: "Sala A",
          duration: "90min",
        },
        {
          id: "act-6",
          time: "12:30",
          title: "Almoço",
          type: "break",
          speaker: "",
          location: "Restaurante",
          duration: "90min",
        },
        {
          id: "act-7",
          time: "14:00",
          title: "Painel: Startups e Inovação no Brasil",
          type: "panel",
          speaker: "Diversos especialistas",
          location: "Auditório Principal",
          duration: "60min",
        },
        {
          id: "act-8",
          time: "15:00",
          title: "Workshop: UX/UI Design Thinking",
          type: "workshop",
          speaker: "Maria Costa",
          location: "Sala B",
          duration: "90min",
        },
        {
          id: "act-9",
          time: "16:30",
          title: "Networking e Encerramento",
          type: "networking",
          speaker: "",
          location: "Hall Principal",
          duration: "60min",
        },
      ],
    },
    {
      id: "day-2",
      day: "Dia 2",
      date: "2024-03-16",
      activities: [
        {
          id: "act-10",
          time: "09:00",
          title: "Keynote: Transformação Digital",
          type: "keynote",
          speaker: "Carlos Mendes",
          location: "Auditório Principal",
          duration: "60min",
        },
        {
          id: "act-11",
          time: "10:00",
          title: "Workshop: DevOps e Cloud Computing",
          type: "workshop",
          speaker: "Pedro Lima",
          location: "Sala A",
          duration: "120min",
        },
        {
          id: "act-12",
          time: "12:00",
          title: "Almoço",
          type: "break",
          speaker: "",
          location: "Restaurante",
          duration: "90min",
        },
        {
          id: "act-13",
          time: "13:30",
          title: "Painel: Futuro do Trabalho Remoto",
          type: "panel",
          speaker: "Especialistas em RH",
          location: "Auditório Principal",
          duration: "60min",
        },
        {
          id: "act-14",
          time: "14:30",
          title: "Workshop: Blockchain e Web3",
          type: "workshop",
          speaker: "Ana Rodrigues",
          location: "Sala B",
          duration: "90min",
        },
        {
          id: "act-15",
          time: "16:00",
          title: "Encerramento e Premiação",
          type: "keynote",
          speaker: "",
          location: "Auditório Principal",
          duration: "60min",
        },
      ],
    },
  ])

  const toggleSectionVisibility = (sectionId: string) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, visible: !section.visible } : section,
    )
    setSections(updatedSections)
  }

  const handleDragStart = (sectionId: string) => {
    setDraggedSection(sectionId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault()

    if (!draggedSection || draggedSection === targetSectionId) {
      setDraggedSection(null)
      return
    }

    const draggedIndex = sections.findIndex((s) => s.id === draggedSection)
    const targetIndex = sections.findIndex((s) => s.id === targetSectionId)

    const newSections = [...sections]
    const [draggedItem] = newSections.splice(draggedIndex, 1)
    newSections.splice(targetIndex, 0, draggedItem)

    // Update order values
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index,
    }))

    setSections(updatedSections)
    setDraggedSection(null)
  }

  const getSortedSections = () => {
    return [...sections].sort((a, b) => a.order - b.order)
  }

  const isSectionVisible = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId)
    return section?.visible ?? true
  }

  const handleSaveEventInfo = () => {
    setIsEditing(false)
    // Aqui você salvaria as informações no backend
  }

  const addHighlight = () => {
    setHighlights([...highlights, ""])
  }

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...highlights]
    newHighlights[index] = value
    setHighlights(newHighlights)
  }

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index))
  }

  const addDay = () => {
    const newDay: ScheduleDay = {
      id: `day-${Date.now()}`,
      day: `Dia ${schedule.length + 1}`,
      date: new Date().toISOString().split("T")[0],
      activities: [],
    }
    setSchedule([...schedule, newDay])
  }

  const removeDay = (dayIndex: number) => {
    setSchedule(schedule.filter((_, index) => index !== dayIndex))
  }

  const updateDay = (dayIndex: number, field: "day" | "date", value: string) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex] = { ...newSchedule[dayIndex], [field]: value }
    setSchedule(newSchedule)
  }

  const addActivity = (dayIndex: number) => {
    const newActivityData: Activity = {
      id: `act-${Date.now()}`,
      time: "09:00",
      title: "Nova Atividade",
      type: "talk",
      speaker: "",
      location: "",
      duration: "30 min",
      ...newActivity,
    }

    const newSchedule = [...schedule]
    newSchedule[dayIndex].activities.push(newActivityData)
    setSchedule(newSchedule)
    setNewActivity({})
  }

  const updateActivity = (dayIndex: number, actIndex: number, field: keyof Activity, value: string) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].activities[actIndex] = {
      ...newSchedule[dayIndex].activities[actIndex],
      [field]: value,
    }
    setSchedule(newSchedule)
  }

  const removeActivity = (dayIndex: number, actIndex: number) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].activities = newSchedule[dayIndex].activities.filter((_, index) => index !== actIndex)
    setSchedule(newSchedule)
  }

  const getActivityTypeColor = (type: Activity["type"]) => {
    const colors = {
      keynote: "bg-purple-600",
      talk: "bg-blue-600",
      workshop: "bg-green-600",
      panel: "bg-orange-600",
      break: "bg-gray-500",
      networking: "bg-pink-600",
      registration: "bg-indigo-600",
    }
    return colors[type] || "bg-blue-600"
  }

  const getActivityTypeLabel = (type: Activity["type"]) => {
    const labels = {
      keynote: "Keynote",
      talk: "Palestra",
      workshop: "Workshop",
      panel: "Painel",
      break: "Intervalo",
      networking: "Networking",
      registration: "Credenciamento",
    }
    return labels[type] || "Atividade"
  }

  const addSponsor = () => {
    if (!newSponsor.name || !newSponsor.tier) return

    const sponsor: Sponsor = {
      id: `sponsor-${Date.now()}`,
      name: newSponsor.name,
      logo: newSponsor.logo || "/generic-company-logo.png",
      tier: newSponsor.tier as Sponsor["tier"],
      website: newSponsor.website,
    }

    setSponsors([...sponsors, sponsor])
    setNewSponsor({})
  }

  const updateSponsor = (id: string, field: keyof Sponsor, value: string) => {
    setSponsors(sponsors.map((sponsor) => (sponsor.id === id ? { ...sponsor, [field]: value } : sponsor)))
  }

  const removeSponsor = (id: string) => {
    setSponsors(sponsors.filter((sponsor) => sponsor.id !== id))
  }

  const getTierLabel = (tier: Sponsor["tier"]) => {
    const labels = {
      platinum: "Platinum",
      gold: "Gold",
      silver: "Silver",
      bronze: "Bronze",
    }
    return labels[tier]
  }

  const getTierColor = (tier: Sponsor["tier"]) => {
    const colors = {
      platinum: "bg-slate-100 text-slate-800",
      gold: "bg-yellow-100 text-yellow-800",
      silver: "bg-gray-100 text-gray-800",
      bronze: "bg-orange-100 text-orange-800",
    }
    return colors[tier]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Checkout Builder</h1>
          <p className="text-muted-foreground">Configure como seu evento aparece na página de checkout</p>
        </div>
        <Button
          onClick={() => setShowSectionSettings(!showSectionSettings)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Configurar Seções
        </Button>
      </div>

      {showSectionSettings && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Configuração das Seções</CardTitle>
            <CardDescription>
              Arraste para reordenar as seções e use os toggles para mostrar/ocultar no checkout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getSortedSections().map((section) => (
                <div
                  key={section.id}
                  draggable
                  onDragStart={() => handleDragStart(section.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, section.id)}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-move hover:bg-gray-50 transition-colors ${
                    draggedSection === section.id ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{section.name}</span>
                    {section.visible ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{section.visible ? "Visível" : "Oculta"}</span>
                    <Switch checked={section.visible} onCheckedChange={() => toggleSectionVisibility(section.id)} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="event-info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {getSortedSections().map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className={`relative ${!section.visible ? "opacity-50" : ""}`}
            >
              {section.name}
              {!section.visible && <EyeOff className="h-3 w-3 ml-1 text-gray-400" />}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="event-info" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            {isSectionVisible("event-info") ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Eye className="h-3 w-3 mr-1" />
                Visível no checkout
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                <EyeOff className="h-3 w-3 mr-1" />
                Oculta no checkout
              </Badge>
            )}
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Configure as informações principais que aparecem no checkout</CardDescription>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSaveEventInfo} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Evento</Label>
                  <Input
                    id="title"
                    value={eventInfo.title}
                    onChange={(e) => setEventInfo({ ...eventInfo, title: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizer">Organizador</Label>
                  <Input
                    id="organizer"
                    value={eventInfo.organizer}
                    onChange={(e) => setEventInfo({ ...eventInfo, organizer: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={eventInfo.description}
                  onChange={(e) => setEventInfo({ ...eventInfo, description: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventInfo.date}
                    onChange={(e) => setEventInfo({ ...eventInfo, date: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={eventInfo.time}
                    onChange={(e) => setEventInfo({ ...eventInfo, time: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={eventInfo.website}
                    onChange={(e) => setEventInfo({ ...eventInfo, website: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Local</Label>
                <Input
                  id="location"
                  value={eventInfo.location}
                  onChange={(e) => setEventInfo({ ...eventInfo, location: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="highlights" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            {isSectionVisible("highlights") ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Eye className="h-3 w-3 mr-1" />
                Visível no checkout
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                <EyeOff className="h-3 w-3 mr-1" />
                Oculta no checkout
              </Badge>
            )}
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Destaques do Evento</CardTitle>
                <CardDescription>Adicione os principais atrativos que aparecem no checkout</CardDescription>
              </div>
              <Button onClick={addHighlight} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                    placeholder="Digite um destaque do evento"
                  />
                  <Button onClick={() => removeHighlight(index)} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sponsors" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            {isSectionVisible("sponsors") ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Eye className="h-3 w-3 mr-1" />
                Visível no checkout
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                <EyeOff className="h-3 w-3 mr-1" />
                Oculta no checkout
              </Badge>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patrocinadores</CardTitle>
              <CardDescription>Gerencie os patrocinadores que aparecem no checkout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add new sponsor form */}
              <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
                <h4 className="font-medium">Adicionar Novo Patrocinador</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome</Label>
                    <Input
                      value={newSponsor.name || ""}
                      onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                      placeholder="Nome da empresa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select
                      value={newSponsor.tier || ""}
                      onValueChange={(value) => setNewSponsor({ ...newSponsor, tier: value as Sponsor["tier"] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="platinum">Platinum</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="bronze">Bronze</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Logo (URL)</Label>
                    <Input
                      value={newSponsor.logo || ""}
                      onChange={(e) => setNewSponsor({ ...newSponsor, logo: e.target.value })}
                      placeholder="URL da logo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Website (opcional)</Label>
                    <Input
                      value={newSponsor.website || ""}
                      onChange={(e) => setNewSponsor({ ...newSponsor, website: e.target.value })}
                      placeholder="https://empresa.com"
                    />
                  </div>
                </div>
                <Button onClick={addSponsor} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Patrocinador
                </Button>
              </div>

              {/* Sponsors list */}
              <div className="space-y-4">
                {sponsors.map((sponsor) => (
                  <div key={sponsor.id}>
                    {editingSponsor === sponsor.id ? (
                      <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Nome</Label>
                            <Input
                              value={sponsor.name}
                              onChange={(e) => updateSponsor(sponsor.id, "name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Categoria</Label>
                            <Select
                              value={sponsor.tier}
                              onValueChange={(value) => updateSponsor(sponsor.id, "tier", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="platinum">Platinum</SelectItem>
                                <SelectItem value="gold">Gold</SelectItem>
                                <SelectItem value="silver">Silver</SelectItem>
                                <SelectItem value="bronze">Bronze</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Logo (URL)</Label>
                            <Input
                              value={sponsor.logo}
                              onChange={(e) => updateSponsor(sponsor.id, "logo", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Website</Label>
                            <Input
                              value={sponsor.website || ""}
                              onChange={(e) => updateSponsor(sponsor.id, "website", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => setEditingSponsor(null)} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Salvar
                          </Button>
                          <Button onClick={() => setEditingSponsor(null)} variant="outline" size="sm">
                            <X className="h-4 w-4 mr-2" />
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                        <div className="w-16 h-16 bg-white border rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={sponsor.logo || "/placeholder.svg"}
                            alt={sponsor.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/generic-company-logo.png"
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{sponsor.name}</h4>
                            <Badge className={getTierColor(sponsor.tier)}>{getTierLabel(sponsor.tier)}</Badge>
                          </div>
                          {sponsor.website && <p className="text-sm text-muted-foreground">{sponsor.website}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => setEditingSponsor(sponsor.id)} variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button onClick={() => removeSponsor(sponsor.id)} variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            {isSectionVisible("schedule") ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Eye className="h-3 w-3 mr-1" />
                Visível no checkout
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                <EyeOff className="h-3 w-3 mr-1" />
                Oculta no checkout
              </Badge>
            )}
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Programação</CardTitle>
                <CardDescription>Configure a programação que aparece no checkout</CardDescription>
              </div>
              <Button onClick={addDay} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Dia
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {schedule.map((day, dayIndex) => (
                <div key={day.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Input
                        value={day.day}
                        onChange={(e) => updateDay(dayIndex, "day", e.target.value)}
                        className="max-w-xs"
                        placeholder="Nome do dia"
                      />
                      <Input
                        type="date"
                        value={day.date}
                        onChange={(e) => updateDay(dayIndex, "date", e.target.value)}
                        className="max-w-xs"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => addActivity(dayIndex)} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Atividade
                      </Button>
                      <Button onClick={() => removeDay(dayIndex)} variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {day.activities.map((activity, actIndex) => (
                      <div key={activity.id}>
                        {editingActivity?.dayIndex === dayIndex && editingActivity?.actIndex === actIndex ? (
                          <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Horário</Label>
                                <Input
                                  type="time"
                                  value={activity.time}
                                  onChange={(e) => updateActivity(dayIndex, actIndex, "time", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Duração</Label>
                                <Input
                                  value={activity.duration}
                                  onChange={(e) => updateActivity(dayIndex, actIndex, "duration", e.target.value)}
                                  placeholder="ex: 45 min"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Título</Label>
                              <Input
                                value={activity.title}
                                onChange={(e) => updateActivity(dayIndex, actIndex, "title", e.target.value)}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Tipo</Label>
                                <Select
                                  value={activity.type}
                                  onValueChange={(value) => updateActivity(dayIndex, actIndex, "type", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="keynote">Keynote</SelectItem>
                                    <SelectItem value="talk">Palestra</SelectItem>
                                    <SelectItem value="workshop">Workshop</SelectItem>
                                    <SelectItem value="panel">Painel</SelectItem>
                                    <SelectItem value="break">Intervalo</SelectItem>
                                    <SelectItem value="networking">Networking</SelectItem>
                                    <SelectItem value="registration">Credenciamento</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Local</Label>
                                <Input
                                  value={activity.location}
                                  onChange={(e) => updateActivity(dayIndex, actIndex, "location", e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Palestrante</Label>
                              <Input
                                value={activity.speaker}
                                onChange={(e) => updateActivity(dayIndex, actIndex, "speaker", e.target.value)}
                              />
                            </div>

                            <div className="flex gap-2">
                              <Button onClick={() => setEditingActivity(null)} size="sm">
                                <Save className="h-4 w-4 mr-2" />
                                Salvar
                              </Button>
                              <Button onClick={() => setEditingActivity(null)} variant="outline" size="sm">
                                <X className="h-4 w-4 mr-2" />
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <Badge
                                className={`${getActivityTypeColor(activity.type)} text-white px-2 py-1 text-xs font-medium`}
                              >
                                {activity.time}
                              </Badge>
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm">{activity.title}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                                    {getActivityTypeLabel(activity.type)}
                                  </span>
                                  {activity.speaker && (
                                    <span className="flex items-center gap-1">
                                      <User className="h-3 w-3" />
                                      {activity.speaker}
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {activity.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {activity.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={() => setEditingActivity({ dayIndex, actIndex })}
                              variant="outline"
                              size="sm"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button onClick={() => removeActivity(dayIndex, actIndex)} variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
