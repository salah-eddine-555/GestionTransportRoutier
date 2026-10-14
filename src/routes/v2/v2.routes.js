import express from 'express';
import {getStatistiques} from '../../controllers/statistiques.controller.js';



const router = express.Router();

// router.get("/test", (req, res, next) => {
//     console.log("teste versioning v2");
//     res.send({message: "teste"});
// })

// router pour recupere les statistique par chauffeur et leur score est total carburant consommee , distance parcouree
router.get("/analytics/drivers/eco-performance", getStatistiques);

router.get("/analytics/tires/health-matrix", (req, res) => { return res.send({message: 'hello tires'})});

export default router;