"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { day: "01", vendas: 12000, transacoes: 45 },
  { day: "02", vendas: 15000, transacoes: 52 },
  { day: "03", vendas: 8000, transacoes: 28 },
  { day: "04", vendas: 22000, transacoes: 78 },
  { day: "05", vendas: 18000, transacoes: 65 },
  { day: "06", vendas: 25000, transacoes: 89 },
  { day: "07", vendas: 30000, transacoes: 105 },
]

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

export function SalesChart() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Vendas dos Últimos 7 Dias</CardTitle>
        <CardDescription className="text-muted-foreground">Receita e número de transações por dia</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis
                dataKey="day"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="vendas"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                dot={{ fill: "var(--color-chart-1)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
