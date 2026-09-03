import express from "express";
import {
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    updateUserPassword
} from "../controllers/user.controller.js";

import {
    updateUserValidation,
    deleteUserValidation,
    createUserValidation,
    getUserByIdValidation,
    changePasswordValidation
} from "../utils/validators/usersValidators.js";

const router = express.Router();

router.get("/" , getAllUsers);
router.post("/" , createUserValidation , createUser);

router.get("/:id" , getUserByIdValidation , getUserById);
router.put("/:id" , updateUserValidation , updateUser);
router.put("/changePassword/:id" , changePasswordValidation , updateUserPassword);
router.delete("/:id" , deleteUserValidation , deleteUser);

export default router;