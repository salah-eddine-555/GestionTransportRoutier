import express from "express";
import * as remorqueController from "../controllers/remorque.controller.js";

const router = express.Router();

router.get("/", remorqueController.getAllRemorque);

router.get("/:id", remorqueController.getRemorqueById);

router.post("/", remorqueController.createRemorque);

router.put("/:id", remorqueController.updateRemorque);

router.delete("/:id", remorqueController.deleteRemorque);

export default router;