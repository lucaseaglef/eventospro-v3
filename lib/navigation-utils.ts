export function navigateToOrder(orderId: string) {
  console.log("[v0] Navigating to order:", orderId)
  window.location.href = `/sales?order=${orderId}`
}

export function navigateToParticipant(participantId: string) {
  console.log("[v0] Navigating to participant:", participantId)
  window.location.href = `/participants/${participantId}`
}

export function handleParticipantClick(
  participantId: string,
  setSelectedParticipant: (id: string | null) => void,
  setIsModalOpen: (open: boolean) => void,
) {
  console.log("[v0] Participant clicked:", participantId)
  setSelectedParticipant(participantId)
  setIsModalOpen(true)
}
