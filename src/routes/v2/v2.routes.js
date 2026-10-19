import express from 'express';
import {getStatistiques, analyticFinancial, getInformationsPneu, getUtilisationTrends} from '../../controllers/statistiques.controller.js';
import {analyticsLimiter} from  '../../middlewares/rateLimiter.middleware.js';



const router = express.Router();

router.use(analyticsLimiter);

// router.get("/test", (req, res, next) => {
//     console.log("teste versioning v2");
//     res.send({message: "teste"});
// })

// router pour recupere les statistique par chauffeur et leur score est total carburant consommee , distance parcouree
router.get("/analytics/drivers/eco-performance", getStatistiques);


router.get("/analytics/trips/financial-esg", analyticFinancial);

router.get("/analytics/tires/health-matrix", getInformationsPneu);
router.get("/analytics/fleet/utilization-trends", getUtilisationTrends)

export default router;