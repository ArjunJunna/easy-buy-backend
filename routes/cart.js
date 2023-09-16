const router = require('express').Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');
const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCart,
  addToCart,
  deleteProductFromCart,
  getProductsFromCart,
} = require('../controllers/cart');

router
  .route('/')
  .post(verifyToken, createCart)
  //.get(verifyTokenAndAuthorization, getProductsFromCart);
    //.get(verifyTokenAndAdmin, getAllCart)
router
  .route('/:id')
  .put(verifyTokenAndAuthorization, updateCart)
  //.delete(verifyToken,deleteCart)
  
router
  .route('/:userId')
  .get(verifyToken, getProductsFromCart)
  .post(verifyToken, addToCart)
  .delete(verifyToken, deleteProductFromCart);

module.exports = router;
