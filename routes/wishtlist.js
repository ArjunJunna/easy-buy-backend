const router = require('express').Router();
const {
  verifyTokenAndAuthorization, verifyToken,
} = require('./verifyToken');

const {addToWishlist,deleteFromWishlist,getAllItemsFromWishlist}=require('../controllers/wishlist');

router
  .route('/:userId')
  .get(verifyToken, getAllItemsFromWishlist)
  .post(verifyToken, addToWishlist)
  .delete(verifyToken, deleteFromWishlist);

module.exports=router;  