require('dotenv').config();

const connectDB=require('./db/connect');

const ProductModel=require('./models/product');

const productJsonData=require('./products.json');

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await ProductModel.deleteMany();
        await ProductModel.create(productJsonData);
        console.log('Success...');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();
