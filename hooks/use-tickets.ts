import { useLocalStorage } from "./use-local-storage"

export interface Ticket {
  id: string
  name: string
  type: string
  visibility: string
  quantity: number
  price: number
  purchaseLimit: number
  description: string
  salesStart: string
  salesEnd: string
  checkinStart: string
  checkinEnd: string
  active: boolean
  eventId: string
  sold: number
}

export function useTickets(eventId: string) {
  const [tickets, setTickets] = useLocalStorage<Ticket[]>(`tickets_${eventId}`, [
    {
      id: "1",
      name: "Ingresso Regular",
      type: "Ingresso",
      visibility: "Público",
      quantity: 200,
      price: 149.0,
      purchaseLimit: 5,
      description: "Acesso completo a todas as palestras e workshops do evento.",
      salesStart: "2024-01-10T03:00",
      salesEnd: "2024-12-15T02:59",
      checkinStart: "2024-12-15T11:00",
      checkinEnd: "2024-12-15T13:00",
      active: true,
      eventId,
      sold: 45,
    },
    {
      id: "2",
      name: "Ingresso VIP",
      type: "Ingresso",
      visibility: "Público",
      quantity: 50,
      price: 299.0,
      purchaseLimit: 2,
      description: "Acesso VIP com networking exclusivo e materiais premium.",
      salesStart: "2024-01-10T03:00",
      salesEnd: "2024-12-15T02:59",
      checkinStart: "2024-12-15T11:00",
      checkinEnd: "2024-12-15T13:00",
      active: true,
      eventId,
      sold: 12,
    },
  ])

  const addTicket = (ticket: Omit<Ticket, "id" | "sold">) => {
    const newTicket: Ticket = {
      ...ticket,
      id: Date.now().toString(),
      sold: 0,
    }
    setTickets((prev) => [...prev, newTicket])
    return newTicket
  }

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets((prev) => prev.map((ticket) => (ticket.id === id ? { ...ticket, ...updates } : ticket)))
  }

  const deleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id))
  }

  const getTicket = (id: string) => {
    return tickets.find((ticket) => ticket.id === id)
  }

  return {
    tickets,
    addTicket,
    updateTicket,
    deleteTicket,
    getTicket,
  }
}
