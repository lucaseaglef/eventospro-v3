"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ErrorState } from "@/components/ui/error-state"
import { UserCheck, Users, Clock, TrendingUp } from "lucide-react"
import { useEventMetrics } from "@/lib/api-hooks"

interface CredentialsStatsProps {
  eventId: string
}

export function CredentialsStats({ eventId }: CredentialsStatsProps) {
  const { data: stats, isLoading, error } = useEventMetrics(eventId)

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-2 w-full bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />
  }

  if (!stats) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Check-ins Realizados</CardTitle>
          <UserCheck className="h-4 w-4 text-chart-1" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.checkedIn}</div>
          <div className="mt-2">
            <Progress value={stats.checkInRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{stats.checkInRate.toFixed(1)}% dos participantes</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Total de Participantes</CardTitle>
          <Users className="h-4 w-4 text-chart-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.totalParticipants}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.totalParticipants - stats.checkedIn} ainda não fizeram check-in
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Tempo Médio</CardTitle>
          <Clock className="h-4 w-4 text-chart-3" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.avgCheckInTime}</div>
          <p className="text-xs text-muted-foreground mt-1">Por check-in</p>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Check-ins/Hora</CardTitle>
          <TrendingUp className="h-4 w-4 text-chart-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.currentHourCheckIns}</div>
          <p className="text-xs text-muted-foreground mt-1">Pico: {stats.peakHour}</p>
        </CardContent>
      </Card>
    </div>
  )
}
