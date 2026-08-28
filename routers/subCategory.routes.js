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

const router = express.Router({mergeParams : true });

router.use("/:subCategoryId/brands" , brandsRoutes);

router.post("/" , createSubCategoryValidation , createSubCategory);
router.get("/" , getAllSubCategories);

router.get("/:id" , getSubCategoryValidation ,getSubCategory);
router.put("/:id" , updateSubCategoryValidation , updateSubCategory);
router.delete("/:id" , deleteSubCategoryValidation , deleteSubCategory);

export default router;