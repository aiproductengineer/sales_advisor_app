const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images and videos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api', productRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Product CMS API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Product CMS Backend Server running on port ${PORT}`);
  console.log(`📊 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📁 Uploads directory: ${path.join(__dirname, 'uploads')}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET    /api/health`);
  console.log(`  GET    /api/products`);
  console.log(`  GET    /api/products/:id`);
  console.log(`  POST   /api/products`);
  console.log(`  PUT    /api/products/:id`);
  console.log(`  DELETE /api/products/:id`);
  console.log(`  POST   /api/products/attributes`);
  console.log(`  POST   /api/products/upload-images`);
  console.log(`  POST   /api/products/upload-videos`);
  console.log(`  GET    /api/products/search?query=...`);
  console.log(`\n✅ Backend ready for connections!\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

module.exports = app;
