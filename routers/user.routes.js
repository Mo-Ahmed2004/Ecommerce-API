import express from "express";
import {
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    updateUserPassword,
    getMe,
    updateMe,
    changeMyPassword
} from "../controllers/user.controller.js";

import {
    updateUserValidation,
    deleteUserValidation,
    createUserValidation,
    getUserByIdValidation,
    userChangePasswordValidation,
    adminChangePasswordValidation
} from "../utils/validators/usersValidators.js";

import { protection , allowedTo} from "../controllers/auth.controller.js";

const router = express.Router();

router.use(protection);
//Private/Protected routes
router
.route("/me")
.get(getMe , getUserById)
.put(updateMe , updateUserValidation , updateUser);
router
.route("/me/changepassword")
.put(changeMyPassword , userChangePasswordValidation ,updateUserPassword)


//Private/protected/admin routes
router.use(allowedTo("admin"));

router
.route("/")
.get(getAllUsers)
.post(createUserValidation , createUser);

router
.route("/:id")
.get(getUserByIdValidation , getUserById)
.put(updateUserValidation , updateUser)
.post(adminChangePasswordValidation ,updateUserPassword)
.delete(deleteUserValidation , deleteUser);

export default router;