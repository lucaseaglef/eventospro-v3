"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { FileText, Download, Filter } from "lucide-react"

const hourlyData = [
  { hour: "08:00", checkins: 12 },
  { hour: "09:00", checkins: 45 },
  { hour: "10:00", checkins: 38 },
  { hour: "11:00", checkins: 28 },
  { hour: "12:00", checkins: 15 },
  { hour: "13:00", checkins: 22 },
  { hour: "14:00", checkins: 35 },
  { hour: "15:00", checkins: 42 },
]

const chartConfig = {
  checkins: {
    label: "Check-ins",
    color: "hsl(var(--chart-1))",
  },
}

const presenceStats = {
  totalExpected: 450,
  present: 287,
  absent: 163,
  presenceRate: 63.8,
  peakHour: "09:00",
  peakCount: 45,
}

export function PresenceReport() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <FileText className="mr-2 h-5 w-5" />
            Relatório de Presença
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-chart-1">{presenceStats.present}</div>
            <p className="text-sm text-muted-foreground">Presentes</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-chart-3">{presenceStats.absent}</div>
            <p className="text-sm text-muted-foreground">Ausentes</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-chart-2">{presenceStats.presenceRate}%</div>
            <p className="text-sm text-muted-foreground">Taxa de Presença</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-chart-4">{presenceStats.peakCount}</div>
            <p className="text-sm text-muted-foreground">Pico ({presenceStats.peakHour})</p>
          </div>
        </div>

        {/* Hourly Chart */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Check-ins por Hora</h3>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hourlyData}>
                <XAxis
                  dataKey="hour"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="checkins" fill="var(--color-chart-1)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Status Breakdown */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Status dos Participantes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Badge className="bg-chart-1 text-white">Confirmado</Badge>
                <span className="text-foreground">Check-in realizado</span>
              </div>
              <span className="font-semibold text-foreground">{presenceStats.present}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Badge className="bg-chart-2 text-white">Pendente</Badge>
                <span className="text-foreground">Aguardando check-in</span>
              </div>
              <span className="font-semibold text-foreground">{presenceStats.absent}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Badge className="bg-chart-3 text-white">Ausente</Badge>
                <span className="text-foreground">Não compareceu</span>
              </div>
              <span className="font-semibold text-foreground">0</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
