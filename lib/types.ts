export interface Event {
  id: string
  name: string
  subtitle?: string
  description: string
  organizer: string
  website?: string
  date: string
  time: string
  endTime?: string
  location: string
  address: string
  city: string
  state: string
  zipCode: string
  banner?: string
  status: "active" | "draft" | "cancelled" | "completed"
  totalTickets: number
  soldTickets: number
  revenue: number
  createdAt: string
  updatedAt: string
}

export interface Ticket {
  id: string
  eventId: string
  name: string
  description: string
  price: number
  quantity: number
  sold: number
  available: number
  status: "active" | "inactive"
  salesStart?: string
  salesEnd?: string
  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: string
  eventId: string
  name: string
  description: string
  speaker: string
  speakerBio?: string
  speakerAvatar?: string
  startTime: string
  endTime: string
  location: string
  capacity?: number
  registered?: number
  type: string
  createdAt: string
  updatedAt: string
}

export interface Participant {
  id: string
  eventId: string
  name: string
  email: string
  phone?: string
  document?: string
  company?: string
  position?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  ticketId: string
  ticketType: string
  ticketCode: string
  qrCode?: string
  orderNumber: string
  ticketPrice: number
  status: "confirmed" | "pending" | "cancelled"
  checkedIn: boolean
  checkedInAt?: string
  registeredAt: string
  avatar?: string
}

export interface Order {
  id: string
  eventId: string
  orderNumber: string
  buyerName: string
  buyerEmail: string
  buyerPhone?: string
  buyerDocument?: string
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
  paymentMethod: "credit_card" | "pix" | "bank_transfer"
  paymentStatus: "pending" | "confirmed" | "failed" | "refunded"
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
  updatedAt: string
  paidAt?: string
}

export interface OrderItem {
  id: string
  ticketId: string
  ticketName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Coupon {
  id: string
  eventId: string
  code: string
  name: string
  description?: string
  type: "percentage" | "fixed"
  value: number
  maxUses?: number
  usedCount: number
  validFrom: string
  validUntil: string
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

export interface Sponsor {
  id: string
  eventId: string
  name: string
  logo: string
  website?: string
  description?: string
  tierId: string
  createdAt: string
  updatedAt: string
}

export interface SponsorTier {
  id: string
  eventId: string
  name: string
  description?: string
  price: number
  benefits: string[]
  maxSponsors?: number
  currentSponsors: number
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export interface FormField {
  id: string
  eventId: string
  name: string
  label: string
  type: "text" | "email" | "phone" | "select" | "textarea" | "checkbox" | "radio"
  required: boolean
  placeholder?: string
  options?: string[]
  validation?: string
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export interface CheckoutConfig {
  eventId: string
  allowGuestCheckout: boolean
  requirePhone: boolean
  requireDocument: boolean
  requireAddress: boolean
  customFields: string[]
  paymentMethods: string[]
  termsUrl?: string
  privacyUrl?: string
  updatedAt: string
}

export interface RealtimeActivity {
  id: string
  eventId: string
  participantId: string
  participantName: string
  participantAvatar?: string
  action: string
  status: "success" | "error" | "pending"
  timestamp: string
  details?: string
}

export interface EventMetrics {
  activeEvents: number
  totalParticipants: number
  totalRevenue: number
  conversionRate: number
  dailySales: number
  totalOrders: number
  averageTicketValue: number
  checkInRate: number
  checkedIn: number
  avgCheckInTime: string
  currentHourCheckIns: number
  peakHour: string
}

export interface ChartData {
  month?: string
  day?: string
  eventos?: number
  participantes?: number
  vendas?: number
  transacoes?: number
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code?: string
  details?: any
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Loading and Error States
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface AsyncState<T> extends LoadingState {
  data: T | null
}

// Form Types
export interface ParticipantFormData {
  name: string
  email: string
  phone?: string
  document?: string
  company?: string
  position?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

export interface OrderFormData {
  buyerName: string
  buyerEmail: string
  buyerPhone?: string
  buyerDocument?: string
  items: {
    ticketId: string
    quantity: number
  }[]
  couponCode?: string
  paymentMethod: string
}

// Filter and Search Types
export interface ParticipantFilters {
  status?: string
  ticketType?: string
  checkedIn?: boolean
  search?: string
}

export interface EventFilters {
  status?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}

export interface OrderFilters {
  status?: string
  paymentStatus?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}
