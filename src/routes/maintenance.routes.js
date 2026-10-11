import {verfierMaintenance, getAll} from '../controllers/maintenance.controller.js';
import express from 'express';

const router = express.Router();

router.get("/", getAll);
router.get("/verifier", verfierMaintenance);



export default router;