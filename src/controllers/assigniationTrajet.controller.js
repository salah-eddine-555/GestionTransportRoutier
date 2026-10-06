import {assignChauffeur, assignCamion} from '../services/trajet.service.js';


export const assigneChauffeurToTrajet = async(req, res, next) => {
    try{
        const {chauffeurId} = req.body;

        const assigne  = await assignChauffeur(req.params.id, chauffeurId);
        // console.log(assigne);
        return res.status(200).json({
            succes: true,
            message: "l'assigniation du chaffeur a ce trajet se fait avec succes ",
            data: assigne
        }); 

    }catch(err){
        next(err);
    }
}

export const assignCamionToTrajet = async(req, res, next) => {
    try{

        const {camionId}  = req.body;
        const assigne = await assignCamion(req.params.id, camionId);

        return res.status(200).json({
            succes: true,
            message: "le camion ete assignee a ce trajet ",
            data: assigne
        });
        
    }catch(err){
        next(err);
    }
}