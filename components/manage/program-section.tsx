"use client"

import { useActivities } from "@/hooks/use-activities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar, Clock, MapPin, User } from "lucide-react"
import { CreateActivityModal } from "@/components/create-activity-modal"
import { useState } from "react"

interface ProgramSectionProps {
  eventId: string
}

const typeColors = {
  opening: "bg-blue-100 text-blue-800",
  keynote: "bg-purple-100 text-purple-800",
  workshop: "bg-green-100 text-green-800",
  break: "bg-gray-100 text-gray-800",
  panel: "bg-orange-100 text-orange-800",
  networking: "bg-pink-100 text-pink-800",
  presentation: "bg-indigo-100 text-indigo-800",
}

const typeLabels = {
  opening: "Abertura",
  keynote: "Palestra Principal",
  workshop: "Workshop",
  break: "Intervalo",
  panel: "Mesa Redonda",
  networking: "Networking",
  presentation: "Apresentação",
}

export function ProgramSection({ eventId }: ProgramSectionProps) {
  const {
    activities: programItems,
    createActivity,
    updateActivity,
    deleteActivity,
    isModalOpen,
    setIsModalOpen,
    editingActivity,
    setEditingActivity,
  } = useActivities(eventId)

  const [selectedDay, setSelectedDay] = useState("2024-03-15")
  const [days, setDays] = useState([
    { date: "2024-03-15", label: "Dia 1 - 15/03" },
    { date: "2024-03-16", label: "Dia 2 - 16/03" },
  ])

  const handleAddDay = () => {
    const newDate = new Date()
    newDate.setDate(newDate.getDate() + days.length)
    const dateStr = newDate.toISOString().split("T")[0]
    setDays([
      ...days,
      {
        date: dateStr,
        label: `Dia ${days.length + 1} - ${newDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}`,
      },
    ])
  }

  const handleCreateActivity = () => {
    setEditingActivity(null)
    setIsModalOpen(true)
  }

  const handleEditActivity = (activity: any) => {
    setEditingActivity(activity)
    setIsModalOpen(true)
  }

  const handleSaveActivity = (activityData: any) => {
    if (editingActivity) {
      updateActivity(editingActivity.id, activityData)
    } else {
      createActivity(activityData)
    }
    setIsModalOpen(false)
  }

  const handleDeleteActivity = (activityId: string) => {
    if (confirm("Tem certeza que deseja excluir esta atividade?")) {
      deleteActivity(activityId)
    }
  }

  const totalSpeakers = programItems.filter((item) => item.speaker).length
  const uniqueLocations = new Set(programItems.map((item) => item.location)).size

  const filteredActivities = programItems.filter((item) => item.date === selectedDay)

  return (
    <div className="space-y-6">
      {/* Program Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Atividades</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programItems.length}</div>
            <p className="text-xs text-muted-foreground">Programadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Palestrantes</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSpeakers}</div>
            <p className="text-xs text-muted-foreground">Confirmados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Duração Total</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8h</div>
            <p className="text-xs text-muted-foreground">09:00 às 17:00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Locais</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueLocations}</div>
            <p className="text-xs text-muted-foreground">Salas utilizadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Day Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Dias do Evento</CardTitle>
            <Button onClick={handleAddDay} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Dia
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {days.map((day) => (
              <Button
                key={day.date}
                variant={selectedDay === day.date ? "default" : "outline"}
                onClick={() => setSelectedDay(day.date)}
              >
                {day.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Program Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Programação - {days.find((d) => d.date === selectedDay)?.label}</CardTitle>
            <Button onClick={handleCreateActivity}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Atividade
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((item, index) => (
              <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  {index < filteredActivities.length - 1 && <div className="w-px h-16 bg-border mt-2" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <Badge className={typeColors[item.type as keyof typeof typeColors]}>
                          {typeLabels[item.type as keyof typeof typeLabels]}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {item.startTime} - {item.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{item.location}</span>
                        </div>
                        {item.speaker && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{item.speaker}</span>
                          </div>
                        )}
                      </div>

                      {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditActivity(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteActivity(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredActivities.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">Nenhuma atividade programada para este dia.</div>
            )}
          </div>
        </CardContent>
      </Card>

      <CreateActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveActivity}
        initialData={editingActivity}
      />
    </div>
  )
}
