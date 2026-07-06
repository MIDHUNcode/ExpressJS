import { Router } from "express";
import  productRoutes  from "./Products.mjs";
import userRoutes  from "./User.mjs";

const router = Router();

router.use(userRoutes);
router.use(productRoutes);

export default router;