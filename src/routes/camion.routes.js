import express from 'express';
import * as camionController from "../controllers/camion.controller.js";


const router =  express.Router();

router.get("/camions", camionController.getAll);
router.get("/camions/:id", camionController.getById);
router.post("/camions", camionController.create);
router.put("/camions/:id", camionController.update);
router.delete("/camions/:id", camionController.remove);

export default router;