import express from "express";
import subCategoryRoutes from "./subCategory.routes.js";
import {
    getCategoryById,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";

import {
    getCategoryByIdValidation,
    updateCategoryValidation,
    deleteCategoryValidation,
    createCategoryValidation,
} from "../utils/validators/categoriesValidators.js";

import { protection , allowedTo} from "../controllers/auth.controller.js";

const router = express.Router();

//added to handle nested routing
router.use("/:categoryId/subcategories" , subCategoryRoutes);

router.get("/" , getAllCategories);
router.post("/" , protection , allowedTo("admin") ,createCategoryValidation , createCategory);

router.get("/:id" , getCategoryByIdValidation , getCategoryById);
router.put("/:id" ,protection , allowedTo("admin") ,updateCategoryValidation , updateCategory);
router.delete("/:id", protection , allowedTo("admin"), deleteCategoryValidation , deleteCategory);

export default router;