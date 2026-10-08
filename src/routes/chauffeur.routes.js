import express from 'express';
import {getTrajetsParChauffeur} from '../controllers/trajet.controller.js';



const router = express.Router();

router.get("/",  getTrajetsParChauffeur);


export default router;