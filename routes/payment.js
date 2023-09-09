const router = require('express').Router();

const { checkout,paymentVerification } = require('../controllers/payment');
const { verifyToken } = require('./verifyToken');

router.route('/checkout').post(verifyToken,checkout)
router.route('/paymentverification/:orderId').post(paymentVerification);

module.exports=router;