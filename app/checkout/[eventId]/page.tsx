"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCheckoutConfig } from "@/contexts/checkout-config-context"
import { CheckoutLayout } from "@/components/checkout-layout"
import { CheckoutSteps } from "@/components/checkout-steps"
import { TicketSelection } from "@/components/ticket-selection"
import { BuyerForm } from "@/components/buyer-form"
import { ParticipantsForm } from "@/components/participants-form"
import { PaymentForm } from "@/components/payment-form"
import { OrderSummary } from "@/components/order-summary"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Clock } from "lucide-react"
import { EventAboutSection } from "@/components/event-about-section"
import { EventSponsors } from "@/components/event-sponsors"
import { EventHighlights } from "@/components/event-highlights"
import { EventSchedule } from "@/components/event-schedule"

const eventData = {
  id: "1",
  name: "TechConf São Paulo 2024",
  subtitle: "O Futuro da Tecnologia no Brasil",
  date: "15 de dezembro de 2024",
  time: "09:00 - 18:00",
  location: "Centro de Convenções Anhembi - São Paulo, SP",
  description:
    "Uma conferência inovadora que reúne os maiores especialistas em tecnologia do Brasil e América Latina. Durante dois dias intensos, você terá acesso a palestras inspiradoras, workshops práticos e oportunidades únicas de networking com profissionais renomados do mercado tech.",
  organizer: "TechEvents Brasil",
  website: "https://techconf.com.br",
  sponsors: [
    {
      id: "1",
      name: "Microsoft",
      logo: "/microsoft-logo.png",
      tier: "platinum" as const,
      website: "https://microsoft.com",
    },
    {
      id: "2",
      name: "Google",
      logo: "/google-logo.png",
      tier: "platinum" as const,
      website: "https://google.com",
    },
    {
      id: "3",
      name: "Amazon",
      logo: "/amazon-logo.png",
      tier: "gold" as const,
      website: "https://amazon.com",
    },
    {
      id: "4",
      name: "Meta",
      logo: "/meta-logo-abstract.png",
      tier: "gold" as const,
      website: "https://meta.com",
    },
    {
      id: "5",
      name: "Spotify",
      logo: "/spotify-logo.png",
      tier: "silver" as const,
      website: "https://spotify.com",
    },
    {
      id: "6",
      name: "Uber",
      logo: "/provider-logos/uber.png",
      tier: "silver" as const,
      website: "https://uber.com",
    },
  ],
  ticketTypes: [
    {
      id: "vip",
      name: "Ingresso VIP",
      description: "Acesso completo com benefícios exclusivos, área VIP e networking diferenciado.",
      price: 299,
      originalPrice: 399,
      available: 50,
      features: ["Acesso completo ao evento", "Kit exclusivo", "Coffee break premium", "Certificado digital"],
    },
    {
      id: "regular",
      name: "Ingresso Regular",
      description: "Acesso completo a todas as palestras e workshops do evento.",
      price: 149,
      available: 200,
      features: ["Acesso ao evento", "Certificado digital", "Coffee break", "Material de apoio"],
    },
  ],
}

interface TicketType {
  id: string
  name: string
  price: number
  quantity: number
}

interface ParticipantData {
  name: string
  email: string
  document: string
}

interface BuyerData {
  name: string
  email: string
  phone: string
  document: string
}

