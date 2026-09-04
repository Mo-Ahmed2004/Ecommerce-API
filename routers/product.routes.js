import express from "express";
import {
    getProductById,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";

import {
    updateProductValidation,
    deleteProductValidation,
    createProductValidation,
    getProductValidation
} from "../utils/validators/productsValidators.js";

import { protection , allowedTo} from "../controllers/auth.controller.js";


const router = express.Router();

router
.route("/")
.get(getAllProducts)
.post(protection , allowedTo("admin") , createProductValidation , createProduct);

router
.route("/:id")
.get(getProductValidation , getProductById)
.put(protection , allowedTo("admin") , updateProductValidation , updateProduct)
.delete(protection , allowedTo("admin") , deleteProductValidation , deleteProduct);

export default router;