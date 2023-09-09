const CartModel = require('../models/cart');
const ProductModel = require('../models/product');

const getProductsFromCart=async(req,res)=>{
  try {
    const userId = req.body.userId;
    const cart = await CartModel.findOne({userId});
    if (!cart) {
      throw new Error('Cart not found');
    }

 
    const productIds = cart.products.map(product => product.productId);
    console.log('all products',productIds);
 
    const products = await ProductModel.find({ _id: { $in: productIds } });

     res.status(200).json(products);
  } catch (error) {
     res.status(500).json(error);
  }
}

const createCart = async (req, res) => {
  try {
    const userCart = await CartModel.findOne({ _cartId: req.user.id });
    if (userCart) {
      console.log('cart', userCart._id.toString());
      return res.status(200).json(userCart);
    }
    const newCart = await CartModel.create({
      _cartId: req.user.id,
      ...req.body,
    });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let userCart = await CartModel.findOne({ userId });

    if (userCart) {
      const existingProductIndex = userCart.products.findIndex(
        (product) => product.productId === productId
      );

      if (existingProductIndex !== -1) {
        userCart.products[existingProductIndex].quantity += quantity;
      } else {
        userCart.products.push({ productId, quantity });
      }
    } else {
      userCart = await CartModel.create({
        userId,
        products: [{ productId, quantity }],
      });
    }
   await userCart.save();
     const productIds = userCart.products.map(product => product.productId);
     console.log('all products', productIds);
     const products = await ProductModel.find({ _id: { $in: productIds } });

     res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProductFromCart=async(req,res)=>{
  try {
    const {userId,productId}=req.body;
    let userCart=await CartModel.findOne({userId});
    userCart.products=userCart.products.filter((product)=>product.productId!==productId)
    const updatedCart=await userCart.save();
   
    const productIds=updatedCart.products.map(product=>product.productId);
    const products=await ProductModel.find({_id:{$in:productIds}});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}

const updateCart = async (req, res) => {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    const deleteCart = await CartModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ msg: 'Cart has been deleted', deletedCart: deleteCart });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCart = async (req, res) => {
  try {
    const getCart = await CartModel.findOne({ userId: req.params.userId });
    res.status(200).json(getCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllCart = async (req, res) => {
  try {
    const carts = await CartModel.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addToCart,
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCart,
  deleteProductFromCart,
  getProductsFromCart,
};
