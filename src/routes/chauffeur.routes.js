import express from 'express';
import {getTrajetsParChauffeur, lancerDepartTrajet, FinTrajet} from '../controllers/trajet.controller.js';



const router = express.Router();

router.get("/",  getTrajetsParChauffeur);
router.put("/:id/depart", lancerDepartTrajet)
router.put("/:id/arrivee", FinTrajet)


export default router;