const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { uploadImage, uploadVideo } = require('../middleware/upload');
const { uploadCSV } = require('../middleware/csvUpload');

// Product CRUD routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Search
router.get('/products/search', productController.searchProducts);

// Attributes
router.post('/products/attributes', productController.addProductAttributes);

// File uploads
router.post('/products/upload-images', (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    productController.uploadProductImages(req, res);
  });
});

router.post('/products/upload-videos', (req, res) => {
  uploadVideo(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    productController.uploadProductVideos(req, res);
  });
});

// CSV Import
router.post('/products/import-csv', (req, res) => {
  uploadCSV(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    productController.importCSV(req, res);
  });
});

module.exports = router;
