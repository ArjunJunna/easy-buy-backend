const CartModel=require('../models/cart');

const createCartIfNotExists = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const existingCart = await CartModel.findOne({ userId });

    if (!existingCart) {
      await CartModel.create({ userId, products: [] });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Could not create cart', details: error.message });
  }
};

module.exports=createCartIfNotExists;
