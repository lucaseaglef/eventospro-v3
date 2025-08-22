import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { QRCodeHeader } from "@/components/qr-code-header"
import { QRCodeStats } from "@/components/qr-code-stats"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { ParticipantsQRList } from "@/components/participants-qr-list"

interface QRCodesPageProps {
  params: { id: string }
}

async function getEventData(eventId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}/qr-stats`)
    if (!response.ok) {
      throw new Error("Dados do evento não encontrados")
    }
    return await response.json()
  } catch (error) {
    return {
      id: eventId,
      name: "Carregando evento...",
      totalParticipants: 0,
      qrCodesGenerated: 0,
      qrCodesSent: 0,
      qrCodesDownloaded: 0,
    }
  }
}

export default async function QRCodesPage({ params }: QRCodesPageProps) {
  const eventData = await getEventData(params.id)

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
