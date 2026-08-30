import {check} from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import Category from "../../models/Category.js"
import SubCategory from "../../models/SubCategory.js"


export const getProductValidation = [
    check('id').isMongoId().withMessage("Invalid ID format").notEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const deleteProductValidation = [
    check('id').isMongoId().withMessage("Invalid ID format").notEmpty().withMessage("ID is requiered"),
    validatorMiddleware
];

export const updateProductValidation = [
    check('id').isMongoId().withMessage("Invalid ID format").notEmpty().withMessage("ID is requiered"),
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


    check("description")
    .notEmpty()
    .withMessage("descreption is requeired")
    .isLength({ min: 20 })
    .withMessage('Too short description name')
    .isLength({ max: 2000 })
    .withMessage('Too long description name'),

    check("price")
    .notEmpty()
    .withMessage("price is requeired")
    .isNumeric()
    .withMessage("price must be numeric"),

    check("priceAfterDiscount")
    .optional()
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
    .withMessage("Must be valid mongoId")
    .bail() // stops asynchronus custom if previous fails
    .custom( async (val) => {
       const category = await Category.findById(val)
       if(!category) throw new Error("Category of the product not found");
    }),


    check("subCategory")
    .notEmpty()
    .withMessage("product must belong to subcategory")
    .isMongoId()
    .withMessage("Must be valid mongoId")
    .bail()
    .custom( async (val , {req}) => {
       const subcategory = await SubCategory.findById(val)
       if(!subcategory) throw new Error("SubCategory of the product not found");
       
       if (subcategory.categoryId.toString() !== req.body.category) {
       throw new Error("SubCategory does not belong to the specified Category");
    }
    }),


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
    .isFloat({min : 1 , max : 5})
    .withMessage("Rating average must be between 1.0 and 5.0"),

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