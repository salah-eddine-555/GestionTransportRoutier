import Pneu from '../models/Pneu.js';
import Camion from '../models/Camion.js';
import PneuAffectation from '../models/PneuAffectation.js'



export const affecterPneu = async (pneuId, camionId, data) => {

    const pneu = await Pneu.findById(pneuId);
    const camion = await Camion.findById(camionId);

    if (!pneu) { throw new Error("cette pneu n'existe pas ") };
    if (!camion) { throw new Error("camion est introuvable") };

    if (pneu.etat === 'hors_service') { throw new Error("cette pneu est hor service") };

    const affectationExiste = await PneuAffectation.findOne({ pneu: pneuId, dateRetrait: null });
    const positionPneuOccupee = await PneuAffectation.findOne({ camion: camionId, position: data.position, dateRetrait: null });

    if (affectationExiste) { throw new Error("cette pneu est deja affectue a un camion") };
    if (positionPneuOccupee) { throw new Error("cette position de pneu est deja occupe pour le camion") };

    const affectation = await PneuAffectation.create({
        pneu: pneuId,
        camion: camionId,
        position: data.position,
        dateInstallation: data.dateInstallation,
        kilometrageInstallation: data.kilometrageInstallation
    });

    return affectation;
}

export const retierePneu = async(affectationId, data) => {

    const affectation = await PneuAffectation.findById(affectationId);

    if(!affectation){throw new Error("cette affectation n'existe pas ")};
    
    if(affectation.dateRetrait !== null){throw new Error("ce pneu est deja retire ")};

    if(new Date(data.dateRetrait) <= new Date(affectation.dateInstallation)){
        throw new Error("la date retrait doit etre superieur a l date d'installation ");
    }

    if(data.kilometrageRetrait < affectation.kilometrageInstallation){
        throw new Error("le kilometrage de retarite  doit etre  superieur kilometrage d'installation");
    }

    affectation.dateRetrait = data.dateRetrait;
    affectation.kilometrageRetrait = data.kilometrageRetrait;
    affectation.motifRetrait = data.motifRetrait;

    await affectation.save();

    return affectation;

}


export const historiques = async (pneuId) => {

    
    return await PneuAffectation.find({ pneu: pneuId }).populate("pneu").populate("camion");
};