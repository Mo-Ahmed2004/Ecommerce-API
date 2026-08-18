import express from "express";
import {
    getOrderById,
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders
} from "../controllers/Order.controller";

const router = express.Router();

router.get("/" , getAllOrders);
router.post("/" , createOrder);

router.get("/:id" , getOrderById);
router.put("/:id" , updateOrder);
router.delete("/:id" , deleteOrder);

export default router;