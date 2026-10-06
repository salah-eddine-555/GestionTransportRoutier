import express from 'express';
import * as controller from '../controllers/trajet.controller.js';
import {assigneChauffeurToTrajet, assignCamionToTrajet} from '../controllers/assigniationTrajet.controller.js';

const router = express.Router();
router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);


//assigne
router.post("/:id/chauffeur", assigneChauffeurToTrajet);
router.post("/:id/camion", assignCamionToTrajet);


export default router;
