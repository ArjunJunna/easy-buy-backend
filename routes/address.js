const router=require('express').Router();
const {
  addAddress,
  getAllAddresses,
  editAddressById,
  deleteAddressById,
} = require('../controllers/address');
const {verifyToken}=require('./verifyToken');

router.route('/').post(verifyToken,addAddress)

router.route('/:userId').get(verifyToken,getAllAddresses);

router
  .route('/:id')
  .put(verifyToken, editAddressById)
  .delete(verifyToken, deleteAddressById);

module.exports=router;



