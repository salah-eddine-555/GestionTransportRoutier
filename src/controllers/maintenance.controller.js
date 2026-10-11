import { VerifierMaintenance, getAllMaintenances } from '../services/maintenance.service.js';



export const getAll = async(req, res, next) => {
    try{
        const maintenances = await getAllMaintenances();

        return res.status(200).json({
            succes: true,
            message: 'tous les maintenaces est recupere',
            data: maintenances
        });

    }catch(err){
        next(err);
    }
}

export const verfierMaintenance = async(req, res, next) => {    
    try{
        const resultat = await VerifierMaintenance();

        return res.status(200).json({
            succes: true,
            ...resultat,
        })
        
    }catch(err){
        next(err);
    }
}