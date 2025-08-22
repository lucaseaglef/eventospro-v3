# Event Ticketing Platform

*Production-ready event management system built with Next.js, TypeScript, and modern web technologies*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/lucaseaglefs-projects/v0-event-ticketing-platform)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/TQez0Pps38A)

## 🚀 Overview

A comprehensive event management platform that handles everything from event creation to participant check-in. This system has been completely refactored from mock data to a production-ready architecture with proper API integration, error handling, and user experience patterns.

## ✨ Features

### Core Functionality
- **Event Management**: Create, edit, and manage events with detailed information
- **Ticket Sales**: Multiple ticket types with pricing, availability, and sales tracking
- **Participant Management**: Complete participant lifecycle from registration to check-in
- **Real-time Check-in**: QR code scanning and manual participant check-in system
- **Analytics Dashboard**: Comprehensive metrics, charts, and real-time activity monitoring
- **Order Management**: Complete order processing and payment tracking

### Technical Features
- **Production-Ready Architecture**: Clean separation of concerns with proper error handling
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live activity feeds and automatic data refreshing
- **API Integration**: Ready for backend API integration with proper loading states
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **State Management**: React Hooks with custom API hooks
- **Icons**: Lucide React

## 📁 Project Structure

\`\`\`
├── app/                          # Next.js App Router pages
│   ├── checkout/                 # Checkout flow pages
│   ├── credentials/              # Check-in system pages
│   ├── events/                   # Event management pages
│   └── page.tsx                  # Dashboard homepage
├── components/                   # React components
│   ├── ui/                       # Base UI components (shadcn/ui)
│   ├── check-in-*.tsx           # Check-in system components
│   ├── events-*.tsx             # Event-related components
│   ├── metrics-*.tsx            # Analytics and metrics components
│   └── manage/                   # Event management components
├── lib/                          # Utility libraries
│   ├── types.ts                  # TypeScript type definitions
│   ├── api-hooks.ts             # Custom hooks for API calls
│   ├── api-client.ts            # Centralized API client
│   ├── api-config.ts            # API configuration
│   ├── mock-data.ts             # Mock data (development only)
│   └── utils.ts                  # Utility functions
└── hooks/                        # Custom React hooks
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A backend API (see API Integration section)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd event-ticketing-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Configure the following variables:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes | `http://localhost:3001/api` |

### API Integration

This application is designed to work with a REST API backend. The API client is configured in `lib/api-client.ts` and expects the following endpoints:

#### Events
- `GET /events` - List all events
- `GET /events/:id` - Get event details
- `POST /events` - Create new event
- `PUT /events/:id` - Update event

#### Participants
- `GET /events/:eventId/participants` - List participants
- `GET /participants/:id` - Get participant details
- `POST /participants/:id/checkin` - Check-in participant

#### Orders
- `GET /orders` - List all orders
- `GET /events/:eventId/orders` - List orders for event

#### Analytics
- `GET /metrics` - Get platform metrics
- `GET /events/:eventId/metrics` - Get event-specific metrics
- `GET /analytics/charts/:type` - Get chart data

For detailed API specifications, see the `lib/api-config.ts` file.

## 🎨 Design System

The application uses a consistent design system built on:

- **Colors**: Semantic color tokens with light/dark mode support
- **Typography**: Inter font family with consistent sizing scale
- **Spacing**: 4px base unit with consistent spacing scale
- **Components**: Reusable UI components with proper accessibility

### Key Design Principles

1. **Mobile-First**: All interfaces are designed for mobile and enhanced for desktop
2. **Accessibility**: WCAG AA compliant with proper focus management
3. **Loading States**: Every data operation has appropriate loading indicators
4. **Error Handling**: User-friendly error messages with retry options
5. **Empty States**: Helpful empty states guide users to take action

## 🔄 Development Workflow

### Code Organization

- **Components**: Single responsibility, well-typed React components
- **Hooks**: Custom hooks for data fetching and state management
- **Types**: Comprehensive TypeScript interfaces for all data structures
- **API Layer**: Centralized API client with error handling and retry logic

### Best Practices

1. **Always read files before editing** to understand current implementation
2. **Use TypeScript interfaces** for all data structures
3. **Implement proper error handling** with user-friendly messages
4. **Add loading states** for all async operations
5. **Include empty states** for better user experience
6. **Test on mobile devices** to ensure responsive design

## 🚀 Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

1. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start production server**
   \`\`\`bash
   npm start
   \`\`\`

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following the coding standards
4. **Test thoroughly** on different devices and browsers
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Open an issue on GitHub for bugs or feature requests
- **v0.app**: Continue development at [v0.app/chat/projects/TQez0Pps38A](https://v0.app/chat/projects/TQez0Pps38A)

## 🔗 Links

- **Live Demo**: [https://vercel.com/lucaseaglefs-projects/v0-event-ticketing-platform](https://vercel.com/lucaseaglefs-projects/v0-event-ticketing-platform)
- **v0.app Project**: [https://v0.app/chat/projects/TQez0Pps38A](https://v0.app/chat/projects/TQez0Pps38A)
- **Repository**: This GitHub repository

---

**Built with ❤️ using [v0.app](https://v0.app) - The AI-powered frontend development platform**
