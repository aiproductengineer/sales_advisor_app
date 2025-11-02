import React, { useState } from 'react';
import { Search, Package, MapPin, X, CheckCircle, Clock, Share2, Plus, Sparkles, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency, getVelocityClass } from '../utils/format';
import { Product } from '../types';

export const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const products = useStore((state) => state.products);
  const searchProducts = useStore((state) => state.searchProducts);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const selectProduct = useStore((state) => state.selectProduct);
  const clearSelectedProduct = useStore((state) => state.clearSelectedProduct);

  const filteredProducts = searchQuery ? searchProducts(searchQuery) : products;

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4">
        <div className="glass-card p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by brand, model, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12"
            />
          </div>
        </div>
      </div>

      {/* Product List or Detail View */}
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onClose={clearSelectedProduct} />
      ) : (
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No products found</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.sku}
                product={product}
                onClick={() => selectProduct(product.sku)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const currentStoreStock = product.stock[0];
  const totalStock = product.stock.reduce((sum, loc) => sum + loc.quantity, 0);
  const isInStock = currentStoreStock.quantity > currentStoreStock.reserved;

  return (
    <div
      onClick={onClick}
      className="glass-card-hover p-4 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-2xl" />
      <div className="relative z-10 flex gap-4">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-lg border border-white/10"
          />
          {isInStock && (
            <div className="absolute -top-1 -right-1 p-1 bg-green-500/20 rounded-full border border-green-500/30 backdrop-blur-xl">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">{product.brand}</h3>
              <p className="text-sm text-gray-400 truncate">{product.model}</p>
            </div>
            <span className={`badge ${getVelocityClass(product.velocity)} flex-shrink-0`}>
              <Zap className="w-3 h-3 mr-1" />
              {product.velocity}
            </span>
          </div>

          <p className="text-xl font-bold text-gradient-gold mb-2">
            {formatCurrency(product.price)}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {isInStock ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 font-medium">
                    {currentStoreStock.quantity - currentStoreStock.reserved} in stock
                  </span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-300 font-medium">
                    {totalStock > 0 ? 'Other stores' : 'Out of stock'}
                  </span>
                </>
              )}
            </div>
            <span className="text-xs text-gray-500">SKU: {product.sku}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const currentStoreStock = product.stock[0];
  const availableStock = currentStoreStock.quantity - currentStoreStock.reserved;
  const isInStock = availableStock > 0;

  const handleReserve = () => {
    alert('Reservation feature - would open reservation dialog');
  };

  const handleCreateQuote = () => {
    alert('Quote feature - would open quote creation dialog');
  };

  const handleShare = () => {
    alert('Share feature - would open share options');
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header with Image */}
      <div className="relative">
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 left-4 glass-card p-3 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="glass-card p-4">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h1 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  {product.brand}
                  <Sparkles className="w-5 h-5 text-luxury-gold" />
                </h1>
                <p className="text-gray-300">{product.model}</p>
              </div>
              <span className={`badge ${getVelocityClass(product.velocity)}`}>
                <Zap className="w-3 h-3 mr-1" />
                {product.velocity}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Price & Stock Status */}
        <div className="card-premium p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-3">
              <p className="text-4xl font-bold text-gradient-gold">{formatCurrency(product.price)}</p>
              {isInStock ? (
                <span className="badge bg-green-500/20 text-green-300 border-green-500/30 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  In Stock
                </span>
              ) : (
                <span className="badge bg-orange-500/20 text-orange-300 border-orange-500/30 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Limited
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">
              {isInStock
                ? `${availableStock} available at your store`
                : 'Check other stores for availability'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleReserve}
            disabled={!isInStock}
            className="btn-glass disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Reserve</span>
          </button>
          <button
            onClick={handleCreateQuote}
            className="btn-primary flex items-center justify-center gap-2 py-3"
          >
            <Package className="w-4 h-4" />
            <span className="text-sm">Quote</span>
          </button>
          <button
            onClick={handleShare}
            className="btn-glass flex items-center justify-center gap-2 py-3"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Description */}
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-2 text-white">Description</h3>
          <p className="text-sm text-gray-300 leading-relaxed">{product.description}</p>
        </div>

        {/* Specifications */}
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-3 text-white">Specifications</h3>
          <div className="space-y-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              value && (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-medium text-gray-300 text-right">{value}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Stock Availability Across Stores */}
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-white">
            <MapPin className="w-5 h-5 text-luxury-gold" />
            Stock Availability
          </h3>
          <div className="space-y-3">
            {product.stock.map((location) => {
              const available = location.quantity - location.reserved;
              return (
                <div key={location.storeId} className="pb-3 border-b border-white/10 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-medium text-gray-300">{location.storeName}</p>
                      {location.distance && (
                        <p className="text-xs text-gray-500">{location.distance} km away</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${available > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                        {available} available
                      </p>
                      {location.reserved > 0 && (
                        <p className="text-xs text-orange-400">{location.reserved} reserved</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Info */}
        <div className="glass-card p-4 bg-gradient-to-br from-white/[0.03] to-transparent">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-400">SKU</span>
            <span className="font-mono font-medium text-gray-300">{product.sku}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Category</span>
            <span className="font-medium text-gray-300">{product.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
