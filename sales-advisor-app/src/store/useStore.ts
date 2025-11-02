import { create } from 'zustand';
import { Customer, Product, TodoItem, Quote, Reservation, Advisor, PerformanceMetrics } from '../types';
import { mockCustomers, mockProducts, mockTodos, mockQuotes, mockReservations, currentAdvisor } from '../data/mockData';

interface AppState {
  // Auth
  isAuthenticated: boolean;
  currentAdvisor: Advisor | null;
  login: (pin: string) => boolean;
  logout: () => void;

  // Customers
  customers: Customer[];
  selectedCustomer: Customer | null;
  searchCustomers: (query: string) => Customer[];
  selectCustomer: (id: string) => void;
  clearSelectedCustomer: () => void;

  // Products
  products: Product[];
  selectedProduct: Product | null;
  searchProducts: (query: string) => Product[];
  selectProduct: (sku: string) => void;
  clearSelectedProduct: () => void;

  // Todos
  todos: TodoItem[];
  completeTodo: (id: string) => void;
  getPendingTodos: () => TodoItem[];

  // Quotes
  quotes: Quote[];
  createQuote: (quote: Quote) => void;

  // Reservations
  reservations: Reservation[];
  createReservation: (reservation: Reservation) => void;
  cancelReservation: (id: string) => void;

  // Performance
  getPerformanceMetrics: () => PerformanceMetrics;
}

export const useStore = create<AppState>((set, get) => ({
  // Auth
  isAuthenticated: false,
  currentAdvisor: null,
  login: (pin: string) => {
    // Simple mock authentication - in production this would call an API
    if (pin === '123456') {
      set({ isAuthenticated: true, currentAdvisor });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ isAuthenticated: false, currentAdvisor: null, selectedCustomer: null, selectedProduct: null });
  },

  // Customers
  customers: mockCustomers,
  selectedCustomer: null,
  searchCustomers: (query: string) => {
    const customers = get().customers;
    if (!query.trim()) return customers;

    const lowerQuery = query.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.phone.includes(query) ||
        c.email?.toLowerCase().includes(lowerQuery)
    );
  },
  selectCustomer: (id: string) => {
    const customer = get().customers.find((c) => c.id === id);
    set({ selectedCustomer: customer || null });
  },
  clearSelectedCustomer: () => {
    set({ selectedCustomer: null });
  },

  // Products
  products: mockProducts,
  selectedProduct: null,
  searchProducts: (query: string) => {
    const products = get().products;
    if (!query.trim()) return products;

    const lowerQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.model.toLowerCase().includes(lowerQuery) ||
        p.sku.toLowerCase().includes(lowerQuery)
    );
  },
  selectProduct: (sku: string) => {
    const product = get().products.find((p) => p.sku === sku);
    set({ selectedProduct: product || null });
  },
  clearSelectedProduct: () => {
    set({ selectedProduct: null });
  },

  // Todos
  todos: mockTodos,
  completeTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, status: 'completed' as const } : todo
      ),
    }));
  },
  getPendingTodos: () => {
    return get().todos.filter((todo) => todo.status === 'pending');
  },

  // Quotes
  quotes: mockQuotes,
  createQuote: (quote: Quote) => {
    set((state) => ({
      quotes: [...state.quotes, quote],
    }));
  },

  // Reservations
  reservations: mockReservations,
  createReservation: (reservation: Reservation) => {
    set((state) => ({
      reservations: [...state.reservations, reservation],
    }));
  },
  cancelReservation: (id: string) => {
    set((state) => ({
      reservations: state.reservations.map((res) =>
        res.id === id ? { ...res, status: 'cancelled' as const } : res
      ),
    }));
  },

  // Performance
  getPerformanceMetrics: () => {
    const advisor = get().currentAdvisor;
    if (!advisor) {
      return {
        targetVsAchieved: {
          target: 0,
          achieved: 0,
          variance: 0,
          percentComplete: 0,
        },
        breakdown: { daily: 0, weekly: 0, monthly: 0 },
        comparison: { lastMonth: 0, lastYear: 0 },
        commissionEstimate: 0,
        ecalConversion: 0,
      };
    }

    const target = advisor.targets.monthly;
    const achieved = advisor.performance.mtdSales;
    const variance = achieved - target;
    const percentComplete = (achieved / target) * 100;

    return {
      targetVsAchieved: {
        target,
        achieved,
        variance,
        percentComplete: Math.min(percentComplete, 100),
      },
      breakdown: {
        daily: achieved / new Date().getDate(),
        weekly: achieved / Math.ceil(new Date().getDate() / 7),
        monthly: achieved,
      },
      comparison: {
        lastMonth: 2850000,
        lastYear: 2450000,
      },
      commissionEstimate: achieved * 0.035, // 3.5% commission
      ecalConversion: 18.5,
    };
  },
}));
