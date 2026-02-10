const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { upload, cloudinary: cloudinaryUtils } = require('../utils/cloudinary');
const { rateLimiter } = require('../utils/rateLimiter');

// GET / -> list all products with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, inFeatured, search } = req.query;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (inFeatured === 'true') filter.inFeatured = true;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const products = await Product.find(filter)
      .populate('category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /:id -> get product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/products/create
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      price,
      category,
      countInStock,
      rating,
      number,
      review,
      inFeatured
    } = req.body;

    // Required fields validate
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and category are required'
      });
    }

    // Check if image uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    // Build product object
    const productData = {
      name,
      description,
      brand,
      price: parseFloat(price),
      category,
      countInStock: parseInt(countInStock) || 0,
      rating: parseFloat(rating) || 0,
      number,
      review: review ? (Array.isArray(review) ? review : [review]) : [],
      inFeatured: inFeatured === 'true',
      image: req.file.path,             // Cloudinary URL
      imagePublicId: req.file.filename  // Cloudinary filename
    };

    // Save to DB
    const newProduct = new Product(productData);
    const saved = await newProduct.save();

    res.status(201).json({
      success: true,
      data: saved,
      message: 'Product created successfully'
    });

  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /:id -> update a product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, brand, price, category, countInStock, rating, number, review, inFeatured } = req.body;

    let updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (brand) updateData.brand = brand;
    if (price) updateData.price = parseFloat(price);
    if (category) updateData.category = category;
    if (countInStock !== undefined) updateData.countInStock = parseInt(countInStock);
    if (rating) updateData.rating = parseFloat(rating);
    if (number) updateData.number = number;
    if (review) updateData.review = Array.isArray(review) ? review : [review];
    if (inFeatured !== undefined) updateData.inFeatured = inFeatured === 'true';

    // Handle image update
    if (req.file) {
      const product = await Product.findById(req.params.id);

      // Delete old image from Cloudinary if exists
      if (product.imagePublicId) {
        await cloudinaryUtils.deleteImage(product.imagePublicId);
      }

      updateData.image = req.file.secure_url;
      updateData.imagePublicId = req.file.public_id;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category');

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      data: updated,
      message: 'Product updated successfully'
    });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /:id -> delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete image from Cloudinary if exists
    if (product.imagePublicId) {
      await cloudinaryUtils.deleteImage(product.imagePublicId);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;
