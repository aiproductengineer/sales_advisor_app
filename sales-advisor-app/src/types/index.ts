export type LoyaltyTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
export type Channel = 'email' | 'sms' | 'whatsapp';
export type MessageStatus = 'queued' | 'sent' | 'delivered' | 'read' | 'failed';
export type ReservationStatus = 'active' | 'completed' | 'expired' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'expired';
export type TemplateCategory = 'occasion' | 'followup' | 'education' | 'promotional';
export type TodoStatus = 'pending' | 'completed';
export type Velocity = 'fast' | 'medium' | 'slow';

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  ltv: number;
  loyaltyTier: LoyaltyTier;
  preferences: {
    brands: string[];
    categories: string[];
    priceRange: { min: number; max: number };
  };
  keyDates: {
    birthday?: string;
    anniversary?: string;
  };
  consent: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    updatedAt: string;
  };
  dndStatus: boolean;
  lastPurchase: {
    date: string;
    amount: number;
    products: string[];
  };
  purchaseHistory: Purchase[];
  assignedAdvisorId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Purchase {
  date: string;
  sku: string;
  productName: string;
  amount: number;
  advisorId: string;
}

export interface Product {
  sku: string;
  name: string;
  brand: string;
  category: string;
  model: string;
  description: string;
  price: number;
  images: string[];
  specifications: {
    caseMaterial?: string;
    movement?: string;
    waterResistance?: string;
    diameter?: string;
  };
  stock: StockLocation[];
  velocity: Velocity;
}

export interface StockLocation {
  storeId: string;
  storeName: string;
  quantity: number;
  reserved: number;
  distance?: number;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  channel: Channel;
  subject?: string;
  body: string;
  variables: string[];
}

export interface Message {
  id: string;
  advisorId: string;
  customerId: string;
  templateId: string;
  channel: Channel;
  subject?: string;
  body: string;
  status: MessageStatus;
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
}

export interface Quote {
  id: string;
  advisorId: string;
  customerId: string;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentLink?: string;
  paymentStatus: PaymentStatus;
  expiresAt: string;
  createdAt: string;
}

export interface QuoteItem {
  sku: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Reservation {
  id: string;
  advisorId: string;
  customerId: string;
  sku: string;
  productName: string;
  quantity: number;
  quoteId?: string;
  expiresAt: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface Advisor {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  storeId: string;
  storeName: string;
  targets: {
    monthly: number;
    quarterly: number;
  };
  performance: {
    mtdSales: number;
    mtdTransactions: number;
    conversionRate: number;
    npsScore: number;
    mysteryAuditScore: number;
  };
  active: boolean;
}

export interface TodoItem {
  id: string;
  type: 'birthday' | 'anniversary' | 'follow-up' | 'reservation-expiring';
  customerId: string;
  customerName: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: TodoStatus;
  suggestedAction?: string;
}

export interface PerformanceMetrics {
  targetVsAchieved: {
    target: number;
    achieved: number;
    variance: number;
    percentComplete: number;
  };
  breakdown: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  comparison: {
    lastMonth: number;
    lastYear: number;
  };
  commissionEstimate: number;
  ecalConversion: number;
}
