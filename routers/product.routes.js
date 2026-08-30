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

const router = express.Router();

router.get("/" , getAllProducts);
router.post("/" , createProductValidation , createProduct);

router.get("/:id" , getProductValidation , getProductById);
router.put("/:id" , updateProductValidation , updateProduct);
router.delete("/:id" , deleteProductValidation , deleteProduct);

export default router;