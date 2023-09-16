const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Object,
        required: true,
      },
    ],
  
    amount: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: Object,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
  
);

module.exports = mongoose.model('Order', OrderSchema);
