import { EventManageLayout } from "@/components/event-manage-layout"
import { ParticipantsSection } from "@/components/manage/participants-section"
import { TicketsSection } from "@/components/manage/tickets-section"
import { FinancialSection } from "@/components/manage/financial-section"
import { CredentialingSection } from "@/components/manage/credentialing-section"
import { CertificatesSection } from "@/components/manage/certificates-section"
import { CouponsSection } from "@/components/manage/coupons-section"
import { SettingsSection } from "@/components/manage/settings-section"
import { CheckoutSection } from "@/components/manage/checkout-section"
import { FormBuilderSection } from "@/components/manage/form-builder-section"

interface EventManagePageProps {
  params: {
    id: string
  }
  searchParams: {
    section?: string
  }
}

export default function EventManagePage({ params, searchParams }: EventManagePageProps) {
  const section = searchParams.section || "participantes"

  return (
    <EventManageLayout eventId={params.id} activeSection={section}>
      {section === "participantes" && <ParticipantsSection eventId={params.id} />}
      {section === "ingressos" && <TicketsSection eventId={params.id} />}
      {section === "financeiro" && <FinancialSection eventId={params.id} />}
      {section === "credenciamento" && <CredentialingSection eventId={params.id} />}
      {section === "certificados" && <CertificatesSection eventId={params.id} />}
      {section === "cupons" && <CouponsSection eventId={params.id} />}
      {section === "checkout" && <CheckoutSection eventId={params.id} />}
      {section === "formulario" && <FormBuilderSection eventId={params.id} />}
      {section === "configuracoes" && <SettingsSection eventId={params.id} />}
    </EventManageLayout>
  )
}
