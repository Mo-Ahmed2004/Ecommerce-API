import {check} from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const getCategoryByIdValidation = [
    check('id').isEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const deleteCategoryValidation = [
    check('id').isEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const updateCategoryValidation = [
    check('id').isEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const createCategoryValidation = [
    check('name')
    .notEmpty()
    .withMessage('Category required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name'),
    validatorMiddleware,
];