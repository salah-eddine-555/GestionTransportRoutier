import express from 'express';
import * as controller from '../controllers/trajet.controller.js';
import {assigneChauffeurToTrajet, assignCamionToTrajet} from '../controllers/assigniationTrajet.controller.js';
import {createTrajetSchema, updateTrajetSchema} from '../validations/trajet.validation.js';
import validate from '../middlewares/validation.middleware.js';

const router = express.Router();
router.get("/", controller.getAll);
router.post("/",validate(createTrajetSchema), controller.create);
router.put("/:id", validate(updateTrajetSchema), controller.update);


//assigne
router.post("/:id/chauffeur", assigneChauffeurToTrajet);
router.post("/:id/camion", assignCamionToTrajet);


export default router;
