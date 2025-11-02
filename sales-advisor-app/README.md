# Ethos Sales Advisor App

A mobile-first React application designed to maximize sales conversion in luxury retail stores. Built for Ethos watch boutiques, this app empowers sales advisors with real-time customer insights, inventory management, and communication tools.

## Features

### 🎯 Maximum Sales Conversion Features

1. **Dashboard with Performance Metrics**
   - Real-time target vs achievement tracking
   - MTD sales, transactions, and conversion rates
   - Commission estimator
   - NPS and Mystery Audit scores
   - ECAL conversion tracking

2. **Customer 360 View**
   - Complete customer profile with purchase history
   - LTV (Lifetime Value) and loyalty tier
   - Key dates (birthdays, anniversaries)
   - Communication preferences and consent management
   - Product preferences and price ranges

3. **Product Catalog & Inventory**
   - Real-time product search
   - Stock availability across all stores
   - Product specifications and images
   - Stock velocity indicators (fast/medium/slow)
   - Reserve and quote generation options

4. **Daily Task Management**
   - Automated to-do list generation
   - Birthday and anniversary reminders
   - Quote follow-up reminders
   - Reservation expiry alerts
   - Priority-based task sorting

5. **Communication Templates**
   - Pre-approved message templates
   - Multi-channel support (Email, SMS, WhatsApp)
   - Variable substitution for personalization
   - Compliance enforcement (consent, DND, quiet hours)
   - Template categories: Occasion, Follow-up, Education

## Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Date Utilities:** date-fns

## Project Structure

```
sales-advisor-app/
├── src/
│   ├── components/         # Reusable UI components
│   │   └── Layout.tsx      # Main layout with navigation
│   ├── pages/              # Page components
│   │   ├── Login.tsx       # Authentication page
│   │   ├── Dashboard.tsx   # Performance dashboard
│   │   ├── Customers.tsx   # Customer search and 360 view
│   │   ├── Products.tsx    # Product catalog and details
│   │   ├── Tasks.tsx       # Daily to-do list
│   │   └── Communication.tsx # Message templates
│   ├── store/              # State management
│   │   └── useStore.ts     # Zustand store
│   ├── data/               # Mock data
│   │   └── mockData.ts     # Sample data for demo
│   ├── types/              # TypeScript types
│   │   └── index.ts        # Type definitions
│   ├── utils/              # Utility functions
│   │   └── format.ts       # Formatting helpers
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Modern web browser

### Installation

1. Navigate to the project directory:
   ```bash
   cd sales-advisor-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Demo Credentials

- **PIN:** `123456`

## Usage Guide

### Login
1. Enter the 6-digit PIN: `123456`
2. Click "Unlock" to access the app

### Dashboard
- View your monthly target progress
- Track MTD sales, transactions, and conversion rate
- Monitor NPS and Mystery Audit scores
- Check pending tasks

### Customers
1. Search for customers by name, phone, or email
2. Click on a customer card to view their 360 profile
3. Review purchase history, preferences, and key dates
4. Check communication consent and DND status

### Products
1. Search for products by brand, model, or SKU
2. Click on a product to view details
3. Check stock availability across stores
4. Use Reserve, Quote, or Share buttons (demo placeholders)

### Tasks
1. View all pending tasks sorted by priority
2. Complete tasks by clicking the circle icon
3. View suggested actions for each task

### Communication
1. Browse message templates by category
2. Click on a template to view details
3. Fill in variables for personalization
4. Preview the message before sending (demo mode)

## Key Design Decisions

### Sales Conversion Focus
- **Fast Access:** Customer and product search optimized for speed
- **Visual Hierarchy:** Critical information (LTV, stock status) prominently displayed
- **Action-Oriented:** CTA buttons (Reserve, Quote, Send) clearly visible
- **Context at a Glance:** Badges, colors, and icons for quick recognition

### Mobile-First Approach
- Bottom navigation for thumb-friendly access
- Card-based UI for easy scrolling
- Large touch targets (minimum 44x44px)
- Responsive design works on tablets too

### Luxury Brand Experience
- Premium color palette (burgundy/gold)
- Playfair Display font for headings
- High-quality product images
- Clean, uncluttered interface

### Compliance Built-In
- Consent flags visible in customer profiles
- DND status warnings
- Template approval workflow
- Audit trail considerations

## Mock Data

The app includes realistic mock data:
- **4 Customers** with varying loyalty tiers (Platinum, Gold, Silver)
- **6 Products** from luxury watch brands (Rolex, Omega, TAG Heuer, etc.)
- **7 Message Templates** across different categories
- **4 Pending Tasks** with various priorities
- **1 Active Quote** and **1 Active Reservation**

## Future Enhancements

### Phase 2 (Production)
- [ ] Backend API integration
- [ ] Real authentication (SSO with HRMS)
- [ ] Actual payment link generation
- [ ] WhatsApp Business API integration
- [ ] Barcode scanning for products
- [ ] Offline mode with local storage
- [ ] Push notifications
- [ ] Photo upload for customer profiles

### Phase 3 (Advanced)
- [ ] AI-powered product recommendations
- [ ] Predictive analytics for customer behavior
- [ ] Advanced reporting and exports
- [ ] Manager dashboard with team overview
- [ ] Appointment scheduling with calendar sync

## Performance Optimization

- Lazy loading for images
- Code splitting by route
- Memoization for expensive calculations
- Virtual scrolling for large lists (future)
- Service worker for offline support (future)

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint with React hooks plugin
- Functional components with hooks
- Tailwind CSS utility classes

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Write descriptive component and function names
4. Add comments for complex logic
5. Test on mobile viewport sizes

## License

Proprietary - Ethos Watch Boutiques

## Support

For issues or questions, contact the development team.

---

Built with ❤️ for Ethos Sales Advisors
