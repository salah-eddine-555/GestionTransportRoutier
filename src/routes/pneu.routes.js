import express from 'express';
import * as controller from '../controllers/pneu.controller.js';
import validate from '../middlewares/validation.middleware.js';
import {createPneuSchema} from '../validations/pneu.validaton.js';





const router = express.Router();

router.get("/", controller.getAllPneus);

router.get("/:id", controller.getPneuById);


router.post("/", validate(createPneuSchema), controller.createPneu);

router.put("/:id", controller.updatePneu);

router.delete("/:id", controller.deletePneu);


export default router;
