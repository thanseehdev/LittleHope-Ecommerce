const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  landmark: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    required: true,
    match: /^[1-9][0-9]{5}$/,
    trim: true
  },
  mobileNo: {
    type: String,
    required: true,
    trim: true
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true 
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
