import express from "express";
import * as remorqueController from "../controllers/remorque.controller.js";
import {createRemorqueSchema, updateRemorqueSchema} from '../validations/remorque.validation.js';
import validate from '../middlewares/validation.middleware.js';

const router = express.Router();

router.get("/", remorqueController.getAllRemorque);

router.get("/:id", remorqueController.getRemorqueById);

router.post("/", validate(createRemorqueSchema), remorqueController.createRemorque);

router.put("/:id", validate(updateRemorqueSchema), remorqueController.updateRemorque);

router.delete("/:id", remorqueController.deleteRemorque);

export default router;