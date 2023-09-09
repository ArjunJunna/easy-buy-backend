const WishtlistModel=require('../models/wishlist');
const ProductModel = require('../models/product');

const addToWishlist=async(req,res)=>{
    try {
        const {userId,productId}=req.body;
        let wishlist=await WishtlistModel.findOne({userId});
        if(wishlist){
            wishlist.products.push({productId});
            await wishlist.save();
        }
        else{
            wishlist=await WishtlistModel.create({userId,products:[{productId}]})
        }
    const productIds = wishlist.products.map(product => product.productId);
     const products = await ProductModel.find({ _id: { $in: productIds } });

     res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteFromWishlist=async(req,res)=>{
    try {
        const {userId,productId}=req.body;
        let wishlist=await WishtlistModel.findOne({userId});
        wishlist.products=wishlist.products.filter((product)=>product.productId!==productId);
        const updatedWishlist=await wishlist.save();
          const productIds=updatedWishlist.products.map(product=>product.productId);
    const products=await ProductModel.find({_id:{$in:productIds}});
    res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllItemsFromWishlist=async(req,res)=>{
    try {
        const wishlist=await WishtlistModel.findOne({ userId: req.params.userId });
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports={addToWishlist,deleteFromWishlist,getAllItemsFromWishlist}