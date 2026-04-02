const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../image');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Upload Route
app.post('/api/upload', (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error('Multer Error:', err);
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error('Unknown Upload Error:', err);
      return res.status(500).json({ message: `Server error: ${err.message}` });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('File uploaded successfully:', req.file.filename);
    const imageUrl = `/image/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  });
});

// Routes
app.get('/api', (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to PetNest API', 
    version: '1.0.0',
    endpoints: {
      health: '/health',
      pets: '/api/pets',
      food: '/api/food',
      orders: '/api/orders',
      vets: '/api/vets',
      appointments: '/api/appointments',
      subscriptions: '/api/subscriptions'
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'PetNest API is healthy' });
});

// Import Routes
const petRoutes = require('./routes/petRoutes');
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');
const vetRoutes = require('./routes/vetRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

// API Routes
app.use('/api/pets', petRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/vets', vetRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Static file serving for images folder at root
app.use('/image', express.static(path.join(__dirname, '../../image')));

// Static file serving fallback for frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/dist', 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
