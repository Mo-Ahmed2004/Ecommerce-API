//handle any unchaght syncronus js bugs
process.on("uncaughtException" , (err) => {
  console.error(`Uncaught Exception: ${err.name} | ${err.message}`);
  console.error('Shutting down server...');
  process.exit(1);
});

import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import morgan from "morgan"

import ApiError from "./utils/apiError.js"
import globalError from "./middlewares/errorMiddleware.js"
import categoryRoutes from './routers/category.routes.js';
import subCategoryRoutes from "./routers/subCategory.routes.js";
import brandRoutes from "./routers/brand.routes.js";
import productRoutes from './routers/product.routes.js';
import userRoutes from './routers/user.routes.js';
import orderRoutes from './routers/order.routes.js';
import authRoutes from "./routers/auth.routes.js";

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
app.use('/api/V1/subcategories' , subCategoryRoutes);
app.use('api/V1/brands' , brandRoutes);
app.use('/api/V1/products', productRoutes);
app.use('/api/V1/users', userRoutes);
app.use('/api/V1/orders', orderRoutes);
app.use('/api/V1/auth' , authRoutes);

//mounting invalid url requests
app.all(/(.*)/ , (req , res , next) => {
  next(new ApiError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

//express app global error handling
app.use(globalError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

//hanlde external promise rejections 
process.on("unhandledRejection" , (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
