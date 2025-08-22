import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { SalesOverview } from "@/components/dashboard/sales-overview"
import { OrdersList } from "@/components/dashboard/orders-list"

export default function SalesPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Vendas</h1>
        </div>

        <SalesOverview />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Pedidos Recentes</h2>
          <OrdersList />
        </div>
      </div>
    </DashboardLayout>
  )
}
