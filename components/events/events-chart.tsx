"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorState } from "@/components/ui/error-state"
import { EmptyState } from "@/components/ui/empty-state"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { BarChart3 } from "lucide-react"
import { useChartData } from "@/lib/api-hooks"

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

interface EventsChartProps {
  eventId?: string
}

export function EventsChart({ eventId }: EventsChartProps) {
  const { data, isLoading, error } = useChartData("events", eventId)

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Eventos por Mês</CardTitle>
        <CardDescription className="text-muted-foreground">
          Visão geral dos eventos realizados e participantes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center h-[300px]">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <div className="h-[300px]">
            <ErrorState message={error} onRetry={() => window.location.reload()} />
          </div>
        )}

        {!isLoading && !error && (!data || data.length === 0) && (
          <div className="h-[300px]">
            <EmptyState
              icon={BarChart3}
              title="Nenhum dado disponível"
              description="Não há dados suficientes para gerar o gráfico."
            />
          </div>
        )}

        {!isLoading && !error && data && data.length > 0 && (
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
        )}
      </CardContent>
    </Card>
  )
}
