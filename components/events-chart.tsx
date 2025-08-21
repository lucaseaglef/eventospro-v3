"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", eventos: 4, participantes: 240 },
  { month: "Fev", eventos: 3, participantes: 180 },
  { month: "Mar", eventos: 6, participantes: 420 },
  { month: "Abr", eventos: 8, participantes: 680 },
  { month: "Mai", eventos: 5, participantes: 350 },
  { month: "Jun", eventos: 7, participantes: 580 },
]

const chartConfig = {
  eventos: {
    label: "Eventos",
    color: "hsl(var(--chart-1))",
  },
  participantes: {
    label: "Participantes",
    color: "hsl(var(--chart-2))",
  },
}

export function EventsChart() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Eventos por Mês</CardTitle>
        <CardDescription className="text-muted-foreground">
          Visão geral dos eventos realizados e participantes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
              <Bar dataKey="eventos" fill="hsl(var(--chart-1))" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
