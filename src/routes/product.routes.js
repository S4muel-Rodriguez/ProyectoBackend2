import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controller.js";
import { adminAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getProducts);
router.post("/", adminAuth, createProduct); // Solo admin puede crear productos

export default router;
