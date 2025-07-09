// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: 2000,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0,
  },
  discountPrice: {
    type: Number,
    required: [true, 'Please provide a discountPrice'],
    min: 0,
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: 0,
    default: 0,
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    trim: true,
  },
  size: {
    type: [String], // e.g., ['S', 'M', 'L', 'XL']
    default: [],
  },
  gender: {
    type: String,
    enum: ['Boys', 'Girls', 'Unisex'],
    required: [true, 'Please specify gender (boys, girls, or unisex)'],
  },
  images: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
    default: [],
  },
}, {
  timestamps: true,
});

// Helper function to limit images to 5
function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model('Product', productSchema);
