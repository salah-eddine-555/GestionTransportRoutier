import Remorque from '../models/Remorque.js';


export const findAllRemorques = async() => {

    return Remorque.find();
}


export const findRemorqueById = async (id) => {

    const remorque = await Remorque.findById(id);

    if (!remorque) {
        throw new Error("Remorque introuvable");
    }

    return remorque;
};


export const createRemorque = async (data) => {

    const remorque = await Remorque.create(data);

    return remorque;
};



export const updateRemorque = async (id, data) => {

    const remorque = await Remorque.findById(id);

    if (!remorque) {
        throw new Error("Remorque introuvable");
    }

    Object.assign(remorque, data);

    await remorque.save();

    return remorque;
};



export const deleteRemorque = async (id) => {

    const remorque = await Remorque.findById(id);

    if (!remorque) {
        throw new Error("Remorque introuvable");
    }

    remorque.archive = true;

    await remorque.save();

    return {
        message: "Remorque archivée avec succès"
    };
};