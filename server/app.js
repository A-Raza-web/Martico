const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // JSON Base64 support
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const subCategoryRoutes = require('./routes/subCat');

// Use routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/subcategories', subCategoryRoutes);

const PORT = process.env.PORT ;


// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}!`);
  console.log(`📊 Cloudinary configured for: ${process.env.CLOUD_NAME}`);
  console.log(`⚡ p-limit concurrency control ready`);
});