import Trajet from '../models/Trajet.js';
import Camion from '../models/Camion.js';
import User from '../models/User.js';



export const getAllTrajets = async() => {

    return await Trajet.find().populate('chauffeur').populate('camion');
}


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
    if(trajet.statut !== 'à faire'){ throw new Error("ne peut oas modifier ce trajet ")};

    const depart = new Date(data.dateDepartPrevu ?? trajet.dateDepartPrevu);
    const arrivee = new Date(data.dateArriveePrevue ?? trajet.dateArriveePrevue);

    if(arrivee <= depart){ throw new Error("date arrivee doit etre apre la date de depart ")}

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

    if(chauffeur.status !== "active"){throw new Error("le chauffeur n'est pas active ")}

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

export const getTrajetsParChauffeur = async(chauffeurId) => {

    return  await Trajet.find({chauffeur: chauffeurId});
}

export const lancerDepart = async(id,chauffeurId, data) => {

    console.log(chauffeurId);
    const trajet = await Trajet.findById(id);
    

    if(!trajet){throw new Error("ce trajet est introuvable")};

    if(trajet.chauffeur !== chauffeurId){
        throw new Error("vous n'etes pas le droit de demarer ce trajet");
    }

    if(trajet.statut !== 'à faire'){
        throw new Error("ce trajet est deja en cour ou teminee");
    }

    trajet.kiloDepart = data.kiloDepart;
    trajet.statut = 'en cours';
    await trajet.save();
    return trajet;
}

export const TermineTrajet = async(id,chauffeurId, data) => {

    const trajet = await Trajet.findById(id);

    if(!trajet){throw new Error("ce trajet est introuvable")};

      if(!trajet.chauffeur || trajet.chauffeur !== chauffeurId){
        throw new Error("vous n'etes pas le droit de termine ce trajet");
    }

    if(trajet.statut !== 'en cours'){
        throw new Error("ce trajet est pas encore demaerer ou deja terminee");
    }

    if(trajet.kiloDepart >= data.kiloArrivee){
        throw new Error("kilometrage d'arrivee doit superieur a kilometrage de depart");
    }

    trajet.kiloArrivee = data.kiloArrivee
    trajet.status = 'terminé'
    await trajet.save();

    return trajet;

}

