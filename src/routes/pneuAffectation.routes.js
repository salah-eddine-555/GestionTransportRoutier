import express from 'express';
import { createAffectation, retiererPneu, historiquesAffecations} from "../controllers/pneuAffectation.controller.js";


const router = express.Router();


router.get("/pneu/:pneuId", historiquesAffecations);

router.post(
    "/:pneuId/camion/:camionId",
    createAffectation
);

router.put("/:id/retrait", retiererPneu)


export default router;