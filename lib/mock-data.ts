// Centralized mock data source for the event management platform
// This file contains a complete event with all related data structures
// Ready to be replaced with real API endpoints

export interface Event {
  id: string
  name: string
  subtitle: string
  description: string
  organizer: string
  website: string
  date: string
  time: string
  endTime: string
  location: string
  address: string
  city: string
  state: string
  zipCode: string
  banner: string
  status: "draft" | "active" | "completed" | "cancelled"
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
  type: string
  visibility: "public" | "private" | "hidden"
  quantity: number
  price: number
  originalPrice?: number
  purchaseLimit: number
  description: string
  features: string[]
  salesStart: string
  salesEnd: string
  checkinStart: string
  checkinEnd: string
  active: boolean
  sold: number
  available: number
}

export interface Activity {
  id: string
  eventId: string
  title: string
  type: "keynote" | "talk" | "workshop" | "panel" | "break" | "networking" | "registration"
  speaker: string
  location: string
  startTime: string
  endTime: string
  duration: string
  description: string
  day: string
  date: string
}

export interface SponsorTier {
  id: string
  eventId: string
  name: string
  value: number
  color: string
  benefits: string[]
}

export interface Sponsor {
  id: string
  eventId: string
  company: string
  tierId: string
  contact: string
  email: string
  phone?: string
  website?: string
  logo: string
  value: number
  benefits: string[]
  tier: "platinum" | "gold" | "silver" | "bronze"
}

export interface Coupon {
  id: string
  eventId: string
  code: string
  discountType: "percentage" | "fixed"
  discountValue: number
  usageLimit: number
  usedCount: number
  expiresAt: string
  minPurchase: number
  active: boolean
  description?: string
}

export interface Participant {
  id: string
  eventId: string
  orderId: string
  ticketId: string
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
  ticketType: string
  ticketCode: string
  qrCode: string
  status: "confirmed" | "pending" | "cancelled"
  checkedIn: boolean
  checkInDate?: string
  registrationDate: string
  avatar?: string
}

export interface Order {
  id: string
  eventId: string
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  buyerDocument: string
  status: "pending" | "confirmed" | "cancelled" | "refunded"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentMethod: "credit_card" | "pix" | "bank_transfer" | "cash"
  subtotal: number
  discount: number
  total: number
  couponCode?: string
  createdAt: string
  updatedAt: string
  items: OrderItem[]
  participants: string[] // participant IDs
}

