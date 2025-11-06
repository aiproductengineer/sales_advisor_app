const multer = require('multer');
const path = require('path');

// Storage configuration for CSV files
const csvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// File filter for CSV
const csvFilter = (req, file, cb) => {
  const allowedTypes = /csv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel';

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed'));
  }
};

// Multer upload instance for CSV
const uploadCSV = multer({
  storage: csvStorage,
  fileFilter: csvFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).single('csv');

module.exports = { uploadCSV };
