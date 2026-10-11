
import ReglesMaintenance from "../models/RegleMaintenance.js";

// 1. Créer une règle de maintenance
export const createRegle = async (data) => {
  const regleExistante = await ReglesMaintenance.findOne({
    nom: data.nom
  });

  if (regleExistante) {
    throw new Error("Cette règle de maintenance existe déjà");
  }

  const regle = await ReglesMaintenance.create(data);

  return regle;
};


export const getAllRegles = async () => {
  return await ReglesMaintenance.find();
};

export const getRegleById = async (id) => {
  const regle = await ReglesMaintenance.findById(id);

  if (!regle) {
    throw new Error("Règle de maintenance introuvable");
  }

  return regle;
};


export const updateRegle = async (id, data) => {
  const regle = await ReglesMaintenance.findById(id);

  if (!regle) {
    throw new Error("Règle de maintenance introuvable");
  }

  if (data.nom && data.nom !== regle.nom) {
    const nomExiste = await ReglesMaintenance.findOne({
      nom: data.nom,
      _id: { $ne: id }
    });

    if (nomExiste) {
      throw new Error("Ce nom est déjà utilisé");
    }
  }

  Object.assign(regle, data);

  await regle.save();

  return regle;
};

// 5. Supprimer une règle
export const deleteRegle = async (id) => {
  const regle = await ReglesMaintenance.findById(id);

  if (!regle) {
    throw new Error("Règle de maintenance introuvable");
  }

  await regle.deleteOne();

  return regle;
};
