import  authRoutes from "./auth.route";
import {Router} from "express";
const router = Router();

router.all('*', authRoutes);

export default router;