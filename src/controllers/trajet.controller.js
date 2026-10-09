import * as service from '../services/trajet.service.js';


export const getAll = async(req, res, next) => {
    console.log("trajet");
    try{
        const trajets = await service.getAllTrajets();
        
        return res.status(200).json({
            succes: true,
            messgae: 'les trajet est recuperes ',
            data: trajets
        });

    }catch(err){next(err)}
}

export const create = async(req, res, next) => {
    try{

        const trajet = await service.createTrajet(req.body);

        res.status(201).json({
            success: true,
            message: 'le trajet est cree avec succes',
            data: trajet
        });

    }catch(err){
        next(err);
    }
}

export const update = async(req, res, next) => {
    try{

        const trajet = await service.updateTrajet(req.params.id, req.body);
        
        return res.status(200).json({
            succes: true,
            message: 'le trajet est modifiee ',
            data: trajet
        });

    }catch(err){
        next(err);
    }
}


export const getTrajetsParChauffeur = async(req, res, next) => {
    // console.log("cheffeur ssss");
    try{
        // console.log(req.user.userId);
        const trajets  = await service.getTrajetsParChauffeur(req.user.userId);

        if(trajets.length === 0 ){
            return res.status(200).json({
                succes: true,
                'message': "acune trajet assigne pour vous jusqu'a maintenant",
                data: []
            });
        }

        return res.status(200).json({
            succes: true,
            message: "votre trajets est recuperers",
            data: trajets
        });

    }catch(err){
        console.log("teste error");
        next(err);
    }
}

export const lancerDepartTrajet = async(req, res, next) =>{
    try{
       
        const depart = await service.lancerDepart(req.params.id, req.user.userId, req.body);

        return res.status(200).json({
            succes: true,
            message: "Le départ du trajet a été enregistré avec succès",
            data: depart
        })
    }catch(err){
        next(err);
    }
}





