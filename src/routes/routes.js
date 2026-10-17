import express from 'express'
import * as authController from '../controllers/auth.controller.js';
import validate from '../middlewares/validation.middleware.js';
import {registerSchema} from '../validations/auth.validation.js';
import camionRoutes from "./camion.routes.js";
import RemorqueRoutes from "./remorque.routes.js";
import TrajetRoutes from './trajet.routes.js';
import PneuRoutes from './pneu.routes.js';
import PneuAffectationRoutes from './pneuAffectation.routes.js';
import chauffeurRoutes from './chauffeur.routes.js';
import reglesRoutes from './reglesMaintenances.routes.js';
import mainteancesRoutes from './maintenance.routes.js';

import { verifyToken, isAdmin, isChauffeur } from "../middlewares/auth.middleware.js";
import {authLimiter} from '../middlewares/rateLimiter.middleware.js';



const router = express.Router();

router.post("/register",validate(registerSchema), authController.register);

router.post("/login", authLimiter, authController.login);
router.post("/logout", verifyToken, authController.logout);


router.use("/mes-trajets", verifyToken, isChauffeur, chauffeurRoutes);

router.use("/camions", verifyToken, isAdmin, camionRoutes);

router.use("/remorques", verifyToken, isAdmin, RemorqueRoutes);
router.use("/trajets", verifyToken, isAdmin, TrajetRoutes);

router.use("/pneus", verifyToken, isAdmin, PneuRoutes);

router.use("/pneu-affectations", verifyToken, isAdmin, PneuAffectationRoutes)

router.use("/regles-maintenances", verifyToken, isAdmin, reglesRoutes);

router.use('/maintenances', verifyToken, isAdmin, mainteancesRoutes);









export default router;

