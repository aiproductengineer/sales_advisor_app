import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Edit, Trash2, Package, Image, Video, Sparkles, AlertCircle, Upload, Download } from 'lucide-react';
import { productAPI, ProductData } from '../../services/productApi';
import { ProductForm } from '../../components/admin/ProductForm';

interface Product extends ProductData {
  id: number;
  images?: string[];
  videos?: string[];
  created_at?: string;
}

export const ProductCMS: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productAPI.getAllProducts();
      setProducts(data.products || []);
    } catch (err) {
      setError('Failed to load products. Make sure the backend server is running on port 5000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await productAPI.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete product');
      console.error(err);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    loadProducts();
  };

  const handleCSVImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportResult(null);
    setError('');

    try {
      const result = await productAPI.importCSV(file);
      setImportResult(result);
      loadProducts();
    } catch (err) {
      setError('Failed to import CSV file');
      console.error(err);
    } finally {
      setImporting(false);
      if (csvInputRef.current) {
        csvInputRef.current.value = '';
      }
    }
  };

  const downloadCSVTemplate = () => {
    const csvContent = `sku,brand,model,category,description,price,cost,stock,velocity,status
WATCH-001,Rolex,Submariner,Watches,Luxury dive watch,12500,8000,5,fast,active
BAG-001,Hermès,Birkin,Handbags,Iconic leather handbag,25000,15000,2,medium,active
SHOE-001,Christian Louboutin,Pigalle,Shoes,Red sole pumps,995,500,10,fast,active`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredProducts = searchQuery
    ? products.filter(p =>
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  if (showForm) {
    return <ProductForm product={editingProduct} onClose={handleFormClose} />;
  }

  return (
    <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="card-premium p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2">
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-luxury-gold" />
                Product CMS
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Manage product catalog with images and videos
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={downloadCSVTemplate}
                className="btn-glass flex items-center gap-2 text-sm sm:text-base"
                title="Download CSV Template"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden lg:inline">Template</span>
              </button>
              <button
                onClick={() => csvInputRef.current?.click()}
                className="btn-secondary flex items-center gap-2 text-sm sm:text-base"
                disabled={importing}
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{importing ? 'Importing...' : 'Import CSV'}</span>
                <span className="sm:hidden">CSV</span>
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary flex items-center gap-2 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden CSV Input */}
      <input
        ref={csvInputRef}
        type="file"
        accept=".csv"
        onChange={handleCSVImport}
        className="hidden"
      />

      {/* Search Bar */}
      <div className="glass-card p-3 sm:p-4">
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10 sm:pl-12 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Import Result */}
      {importResult && (
        <div className="glass-card p-4 bg-green-500/10 border-green-500/30">
          <div className="flex items-center gap-2 text-green-300 mb-2">
            <Sparkles className="w-5 h-5" />
            <p className="font-semibold">CSV Import Complete</p>
          </div>
          <div className="text-sm text-green-200 space-y-1">
            <p>Total rows: {importResult.total}</p>
            <p>Successfully imported: {importResult.success}</p>
            {importResult.failed > 0 && (
              <>
                <p className="text-yellow-300">Failed: {importResult.failed}</p>
                {importResult.errors && importResult.errors.length > 0 && (
                  <div className="mt-2 text-xs text-gray-400">
                    <p className="font-medium mb-1">Errors:</p>
                    {importResult.errors.map((err: string, i: number) => (
                      <p key={i}>• {err}</p>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="glass-card p-4 bg-red-500/10 border-red-500/30">
          <div className="flex items-center gap-2 text-red-300">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
          <p className="text-xs text-red-400 mt-2">
            Run: <code className="bg-red-900/30 px-2 py-1 rounded">npm run dev</code> in the root directory
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 glass-card">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto mb-3" />
          <p className="text-gray-400">Loading products...</p>
        </div>
      )}

      {/* Product List */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-12 glass-card">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 mb-4">No products found</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus className="w-5 h-5 inline mr-2" />
            Add Your First Product
          </button>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const getVelocityColor = () => {
    switch (product.velocity) {
      case 'fast': return 'text-green-300 bg-green-500/20 border-green-400/30';
      case 'slow': return 'text-red-300 bg-red-500/20 border-red-400/30';
      default: return 'text-yellow-300 bg-yellow-500/20 border-yellow-400/30';
    }
  };

  return (
    <div className="glass-card-hover p-3 sm:p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-luxury-gold/5 rounded-full blur-2xl" />
      <div className="relative z-10">
        <div className="flex gap-3 sm:gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
            {product.images && product.images.length > 0 ? (
              <img
                src={`http://localhost:5000${product.images[0]}`}
                alt={product.model}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-base sm:text-lg text-white truncate">
                  {product.brand} {product.model}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">SKU: {product.sku}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={onEdit}
                  className="p-1.5 sm:p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                </button>
                <button
                  onClick={onDelete}
                  className="p-1.5 sm:p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className={`badge text-[10px] sm:text-xs ${getVelocityColor()}`}>
                {product.velocity}
              </span>
              <span className="badge bg-purple-500/20 text-purple-300 border-purple-400/30 text-[10px] sm:text-xs">
                {product.category}
              </span>
              <span className="text-luxury-gold font-semibold">
                ${product.price.toLocaleString()}
              </span>
              {product.stock !== undefined && (
                <span className="text-gray-400">
                  Stock: {product.stock}
                </span>
              )}
            </div>

            {/* Media indicators */}
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              {product.images && product.images.length > 0 && (
                <span className="flex items-center gap-1">
                  <Image className="w-3 h-3" />
                  {product.images.length}
                </span>
              )}
              {product.videos && product.videos.length > 0 && (
                <span className="flex items-center gap-1">
                  <Video className="w-3 h-3" />
                  {product.videos.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
