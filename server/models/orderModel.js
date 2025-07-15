const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        size: {
          type: String,
          required: true,
        },
        priceAtPurchase: {
          type: Number,
          required: true,
        },
        discountPriceAtPurchase: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["cod", "upi", "card", "wallet", "netbanking"],
      default: "cod",
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
    pricingSummary: {
      totalMRP: { type: Number, required: true },
      totalDiscount: { type: Number, required: true },
      platformFee: { type: Number, required: true },
      couponDiscount: { type: Number, default: 0 },
      finalAmount: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    placedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
