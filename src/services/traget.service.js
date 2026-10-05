import Trajet from '../models/Trajet.js';
import Camion from '../models/Camion.js';

export const createTrajet = async (data) => {

    const {dateDepartPrevu, dateArriveePrevue } = data;



    if(new Date(dateArriveePrevue) <= new Date (dateDepartPrevu)){
        throw new Error("La date d'arrivee  doit etre  apres la date de depart ")
    }   
    const trajet = await  Trajet.create(data);
    return trajet;
}
export const updateTrajet = async (id, data) => {

    const trajet = await Trajet.findById(id);

    if(!trajet){
        throw new Error("ce trajet est introuvable ! ");
    }

    if( data.dateDepartPrevu &&
        data.dateArriveePrevue &&
        new Date(data.dateArriveePrevue) <=
        new Date(data.dateDepartPrevu)){
            throw new Error("la date d'arrivee doit etre apres la date depart ")
        }

    Object.assign(trajet, data);
    await trajet.save();
    return trajet;

}

export const assignChauffeur = async(trajetId, chauffeurId) => {

    const trajet = await Trajet.findById(trajetId);

    if(!trajet){
        throw new Error("Trajet intouvable");
    }

    if(trajet.statut !== 'à faire'){
        throw new Error("Ce traget ne peut pas ")
    }

    const chauffeur = await User.findOne({
        _id: chauffeurId,
        role: "chauffeur"
    });
    if(!chauffeur){throw new Error("cette chauffeur n'existe pas ")};

    if(chauffeur !== "active"){throw new Error("le chauffeur n'est pas active ")}

    const conflit = await Trajet.findOne({
        _id: { $ne : trajet._id},
        chauffeur: chauffeurId,
        dateDepartPrevu: { $lt: trajet.dateArriveePrevue},
        dateArriveePrevue : { $gt: trajet.dateDepartPrevu}

    });
    if(conflit){ throw new Error("le chauffeur est deja  a un trajet pendate cette periode")}

    trajet.chauffeur = chauffeur._id;
    await trajet.save();

    return  trajet;

}

export const assignCamion = async(trajetId, camionId) => {

    const trajet = await Trajet.findById(trajetId);
    const camion = await Camion.findById(camionId);

    if(!trajet){ throw new Error("ce trajet n'est pas existe !")};

    if(trajet.statut !== 'à faire'){throw new Error("ne peut pas assigne ce trajet ")};

    if(!camion){throw new Error("camion inrouvable !")};
    if(camion.etat !== 'disponible'){throw new Error("cette camion n'est pas disponible a un trajet !")};

    const conflit  = await Trajet.findOne({
        _id: { $ne: trajet._id},
        camion: camionId,
        dateDepartPrevu: { $lt: trajet.dateArriveePrevue},
        dateArriveePrevue : { $gt: trajet.dateDepartPrevu}
    })

    if(conflit){throw new Error("cette camion a deja un trajet dans cette periode !")}

    trajet.camion = camionId;
    await trajet.save();

    return trajet;


}


export const deleteTrajet = async (id) => {

    const trajet = await Trajet.findById(id);
    
    if (!trajet) {
        throw new Error("Trajet introuvable");
    }
    await trajet.deleteOne();
    return {
        message: "Trajet supprimé avec succès"
    };
};