require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./db/connect');

// middleware
app.use(
  cors({
    origin: [
      'https://easy-buy-dusky.vercel.app',
      'http://127.0.0.1:5173',
      'https://easy-buy-arjunjunna.vercel.app',
      'https://easy-buy-git-dev-arjunjunna.vercel.app',
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');
const wishlistRoute = require('./routes/wishtlist');
const paymentRoute=require('./routes/payment');
const addressRoute=require('./routes/address');

const errorMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');




// routes
app.get('/', (req, res) => {
  res.status(200).send('Easy Buy Ecommerce API');
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/carts', cartRoute);
app.use('/api/v1/wishlist', wishlistRoute);
app.use('/api/v1/payment',paymentRoute);
app.use('/api/v1/address',addressRoute);

app.get('/api/v1/getkey', (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
