import express from "express";
import { ProductController } from "./products.controller";

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.findProduct);
router.get('/:id', ProductController.findSingleProduct);
router.put('/:id', ProductController.updateSingleProduct);
router.delete('/:id', ProductController.deleteProduct);

export const ProductRoutes = router;