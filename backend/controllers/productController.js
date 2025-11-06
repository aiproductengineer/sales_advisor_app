const db = require('../config/database');
const path = require('path');
const fs = require('fs');

// Get all products with their images and videos
exports.getAllProducts = (req, res) => {
  const query = `
    SELECT p.*,
           GROUP_CONCAT(DISTINCT pi.filepath) as images,
           GROUP_CONCAT(DISTINCT pv.filepath) as videos
    FROM products p
    LEFT JOIN product_images pi ON p.id = pi.product_id
    LEFT JOIN product_videos pv ON p.id = pv.product_id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const products = rows.map(row => ({
      ...row,
      images: row.images ? row.images.split(',') : [],
      videos: row.videos ? row.videos.split(',') : []
    }));

    res.json({ products });
  });
};

// Get single product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params;

  // Get product details
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Get attributes
    db.all('SELECT * FROM product_attributes WHERE product_id = ?', [id], (err, attributes) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Get images
      db.all('SELECT * FROM product_images WHERE product_id = ?', [id], (err, images) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Get videos
        db.all('SELECT * FROM product_videos WHERE product_id = ?', [id], (err, videos) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          res.json({
            product: {
              ...product,
              attributes,
              images,
              videos
            }
          });
        });
      });
    });
  });
};

// Create new product
exports.createProduct = (req, res) => {
  const { sku, brand, model, category, description, price, cost, stock, velocity, status } = req.body;

  if (!sku || !brand || !model || !category || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO products (sku, brand, model, category, description, price, cost, stock, velocity, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [sku, brand, model, category, description, price, cost || null, stock || 0, velocity || 'medium', status || 'active'],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        message: 'Product created successfully',
        productId: this.lastID
      });
    }
  );
};

// Update product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { sku, brand, model, category, description, price, cost, stock, velocity, status } = req.body;

  const query = `
    UPDATE products
    SET sku = ?, brand = ?, model = ?, category = ?, description = ?,
        price = ?, cost = ?, stock = ?, velocity = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(
    query,
    [sku, brand, model, category, description, price, cost, stock, velocity, status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json({ message: 'Product updated successfully' });
    }
  );
};

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  // Get all images and videos to delete files
  db.all('SELECT filepath FROM product_images WHERE product_id = ?', [id], (err, images) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.all('SELECT filepath FROM product_videos WHERE product_id = ?', [id], (err, videos) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Delete product from database (cascade will delete related records)
      db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }

        // Delete physical files
        images.forEach(img => {
          const filePath = path.join(__dirname, '..', img.filepath);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });

        videos.forEach(vid => {
          const filePath = path.join(__dirname, '..', vid.filepath);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });

        res.json({ message: 'Product deleted successfully' });
      });
    });
  });
};

// Add product attributes
exports.addProductAttributes = (req, res) => {
  const { productId, attributes } = req.body;

  if (!productId || !attributes || !Array.isArray(attributes)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const query = 'INSERT INTO product_attributes (product_id, attribute_name, attribute_value) VALUES (?, ?, ?)';
  let completed = 0;
  let errors = [];

  attributes.forEach((attr) => {
    db.run(query, [productId, attr.name, attr.value], (err) => {
      completed++;
      if (err) errors.push(err.message);

      if (completed === attributes.length) {
        if (errors.length > 0) {
          return res.status(500).json({ error: 'Some attributes failed to save', errors });
        }
        res.json({ message: 'Attributes added successfully' });
      }
    });
  });
};

// Upload product images
exports.uploadProductImages = (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const query = 'INSERT INTO product_images (product_id, filename, filepath) VALUES (?, ?, ?)';
  let completed = 0;
  let errors = [];

  req.files.forEach((file) => {
    const filepath = `/uploads/images/${file.filename}`;
    db.run(query, [productId, file.originalname, filepath], (err) => {
      completed++;
      if (err) errors.push(err.message);

      if (completed === req.files.length) {
        if (errors.length > 0) {
          return res.status(500).json({ error: 'Some images failed to save', errors });
        }
        res.json({
          message: 'Images uploaded successfully',
          files: req.files.map(f => `/uploads/images/${f.filename}`)
        });
      }
    });
  });
};

// Upload product videos
exports.uploadProductVideos = (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const query = 'INSERT INTO product_videos (product_id, filename, filepath) VALUES (?, ?, ?)';
  let completed = 0;
  let errors = [];

  req.files.forEach((file) => {
    const filepath = `/uploads/videos/${file.filename}`;
    db.run(query, [productId, file.originalname, filepath], (err) => {
      completed++;
      if (err) errors.push(err.message);

      if (completed === req.files.length) {
        if (errors.length > 0) {
          return res.status(500).json({ error: 'Some videos failed to save', errors });
        }
        res.json({
          message: 'Videos uploaded successfully',
          files: req.files.map(f => `/uploads/videos/${f.filename}`)
        });
      }
    });
  });
};

// Search products
exports.searchProducts = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const sql = `
    SELECT * FROM products
    WHERE brand LIKE ? OR model LIKE ? OR sku LIKE ? OR category LIKE ?
    ORDER BY created_at DESC
  `;

  const searchTerm = `%${query}%`;

  db.all(sql, [searchTerm, searchTerm, searchTerm, searchTerm], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ products: rows });
  });
};

// Import products from CSV
exports.importCSV = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No CSV file uploaded' });
  }

  const csvParser = require('csv-parser');
  const fs = require('fs');
  const results = [];
  const errors = [];

  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // Delete the uploaded CSV file after parsing
      fs.unlinkSync(req.file.path);

      if (results.length === 0) {
        return res.status(400).json({ error: 'CSV file is empty' });
      }

      // Insert products into database
      const query = `
        INSERT INTO products (sku, brand, model, category, description, price, cost, stock, velocity, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      let processed = 0;
      let success = 0;

      results.forEach((row, index) => {
        // Validate required fields
        if (!row.sku || !row.brand || !row.model || !row.category || !row.price) {
          errors.push(`Row ${index + 1}: Missing required fields`);
          processed++;
          return;
        }

        db.run(
          query,
          [
            row.sku,
            row.brand,
            row.model,
            row.category,
            row.description || '',
            parseFloat(row.price) || 0,
            parseFloat(row.cost) || 0,
            parseInt(row.stock) || 0,
            row.velocity || 'medium',
            row.status || 'active'
          ],
          function(err) {
            processed++;

            if (err) {
              errors.push(`Row ${index + 1}: ${err.message}`);
            } else {
              success++;
            }

            // Send response when all rows are processed
            if (processed === results.length) {
              res.json({
                message: 'CSV import completed',
                total: results.length,
                success,
                failed: errors.length,
                errors: errors.slice(0, 10) // Limit to first 10 errors
              });
            }
          }
        );
      });
    })
    .on('error', (err) => {
      fs.unlinkSync(req.file.path);
      res.status(500).json({ error: 'Failed to parse CSV file', message: err.message });
    });
};
