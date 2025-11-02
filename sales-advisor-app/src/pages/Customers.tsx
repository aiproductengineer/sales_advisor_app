import React, { useState } from 'react';
import { Search, Phone, Mail, Calendar, Award, ShoppingBag, MessageSquare, X } from 'lucide-react';
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
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Customer List or Detail View */}
      {selectedCustomer ? (
        <CustomerDetail customer={selectedCustomer} onClose={clearSelectedCustomer} />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No customers found</p>
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
      className="card hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary-500"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{customer.name}</h3>
          <p className="text-sm text-gray-600">{formatPhone(customer.phone)}</p>
        </div>
        <span className={`badge ${getLoyaltyTierColor(customer.loyaltyTier)}`}>
          {customer.loyaltyTier}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="text-gray-600">LTV</p>
          <p className="font-semibold text-primary-700">{formatCurrency(customer.ltv)}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Last Purchase</p>
          <p className="font-semibold">{formatDate(customer.lastPurchase.date)}</p>
        </div>
      </div>

      {customer.keyDates.birthday && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          Birthday: {formatDate(customer.keyDates.birthday, 'dd MMM')}
        </div>
      )}
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
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white p-6">
        <button
          onClick={onClose}
          className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-display font-bold mb-2">{customer.name}</h1>
            <div className="space-y-1 text-primary-100">
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

      <div className="p-4 space-y-4">
        {/* LTV Card */}
        <div className="card bg-primary-50 border-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Lifetime Value</p>
              <p className="text-3xl font-bold text-primary-700">{formatCurrency(customer.ltv)}</p>
            </div>
            <Award className="w-12 h-12 text-primary-300" />
          </div>
        </div>

        {/* Key Dates */}
        {(customer.keyDates.birthday || customer.keyDates.anniversary) && (
          <div className="card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              Important Dates
            </h3>
            <div className="space-y-2">
              {customer.keyDates.birthday && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Birthday</span>
                  <span className="font-medium">{formatDate(customer.keyDates.birthday, 'dd MMMM')}</span>
                </div>
              )}
              {customer.keyDates.anniversary && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Anniversary</span>
                  <span className="font-medium">{formatDate(customer.keyDates.anniversary, 'dd MMMM')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Consent & Communication */}
        <div className="card">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary-600" />
            Communication Preferences
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Email</span>
              <span className={`badge ${customer.consent.email ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {customer.consent.email ? 'Allowed' : 'Not Allowed'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">SMS</span>
              <span className={`badge ${customer.consent.sms ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {customer.consent.sms ? 'Allowed' : 'Not Allowed'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">WhatsApp</span>
              <span className={`badge ${customer.consent.whatsapp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {customer.consent.whatsapp ? 'Allowed' : 'Not Allowed'}
              </span>
            </div>
            {customer.dndStatus && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                ⚠️ Customer is on DND list
              </div>
            )}
          </div>
        </div>

        {/* Preferences */}
        <div className="card">
          <h3 className="font-semibold mb-3">Preferences</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-2">Favorite Brands</p>
              <div className="flex flex-wrap gap-2">
                {customer.preferences.brands.map((brand) => (
                  <span key={brand} className="badge bg-gray-100 text-gray-800">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Categories</p>
              <div className="flex flex-wrap gap-2">
                {customer.preferences.categories.map((category) => (
                  <span key={category} className="badge bg-blue-100 text-blue-800">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Price Range</p>
              <p className="font-medium">
                {formatCurrency(customer.preferences.priceRange.min)} - {formatCurrency(customer.preferences.priceRange.max)}
              </p>
            </div>
          </div>
        </div>

        {/* Purchase History */}
        <div className="card">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary-600" />
            Purchase History
          </h3>
          <div className="space-y-3">
            {customer.purchaseHistory.map((purchase, index) => (
              <div key={index} className="pb-3 border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium">{purchase.productName}</p>
                  <p className="font-semibold text-primary-700">{formatCurrency(purchase.amount)}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
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
