const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  img: { type: String, trim: true },
  name: { type: String, required: true, trim: true },
  color: { type: String, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);
