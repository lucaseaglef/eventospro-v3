import { DashboardLayout } from "@/components/dashboard-layout"
import { EventsPageGrid } from "@/components/events-page-grid"
import { Button } from "@/components/ui/button"
import { Plus, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function EventsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Meus Eventos</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Criar Evento
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Buscar eventos..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        <EventsPageGrid />
      </div>
    </DashboardLayout>
  )
}
