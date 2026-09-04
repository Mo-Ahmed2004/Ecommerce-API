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

router.get("/" , getAllProducts);
router.post("/" , protection , allowedTo("admin") , createProductValidation , createProduct);

router.get("/:id" , getProductValidation , getProductById);
router.put("/:id" ,protection , allowedTo("admin") , updateProductValidation , updateProduct);
router.delete("/:id" ,protection , allowedTo("admin") , deleteProductValidation , deleteProduct);

export default router;