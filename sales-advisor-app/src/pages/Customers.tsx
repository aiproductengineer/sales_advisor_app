import React, { useState } from 'react';
import { Search, Phone, Mail, Calendar, Award, ShoppingBag, MessageSquare, X, Sparkles, Crown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency, formatDate, getLoyaltyTierColor, formatPhone } from '../utils/format';
import { Customer } from '../types';

export const Customers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const customers = useStore((state) => state.customers);
  const searchCustomers = useStore((state) => state.searchCustomers);
  const selectedCustomer = useStore((state) => state.selectedCustomer);
  const selectCustomer = useStore((state) => state.selectCustomer);
  const clearSelectedCustomer = useStore((state) => state.clearSelectedCustomer);

  const filteredCustomers = searchQuery ? searchCustomers(searchQuery) : customers;

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full">
      {/* Search Bar */}
      <div className="p-3 sm:p-4">
        <div className="glass-card p-3 sm:p-4">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 sm:pl-12 text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {/* Customer List or Detail View */}
      {selectedCustomer ? (
        <CustomerDetail customer={selectedCustomer} onClose={clearSelectedCustomer} />
      ) : (
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 pb-4 space-y-2 sm:space-y-3">
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No customers found</p>
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onClick={() => selectCustomer(customer.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="glass-card-hover p-3 sm:p-4 cursor-pointer relative overflow-hidden border-l-2 border-l-luxury-gold"
    >
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-luxury-gold/5 rounded-full blur-2xl" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <div className="min-w-0 flex-1 pr-2">
            <h3 className="font-semibold text-base sm:text-lg text-white truncate">{customer.name}</h3>
            <p className="text-xs sm:text-sm text-gray-400">{formatPhone(customer.phone)}</p>
          </div>
          <span className={`badge text-[10px] sm:text-xs flex-shrink-0 ${getLoyaltyTierColor(customer.loyaltyTier)} flex items-center gap-1`}>
            {customer.loyaltyTier === 'Platinum' && <Crown className="w-3 h-3" />}
            {customer.loyaltyTier}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-gray-500">LTV</p>
            <p className="font-semibold text-luxury-gold">{formatCurrency(customer.ltv)}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Last Purchase</p>
            <p className="font-semibold text-gray-300">{formatDate(customer.lastPurchase.date)}</p>
          </div>
        </div>

        {customer.keyDates.birthday && (
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4 text-luxury-gold" />
            Birthday: {formatDate(customer.keyDates.birthday, 'dd MMM')}
          </div>
        )}
      </div>
    </div>
  );
};

interface CustomerDetailProps {
  customer: Customer;
  onClose: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer, onClose }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="relative overflow-hidden p-6 m-4 glass-card">
        <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/10 rounded-full blur-3xl" />
        <button
          onClick={onClose}
          className="mb-4 p-2 glass-card hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-display font-bold text-white">{customer.name}</h1>
                {customer.loyaltyTier === 'Platinum' && <Crown className="w-5 h-5 text-luxury-gold" />}
              </div>
              <div className="space-y-1 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{formatPhone(customer.phone)}</span>
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{customer.email}</span>
                  </div>
                )}
              </div>
            </div>
            <span className={`badge ${getLoyaltyTierColor(customer.loyaltyTier)} text-base`}>
              {customer.loyaltyTier}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* LTV Card */}
        <div className="card-premium p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-luxury-gold" />
                Lifetime Value
              </p>
              <p className="text-3xl font-bold text-gradient-gold">{formatCurrency(customer.ltv)}</p>
            </div>
            <Award className="w-12 h-12 text-luxury-gold/50" />
          </div>
        </div>

        {/* Key Dates */}
        {(customer.keyDates.birthday || customer.keyDates.anniversary) && (
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5 text-luxury-gold" />
              Important Dates
            </h3>
            <div className="space-y-2">
              {customer.keyDates.birthday && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Birthday</span>
                  <span className="font-medium text-gray-300">{formatDate(customer.keyDates.birthday, 'dd MMMM')}</span>
                </div>
              )}
              {customer.keyDates.anniversary && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Anniversary</span>
                  <span className="font-medium text-gray-300">{formatDate(customer.keyDates.anniversary, 'dd MMMM')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Consent & Communication */}
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-white">
            <MessageSquare className="w-5 h-5 text-luxury-gold" />
            Communication Preferences
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Email</span>
              <span className={`badge ${customer.consent.email ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'}`}>
                {customer.consent.email ? 'Allowed' : 'Not Allowed'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">SMS</span>
              <span className={`badge ${customer.consent.sms ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'}`}>
                {customer.consent.sms ? 'Allowed' : 'Not Allowed'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">WhatsApp</span>
              <span className={`badge ${customer.consent.whatsapp ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'}`}>
                {customer.consent.whatsapp ? 'Allowed' : 'Not Allowed'}
              </span>
            </div>
            {customer.dndStatus && (
              <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300">
                ⚠️ Customer is on DND list
              </div>
            )}
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-3 text-white">Preferences</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-400 mb-2">Favorite Brands</p>
              <div className="flex flex-wrap gap-2">
                {customer.preferences.brands.map((brand) => (
                  <span key={brand} className="badge bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Categories</p>
              <div className="flex flex-wrap gap-2">
                {customer.preferences.categories.map((category) => (
                  <span key={category} className="badge bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Price Range</p>
              <p className="font-medium text-gray-300">
                {formatCurrency(customer.preferences.priceRange.min)} - {formatCurrency(customer.preferences.priceRange.max)}
              </p>
            </div>
          </div>
        </div>

        {/* Purchase History */}
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-white">
            <ShoppingBag className="w-5 h-5 text-luxury-gold" />
            Purchase History
          </h3>
          <div className="space-y-3">
            {customer.purchaseHistory.map((purchase, index) => (
              <div key={index} className="pb-3 border-b border-white/10 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-gray-300">{purchase.productName}</p>
                  <p className="font-semibold text-luxury-gold">{formatCurrency(purchase.amount)}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{formatDate(purchase.date)}</span>
                  <span className="text-xs">SKU: {purchase.sku}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
