import express from "express";
import {
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers
} from "../controllers/User.controller";

const router = express.Router();

router.get("/" , getAllUsers);
router.post("/" , createUser);

router.get("/:id" , getUserById);
router.put("/:id" , updateUser);
router.delete("/:id" , deleteUser);

export default router;