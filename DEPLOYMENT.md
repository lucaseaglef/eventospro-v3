# Deployment Guide - Event Ticketing Platform

## Environment Variables Setup

### Required Variables

1. **API Configuration**
   \`\`\`bash
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   \`\`\`
   - This is the base URL for your backend API
   - Must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser
   - Used by all API hooks for data fetching

2. **Database Connection** (if using direct database)
   \`\`\`bash
   DATABASE_URL=postgresql://username:password@host:port/database
   \`\`\`

### Optional Variables

3. **Authentication** (if implementing user auth)
   \`\`\`bash
   NEXTAUTH_SECRET=your-super-secret-key
   NEXTAUTH_URL=https://your-domain.com
   \`\`\`

4. **Payment Processing** (if implementing payments)
   \`\`\`bash
   STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
   STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   \`\`\`

5. **Email Notifications**
   \`\`\`bash
   SMTP_HOST=smtp.your-provider.com
   SMTP_PORT=587
   SMTP_USER=your-email@domain.com
   SMTP_PASS=your-password
   \`\`\`

## Deployment Steps

### 1. Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add each variable for Production, Preview, and Development environments
4. Deploy

### 2. Manual Deployment

1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

2. Set environment variables on your server
3. Start the application:
   \`\`\`bash
   npm start
   \`\`\`

## Backend API Requirements

Your backend API should implement the following endpoints:

### Events
- `GET /api/events` - List events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Participants
- `GET /api/events/:eventId/participants` - List participants
- `GET /api/participants/:id` - Get participant details
- `POST /api/participants` - Register participant
- `PUT /api/participants/:id/checkin` - Check-in participant

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order

### Metrics
- `GET /api/metrics` - Get dashboard metrics
- `GET /api/metrics/events/:eventId` - Get event-specific metrics
- `GET /api/charts/:type` - Get chart data

## API Response Format

All API endpoints should return data in this format:

\`\`\`json
{
  "success": true,
  "data": [...],
  "message": "Success message",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
\`\`\`

For errors:
\`\`\`json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
\`\`\`

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure CORS for your domain
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Test all API endpoints
- [ ] Verify environment variables
- [ ] Test payment integration (if applicable)
- [ ] Set up email notifications
