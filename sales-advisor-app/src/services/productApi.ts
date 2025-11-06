// Use environment variable if available, otherwise use relative path for production
const API_BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:5000/api';

export interface ProductData {
  id?: number;
  sku: string;
  brand: string;
  model: string;
  category: string;
  description?: string;
  price: number;
  cost?: number;
  stock?: number;
  velocity?: 'slow' | 'medium' | 'fast';
  status?: 'active' | 'inactive';
}

export interface ProductAttribute {
  name: string;
  value: string;
}

class ProductAPI {
  // Get all products
  async getAllProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }

  // Get single product
  async getProduct(id: number) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  }

  // Create product
  async createProduct(product: ProductData) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  }

  // Update product
  async updateProduct(id: number, product: ProductData) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  }

  // Delete product
  async deleteProduct(id: number) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  }

  // Add product attributes
  async addAttributes(productId: number, attributes: ProductAttribute[]) {
    const response = await fetch(`${API_BASE_URL}/products/attributes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, attributes })
    });
    if (!response.ok) throw new Error('Failed to add attributes');
    return response.json();
  }

  // Upload images
  async uploadImages(productId: number, files: FileList) {
    const formData = new FormData();
    formData.append('productId', productId.toString());

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    const response = await fetch(`${API_BASE_URL}/products/upload-images`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload images');
    return response.json();
  }

  // Upload videos
  async uploadVideos(productId: number, files: FileList) {
    const formData = new FormData();
    formData.append('productId', productId.toString());

    for (let i = 0; i < files.length; i++) {
      formData.append('videos', files[i]);
    }

    const response = await fetch(`${API_BASE_URL}/products/upload-videos`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload videos');
    return response.json();
  }

  // Search products
  async searchProducts(query: string) {
    const response = await fetch(`${API_BASE_URL}/products/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search products');
    return response.json();
  }

  // Import CSV
  async importCSV(file: File) {
    const formData = new FormData();
    formData.append('csv', file);

    const response = await fetch(`${API_BASE_URL}/products/import-csv`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to import CSV');
    return response.json();
  }
}

export const productAPI = new ProductAPI();
