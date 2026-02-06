const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

// Basic health check
app.get('/', (req, res) => res.send('Server is running'));

// Import routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// Use routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT ;

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Demonstration of p-limit usage
const { examples } = require('./utils/rateLimiter');

// Example endpoint showing p-limit in action
app.post('/api/demo/concurrent-processing', async (req, res) => {
  try {
    const { products, images } = req.body;
    
    // Example of concurrent product creation
    let productResults = [];
    if (products && Array.isArray(products)) {
      productResults = await examples.createProductsConcurrently(products);
    }
    
    // Example of concurrent image uploads
    let imageResults = [];
    if (images && Array.isArray(images)) {
      imageResults = await examples.uploadImagesConcurrently(images);
    }
    
    res.json({
      message: 'Concurrent processing completed successfully',
      products: productResults,
      images: imageResults
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}!`);
  console.log(`📊 Cloudinary configured for: ${process.env.CLOUD_NAME}`);
  console.log(`⚡ p-limit concurrency control ready`);
});