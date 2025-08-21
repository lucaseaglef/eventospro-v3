import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface EventHighlightsProps {
  highlights: string[]
}

export function EventHighlights({ highlights }: EventHighlightsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Destaques do Evento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
