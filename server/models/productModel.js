const mongoose = require('mongoose');

const sizeAndStockSchema = new mongoose.Schema({
  size: {
    type: String,
    required: [true, 'Please provide a size'],
    trim: true,
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock for the size'],
    min: 0,
  }
}, { _id: false }); // prevents auto-generating _id for each subdoc

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
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Boys', 'Girls', 'Unisex'],
    required: [true, 'Please specify gender (Boys, Girls, or Unisex)'],
  },
  sizeAndStock: {
    type: [sizeAndStockSchema],
    required: [true, 'Please provide sizes and their stock quantities'],
    validate: [arrayLimit, 'Size variants exceed the limit of 20'],
    default: [],
  },
  images: {
    type: [String],
    validate: [imageLimit, '{PATH} exceeds the limit of 5'],
    default: [],
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual field for total stock
productSchema.virtual('totalStock').get(function () {
  return this.sizeAndStock.reduce((total, item) => total + item.stock, 0);
});

// Validation: max 20 size variants
function arrayLimit(val) {
  return val.length <= 20;
}

// Validation: max 5 images
function imageLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model('Product', productSchema);

