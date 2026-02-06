const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  image:{
     type: String, 
     required: true,
  },
  imagePublicId: {
    type: String,
    trim: true
  },
  brand: { 
    type: String, 
    trim: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  countInStock: { 
    type: Number, 
    default: 0,
    min: 0
  },
  rating: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 5
  },
  number: { 
    type: String,
    trim: true
  },
  review: [{ 
    type: String,
    trim: true
  }],
  inFeatured: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
