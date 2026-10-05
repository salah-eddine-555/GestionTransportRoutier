import * as service from '../services/camion.service.js';



export const create = async(req, res, next) => {

    try{

        const camion = await service.createCamion(req.body);

        return res.status(201).json({
            success: true,
            message: 'le camion est cree avec succes',
            data: camion
        })

    }catch(err){
        next(err);
    }
}

export const getAll = async(req, res, next) => {
    try{   
        const camions = await service.getAllCamion();
        
  
        return res.status(200).json({
            success: true,
            message: 'les camions recuperes avec succes',
            data: camions
        })
    }catch(err){
        next(err)
    }
}

export const getById = async(req, res, next) => {

    try{
        const id = req.params.id;
        const camion = await service.getCamionById(id);

        if(!camion){
            return res.status(404).json({
                success: false,
                message: "cette camion n'est pas existe ! "
            })
        }

        return res.status(200).json({
            success: true,
            message: 'le camion est recupere avec succes',
            data: camion
        });
    }catch(err){
        next(err);
    }
}

export const update = async(req, res, next) => {

    try{
        
        const camion = await service.updateCamion(req.params.id, req.body);

        if(!camion){
            return res.status(404).json({
                success: false,
                messsage: "cette camion n'est pas existe "
            });
        }

        return res.status(200).json({
            success: true,
            message: "le camion ete modifier avec succes",
            data : camion
        });

    }catch(err){
        next(err)
    }
}

export const remove = async(req, res, next) =>{

    try{
        const camion = await service.removeCamion(req.params.id);

        if(!camion){
            return res.status(404).json({
                success: false,
                message:" cette camion n'est pas existe !"
            });
        }

        return res.status(200).json({
            success: true,
            message: 'cette camion est supprimee avec succes '
        });

    }catch(err){
        next(err);
    }
}