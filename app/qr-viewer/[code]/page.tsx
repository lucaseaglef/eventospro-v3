import { QRCodeViewer } from "@/components/qr-code-viewer"

interface QRViewerPageProps {
  params: { code: string }
}

async function getParticipantByQRCode(code: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/qr-codes/${code}`)
    if (!response.ok) {
      throw new Error("QR Code não encontrado")
    }
    return await response.json()
  } catch (error) {
    return {
      code,
      participant: {
        name: "Participante não encontrado",
        email: "email@nao-encontrado.com",
        company: "Empresa não informada",
        position: "Cargo não informado",
        avatar: "/diverse-user-avatars.png",
      },
      event: {
        name: "Evento não encontrado",
        date: new Date().toISOString().split("T")[0],
        time: "00:00",
        location: "Local não informado",
        address: "Endereço não informado",
      },
      ticket: {
        type: "Ingresso não identificado",
        price: "R$ 0,00",
        features: ["QR Code inválido ou expirado"],
      },
      status: "Inválido",
      generatedAt: new Date().toISOString(),
      validUntil: new Date().toISOString(),
    }
  }
}

export default async function QRViewerPage({ params }: QRViewerPageProps) {
  const participantData = await getParticipantByQRCode(params.code)

  return <QRCodeViewer data={participantData} />
}
