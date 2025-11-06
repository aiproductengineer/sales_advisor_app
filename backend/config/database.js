const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sku TEXT UNIQUE NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      cost REAL,
      stock INTEGER DEFAULT 0,
      velocity TEXT DEFAULT 'medium',
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Product attributes table
  db.run(`
    CREATE TABLE IF NOT EXISTS product_attributes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      attribute_name TEXT NOT NULL,
      attribute_value TEXT NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    )
  `);

  // Product images table
  db.run(`
    CREATE TABLE IF NOT EXISTS product_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      filename TEXT NOT NULL,
      filepath TEXT NOT NULL,
      is_primary BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    )
  `);

  // Product videos table
  db.run(`
    CREATE TABLE IF NOT EXISTS product_videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      filename TEXT NOT NULL,
      filepath TEXT NOT NULL,
      duration INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    )
  `);

  console.log('Database tables initialized');
}

module.exports = db;
