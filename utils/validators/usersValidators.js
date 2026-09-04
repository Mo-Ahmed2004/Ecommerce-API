import {check} from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export const getUserByIdValidation = [
    check('id').isMongoId().withMessage("ID is requiered"),
    validatorMiddleware
];

export const deleteUserValidation = [
    check('id').isMongoId().withMessage("ID is requiered"),
    validatorMiddleware
];

export const updateUserValidation = [
    check('id').isMongoId()
    .withMessage("ID is requiered"),

    check('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Too short User name'),
    
    check("email")
    .optional()
    .isEmail()
    .withMessage("must be a valid email")
    .bail()
    .custom(async (val , {req}) => {
        const user = await User.findOne({email : val});
        if (user && user._id.toString() !== req.params.id) {
        throw new Error("Email must be unique");}
    }),

    check("phone")
    .optional()
    .isMobilePhone('ar-EG')
    .bail()
    .custom(async (val , {req}) => {
        const user = await User.findOne({phone : val});
        if (user && user._id.toString() !== req.params.id) {
        throw new Error("phone must be unique");}
    }),

    validatorMiddleware
];

export const adminChangePasswordValidation = [
  check("id").isMongoId().withMessage("Invalid User ID format"),

  check("password")
    .notEmpty()
    .withMessage("You must enter the new password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or longer"),

  validatorMiddleware,
];

// User self-service password change validation
export const userChangePasswordValidation = [
  check("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),

  check("confirmationPassword")
    .notEmpty()
    .withMessage("You must confirm the new password"),

  check("password")
    .notEmpty()
    .withMessage("You must enter the new password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or longer")
    .bail()
    .custom(async (value, { req }) => {
      const user = await User.findById(req.user._id).select("+password");
      if (!user) throw new Error("User no longer exists");

      const isMatching = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isMatching) throw new Error("Your current password is incorrect");

      if (value !== req.body.confirmationPassword) {
        throw new Error("Confirmation password does not match new password");
      }
    }),

  validatorMiddleware,
];

export const createUserValidation = [
    check('name')
    .notEmpty()
    .withMessage('User required')
    .isLength({ min: 3 })
    .withMessage('Too short User name'),
    
    check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
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