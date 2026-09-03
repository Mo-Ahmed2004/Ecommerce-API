import {check} from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export const signUpValidation = [
    check('name')
    .notEmpty()
    .withMessage('User required')
    .isLength({ min: 3 })
    .withMessage('Too short User name'),
    
    check("email")
    .isEmail()
    .withMessage("must be a valid email")
    .bail()
    .custom( async (val) => {
        const user = await User.findOne({email : val});
        if(user) throw new Error("email Must be unique");
    }),


    check("password")
    .notEmpty()
    .withMessage("User must have a password")
    .isLength({min : 6})
    .withMessage("too short password must be 6 or higher"),

    check("phone")
    .notEmpty()
    .withMessage("User must have a phone")
    .isMobilePhone('ar-EG')
    .bail()
    .custom( async (val) => {
        const user = await User.findOne({phone : val});
        if(user) throw new Error("Phone number already in use");
    }),

    validatorMiddleware,
];


export const signInValidation = [
    check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
    

    check("password")
    .notEmpty()
    .withMessage("you must enter the yours password")
    .isLength({min : 6})
    .withMessage("too short password must be 6 or higher"),

    validatorMiddleware


];

