const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const { CloudinaryUtils }  = require('../utils/cloudinary');
const { rateLimiter } = require('../utils/rateLimiter');
const pLimit = require('p-limit').default;



// GET / -> list all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, data: category });
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/category/create
router.post('/create', async (req, res) => {
  try {
    const limit = pLimit(2);

    // Ensure req.body.image is an array
    const images = Array.isArray(req.body.image) ? req.body.image : [req.body.image];

    // Validate images
    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, message: 'No images provided' });
    }

    // Upload each image
    const uploadPromises = images.map((img, index) => {
      return limit(async () => {
        // Base64
        if (typeof img === 'string' && img.startsWith('data:image/')) {
        
          const result = await CloudinaryUtils.uploadImage(img, `category_${Date.now()}_${index}`);
         

          return result.url;
        }
          console.log('UTILS:', CloudinaryUtils);
          console.log('TYPE:', typeof CloudinaryUtils.uploadImage);

        // External URL
        if (typeof img === 'string' && (img.startsWith('http://') || img.startsWith('https://'))) {
          // Optionally: upload URL to Cloudinary
          const result = await CloudinaryUtils.uploadImage(img, `category_${Date.now()}_${index}`);
          return result.url;
        }

        throw new Error('Invalid image format. Use base64 string or valid URL.');
      });
    });

    const imgUrls = await Promise.all(uploadPromises);

    // Save category in MongoDB
    const newCategory = new Category({
      name: req.body.name,
      color: req.body.color || '#ffffff',
      image: imgUrls
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      success: true,
      data: savedCategory,
      message: 'Category created successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    // First get the category to access image data
    const categoryToDelete = await Category.findById(categoryId);
    if (!categoryToDelete) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Delete associated images from Cloudinary if they exist
    if (categoryToDelete.image && categoryToDelete.image.length > 0) {
      try {
        // Extract public_ids from Cloudinary URLs
        const publicIds = categoryToDelete.image.map(imgUrl => {
          // Extract public_id from Cloudinary URL
          const parts = imgUrl.split('/');
          const filename = parts[parts.length - 1];
          const publicId = filename.split('.')[0];
          return publicId;
        }).filter(id => id); // Filter out any falsy values

        // Delete all images
        if (publicIds.length > 0) {
          await Promise.all(publicIds.map(publicId =>
            cloudinaryUtils.deleteImage(publicId).catch(err => {
              console.warn('Failed to delete image:', publicId, err.message);
            })
          ));
          console.log(`Deleted images: ${publicIds.join(', ')}`);
        }
      } catch (deleteErr) {
        console.warn('Failed to delete associated images:', deleteErr.message);
        // Continue with category deletion even if image deletion fails
      }
    }

    // Delete the category
    const removed = await Category.findByIdAndDelete(categoryId);

    res.json({
      success: true,
      message: 'Category and associated images deleted successfully',
      data: removed
    });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;
