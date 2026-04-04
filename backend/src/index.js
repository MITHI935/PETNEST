const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const supabase = require('./config/supabase');

dotenv.config(); // Loads from process.env on Render or local .env if present

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Multer for memory storage (for Supabase upload)
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Upload Route (using Supabase Storage)
app.post('/api/upload', (req, res) => {
  upload.single('image')(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error('Multer Error:', err);
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    } else if (err) {
      console.error('Unknown Upload Error:', err);
      return res.status(500).json({ message: `Server error: ${err.message}` });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const file = req.file;
      const fileExt = path.extname(file.originalname).toLowerCase() || '.jpg';
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Supabase Storage Error:', error);
        return res.status(500).json({ message: `Supabase upload error: ${error.message}` });
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (!publicUrl) {
        throw new Error('Failed to generate public URL');
      }

      console.log('File uploaded to Supabase successfully:', publicUrl);
      res.status(200).json({ imageUrl: publicUrl });
    } catch (err) {
      console.error('Unexpected error during upload:', err);
      res.status(500).json({ message: 'Internal server error during upload' });
    }
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
