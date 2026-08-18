import Product from "../models/Product";

export const createProduct = async (req , res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);

    } catch (err) {
        res.status(400).json({message : err.message});
    }
};

export const getAllProducts = async (req , res) => {
    try {
        const products = await Product.find().populate("categoryId");
        res.status(200).json(products);

    } catch (err) {
        res.status(500).json({message : err.message});
    }
};

export const getProductById = async (req , res) => {
    try {
        const product = await Product.findById(req.params.id).populate("categoryId");
        if(!product) return res.status(404).json({message : "Product not found"});
        res.status(200).json(product);

    } catch (err) {
       res.status(500).json({message : err.message});
    }
};

export const updateProduct = async (req , res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id ,
            req.body ,
            {new : true , runValidators : true});
            if(!updatedProduct) return res.status(404).json({message : "Product not found"});
            res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({message : err.message});
    }
};

export const deleteProduct = async (req , res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct) return res.status(404).json({message : "product not found"});
        res.status(200).json(deletedProduct);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
};





