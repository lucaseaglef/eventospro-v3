export type ParticipantStatus = "confirmed" | "pending" | "cancelled"
export type OrderStatus = "confirmado" | "pendente" | "cancelado"
export type PaymentStatus = "pago" | "processando" | "pendente" | "falhou"
export type QRStatus = "Válido" | "Usado" | "Expirado"

export const participantStatusConfig = {
  confirmed: { color: "bg-chart-1 text-white", label: "Confirmado" },
  pending: { color: "bg-chart-4 text-white", label: "Pendente" },
  cancelled: { color: "bg-chart-3 text-white", label: "Cancelado" },
} as const

export const orderStatusConfig = {
  confirmado: { color: "bg-green-100 text-green-800 border-green-200", label: "Confirmado" },
  pendente: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Pendente" },
  cancelado: { color: "bg-red-100 text-red-800 border-red-200", label: "Cancelado" },
} as const

export const paymentStatusConfig = {
  pago: { color: "bg-green-100 text-green-800 border-green-200", label: "Pago" },
  processando: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Processando" },
  pendente: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Pendente" },
  falhou: { color: "bg-red-100 text-red-800 border-red-200", label: "Falhou" },
} as const

export const qrStatusConfig = {
  Válido: { color: "bg-chart-1 text-white", label: "Válido" },
  Usado: { color: "bg-chart-4 text-white", label: "Usado" },
  Expirado: { color: "bg-chart-3 text-white", label: "Expirado" },
} as const

export function getParticipantStatusDisplay(status: ParticipantStatus, checkedIn = false) {
  if (checkedIn) return { color: "bg-chart-1 text-white", text: "Check-in Feito" }
  return participantStatusConfig[status] || { color: "bg-muted text-muted-foreground", text: "Desconhecido" }
}

export function getOrderStatusDisplay(status: OrderStatus) {
  return orderStatusConfig[status] || { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Desconhecido" }
}

export function getPaymentStatusDisplay(status: PaymentStatus) {
  return paymentStatusConfig[status] || { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Desconhecido" }
}

export function getQRStatusDisplay(status: QRStatus) {
  return qrStatusConfig[status] || { color: "bg-muted text-muted-foreground", label: "Desconhecido" }
}
