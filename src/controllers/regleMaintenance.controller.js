
import {
    createRegle,
    getAllRegles,
    getRegleById,
    updateRegle,
    deleteRegle
} from "../services/ReglesMaintenance.service.js";


export const createRegleController = async (req, res, next) => {
    try {
        const regle = await createRegle(req.body);

        return res.status(201).json({
            status: "success",
            message: "Règle de maintenance créée avec succès",
            data: regle
        });
    } catch (error) {
        next(error)
    }
};


export const getAllReglesController = async (req, res, next) => {
    try {
        const regles = await getAllRegles();

        return res.status(200).json({
            status: "success",
            results: regles.length,
            data: regles
        });
    } catch (error) {
        next(error)
    }
};


export const getRegleByIdController = async (req, res, next) => {
    try {
        const regle = await getRegleById(req.params.id);

        return res.status(200).json({
            status: "success",
            data: regle
        });
    } catch (error) {
        next(error)
    }
};


export const updateRegleController = async (req, res, next) => {
    try {
        const regle = await updateRegle(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            status: "success",
            message: "Règle de maintenance modifiée avec succès",
            data: regle
        });
    } catch (error) {
        next(error)
    };
}
// DELETE : supprimer une règle
export const deleteRegleController = async (req, res, next) => {
    try {
        await deleteRegle(req.params.id);

        return res.status(200).json({
            status: "success",
            message: "Règle de maintenance supprimée avec succès"
        });
    } catch (error) {
        next(error);
    }

}
