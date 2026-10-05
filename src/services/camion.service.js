import Camion from '../models/Camion.js';


export const createCamion = async (data) => {

    return await Camion.insertOne(data);

}


export const getAllCamion = async () => {
    return await Camion.find();

}
export const getCamionById = async(id) => {

    const camions = await getAllCamion();

    return camions.find(c => c.id === id);
}

export const updateCamion = async(id, data) => {

    const camion = await Camion.findByIdAndUpdate(id, data, {new: true, runValidators: true});

    return camion;
    
}

export const removeCamion = async (id) => {
    return await Camion.findByIdAndDelete(id);
};

