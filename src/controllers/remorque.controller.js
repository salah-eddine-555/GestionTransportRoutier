import * as service from '../services/remorque.service.js'


export const getAllRemorque = async(req, res, next) =>{

    try{
        const remorques = await service.findAllRemorques();

        if(remorques.length === 0){
            return res.status(200).json({
                success: true,
                message: "Aucune  remorque cree jusqu'a maintenant "
            });
        }

        return res.status(200).json({
            success: true,
            message: 'les remorques sont recuperes avec succes',
            data: remorques
        })

    }catch(err){
        next(err);
    }
}

export const getRemorqueById = async (req, res, next) => {

    try {

        const remorque = await service.findRemorqueById(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Remorque récupérée avec succès",
            data: remorque
        });

    } catch (err) {
        next(err);
    }
};

export const createRemorque = async (req, res, next) => {

    try {
        const remorque = await service.createRemorque(req.body);

        return res.status(201).json({
            success: true,
            message: "Remorque créée avec succès",
            data: remorque
        });

    } catch (err) {
        next(err);
    }
};


export const updateRemorque = async (req, res, next) => {

    try {

        const remorque = await service.updateRemorque(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Remorque modifiée avec succès",
            data: remorque
        });

    } catch (err) {
        next(err);
    }
};



export const deleteRemorque = async (req, res, next) => {

    try {

        const result = await service.deleteRemorque(req.params.id);

        return res.status(200).json({
            success: true,
            ...result
        });

    } catch (err) {
        next(err);
    }
};
