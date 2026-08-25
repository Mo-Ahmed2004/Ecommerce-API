import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import morgan from "morgan"


import categoryRoutes from './routers/category.routes.js';
import productRoutes from './routers/product.routes.js';
import userRoutes from './routers/user.routes.js';
import orderRoutes from './routers/order.routes.js';

dotenv.config();
connectDB();

const app = express();

//logging middleware for easier debugging in dev mode 
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

//parsing middlewares
app.use(express.json());
app.use(express.urlencoded());

//mounting routers with prefix
app.use('/api/V1/categories', categoryRoutes);
app.use('/api/V1/products', productRoutes);
app.use('/api/V1/users', userRoutes);
app.use('/api/V1/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
