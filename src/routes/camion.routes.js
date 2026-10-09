import express from 'express';
import * as camionController from "../controllers/camion.controller.js";
import {createCamionSchema, updateCamionSchema} from '../validations/camion.validation.js';
import validate from '../middlewares/validation.middleware.js';


const router =  express.Router();

router.get("/",  camionController.getAll);
router.get("/:id", camionController.getById);
router.post("/", validate(createCamionSchema), camionController.create);
router.put("/:id",validate(updateCamionSchema), camionController.update);
router.delete("/:id", camionController.remove);

export default router;