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

import { protection , allowedTo} from "../controllers/auth.controller.js";

const router = express.Router({mergeParams : true });

router
.route("/")
.get(protection , allowedTo("admin") , createBrandValidation , createBrand)
.post(getAllBrands);

router
.route("/:id")
.get(getBrandByIdValidation ,getBrand)
.put(protection , allowedTo("admin") , updateBrandValidation , updateBrand)
.delete(protection , allowedTo("admin") , deleteBrandValidation , deleteBrand);

export default router;