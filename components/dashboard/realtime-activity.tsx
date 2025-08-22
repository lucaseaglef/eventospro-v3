"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import { EmptyState } from "@/components/ui/empty-state"
import { Activity, Clock } from "lucide-react"
import { useRealtimeActivity } from "@/lib/api-hooks"

interface RealtimeActivityProps {
  eventId: string
}

export function RealtimeActivity({ eventId }: RealtimeActivityProps) {
  const { data: activities, isLoading, error } = useRealtimeActivity(eventId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-chart-1 text-white"
      case "error":
        return "bg-chart-3 text-white"
      case "pending":
        return "bg-chart-2 text-white"
      default:
        return "bg-chart-4 text-white"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "success":
        return "Sucesso"
      case "error":
        return "Erro"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const date = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "há poucos segundos"
    if (diffInMinutes < 60) return `há ${diffInMinutes} min`
    if (diffInMinutes < 1440) return `há ${Math.floor(diffInMinutes / 60)} h`
    return `há ${Math.floor(diffInMinutes / 1440)} dias`
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
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        )}

        {error && <ErrorState message={error} onRetry={() => window.location.reload()} />}

        {!isLoading && !error && (!activities || activities.length === 0) && (
          <EmptyState
            icon={Activity}
            title="Nenhuma atividade recente"
            description="Não há atividades recentes para exibir."
          />
        )}

        {!isLoading && !error && activities && activities.length > 0 && (
          <>
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={activity.participantAvatar || "/placeholder.svg"}
                      alt={activity.participantName}
                    />
                    <AvatarFallback>
                      {activity.participantName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.participantName}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                </div>

                <div className="text-right">
                  <Badge className={getStatusColor(activity.status)}>{getStatusLabel(activity.status)}</Badge>
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{getTimeAgo(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">Atualizando automaticamente...</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
