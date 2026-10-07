import * as pneuService from "../services/pneu.service.js";


export const getAllPneus = async (req, res, next) => {
    try {

        const pneus = await pneuService.getAllPneus();

        res.status(200).json({
            success: true,
            data: pneus
        });

    } catch (error) {
        next(error);
    }
};

export const getPneuById = async (req, res, next) => {
    try {

        const pneu = await pneuService.getPneuById(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: pneu
        });

    } catch (error) {
        next(error);
    }
};


export const createPneu = async (req, res, next) => {
    try {

        const pneu = await pneuService.createPneu(
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Pneu créé avec succès",
            data: pneu
        });

    } catch (error) {
        next(error);
    }
};

export const updatePneu = async (req, res, next) => {
    try {

        const pneu = await pneuService.updatePneu(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Pneu modifié avec succès",
            data: pneu
        });

    } catch (error) {
        next(error);
    }
};

export const deletePneu = async (req, res, next) => {
    try {

        const result = await pneuService.deletePneu(
            req.params.id
        );

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {
        next(error);
    }
};