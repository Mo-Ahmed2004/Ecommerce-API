import express from "express";
import {
    getProductById,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/Product.controller";

const router = express.Router();

router.get("/" , getAllProducts);
router.post("/" , createProduct);

router.get("/:id" , getProductById);
router.put("/:id" , updateProduct);
router.delete("/:id" , deleteProduct);

export default router;