import * as service from '../services/trajet.service.js';


export const getAll = async(req, res, next) => {
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



