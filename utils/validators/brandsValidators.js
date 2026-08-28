import {check} from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const getBrandByIdValidation = [
    check('id').isEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const deleteBrandValidation = [
    check('id').isEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const updateBrandValidation = [
    check('id').isEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const createBrandValidation = [
    check('name')
    .notEmpty()
    .withMessage('Brand required')
    .isLength({ min: 3 })
    .withMessage('Too short Brand name')
    .isLength({ max: 32 })
    .withMessage('Too long Brand name'),
    validatorMiddleware,
];