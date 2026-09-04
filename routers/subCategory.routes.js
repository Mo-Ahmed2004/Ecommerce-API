import express from "express";
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

router 
.route("/")
.post(protection , allowedTo("admin") , createSubCategoryValidation , createSubCategory)
.get(getAllSubCategories);

router
.route("/:id")
.get(getSubCategoryValidation ,getSubCategory)
.put(protection , allowedTo("admin") ,updateSubCategoryValidation , updateSubCategory)
.delete(protection , allowedTo("admin") , deleteSubCategoryValidation , deleteSubCategory);


export default router;