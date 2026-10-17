import {getStatistquesParChauffeur, getInformationsPneus, getAnalyticFinancial} from '../services/statistiques.service.js'


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


export const getInformationsPneu = async(req, res, next) => {

    try{

        const informations = await getInformationsPneus();
        
        return res.status(200).json({
            success: true,
            messgae: "l'etats des penus est recupere ",
            data:  informations
        });

    }catch(err){
        next(err);
    }
}


export const analyticFinancial = async(req, res, next) => {

    try{
        const {startDate, endDate} = req.query;
 

        const info = await getAnalyticFinancial(startDate, endDate);

        return res.status(200).json({
            succes: true,
            message: "les infor finaniales est recupere",
            data: info
        })
    }catch(err){
        console.log(err);
    }
}