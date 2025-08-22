"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import type {
  Event,
  Participant,
  Order,
  EventMetrics,
  ChartData,
  RealtimeActivity,
  ApiResponse,
  PaginatedResponse,
  AsyncState,
  ParticipantFilters,
  EventFilters,
  OrderFilters,
} from "./types"

// Generic API hook
export function useApi<T>(apiCall: () => Promise<ApiResponse<T>>, dependencies: any[] = []): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: true,
    error: null,
  })

  const memoizedApiCall = useCallback(apiCall, dependencies)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }))
        const response = await memoizedApiCall()

        if (isMounted) {
          setState({
            data: response.data,
            isLoading: false,
            error: null,
          })
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            isLoading: false,
            error: error instanceof Error ? error.message : "An error occurred",
          })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [memoizedApiCall])

  return state
}

// Event hooks
export function useEvents(filters?: EventFilters) {
  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)])

  return useApi<Event[]>(() => fetchEvents(memoizedFilters), [memoizedFilters])
}

export function useEvent(eventId: string) {
  return useApi<Event>(() => fetchEvent(eventId), [eventId])
}

// Participant hooks
export function useParticipants(eventId: string, filters?: ParticipantFilters) {
  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)])

  return useApi<PaginatedResponse<Participant>>(
    () => fetchParticipants(eventId, memoizedFilters),
    [eventId, memoizedFilters],
  )
}

export function useParticipant(participantId: string) {
  return useApi<Participant>(() => fetchParticipant(participantId), [participantId])
}

// Order hooks
export function useOrders(eventId?: string, filters?: OrderFilters) {
  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)])

  return useApi<PaginatedResponse<Order>>(() => fetchOrders(eventId, memoizedFilters), [eventId, memoizedFilters])
}

// Metrics hooks
export function useEventMetrics(eventId?: string) {
  return useApi<EventMetrics>(() => fetchEventMetrics(eventId), [eventId])
}

export function useChartData(type: "events" | "sales", eventId?: string) {
  return useApi<ChartData[]>(() => fetchChartData(type, eventId), [type, eventId])
}

// Realtime activity hook
export function useRealtimeActivity(eventId: string) {
  const [activities, setActivities] = useState<RealtimeActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchActivities = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetchRealtimeActivities(eventId)
      setActivities(response.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch activities")
    } finally {
      setIsLoading(false)
    }
  }, [eventId])

  useEffect(() => {
    let isMounted = true

    const runFetch = async () => {
      if (isMounted) {
        await fetchActivities()
      }
    }

    runFetch()

    // Set up polling for real-time updates
    const interval = setInterval(() => {
      if (isMounted) {
        fetchActivities()
      }
    }, 30000) // Poll every 30 seconds

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [fetchActivities])

  return { data: activities, isLoading, error }
}

// Mutation hooks
export function useCreateEvent() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createEvent = useCallback(async (eventData: Partial<Event>) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await createEventApi(eventData)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create event"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { createEvent, isLoading, error }
}

export function useUpdateEvent() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateEvent = useCallback(async (eventId: string, eventData: Partial<Event>) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await updateEventApi(eventId, eventData)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update event"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { updateEvent, isLoading, error }
}

export function useCheckInParticipant() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkIn = useCallback(async (participantId: string, qrCode?: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await checkInParticipantApi(participantId, qrCode)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to check in participant"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { checkIn, isLoading, error }
}

// API functions (to be implemented with actual API endpoints)
async function fetchEvents(filters?: EventFilters): Promise<ApiResponse<Event[]>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada - Configure a variável de ambiente")
  }

  const queryParams = new URLSearchParams()
  if (filters?.status) queryParams.append("status", filters.status)
  if (filters?.search) queryParams.append("search", filters.search)

  const response = await fetch(`${apiUrl}/api/events?${queryParams}`)
  if (!response.ok) {
    throw new Error(`Erro ao buscar eventos: ${response.statusText}`)
  }

  return await response.json()
}

async function fetchEvent(eventId: string): Promise<ApiResponse<Event>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada - Configure a variável de ambiente")
  }

  const response = await fetch(`${apiUrl}/api/events/${eventId}`)
  if (!response.ok) {
    throw new Error(`Erro ao buscar evento: ${response.statusText}`)
  }

  return await response.json()
}

