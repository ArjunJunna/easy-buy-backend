const router = require('express').Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  getIncome,
} = require('../controllers/order');

router.route('/').post(verifyToken, createOrder);

router.route('/:userId').get(verifyToken, getAllOrder);

router
  .route('/:id')
  .put(verifyTokenAndAdmin, updateOrder)
  .delete(verifyTokenAndAdmin, deleteOrder)
  .get(verifyTokenAndAuthorization, getOrder);

router.route('/income').get(verifyTokenAndAdmin, getIncome);

module.exports = router;
