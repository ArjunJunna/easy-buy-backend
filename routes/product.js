const router = require('express').Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require('../controllers/product');

const { verifyTokenAndAdmin, verifyToken } = require('../routes/verifyToken');

router.route('/').post(verifyToken, createProduct).get(getAllProducts);
router
  .route('/:id')
  .put(verifyTokenAndAdmin, updateProduct)
  .get(getProduct)
  .delete(verifyTokenAndAdmin, deleteProduct);


module.exports = router;
