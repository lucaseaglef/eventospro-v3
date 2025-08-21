import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UserCheck, Users, Clock, TrendingUp } from "lucide-react"

const credentialsStats = {
  totalParticipants: 450,
  checkedIn: 287,
  checkInRate: 63.8,
  avgCheckInTime: "2.3 min",
  peakHour: "09:00 - 10:00",
  currentHourCheckIns: 45,
}

export function CredentialsStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Check-ins Realizados</CardTitle>
          <UserCheck className="h-4 w-4 text-chart-1" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{credentialsStats.checkedIn}</div>
          <div className="mt-2">
            <Progress value={credentialsStats.checkInRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{credentialsStats.checkInRate}% dos participantes</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Total de Participantes</CardTitle>
          <Users className="h-4 w-4 text-chart-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{credentialsStats.totalParticipants}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {credentialsStats.totalParticipants - credentialsStats.checkedIn} ainda não fizeram check-in
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Tempo Médio</CardTitle>
          <Clock className="h-4 w-4 text-chart-3" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{credentialsStats.avgCheckInTime}</div>
          <p className="text-xs text-muted-foreground mt-1">Por check-in</p>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Check-ins/Hora</CardTitle>
          <TrendingUp className="h-4 w-4 text-chart-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{credentialsStats.currentHourCheckIns}</div>
          <p className="text-xs text-muted-foreground mt-1">Pico: {credentialsStats.peakHour}</p>
        </CardContent>
      </Card>
    </div>
  )
}
