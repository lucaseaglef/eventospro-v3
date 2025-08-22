"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

interface EventScheduleProps {
  schedule: ScheduleDay[]
}

const getTypeColor = (type: Activity["type"]) => {
  const colors = {
    keynote: "bg-purple-100 text-purple-800 border-purple-200",
    talk: "bg-blue-100 text-blue-800 border-blue-200",
    workshop: "bg-green-100 text-green-800 border-green-200",
    panel: "bg-orange-100 text-orange-800 border-orange-200",
    break: "bg-gray-100 text-gray-800 border-gray-200",
    networking: "bg-pink-100 text-pink-800 border-pink-200",
    registration: "bg-indigo-100 text-indigo-800 border-indigo-200",
  }
  return colors[type] || "bg-gray-100 text-gray-800 border-gray-200"
}

const getTypeLabel = (type: Activity["type"]) => {
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

export function EventSchedule({ schedule }: EventScheduleProps) {
  const [selectedDay, setSelectedDay] = useState(schedule[0]?.id || "")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Programação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            {schedule.map((day) => (
              <TabsTrigger key={day.id} value={day.id} className="text-sm">
                {day.day}
              </TabsTrigger>
            ))}
          </TabsList>

          {schedule.map((day) => (
            <TabsContent key={day.id} value={day.id} className="space-y-3 mt-0">
              <div className="pb-3 border-b">
                <h3 className="font-medium text-foreground">
                  {new Date(day.date).toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </h3>
              </div>

              <div className="space-y-2">
                {day.activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`flex gap-4 p-3 hover:bg-muted/30 rounded-lg transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-transparent"
                    }`}
                  >
                    <div className="flex-shrink-0 w-16">
                      <div className="flex items-center gap-1 text-sm font-medium bg-[#006AFF] text-white px-2 py-1 rounded">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-medium text-foreground leading-tight">{activity.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${getTypeColor(activity.type)}`}>
                          {getTypeLabel(activity.type)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-1">
                        {activity.speaker && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{activity.speaker}</span>
                          </div>
                        )}
                        {activity.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{activity.location}</span>
                          </div>
                        )}
                        {activity.duration && <span>• {activity.duration}</span>}
                      </div>

                      {activity.description && (
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{activity.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
