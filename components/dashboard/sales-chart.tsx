"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { TrendingUp } from "lucide-react"
import { useChartData } from "@/lib/api-hooks"

const chartConfig = {
  vendas: {
    label: "Vendas (R$)",
    color: "hsl(var(--chart-1))",
  },
  transacoes: {
    label: "Transações",
    color: "hsl(var(--chart-2))",
  },
}

interface SalesChartProps {
  eventId?: string
}

export function SalesChart({ eventId }: SalesChartProps) {
  const { data, isLoading } = useChartData("sales", eventId)

  const emptyChartData = Array.from({ length: 7 }, (_, i) => ({
    day: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }),
    vendas: 0,
    transacoes: 0,
  }))

  const chartData = data && data.length > 0 ? data : emptyChartData
  const hasRealData = data && data.length > 0 && data.some((item) => item.vendas > 0 || item.transacoes > 0)

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Vendas dos Últimos 7 Dias</CardTitle>
        <CardDescription className="text-muted-foreground">
          {isLoading
            ? "Carregando dados de vendas..."
            : hasRealData
              ? "Receita e número de transações por dia"
              : "Aguardando primeiras vendas para exibir dados"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center h-[300px]">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {!isLoading && (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  domain={[0, "dataMax"]}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="vendas"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-chart-1)" }}
                  opacity={hasRealData ? 1 : 0.3}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}

        {!isLoading && !hasRealData && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <div className="text-center space-y-2">
              <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">O gráfico será preenchido conforme as vendas acontecerem</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
