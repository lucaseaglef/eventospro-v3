import { Button } from "@/components/ui/button"
import { Plus, Download, Settings } from "lucide-react"

export function QuickActions() {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
      <Button variant="outline" size="sm">
        <Settings className="mr-2 h-4 w-4" />
        Configurar
      </Button>
      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Plus className="mr-2 h-4 w-4" />
        Novo Evento
      </Button>
    </div>
  )
}
