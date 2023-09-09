const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    rating: {
      type: { rate: Number, count: Number },
      default: { rate: 0, count: 0 },
    },
    discount: { type: Number },
    recommended: { type: Boolean,default:false },
    quantity:{type:Number,default:1}
  },
  { timestamps: true }
);

module.exports = mongoose.model('Products', ProductSchema);
