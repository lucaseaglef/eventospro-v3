import { QRCodeViewer } from "@/components/qr-code-viewer"

// Mock data - in a real app, this would come from an API based on the QR code
const participantData = {
  code: "QR001234",
  participant: {
    name: "Ana Silva",
    email: "ana.silva@email.com",
    company: "TechCorp",
    position: "Desenvolvedora Senior",
    avatar: "/professional-woman.png",
  },
  event: {
    name: "Tech Summit 2024",
    date: "2024-12-15",
    time: "09:00",
    location: "Centro de Convenções Anhembi",
    address: "Av. Olavo Fontoura, 1209 - Santana, São Paulo - SP",
  },
  ticket: {
    type: "VIP Experience",
    price: "R$ 499,90",
    features: [
      "Acesso a todas as palestras",
      "Material premium do evento",
      "Coffee breaks e almoço VIP",
      "Certificado",
      "Networking exclusivo",
      "Meet & Greet com palestrantes",
    ],
  },
  status: "Válido",
  generatedAt: "2024-12-10 14:30",
  validUntil: "2024-12-17 23:59",
}

export default function QRViewerPage({ params }: { params: { code: string } }) {
  return <QRCodeViewer data={participantData} />
}
