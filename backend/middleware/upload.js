const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Storage configuration for images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/images'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Storage configuration for videos
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/videos'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// File filter for videos
const videoFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov|avi|wmv|webm/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype) || file.mimetype.startsWith('video/');

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed (mp4, mov, avi, wmv, webm)'));
  }
};

// Multer upload instances
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).array('images', 10); // Max 10 images

const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
}).array('videos', 5); // Max 5 videos

module.exports = {
  uploadImage,
  uploadVideo
};
