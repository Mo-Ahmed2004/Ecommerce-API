import {check} from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const getProductValidation = [
    check('id').notEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const deleteProductValidation = [
    check('id').notEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const updateProductValidation = [
    check('id').notEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const createProductValidation = [
    check('title')
    .notEmpty()
    .withMessage('product  title required')
    .isLength({ min: 10 })
    .withMessage('Too short product name')
    .isLength({ max: 100 })
    .withMessage('Too long product name'),


    check("descreption")
    .notEmpty()
    .withMessage("descreption is requeired")
    .isLength({ min: 20 })
    .withMessage('Too short product name')
    .isLength({ max: 2000 })
    .withMessage('Too long product name'),

    check("price")
    .notEmpty()
    .withMessage("price is requeired")
    .isNumeric()
    .withMessage("price must be numeric"),

    check("priceAfterDiscount")
    .notEmpty()
    .withMessage("final price must be stated")
    .isNumeric()
    .toFloat()
    .withMessage("price must be numeric")
    .custom ((value , {req}) => {
        if(req.body.price <= value) throw new Error ("final price must be lower than price");
        return true;
    }),

    check("stock")
    .notEmpty()
    .withMessage("stock must be stated")
    .isNumeric()
    .withMessage("stock must be numeric"),

   
    check("category")
    .notEmpty()
    .withMessage("product must belong to category")
    .isMongoId()
    .withMessage("Must be valid mongoId"),


    check("subSategory")
    .notEmpty()
    .withMessage("product must belong to subcategory")
    .isMongoId()
    .withMessage("Must be valid mongoId"),


    check("brand")
    .notEmpty()
    .withMessage("product must belong to brand")
    .isMongoId()
    .withMessage("Must be valid mongoId"),

    check("imageCover")
    .notEmpty()
    .withMessage("there must be a cover image"),

    check("sold")
    .optional()
    .isNumeric()
    .withMessage("sold must be a number"),


    check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingQuantity must be a number"),


    check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("average must be a number")
    .isLength({max: 1})
    .withMessage("rating avg is between 1 and 5"),

    check("images")
    .optional()
    .isArray()
    .withMessage("images must be array of strings"),


    check("colors")
    .optional()
    .isArray()
    .withMessage("colors must be array of strings"),



    validatorMiddleware,
];