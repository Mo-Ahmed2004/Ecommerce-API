import express from "express";
import {
    getCategoryById,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/" , getAllCategories);
router.post("/" , createCategory);

router.get("/:id" , getCategoryById);
router.put("/:id" , updateCategory);
router.delete("/:id" , deleteCategory);

export default router;