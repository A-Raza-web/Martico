const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { upload,CloudinaryUtils } = require('../utils/cloudinary');
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
      .populate('subCategory')
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
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('subCategory');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create Product
router.post('/create', async (req, res) => {
  try {
    const {
      name,
      description,
      images, // Array of base64 strings
      brand,
      price,
      category,
      subCategory,
      countInStock,
      rating,
      review,
      inFeatured
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: 'Name, price, and category are required' });
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one image is required' });
    }

    // 1️⃣ Upload all images to Cloudinary
    const uploadResults = await Promise.all(
      images.map((imgBase64, index) =>
        CloudinaryUtils.uploadImage(imgBase64, `product_${Date.now()}_${index}`)
      )
    );

    // 2️⃣ Build images array with url and public_id
    const productImages = uploadResults.map(res => ({
      url: res.url,
      public_id: res.public_id
    }));

    // 3️⃣ Save product in DB
    const product = new Product({
      name,
      description,
      images: productImages, // New field: array of images
      brand,
      price,
      category,
      subCategory: subCategory || null,
      countInStock,
      rating: rating || 0,
      review: review ? (Array.isArray(review) ? review : [review]) : [],
      inFeatured: inFeatured === 'true'
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// PUT /:id -> update a product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, brand, price, category, subCategory, countInStock, rating, review, inFeatured } = req.body;

    let updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (brand) updateData.brand = brand;
    if (price) updateData.price = parseFloat(price);
    if (category) updateData.category = category;
    if (subCategory !== undefined) updateData.subCategory = subCategory || null;
    if (countInStock !== undefined) updateData.countInStock = parseInt(countInStock);
    if (rating) updateData.rating = parseFloat(rating);
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
    ).populate('category').populate('subCategory');

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
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    // Delete all images from Cloudinary
    if (product.images && product.images.length > 0) {
      const publicIds = product.images.map(img => img.public_id);
      if (publicIds.length > 0) await CloudinaryUtils.deleteMultipleImages(publicIds);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



module.exports = router;
