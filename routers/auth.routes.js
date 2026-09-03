import express from "express";
import {
    signUp,
    signIn,
} from "../controllers/auth.controller.js";

import {
    signUpValidation,
    signInValidation
} from "../utils/validators/authValidators.js";



const router = express.Router();

router.post("/signup" , signUpValidation , signUp);
router.post("/signin" , signInValidation , signIn);

export default router;