async function fetchParticipants(
  eventId: string,
  filters?: ParticipantFilters,
): Promise<ApiResponse<PaginatedResponse<Participant>>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada - Configure a variável de ambiente")
  }

  const queryParams = new URLSearchParams()
  if (filters?.limit) queryParams.append("limit", filters.limit.toString())
  if (filters?.offset) queryParams.append("offset", filters.offset.toString())
  if (filters?.search) queryParams.append("search", filters.search)
  if (filters?.status) queryParams.append("status", filters.status)

  const response = await fetch(`${apiUrl}/api/events/${eventId}/participants?${queryParams}`)
  if (!response.ok) {
    throw new Error(`Erro ao buscar participantes: ${response.statusText}`)
  }

  return await response.json()
}

async function fetchParticipant(participantId: string): Promise<ApiResponse<Participant>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada - Configure a variável de ambiente")
  }

  const response = await fetch(`${apiUrl}/api/participants/${participantId}`)
  if (!response.ok) {
    throw new Error(`Erro ao buscar participante: ${response.statusText}`)
  }

  return await response.json()
}

async function fetchOrders(eventId?: string, filters?: OrderFilters): Promise<ApiResponse<PaginatedResponse<Order>>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada - Configure a variável de ambiente")
  }

  const queryParams = new URLSearchParams()
  if (eventId) queryParams.append("eventId", eventId)
  if (filters?.limit) queryParams.append("limit", filters.limit.toString())
  if (filters?.offset) queryParams.append("offset", filters.offset.toString())
  if (filters?.status) queryParams.append("status", filters.status)
  if (filters?.orderId) queryParams.append("orderId", filters.orderId)

  const response = await fetch(`${apiUrl}/api/orders?${queryParams}`)
  if (!response.ok) {
    throw new Error(`Erro ao buscar pedidos: ${response.statusText}`)
  }

  return await response.json()
}

async function fetchEventMetrics(eventId?: string): Promise<ApiResponse<EventMetrics>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada - Configure a variável de ambiente")
  }

  const endpoint = eventId ? `/api/events/${eventId}/metrics` : "/api/metrics"
  const response = await fetch(`${apiUrl}${endpoint}`)
  if (!response.ok) {
    throw new Error(`Erro ao buscar métricas: ${response.statusText}`)
  }

  return await response.json()
}

async function fetchChartData(type: "events" | "sales", eventId?: string): Promise<ApiResponse<ChartData[]>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada - Configure a variável de ambiente")
  }

  const queryParams = new URLSearchParams()
  queryParams.append("type", type)
  if (eventId) queryParams.append("eventId", eventId)

  const response = await fetch(`${apiUrl}/api/charts?${queryParams}`)
  if (!response.ok) {
    throw new Error(`Erro ao buscar dados do gráfico: ${response.statusText}`)
  }

  return await response.json()
}

async function fetchRealtimeActivities(eventId: string): Promise<ApiResponse<RealtimeActivity[]>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada - Configure a variável de ambiente")
  }

  const response = await fetch(`${apiUrl}/api/events/${eventId}/activities`)
  if (!response.ok) {
    throw new Error(`Erro ao buscar atividades: ${response.statusText}`)
  }

  return await response.json()
}

async function createEventApi(eventData: Partial<Event>): Promise<ApiResponse<Event>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada - Configure a variável de ambiente")
  }

  const response = await fetch(`${apiUrl}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  })

  if (!response.ok) {
    throw new Error(`Erro ao criar evento: ${response.statusText}`)
  }

  return await response.json()
}

async function updateEventApi(eventId: string, eventData: Partial<Event>): Promise<ApiResponse<Event>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada - Configure a variável de ambiente")
  }

  const response = await fetch(`${apiUrl}/api/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  })

  if (!response.ok) {
    throw new Error(`Erro ao atualizar evento: ${response.statusText}`)
  }

  return await response.json()
}

async function checkInParticipantApi(participantId: string, qrCode?: string): Promise<ApiResponse<Participant>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada - Configure a variável de ambiente")
  }

  const response = await fetch(`${apiUrl}/api/participants/${participantId}/checkin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ qrCode }),
  })

  if (!response.ok) {
    throw new Error(`Erro ao fazer check-in: ${response.statusText}`)
  }

  return await response.json()
}
