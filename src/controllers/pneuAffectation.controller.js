import { affecterPneu, retierePneu, historiques} from "../services/pneuAffectation.service.js";

export const createAffectation = async (req, res, next) => {
    try {
        const { pneuId, camionId } = req.params;

        const affectation = await affecterPneu(
            pneuId,
            camionId,
            req.body
        );

        res.status(201).json({
            message: "Pneu affecté au camion avec succès",
            affectation
        });

    } catch (error) {
        next(error);
    }
};

export const retiererPneu = async(req, res, next) => {
    try{
        const affectation = await retierePneu(req.params.id, req.body);

        return res.status(200).json({
            succes: true,
            message: "le pneu est retiere sans probleme",
            data: affectation
        })

    }catch(err){
        next(err);
    }
}

    export const historiquesAffecations = async(req, res, next) => {

        try{
            const affectationPneu = await historiques(req.params.pneuId);

            return res.status(200).json({
                succes: true,
                message: 'historique des affectations pour ce pneu',
                data: affectationPneu
            });

        }catch(err){
            next(err);
        }
    }