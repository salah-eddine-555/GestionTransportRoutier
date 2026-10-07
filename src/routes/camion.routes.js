import express from 'express';
import * as camionController from "../controllers/camion.controller.js";
import {createCamionSchema, updateCamionSchema} from '../validations/camion.validation.js';
import validate from '../middlewares/validation.middleware.js';


const router =  express.Router();

router.get("/camions",  camionController.getAll);
router.get("/camions/:id", camionController.getById);
router.post("/camions", validate(createCamionSchema), camionController.create);
router.put("/camions/:id",validate(updateCamionSchema), camionController.update);
router.delete("/camions/:id", camionController.remove);

export default router;