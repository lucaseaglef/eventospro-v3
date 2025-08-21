import { CheckInKiosk } from "@/components/check-in-kiosk"

export default function CheckInKioskPage({ params }: { params: { id: string } }) {
  return <CheckInKiosk eventId={params.id} />
}
