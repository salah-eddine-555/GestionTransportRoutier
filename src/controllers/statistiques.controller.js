import {getStatistquesParChauffeur} from '../services/statistiques.service.js'


export const getStatistiques = async(req, res, next) => {

    try{
        const results = await getStatistquesParChauffeur();

        return res.status(200).json({
            success: true,
            message: "les statistique du trajte par chaufeur",
            data: results
        });
        
    }catch(err){
        next(err);
    }
} 