export interface OrderItem {
  id: string
  ticketId: string
  ticketName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface FormField {
  id: string
  eventId: string
  name: string
  label: string
  type: "text" | "email" | "phone" | "select" | "textarea" | "checkbox" | "date" | "number"
  required: boolean
  placeholder?: string
  options?: string[]
  linkedTickets: string[]
  order: number
}

export interface CheckoutConfig {
  eventId: string
  sections: CheckoutSection[]
}

export interface CheckoutSection {
  id: string
  name: string
  visible: boolean
  order: number
}

// Complete mock data for a single event
export const mockEvent: Event = {
  id: "1",
  name: "Tech Conference São Paulo 2024",
  subtitle: "O Futuro da Tecnologia no Brasil",
  description:
    "Uma conferência inovadora que reúne os maiores especialistas em tecnologia do Brasil e América Latina. Durante um dia intenso, você terá acesso a palestras inspiradoras, workshops práticos e oportunidades únicas de networking com profissionais renomados do mercado tech.",
  organizer: "TechEvents Brasil",
  website: "https://techconf.com.br",
  date: "2024-12-15",
  time: "09:00",
  endTime: "18:00",
  location: "Centro de Convenções Anhembi",
  address: "Av. Olavo Fontoura, 1209",
  city: "São Paulo",
  state: "SP",
  zipCode: "02012-021",
  banner: "/tech-conference-hall.png",
  status: "active",
  totalTickets: 500,
  soldTickets: 387,
  revenue: 57630.0,
  createdAt: "2024-01-10T10:00:00Z",
  updatedAt: "2024-11-20T15:30:00Z",
}

export const mockTickets: Ticket[] = [
  {
    id: "1",
    eventId: "1",
    name: "Ingresso Regular",
    type: "Ingresso",
    visibility: "public",
    quantity: 300,
    price: 149.0,
    purchaseLimit: 5,
    description: "Acesso completo a todas as palestras e workshops do evento.",
    features: ["Acesso ao evento", "Certificado digital", "Coffee break", "Material de apoio"],
    salesStart: "2024-01-10T03:00:00Z",
    salesEnd: "2024-12-15T02:59:00Z",
    checkinStart: "2024-12-15T08:00:00Z",
    checkinEnd: "2024-12-15T18:00:00Z",
    active: true,
    sold: 245,
    available: 55,
  },
  {
    id: "2",
    eventId: "1",
    name: "Ingresso VIP",
    type: "Ingresso",
    visibility: "public",
    quantity: 100,
    price: 299.0,
    originalPrice: 399.0,
    purchaseLimit: 2,
    description: "Acesso VIP com benefícios exclusivos, área VIP e networking diferenciado.",
    features: [
      "Acesso completo ao evento",
      "Kit exclusivo",
      "Coffee break premium",
      "Certificado digital",
      "Área VIP",
      "Networking exclusivo",
    ],
    salesStart: "2024-01-10T03:00:00Z",
    salesEnd: "2024-12-15T02:59:00Z",
    checkinStart: "2024-12-15T08:00:00Z",
    checkinEnd: "2024-12-15T18:00:00Z",
    active: true,
    sold: 67,
    available: 33,
  },
  {
    id: "3",
    eventId: "1",
    name: "Ingresso Estudante",
    type: "Ingresso",
    visibility: "public",
    quantity: 100,
    price: 75.0,
    purchaseLimit: 1,
    description: "Ingresso promocional para estudantes com comprovação.",
    features: ["Acesso ao evento", "Certificado digital", "Coffee break"],
    salesStart: "2024-01-10T03:00:00Z",
    salesEnd: "2024-12-15T02:59:00Z",
    checkinStart: "2024-12-15T08:00:00Z",
    checkinEnd: "2024-12-15T18:00:00Z",
    active: true,
    sold: 75,
    available: 25,
  },
]

export const mockActivities: Activity[] = [
  {
    id: "1",
    eventId: "1",
    title: "Credenciamento",
    type: "registration",
    speaker: "",
    location: "Hall Principal",
    startTime: "08:00",
    endTime: "09:00",
    duration: "60min",
    description: "Recepção dos participantes e entrega de materiais",
    day: "Dia 1",
    date: "2024-12-15",
  },
  {
    id: "2",
    eventId: "1",
    title: "Abertura do Evento",
    type: "keynote",
    speaker: "Dr. João Silva",
    location: "Auditório Principal",
    startTime: "09:00",
    endTime: "09:30",
    duration: "30min",
    description: "Palestra de abertura sobre as tendências do mercado tech brasileiro",
    day: "Dia 1",
    date: "2024-12-15",
  },
  {
    id: "3",
    eventId: "1",
    title: "Inteligência Artificial no Brasil",
    type: "talk",
    speaker: "Dra. Maria Santos",
    location: "Auditório Principal",
    startTime: "09:30",
    endTime: "10:30",
    duration: "60min",
    description: "Como a IA está transformando o cenário tecnológico brasileiro",
    day: "Dia 1",
    date: "2024-12-15",
  },
  {
    id: "4",
    eventId: "1",
    title: "Coffee Break",
    type: "break",
    speaker: "",
    location: "Área de Convivência",
    startTime: "10:30",
    endTime: "11:00",
    duration: "30min",
    description: "Pausa para networking e coffee break",
    day: "Dia 1",
    date: "2024-12-15",
  },
  {
    id: "5",
    eventId: "1",
    title: "Workshop: Desenvolvimento Mobile",
    type: "workshop",
    speaker: "Carlos Oliveira",
    location: "Sala 1",
    startTime: "11:00",
    endTime: "12:30",
    duration: "90min",
    description: "Workshop prático sobre desenvolvimento de aplicativos móveis",
    day: "Dia 1",
    date: "2024-12-15",
  },
]

export const mockSponsorTiers: SponsorTier[] = [
  {
    id: "1",
    eventId: "1",
    name: "Diamante",
    value: 50000,
    color: "#3B82F6",
    benefits: ["Logo no site", "Stand premium", "Palestra exclusiva", "Branding no evento"],
  },
  {
    id: "2",
    eventId: "1",
    name: "Ouro",
    value: 30000,
    color: "#F59E0B",
    benefits: ["Logo no site", "Stand médio", "Material promocional"],
  },
  {
    id: "3",
    eventId: "1",
    name: "Prata",
    value: 15000,
    color: "#6B7280",
    benefits: ["Logo no site", "Stand básico"],
  },
]

export const mockSponsors: Sponsor[] = [
  {
    id: "1",
    eventId: "1",
    company: "Microsoft Brasil",
    tierId: "1",
    contact: "Ana Silva",
    email: "ana.silva@microsoft.com",
    phone: "(11) 3000-1000",
    website: "https://microsoft.com.br",
    logo: "/microsoft-logo.png",
    value: 50000,
    benefits: ["Logo no site", "Stand premium", "Palestra exclusiva", "Branding no evento"],
    tier: "platinum",
  },
  {
    id: "2",
    eventId: "1",
    company: "Google Brasil",
    tierId: "1",
    contact: "Carlos Santos",
    email: "carlos@google.com",
    phone: "(11) 3000-2000",
    website: "https://google.com.br",
    logo: "/google-logo.png",
    value: 50000,
    benefits: ["Logo no site", "Stand premium", "Palestra exclusiva", "Branding no evento"],
    tier: "platinum",
  },
  {
    id: "3",
    eventId: "1",
    company: "Amazon Web Services",
    tierId: "2",
    contact: "Maria Oliveira",
    email: "maria@aws.amazon.com",
    phone: "(11) 3000-3000",
    website: "https://aws.amazon.com",
    logo: "/amazon-logo.png",
    value: 30000,
    benefits: ["Logo no site", "Stand médio", "Material promocional"],
    tier: "gold",
  },
]

export const mockCoupons: Coupon[] = [
  {
    id: "1",
    eventId: "1",
    code: "EARLY20",
    discountType: "percentage",
    discountValue: 20,
    usageLimit: 100,
    usedCount: 23,
    expiresAt: "2024-12-01T23:59:59Z",
    minPurchase: 100,
    active: true,
    description: "Desconto para inscrições antecipadas",
  },
  {
    id: "2",
    eventId: "1",
    code: "VIP50",
    discountType: "fixed",
    discountValue: 50,
    usageLimit: 50,
    usedCount: 8,
    expiresAt: "2024-12-15T23:59:59Z",
    minPurchase: 200,
    active: true,
    description: "Desconto fixo para ingressos VIP",
  },
  {
    id: "3",
    eventId: "1",
    code: "STUDENT",
    discountType: "percentage",
    discountValue: 15,
    usageLimit: 200,
    usedCount: 45,
    expiresAt: "2024-12-15T23:59:59Z",
    minPurchase: 50,
    active: true,
    description: "Desconto especial para estudantes",
  },
]

export const mockOrders: Order[] = [
  {
    id: "VENDA-001",
    eventId: "1",
    buyerName: "João Silva Santos",
    buyerEmail: "joao.silva@email.com",
    buyerPhone: "(11) 99999-9999",
    buyerDocument: "123.456.789-00",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    subtotal: 299.0,
    discount: 0,
    total: 299.0,
    createdAt: "2024-11-15T14:30:00Z",
    updatedAt: "2024-11-15T14:35:00Z",
    items: [
      {
        id: "item-1",
        ticketId: "2",
        ticketName: "Ingresso VIP",
        quantity: 1,
        unitPrice: 299.0,
        totalPrice: 299.0,
      },
    ],
    participants: ["1"],
  },
  {
    id: "VENDA-002",
    eventId: "1",
    buyerName: "Maria Oliveira Costa",
    buyerEmail: "maria@empresa.com",
    buyerPhone: "(11) 88888-8888",
    buyerDocument: "987.654.321-00",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "pix",
    subtotal: 298.0,
    discount: 29.8,
    total: 268.2,
    couponCode: "EARLY20",
    createdAt: "2024-11-16T10:15:00Z",
    updatedAt: "2024-11-16T10:20:00Z",
    items: [
      {
        id: "item-2",
        ticketId: "1",
        ticketName: "Ingresso Regular",
        quantity: 2,
        unitPrice: 149.0,
        totalPrice: 298.0,
      },
    ],
    participants: ["2", "3"],
  },
  {
    id: "VENDA-003",
    eventId: "1",
    buyerName: "Carlos Santos Lima",
    buyerEmail: "carlos@startup.com",
    buyerPhone: "(11) 77777-7777",
    buyerDocument: "456.789.123-00",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "bank_transfer",
    subtotal: 75.0,
    discount: 0,
    total: 75.0,
    createdAt: "2024-11-17T16:45:00Z",
    updatedAt: "2024-11-17T16:45:00Z",
    items: [
      {
        id: "item-3",
        ticketId: "3",
        ticketName: "Ingresso Estudante",
        quantity: 1,
        unitPrice: 75.0,
        totalPrice: 75.0,
      },
    ],
    participants: ["4"],
  },
]

export const mockParticipants: Participant[] = [
  {
    id: "1",
    eventId: "1",
    orderId: "VENDA-001",
    ticketId: "2",
    name: "João Silva Santos",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    document: "123.456.789-00",
    company: "TechCorp Solutions",
    position: "Desenvolvedor Senior",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    ticketType: "Ingresso VIP",
    ticketCode: "VIP2024-001",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+",
    status: "confirmed",
    checkedIn: true,
    checkInDate: "2024-11-20T09:15:00Z",
    registrationDate: "2024-11-15T14:30:00Z",
    avatar: "/professional-man.png",
  },
  {
    id: "2",
    eventId: "1",
    orderId: "VENDA-002",
    ticketId: "1",
    name: "Maria Oliveira Costa",
    email: "maria@empresa.com",
    phone: "(11) 88888-8888",
    document: "987.654.321-00",
    company: "Empresa ABC",
    position: "Gerente de TI",
    address: "Av. Paulista, 1000",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100",
    ticketType: "Ingresso Regular",
    ticketCode: "REG2024-002",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+",
    status: "confirmed",
    checkedIn: false,
    registrationDate: "2024-11-16T10:15:00Z",
    avatar: "/business-woman.png",
  },
  {
    id: "3",
    eventId: "1",
    orderId: "VENDA-002",
    ticketId: "1",
    name: "Ana Paula Silva",
    email: "ana.paula@empresa.com",
    phone: "(11) 88888-8889",
    document: "111.222.333-44",
    company: "Empresa ABC",
    position: "Desenvolvedora",
    address: "Av. Paulista, 1000",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100",
    ticketType: "Ingresso Regular",
    ticketCode: "REG2024-003",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+",
    status: "confirmed",
    checkedIn: false,
    registrationDate: "2024-11-16T10:15:00Z",
    avatar: "/professional-woman.png",
  },
  {
    id: "4",
    eventId: "1",
    orderId: "VENDA-003",
    ticketId: "3",
    name: "Carlos Santos Lima",
    email: "carlos@startup.com",
    phone: "(11) 77777-7777",
    document: "456.789.123-00",
    company: "StartupXYZ",
    position: "Estagiário",
    address: "Rua da Inovação, 456",
    city: "São Paulo",
    state: "SP",
    zipCode: "04567-890",
    ticketType: "Ingresso Estudante",
    ticketCode: "EST2024-004",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+",
    status: "pending",
    checkedIn: false,
    registrationDate: "2024-11-17T16:45:00Z",
    avatar: "/man-tech.png",
  },
]

export const mockFormFields: FormField[] = [
  {
    id: "1",
    eventId: "1",
    name: "nome",
    label: "Nome Completo",
    type: "text",
    required: true,
    placeholder: "Digite seu nome completo",
    linkedTickets: ["1", "2", "3"], // Vinculado a todos os ingressos
    order: 1,
  },
  {
    id: "2",
    eventId: "1",
    name: "sobrenome",
    label: "Sobrenome",
    type: "text",
    required: true,
    placeholder: "Digite seu sobrenome",
    linkedTickets: ["1", "2", "3"], // Vinculado a todos os ingressos
    order: 2,
  },
  {
    id: "3",
    eventId: "1",
    name: "cpf",
    label: "CPF",
    type: "text",
    required: true,
    placeholder: "000.000.000-00",
    linkedTickets: ["1", "2", "3"], // Vinculado a todos os ingressos
    order: 3,
  },
  {
    id: "4",
    eventId: "1",
    name: "telefone",
    label: "Telefone",
    type: "phone",
    required: true,
    placeholder: "(11) 99999-9999",
    linkedTickets: ["1", "2", "3"], // Vinculado a todos os ingressos
    order: 4,
  },
  {
    id: "5",
    eventId: "1",
    name: "email",
    label: "E-mail",
    type: "email",
    required: true,
    placeholder: "seu@email.com",
    linkedTickets: ["1", "2", "3"], // Vinculado a todos os ingressos
    order: 5,
  },
  {
    id: "6",
    eventId: "1",
    name: "empresa",
    label: "Empresa",
    type: "text",
    required: false,
    placeholder: "Nome da sua empresa",
    linkedTickets: ["2"], // Apenas para VIP
    order: 6,
  },
  {
    id: "7",
    eventId: "1",
    name: "cargo",
    label: "Cargo",
    type: "text",
    required: false,
    placeholder: "Seu cargo na empresa",
    linkedTickets: ["2"], // Apenas para VIP
    order: 7,
  },
]

export const mockCheckoutConfig: CheckoutConfig = {
  eventId: "1",
  sections: [
    { id: "event-info", name: "Informações do Evento", visible: true, order: 1 },
    { id: "highlights", name: "Destaques", visible: true, order: 2 },
    { id: "schedule", name: "Programação", visible: true, order: 3 },
    { id: "sponsors", name: "Patrocinadores", visible: true, order: 4 },
  ],
}

// Analytics and metrics data
export const mockAnalytics = {
  totalRevenue: 57630.0,
  totalParticipants: 387,
  totalOrders: 245,
  conversionRate: 78.5,
  averageTicketValue: 148.9,
  dailySales: [
    { date: "2024-11-15", sales: 12, revenue: 3580.0 },
    { date: "2024-11-16", sales: 8, revenue: 2384.0 },
    { date: "2024-11-17", sales: 15, revenue: 4470.0 },
    { date: "2024-11-18", sales: 22, revenue: 6556.0 },
    { date: "2024-11-19", sales: 18, revenue: 5364.0 },
    { date: "2024-11-20", sales: 25, revenue: 7450.0 },
  ],
  ticketSales: [
    { ticketType: "Regular", sold: 245, revenue: 36505.0 },
    { ticketType: "VIP", sold: 67, revenue: 20033.0 },
    { ticketType: "Estudante", sold: 75, revenue: 5625.0 },
  ],
}

// Helper functions to get data by ID
export const getEventById = (id: string) => (id === "1" ? mockEvent : null)
export const getTicketsByEventId = (eventId: string) => mockTickets.filter((t) => t.eventId === eventId)
export const getActivitiesByEventId = (eventId: string) => mockActivities.filter((a) => a.eventId === eventId)
export const getSponsorsByEventId = (eventId: string) => mockSponsors.filter((s) => s.eventId === eventId)
export const getSponsorTiersByEventId = (eventId: string) => mockSponsorTiers.filter((t) => t.eventId === eventId)
export const getCouponsByEventId = (eventId: string) => mockCoupons.filter((c) => c.eventId === eventId)
export const getOrdersByEventId = (eventId: string) => mockOrders.filter((o) => o.eventId === eventId)
export const getParticipantsByEventId = (eventId: string) => mockParticipants.filter((p) => p.eventId === eventId)
export const getFormFieldsByEventId = (eventId: string) => mockFormFields.filter((f) => f.eventId === eventId)
export const getCheckoutConfigByEventId = (eventId: string) => (eventId === "1" ? mockCheckoutConfig : null)

// Export all mock data as a single object for easy import
export const mockData = {
  event: mockEvent,
  tickets: mockTickets,
  activities: mockActivities,
  sponsors: mockSponsors,
  sponsorTiers: mockSponsorTiers,
  coupons: mockCoupons,
  orders: mockOrders,
  participants: mockParticipants,
  formFields: mockFormFields,
  checkoutConfig: mockCheckoutConfig,
  analytics: mockAnalytics,
}
