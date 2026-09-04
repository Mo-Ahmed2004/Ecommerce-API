import express from "express";
//import brandsRoutes from "./brand.routes.js";
import {
    getSubCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllSubCategories
} from "../controllers/subCategory.controller.js";

import {
    updateSubCategoryValidation,
    deleteSubCategoryValidation,
    createSubCategoryValidation,
    getSubCategoryValidation
} from "../utils/validators/subCategoriesValidators.js";

import { protection , allowedTo} from "../controllers/auth.controller.js";

const router = express.Router({mergeParams : true });

//router.use("/:subCategoryId/brands" , brandsRoutes);

router.post("/" , protection , allowedTo("admin") , createSubCategoryValidation , createSubCategory);
router.get("/" , getAllSubCategories);

router.get("/:id" , getSubCategoryValidation ,getSubCategory);
router.put("/:id" , protection , allowedTo("admin") ,updateSubCategoryValidation , updateSubCategory);
router.delete("/:id" , protection , allowedTo("admin") , deleteSubCategoryValidation , deleteSubCategory);

export default router;