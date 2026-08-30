import express from "express";
import {
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    getAllBrands
} from "../controllers/brand.controller.js";

import {
    updateBrandValidation,
    deleteBrandValidation,
    createBrandValidation,
    getBrandByIdValidation
} from "../utils/validators/brandsValidators.js";

const router = express.Router({mergeParams : true });

router.post("/" , createBrandValidation , createBrand);
router.get("/" , getAllBrands);

router.get("/:id" , getBrandByIdValidation ,getBrand);
router.put("/:id" , updateBrandValidation , updateBrand);
router.delete("/:id" , deleteBrandValidation , deleteBrand);

export default router;