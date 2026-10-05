import express from 'express'
import * as authController from '../controllers/auth.controller.js';
import camionRoutes from "./camion.routes.js";
import RemorqueRoutes from "./remorque.routes.js";

import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";



const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", verifyToken, authController.logout);


router.use("/", verifyToken, isAdmin, camionRoutes);
router.use("/remorques", verifyToken, isAdmin, RemorqueRoutes);







export default router;

