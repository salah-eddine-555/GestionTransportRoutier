import express from 'express';
import {getTrajetsParChauffeur, lancerDepartTrajet} from '../controllers/trajet.controller.js';



const router = express.Router();

router.get("/",  getTrajetsParChauffeur);
router.put("/:id/depart", lancerDepartTrajet)


export default router;