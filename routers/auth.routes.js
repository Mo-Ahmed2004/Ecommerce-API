import express from "express";
import {
    signUp,
    signIn,
    forgotPassword,
    verifyResetCode,
    resetPassword
} from "../controllers/auth.controller.js";

import {
    signUpValidation,
    signInValidation
} from "../utils/validators/authValidators.js";



const router = express.Router();

router.post("/signup" , signUpValidation , signUp);
router.post("/signin" , signInValidation , signIn);

router.post("/forgotpassword" , forgotPassword);
router.post("/verifycode" , verifyResetCode);
router.put("/verifycode" , resetPassword);

export default router;