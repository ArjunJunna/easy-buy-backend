const PaymentModel = require('../models/payment');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: 'USD',
    };
    const order = await instance.orders.create(options);
    console.log('order response', order);
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json(error);
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
   
    const body = req.params.orderId + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest('hex');

    
    const isAuthentic = expectedSignature === razorpay_signature;
  

    if (isAuthentic) {
      
      await PaymentModel.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(`https://easy-buy-ecommerce.onrender.com/paymentsuccess?reference=${razorpay_payment_id}`);
      
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { checkout, paymentVerification };
