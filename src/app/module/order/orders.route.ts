import express from "express";
import { OrderController } from "./orders.controller";

const router = express.Router();

router.post('/', OrderController.createOrder);

router.get('/', OrderController.fetchOrder);



export const OrderRoutes = router;