import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"


import categoryRoutes from './routers/category.routes.js';
import productRoutes from './routers/product.routes.js';
import userRoutes from './routers/user.routes.js';
import orderRoutes from './routers/order.routes.js';

dotenv.config();
connectDB();

const app = express();

//parsing middlewares
app.use(express.json());
app.use(express.urlencoded());

//end points
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
