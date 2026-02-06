const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const { upload, cloudinary } = require('../utils/cloudinary');
const { rateLimiter } = require('../utils/rateLimiter');


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

// GET /:id -> get category by id
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

// LEGACY: Single-step create (kept for backward compatibility)
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { name, color } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });

    // Handle image upload if provided
    let imageUrl = req.body.img || null; // Use existing img URL if provided
    
    if (req.file) {
      // Use uploaded image from Cloudinary
      imageUrl = req.file.path;
    }

    const newCategory = new Category({ 
      name, 
      img: imageUrl, 
      color 
    });
    
    const saved = await newCategory.save();
    res.status(201).json({ 
      success: true, 
      data: saved,
      message: 'Category created successfully'
    });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /batch -> create multiple categories with rate limiting
router.post('/batch', async (req, res) => {
  try {
    const { categories } = req.body;
    
    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Categories array is required' 
      });
    }

    // Process categories with concurrency control
    const results = await rateLimiter.processBatch(
      categories,
      async (categoryData) => {
        const { name, img, color } = categoryData;
        
        if (!name) {
          throw new Error('Category name is required');
        }
        
        const newCategory = new Category({ name, img, color });
        return await newCategory.save();
      },
      5 // Process 5 categories at a time
    );

    res.status(201).json({
      success: true,
      message: `${results.length} categories created successfully`,
      data: results
    });
  } catch (err) {
    console.error('Error creating batch categories:', err);
    res.status(500).json({ 
      success: false, 
      message: err.message || 'Server error during batch creation' 
    });
  }
});

// PUT /:id -> update a category with optional image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updateData = { ...req.body };
    
    // Handle image update if new image uploaded
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      const existingCategory = await Category.findById(categoryId);
      if (existingCategory && existingCategory.img) {
        try {
          // Extract public_id from Cloudinary URL
          const publicId = existingCategory.img.split('/').pop().split('.')[0];
          if (publicId) {
            await cloudinary.deleteImage(publicId);
          }
        } catch (deleteErr) {
          console.warn('Failed to delete old image:', deleteErr.message);
        }
      }
      
      // Use new uploaded image
      updateData.img = req.file.path;
    }

    const updated = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Category not found' });
    
    res.json({ 
      success: true, 
      data: updated,
      message: 'Category updated successfully'
    });
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /:id -> delete a category and associated image
router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    
    // First get the category to access image data
    const categoryToDelete = await Category.findById(categoryId);
    if (!categoryToDelete) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Delete associated image from Cloudinary if it exists
    if (categoryToDelete.img) {
      try {
        // Extract public_id from Cloudinary URL
        const publicId = categoryToDelete.img.split('/').pop().split('.')[0];
        if (publicId) {
          await cloudinary.deleteImage(publicId);
          console.log(`Deleted image: ${publicId}`);
        }
      } catch (deleteErr) {
        console.warn('Failed to delete associated image:', deleteErr.message);
        // Continue with category deletion even if image deletion fails
      }
    }

    // Delete the category
    const removed = await Category.findByIdAndDelete(categoryId);
    
    res.json({ 
      success: true, 
      message: 'Category and associated image deleted successfully',
      data: removed
    });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /stats -> get category statistics
router.get('/stats/count', async (req, res) => {
  try {
    const totalCategories = await Category.countDocuments();
    const recentCategories = await Category.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      success: true,
      data: {
        total: totalCategories,
        recent: recentCategories
      }
    });
  } catch (err) {
    console.error('Error fetching category stats:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /bulk-delete -> delete multiple categories with rate limiting
router.post('/bulk-delete', async (req, res) => {
  try {
    const { categoryIds } = req.body;
    
    if (!categoryIds || !Array.isArray(categoryIds)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Category IDs array is required' 
      });
    }

    // Process deletions with concurrency control
    const deletionResults = await rateLimiter.limitDbOperations(
      categoryIds.map(id => async () => {
        const category = await Category.findById(id);
        if (category && category.img) {
          try {
            const publicId = category.img.split('/').pop().split('.')[0];
            if (publicId) {
              await cloudinary.deleteImage(publicId);
            }
          } catch (err) {
            console.warn(`Failed to delete image for category ${id}:`, err.message);
          }
        }
        return await Category.findByIdAndDelete(id);
      })
    );

    const successfulDeletions = deletionResults.filter(result => result !== null);
    
    res.json({
      success: true,
      message: `${successfulDeletions.length} categories deleted successfully`,
      data: {
        deletedCount: successfulDeletions.length,
        totalRequested: categoryIds.length
      }
    });
  } catch (err) {
    console.error('Error in bulk delete:', err);
    res.status(500).json({ 
      success: false, 
      message: err.message || 'Server error during bulk deletion' 
    });
  }
});

module.exports = router;
