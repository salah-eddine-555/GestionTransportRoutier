
import express from "express";

import {
  createRegleController,
  getAllReglesController,
  getRegleByIdController,
  updateRegleController,
  deleteRegleController
} from "../controllers/regleMaintenance.controller.js";

const router = express.Router();

router.post("/", createRegleController);

router.get("/", getAllReglesController);

router.get("/:id", getRegleByIdController);

router.put("/:id", updateRegleController);

router.delete("/:id", deleteRegleController);


export default router;