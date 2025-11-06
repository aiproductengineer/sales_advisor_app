# Product CMS - Complete Setup Guide

## 🎯 Overview

A full-stack Product Content Management System (CMS) built with React + TypeScript frontend and Node.js + Express backend. Upload and manage product catalogs with images, videos, and custom attributes.

## 📁 Project Structure

```
sales_advisor_app/
├── backend/                    # Node.js Backend
│   ├── config/
│   │   └── database.js        # SQLite database configuration
│   ├── controllers/
│   │   └── productController.js  # Product CRUD logic
│   ├── middleware/
│   │   └── upload.js          # Multer file upload middleware
│   ├── routes/
│   │   └── productRoutes.js   # API route definitions
│   ├── uploads/               # File storage
│   │   ├── images/            # Product images
│   │   └── videos/            # Product videos
│   └── server.js              # Express server entry point
│
├── sales-advisor-app/          # React Frontend
│   ├── src/
│   │   ├── components/admin/
│   │   │   └── ProductForm.tsx     # Product creation/edit form
│   │   ├── pages/admin/
│   │   │   └── ProductCMS.tsx      # CMS main page
│   │   ├── services/
│   │   │   └── productApi.ts       # API communication service
│   │   └── App.tsx                  # Updated with CMS route
│   └── .env                         # Frontend environment variables
│
├── package.json                # Backend dependencies
└── .env                        # Backend environment variables
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd sales-advisor-app
npm install
cd ..
```

### 2. Start Backend Server

```bash
# From the root directory
npm run dev
```

The backend will start on `http://localhost:5000`

You should see:
```
🚀 Product CMS Backend Server running on port 5000
📊 API Base URL: http://localhost:5000/api
✅ Backend ready for connections!
```

### 3. Start Frontend Development Server

```bash
# In a new terminal window
cd sales-advisor-app
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Access the CMS

1. Open your browser to `http://localhost:5173`
2. Login with PIN: `123456`
3. Click on **"Admin CMS"** card from the Dashboard
4. Or navigate directly to `/admin/products`

## 📊 Database Schema

### Products Table
- `id` - Primary key
- `sku` - Unique product identifier
- `brand` - Product brand name
- `model` - Product model
- `category` - Product category
- `description` - Product description
- `price` - Selling price
- `cost` - Cost price
- `stock` - Current stock level
- `velocity` - Sales velocity (slow/medium/fast)
- `status` - Product status (active/inactive)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Product Attributes Table
- `id` - Primary key
- `product_id` - Foreign key to products
- `attribute_name` - Attribute name (e.g., "Color", "Size")
- `attribute_value` - Attribute value (e.g., "Rose Gold", "42mm")

### Product Images Table
- `id` - Primary key
- `product_id` - Foreign key to products
- `filename` - Original filename
- `filepath` - Server file path
- `is_primary` - Primary image flag
- `created_at` - Upload timestamp

### Product Videos Table
- `id` - Primary key
- `product_id` - Foreign key to products
- `filename` - Original filename
- `filepath` - Server file path
- `duration` - Video duration
- `created_at` - Upload timestamp

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```

### Product Operations
```
GET    /api/products              # Get all products
GET    /api/products/:id          # Get single product
POST   /api/products              # Create new product
PUT    /api/products/:id          # Update product
DELETE /api/products/:id          # Delete product
GET    /api/products/search?query=...  # Search products
```

### Attributes
```
POST   /api/products/attributes   # Add product attributes
Body: { productId: number, attributes: [{name: string, value: string}] }
```

### File Uploads
```
POST   /api/products/upload-images   # Upload product images
POST   /api/products/upload-videos   # Upload product videos
Body: FormData with 'productId' and 'images'/'videos' files
```

## 📝 API Examples

### Create a Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "WATCH-001",
    "brand": "Rolex",
    "model": "Submariner",
    "category": "Watches",
    "description": "Luxury dive watch",
    "price": 12500,
    "cost": 8000,
    "stock": 3,
    "velocity": "fast",
    "status": "active"
  }'
```

### Upload Images
```bash
curl -X POST http://localhost:5000/api/products/upload-images \
  -F "productId=1" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

### Search Products
```bash
curl http://localhost:5000/api/products/search?query=rolex
```

## 🎨 CMS Features

### ✅ Product Management
- Create, read, update, delete products
- Real-time search and filtering
- Product status management (active/inactive)
- Sales velocity tracking (slow/medium/fast)

### 📸 Media Management
- Upload multiple product images (max 10, 10MB each)
- Upload product videos (max 5, 100MB each)
- Supported image formats: JPEG, JPG, PNG, GIF, WebP
- Supported video formats: MP4, MOV, AVI, WMV, WebM
- Automatic file naming with UUID
- Media preview in product cards

### 🏷️ Custom Attributes
- Add unlimited product attributes
- Dynamic attribute management
- Key-value pair structure
- Easy attribute removal

### 💾 Inventory Tracking
- Stock level management
- Price and cost tracking
- Category organization
- SKU-based identification

## 🔒 File Upload Limits

- **Images**: 10MB per file, 10 files max
- **Videos**: 100MB per file, 5 files max
- All files stored in `backend/uploads/` directory
- Automatic cleanup on product deletion

## 🌐 Environment Variables

### Backend (.env in root)
```env
PORT=5000
NODE_ENV=development
```

### Frontend (sales-advisor-app/.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Usage Workflow

1. **Create Product**: Click "Add Product" button
2. **Fill Details**: Enter SKU, brand, model, category, pricing
3. **Add Attributes**: Define custom attributes (color, size, material, etc.)
4. **Upload Media**: Select product images and videos
5. **Save**: Submit form to create product with all media
6. **Manage**: Edit or delete products from the list view

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **SQLite3** - Database
- **Multer** - File upload handling
- **UUID** - Unique file naming
- **CORS** - Cross-origin requests

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Router** - Navigation

## 📱 UI Components

### Product CMS Page
- Product listing with search
- Add/Edit/Delete actions
- Media indicators (image/video counts)
- Status and velocity badges
- Responsive glassmorphism design

### Product Form
- Multi-section form layout
- File input for images/videos
- Dynamic attribute management
- Form validation
- Loading states
- Success/error messages

## 🚦 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## 🐛 Troubleshooting

### Backend won't start
```bash
# Make sure you're in the root directory
cd /Users/vault/Documents/workspace/sales_advisor_app

# Install dependencies
npm install

# Start server
npm run dev
```

### Frontend can't connect to backend
1. Ensure backend is running on port 5000
2. Check `sales-advisor-app/.env` has correct API URL
3. Verify no CORS issues in browser console

### File uploads failing
1. Check `backend/uploads/images` and `backend/uploads/videos` directories exist
2. Verify file size limits (images: 10MB, videos: 100MB)
3. Ensure correct file format

### Database errors
```bash
# Delete database and restart server (will recreate tables)
rm backend/database.sqlite
npm run dev
```

## 📄 License

ISC License - See package.json for details

## 🤝 Contributing

This CMS is part of the Ethos Sales Advisor App. For issues or feature requests, contact the development team.

## 🎉 Success!

You now have a fully functional Product CMS with:
- ✅ Working backend API
- ✅ React admin interface
- ✅ Image/video upload
- ✅ Product management
- ✅ Custom attributes
- ✅ Search functionality
- ✅ Responsive design

**Start managing your product catalog!** 🚀
