/**
 * API Configuration for Event Management Platform
 *
 * This file contains all API endpoint configurations and base settings
 * for the production-ready event management system.
 */

// API Base Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

// API Endpoints
export const API_ENDPOINTS = {
  // Events
  EVENTS: "/events",
  EVENT_BY_ID: (id: string) => `/events/${id}`,

  // Participants
  PARTICIPANTS: (eventId: string) => `/events/${eventId}/participants`,
  PARTICIPANT_BY_ID: (id: string) => `/participants/${id}`,
  PARTICIPANT_CHECKIN: (id: string) => `/participants/${id}/checkin`,
  PARTICIPANT_SEARCH: (eventId: string) => `/events/${eventId}/participants/search`,

  // Orders
  ORDERS: "/orders",
  ORDERS_BY_EVENT: (eventId: string) => `/events/${eventId}/orders`,
  ORDER_BY_ID: (id: string) => `/orders/${id}`,

  // Metrics and Analytics
  METRICS: "/metrics",
  EVENT_METRICS: (eventId: string) => `/events/${eventId}/metrics`,
  CHART_DATA: (type: string, eventId?: string) => `/analytics/charts/${type}${eventId ? `?eventId=${eventId}` : ""}`,

  // Real-time Activities
  REALTIME_ACTIVITIES: (eventId: string) => `/events/${eventId}/activities/realtime`,

  // Tickets
  TICKETS: (eventId: string) => `/events/${eventId}/tickets`,
  TICKET_BY_ID: (id: string) => `/tickets/${id}`,

  // Coupons
  COUPONS: (eventId: string) => `/events/${eventId}/coupons`,
  COUPON_BY_ID: (id: string) => `/coupons/${id}`,

  // Form Fields
  FORM_FIELDS: (eventId: string) => `/events/${eventId}/form-fields`,

  // Checkout Configuration
  CHECKOUT_CONFIG: (eventId: string) => `/events/${eventId}/checkout-config`,
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Erro de conexão. Verifique sua internet e tente novamente.",
  SERVER_ERROR: "Erro interno do servidor. Tente novamente em alguns minutos.",
  NOT_FOUND: "Recurso não encontrado.",
  UNAUTHORIZED: "Acesso não autorizado. Faça login novamente.",
  VALIDATION_ERROR: "Dados inválidos. Verifique os campos e tente novamente.",
  TIMEOUT_ERROR: "Tempo limite excedido. Tente novamente.",
  UNKNOWN_ERROR: "Erro desconhecido. Tente novamente.",
} as const

// Request Headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as const

// Cache Configuration
export const CACHE_CONFIG = {
  EVENTS: 5 * 60 * 1000, // 5 minutes
  PARTICIPANTS: 2 * 60 * 1000, // 2 minutes
  METRICS: 1 * 60 * 1000, // 1 minute
  REALTIME: 30 * 1000, // 30 seconds
} as const
