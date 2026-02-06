const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY || process.env.CLOUD_APL_KEY, // Fallback for backward compatibility
  api_secret: process.env.CLOUD_API_SECRET
});

// Create Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'martico_products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }]
  }
});

// Multer upload middleware
const upload = multer({ storage: storage });

// Utility functions for direct Cloudinary operations
const cloudinaryUtils = {
  // Upload a single image
  async uploadImage(fileBuffer, fileName) {
    try {
      const result = await cloudinary.uploader.upload(fileBuffer, {
        folder: 'martico_products',
        public_id: fileName,
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });
      return {
        url: result.secure_url,
        public_id: result.public_id
      };
    } catch (error) {
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  },

  // Upload multiple images
  async uploadMultipleImages(files) {
    try {
      const uploadPromises = files.map(async (file, index) => {
        const result = await cloudinary.uploader.upload(file.buffer, {
          folder: 'martico_products',
          public_id: `${Date.now()}_${index}`,
          transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto', fetch_format: 'auto' }
          ]
        });
        return {
          url: result.secure_url,
          public_id: result.public_id
        };
      });

      return Promise.all(uploadPromises);
    } catch (error) {
      throw new Error(`Cloudinary multiple upload failed: ${error.message}`);
    }
  },

  // Delete image by public_id
  async deleteImage(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new Error(`Cloudinary delete failed: ${error.message}`);
    }
  },

  // Delete multiple images
  async deleteMultipleImages(publicIds) {
    try {
      const result = await cloudinary.api.delete_resources(publicIds);
      return result;
    } catch (error) {
      throw new Error(`Cloudinary multiple delete failed: ${error.message}`);
    }
  },

  // Get image info
  async getImageInfo(publicId) {
    try {
      const result = await cloudinary.api.resource(publicId);
      return result;
    } catch (error) {
      throw new Error(`Cloudinary get info failed: ${error.message}`);
    }
  }
};

module.exports = {
  upload,
  cloudinary: cloudinaryUtils
};