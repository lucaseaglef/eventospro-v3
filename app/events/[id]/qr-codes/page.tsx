import { DashboardLayout } from "@/components/dashboard-layout"
import { QRCodeHeader } from "@/components/qr-code-header"
import { QRCodeStats } from "@/components/qr-code-stats"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { ParticipantsQRList } from "@/components/participants-qr-list"

// Mock data - in a real app, this would come from an API
const eventData = {
  id: "1",
  name: "Tech Summit 2024",
  totalParticipants: 450,
  qrCodesGenerated: 420,
  qrCodesSent: 380,
  qrCodesDownloaded: 340,
}

export default function QRCodesPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <QRCodeHeader event={eventData} />
        <QRCodeStats stats={eventData} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ParticipantsQRList eventId={params.id} />
          </div>
          <div>
            <QRCodeGenerator eventId={params.id} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
