import express from "express";
import {
    getOrderById,
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/" , getAllOrders);
router.post("/" , createOrder);

router.get("/:id" , getOrderById);
router.put("/:id" , updateOrder);
router.delete("/:id" , deleteOrder);

export default router;