export default function CheckoutPage({ params }: { params: { eventId: string } }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTickets, setSelectedTickets] = useState<TicketType[]>([])
  const [buyerData, setBuyerData] = useState<BuyerData>({
    name: "",
    email: "",
    phone: "",
    document: "",
  })
  const [participantsData, setParticipantsData] = useState<ParticipantData[]>([])
  const [couponCode, setCouponCode] = useState("")
  const router = useRouter()
  const { getSortedVisibleSections, isSectionVisible } = useCheckoutConfig()

  const subtotal = selectedTickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0)
  const discount = couponCode === "DESCONTO10" ? subtotal * 0.1 : 0
  const total = subtotal - discount
  const totalTickets = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0)

  const handleTicketSelect = (ticketId: string) => {
    const ticketType = eventData.ticketTypes.find((t) => t.id === ticketId)
    if (!ticketType) return

    const existingTicket = selectedTickets.find((t) => t.id === ticketId)

    if (existingTicket) {
      return
    } else {
      setSelectedTickets([
        ...selectedTickets,
        {
          id: ticketId,
          name: ticketType.name,
          price: ticketType.price,
          quantity: 1,
        },
      ])
    }
  }

  const handleTicketQuantityChange = (ticketId: string, quantity: number) => {
    if (quantity <= 0) {
      handleTicketRemove(ticketId)
      return
    }

    setSelectedTickets(selectedTickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, quantity } : ticket)))
  }

  const handleTicketRemove = (ticketId: string) => {
    setSelectedTickets(selectedTickets.filter((ticket) => ticket.id !== ticketId))
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinalizePurchase = () => {
    // Here you would normally process the payment
    // For now, we'll simulate success and redirect
    router.push(`/checkout/${params.eventId}/success`)
  }

  const renderCheckoutSections = () => {
    const visibleSections = getSortedVisibleSections()

    return visibleSections.map((section) => {
      switch (section.id) {
        case "event-info":
          return (
            <EventAboutSection key="event-info" event={eventData}>
              <TicketSelection
                event={eventData}
                selectedTickets={selectedTickets}
                onTicketSelect={handleTicketSelect}
              />
            </EventAboutSection>
          )
        case "highlights":
          return (
            <EventHighlights
              key="highlights"
              highlights={[
                "Palestrantes renomados da indústria",
                "Networking com profissionais experientes",
                "Workshops práticos e interativos",
                "Certificado de participação",
              ]}
            />
          )
        case "sponsors":
          return <EventSponsors key="sponsors" sponsors={eventData.sponsors} />
        case "schedule":
          return (
            <EventSchedule
              key="schedule"
              schedule={[
                {
                  id: "day-1",
                  day: "Dia 1",
                  date: "2024-03-15",
                  activities: [
                    {
                      id: "1",
                      time: "09:00",
                      title: "Credenciamento",
                      type: "registration" as const,
                      speaker: "",
                      location: "Hall Principal",
                      duration: "30min",
                    },
                    {
                      id: "2",
                      time: "09:30",
                      title: "Abertura do Evento",
                      type: "keynote" as const,
                      speaker: "João Silva",
                      location: "Auditório Principal",
                      duration: "30min",
                    },
                  ],
                },
              ]}
            />
          )
        default:
          return null
      }
    })
  }

  return (
    <CheckoutLayout>
      <div className="max-w-7xl mx-auto">
        {isSectionVisible("event-info") && (
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-8 mb-8">
            <h1 className="text-3xl font-bold mb-2">{eventData.name}</h1>
            <p className="text-lg mb-4 opacity-90">{eventData.subtitle}</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{eventData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{eventData.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{eventData.location}</span>
              </div>
            </div>
            <div className="mt-4 text-sm opacity-80">
              <p>
                <strong>Organizador:</strong> {eventData.organizer}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={eventData.website} target="_blank" rel="noopener noreferrer">
                  {eventData.website}
                </a>
              </p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <CheckoutSteps currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && <div className="space-y-8">{renderCheckoutSections()}</div>}

            {currentStep === 2 && (
              <div className="space-y-6">
                <BuyerForm data={buyerData} onChange={setBuyerData} />
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Voltar
                  </Button>
                  <Button onClick={handleNextStep} size="lg">
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <ParticipantsForm
                  participants={participantsData}
                  onChange={setParticipantsData}
                  totalTickets={totalTickets}
                  buyerData={buyerData}
                  selectedTickets={selectedTickets}
                />
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Voltar
                  </Button>
                  <Button onClick={handleNextStep} size="lg">
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <PaymentForm total={total} />
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Voltar
                  </Button>
                  <Button onClick={handleFinalizePurchase} size="lg" className="bg-green-600 hover:bg-green-700">
                    Finalizar Compra
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              tickets={selectedTickets}
              subtotal={subtotal}
              discount={discount}
              total={total}
              couponCode={couponCode}
              onCouponChange={setCouponCode}
              onTicketQuantityChange={handleTicketQuantityChange}
              onTicketRemove={handleTicketRemove}
              onContinue={currentStep === 1 && totalTickets > 0 ? handleNextStep : undefined}
            />
          </div>
        </div>
      </div>
    </CheckoutLayout>
  )
}
