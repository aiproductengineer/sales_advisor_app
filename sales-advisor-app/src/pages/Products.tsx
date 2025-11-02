import React, { useState } from 'react';
import { Search, Package, MapPin, X, CheckCircle, Clock, Share2, Plus } from 'lucide-react';
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
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by brand, model, or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Product List or Detail View */}
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onClose={clearSelectedProduct} />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No products found</p>
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
  const currentStoreStock = product.stock[0]; // First is always current store
  const totalStock = product.stock.reduce((sum, loc) => sum + loc.quantity, 0);
  const isInStock = currentStoreStock.quantity > currentStoreStock.reserved;

  return (
    <div
      onClick={onClick}
      className="card hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex gap-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{product.brand}</h3>
              <p className="text-sm text-gray-600 truncate">{product.model}</p>
            </div>
            <span className={`badge ${getVelocityClass(product.velocity)} flex-shrink-0`}>
              {product.velocity}
            </span>
          </div>

          <p className="text-lg font-bold text-primary-700 mb-2">
            {formatCurrency(product.price)}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {isInStock ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-medium">
                    {currentStoreStock.quantity - currentStoreStock.reserved} in stock
                  </span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-700 font-medium">
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
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h1 className="text-xl font-display font-bold">{product.brand}</h1>
                <p className="text-gray-700">{product.model}</p>
              </div>
              <span className={`badge ${getVelocityClass(product.velocity)}`}>
                {product.velocity}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Price & Stock Status */}
        <div className="card bg-primary-50 border-primary-100">
          <div className="flex justify-between items-center mb-3">
            <p className="text-3xl font-bold text-primary-700">{formatCurrency(product.price)}</p>
            {isInStock ? (
              <span className="badge bg-green-100 text-green-800 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                In Stock
              </span>
            ) : (
              <span className="badge bg-orange-100 text-orange-800 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Limited
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {isInStock
              ? `${availableStock} available at your store`
              : 'Check other stores for availability'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleReserve}
            disabled={!isInStock}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Reserve
          </button>
          <button
            onClick={handleCreateQuote}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            Quote
          </button>
          <button
            onClick={handleShare}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Description */}
        <div className="card">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Specifications */}
        <div className="card">
          <h3 className="font-semibold mb-3">Specifications</h3>
          <div className="space-y-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              value && (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-medium text-right">{value}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Stock Availability Across Stores */}
        <div className="card">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-600" />
            Stock Availability
          </h3>
          <div className="space-y-3">
            {product.stock.map((location) => {
              const available = location.quantity - location.reserved;
              return (
                <div key={location.storeId} className="pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-medium">{location.storeName}</p>
                      {location.distance && (
                        <p className="text-xs text-gray-500">{location.distance} km away</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${available > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                        {available} available
                      </p>
                      {location.reserved > 0 && (
                        <p className="text-xs text-orange-600">{location.reserved} reserved</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Info */}
        <div className="card bg-gray-50">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">SKU</span>
            <span className="font-mono font-medium">{product.sku}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-gray-600">Category</span>
            <span className="font-medium">{product.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
