import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CredentialsHeader } from "@/components/dashboard/credentials-header"
import { CredentialsStats } from "@/components/dashboard/credentials-stats"
import { CheckInInterface } from "@/components/check-in-interface"
import { RealtimeActivity } from "@/components/realtime-activity"
import { PresenceReport } from "@/components/presence-report"

export default function CredentialsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <CredentialsHeader />
        <CredentialsStats />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <CheckInInterface />
            <PresenceReport />
          </div>
          <div>
            <RealtimeActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
