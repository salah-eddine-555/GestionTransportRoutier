import Pneu from "../models/Pneu.js";



export const getAllPneus = async () => {
    return await Pneu.find();
};

export const getPneuById = async (id) => {
    const pneu = await Pneu.findById(id);

    if (!pneu) {
        throw new Error("Pneu introuvable");
    }

    return pneu;
};


export const createPneu = async (data) => {

    const existingPneu = await Pneu.findOne({
        numeroSerie: data.numeroSerie
    });

    if (existingPneu) {
        throw new Error("Un pneu avec ce numéro de série existe déjà");
    }

    return await Pneu.create(data);
};


export const updatePneu = async (id, data) => {

    const pneu = await Pneu.findById(id);

    if (!pneu) {
        throw new Error("Pneu introuvable");
    }

    if (
        data.numeroSerie &&
        data.numeroSerie !== pneu.numeroSerie
    ) {
        const existingPneu = await Pneu.findOne({
            numeroSerie: data.numeroSerie
        });

        if (existingPneu) {
            throw new Error(
                "Un pneu avec ce numéro de série existe déjà"
            );
        }
    }

    Object.assign(pneu, data);

    return await pneu.save();
};

export const deletePneu = async (id) => {

    const pneu = await Pneu.findById(id);

    if (!pneu) {
        throw new Error("Pneu introuvable");
    }

    await Pneu.findByIdAndDelete(id);

    return {
        message: "Pneu supprimé avec succès"
    };
};