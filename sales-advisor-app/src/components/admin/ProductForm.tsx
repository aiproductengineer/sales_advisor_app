import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, X, Image as ImageIcon, Video as VideoIcon, Plus, Trash2 } from 'lucide-react';
import { productAPI, ProductData, ProductAttribute } from '../../services/productApi';

interface ProductFormProps {
  product: ProductData | null;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState<ProductData>({
    sku: product?.sku || '',
    brand: product?.brand || '',
    model: product?.model || '',
    category: product?.category || '',
    description: product?.description || '',
    price: product?.price || 0,
    cost: product?.cost || 0,
    stock: product?.stock || 0,
    velocity: product?.velocity || 'medium',
    status: product?.status || 'active'
  });

  const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
  const [newAttr, setNewAttr] = useState({ name: '', value: '' });
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [videoFiles, setVideoFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'cost' || name === 'stock' ? parseFloat(value) || 0 : value
    }));
  };

  const handleAddAttribute = () => {
    if (newAttr.name && newAttr.value) {
      setAttributes([...attributes, newAttr]);
      setNewAttr({ name: '', value: '' });
    }
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Create or update product
      let productId: number;
      if (product?.id) {
        await productAPI.updateProduct(product.id, formData);
        productId = product.id;
        setSuccess('Product updated successfully!');
      } else {
        const result = await productAPI.createProduct(formData);
        productId = result.productId;
        setSuccess('Product created successfully!');
      }

      // Add attributes if any
      if (attributes.length > 0) {
        await productAPI.addAttributes(productId, attributes);
      }

      // Upload images if any
      if (imageFiles && imageFiles.length > 0) {
        await productAPI.uploadImages(productId, imageFiles);
      }

      // Upload videos if any
      if (videoFiles && videoFiles.length > 0) {
        await productAPI.uploadVideos(productId, videoFiles);
      }

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="glass-card p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <button
            onClick={onClose}
            className="mb-3 text-gray-400 hover:text-luxury-gold transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="glass-card p-4 bg-red-500/10 border-red-500/30">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {success && (
        <div className="glass-card p-4 bg-green-500/10 border-green-500/30">
          <p className="text-sm text-green-300">{success}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information */}
        <div className="glass-card p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">SKU *</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Model *</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input min-h-[100px]"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="glass-card p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cost</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="input"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="input"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Velocity</label>
              <select
                name="velocity"
                value={formData.velocity}
                onChange={handleChange}
                className="input"
              >
                <option value="slow">Slow</option>
                <option value="medium">Medium</option>
                <option value="fast">Fast</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Attributes */}
        <div className="glass-card p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Product Attributes</h2>

          {/* Attribute List */}
          {attributes.length > 0 && (
            <div className="space-y-2 mb-4">
              {attributes.map((attr, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10">
                  <div>
                    <span className="text-gray-400 text-sm">{attr.name}:</span>
                    <span className="text-white ml-2">{attr.value}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttribute(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Attribute */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Attribute name (e.g., Color)"
              value={newAttr.name}
              onChange={(e) => setNewAttr({ ...newAttr, name: e.target.value })}
              className="input"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Attribute value (e.g., Rose Gold)"
                value={newAttr.value}
                onChange={(e) => setNewAttr({ ...newAttr, value: e.target.value })}
                className="input flex-1"
              />
              <button
                type="button"
                onClick={handleAddAttribute}
                className="btn-secondary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Images Upload */}
        <div className="glass-card p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-luxury-gold" />
            Product Images
          </h2>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(e.target.files)}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-luxury-gold file:text-dark-900 hover:file:bg-luxury-darkGold cursor-pointer"
            />
            {imageFiles && imageFiles.length > 0 && (
              <p className="text-sm text-gray-400">
                {imageFiles.length} image(s) selected
              </p>
            )}
          </div>
        </div>

        {/* Videos Upload */}
        <div className="glass-card p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <VideoIcon className="w-5 h-5 text-luxury-gold" />
            Product Videos
          </h2>
          <div className="space-y-3">
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => setVideoFiles(e.target.files)}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-luxury-gold file:text-dark-900 hover:file:bg-luxury-darkGold cursor-pointer"
            />
            {videoFiles && videoFiles.length > 0 && (
              <p className="text-sm text-gray-400">
                {videoFiles.length} video(s) selected
              </p>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn-glass"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 btn-primary flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark-900" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
