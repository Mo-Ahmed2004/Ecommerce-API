import {check} from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const getSubCategoryValidation = [
    check('id').notEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const deleteSubCategoryValidation = [
    check('id').notEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const updateSubCategoryValidation = [
    check('id').notEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const createSubCategoryValidation = [
    check('name')
    .notEmpty()
    .withMessage('Category required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name'),
    check("categoryId")
    .notEmpty()
    .withMessage("must be referencd to parent category")
    .isMongoId()
    .withMessage("must be valid ID"),
    validatorMiddleware,
];