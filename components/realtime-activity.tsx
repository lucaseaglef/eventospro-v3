"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Activity, Clock } from "lucide-react"

const mockActivities = [
  {
    id: 1,
    participant: "Ana Silva",
    action: "Check-in",
    time: "há 30 seg",
    status: "Sucesso",
    avatar: "/professional-woman.png",
  },
  {
    id: 2,
    participant: "Carlos Santos",
    action: "Check-in",
    time: "há 1 min",
    status: "Sucesso",
    avatar: "/professional-man.png",
  },
  {
    id: 3,
    participant: "Maria Oliveira",
    action: "Tentativa",
    time: "há 2 min",
    status: "Erro",
    avatar: "/business-woman.png",
  },
  {
    id: 4,
    participant: "João Costa",
    action: "Check-in",
    time: "há 3 min",
    status: "Sucesso",
    avatar: "/man-tech.png",
  },
]

export function RealtimeActivity() {
  const [activities, setActivities] = useState(mockActivities)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update times
      setActivities((prev) =>
        prev.map((activity) => ({
          ...activity,
          time: updateTime(activity.time),
        })),
      )
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const updateTime = (time: string) => {
    // Simple time update logic
    if (time.includes("seg")) return time.replace("seg", "min")
    if (time.includes("1 min")) return "há 2 min"
    if (time.includes("2 min")) return "há 3 min"
    return time
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sucesso":
        return "bg-chart-1 text-white"
      case "Erro":
        return "bg-chart-3 text-white"
      case "Pendente":
        return "bg-chart-2 text-white"
      default:
        return "bg-chart-4 text-white"
    }
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Activity className="mr-2 h-5 w-5" />
          Atividade em Tempo Real
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.participant} />
                <AvatarFallback>
                  {activity.participant
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">{activity.participant}</p>
                <p className="text-xs text-muted-foreground">{activity.action}</p>
              </div>
            </div>

            <div className="text-right">
              <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Atualizando automaticamente...</p>
        </div>
      </CardContent>
    </Card>
  )
}
