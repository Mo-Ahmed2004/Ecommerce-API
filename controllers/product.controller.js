import Product from "../models/Product.js";
import slugify from "slugify";
import asyncHanlder from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";


// @route POST /api/V1/products
// @access Private
export const createProduct = asyncHanlder( async (req , res) => {
    const {title , description , price , priceAfterDiscount , stock , 
        category, subCategory , brand , imageCover , 
    } = req.body;
    const product = new Product({
        title : title,
        slug : slugify(title),
        description : description,
        price : price,
        priceAfterDiscount : priceAfterDiscount,
        stock : stock, 
        category : category,
        subCategory : subCategory,
        brand  : brand,
        imageCover : imageCover
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
});

// @route GET /api/V1/products
// @access Puplic
export const getAllProducts = asyncHanlder( async (req , res) => {
    const features = new ApiFeatures(Product.find() , req.query)
    .filter()
    .search("Product")
    .sorting()
    .pagination()
    .fieldLimiting();
    const products = await features.baseQuery.populate({path : 'category' , select : 'name -_id'});
    res.status(200).json(products);
});

// @route GET /api/V1/products/:id
// @access Puplic
export const getProductById = asyncHanlder(async (req , res , next) => {
    const product = await Product.findById(req.params.id);
    if(!product) return next (new ApiError("Product not found" , 404));
    res.status(200).json(product);
});

// @route PUT /api/V1/products/:id
// @access Private
export const updateProduct = asyncHanlder ( async (req , res , next) => {
    
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id ,
    req.body ,
    {new : true , runValidators : true});
    if(!updatedProduct) return next (new ApiError("Product not found" , 404));
    res.status(200).json(updatedProduct);
   
});

// @route DELETE /api/V1/products/:id
// @access Private
export const deleteProduct = asyncHanlder (async (req , res , next) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if(!deletedProduct) return next (new ApiError("Product not found" , 404));
    res.status(200).json(deletedProduct);
});