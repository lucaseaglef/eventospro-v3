import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { EventsGrid } from "@/components/events/events-grid"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <QuickActions />
        </div>

        <MetricsCards />

        <EventsGrid />
      </div>
    </DashboardLayout>
  )
}
