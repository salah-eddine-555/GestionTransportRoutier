import Camion from '../models/Camion.js';
import RegleMaintenance from '../models/RegleMaintenance.js';
import Maintenance from '../models/Maintenance.js';



export const getAllMaintenances = async() => { return Maintenance.find().populate('camion')};

export const VerifierMaintenance = async () => {

    const camions = await Camion.find({archive: false});
    const regles = await RegleMaintenance.find({ active: true });

    const maintenancesCree = [];

    for (const camion of camions) {
        for (const regle of regles) {
            const dernierMaintenance = await Maintenance.findOne({
                camion: camion._id,
                type: regle.type,
                statut: 'terminée',
            }).sort({ kilometrage: -1 });

            const dernierKilometrage = dernierMaintenance ? dernierMaintenance.kilometrage : 0;

            const distanceParcour = camion.kilometrage - dernierKilometrage;

            if (distanceParcour >= regle.intervalleKm) {
                // on va verfier  est que maintennace est deja existe
                const MaintenanceExiste = await Maintenance.findOne({
                    camion: camion._id,
                    type: regle.type,
                    statut: { $in: ['en_attente', 'en_cours'] }
                });

                if (!MaintenanceExiste) {
                    const nouvelleMaintenance = await Maintenance.create({
                        camion: camion._id,
                        type: regle.type,
                        description: `Maintenance est necessaire : ${regle.type}`,
                        kilometrage: camion.kilometrage,
                        statut: 'en_attente'
                    });
                    maintenancesCree.push(nouvelleMaintenance);
                }
            }
        }
    }
    return {
        message: maintenancesCree.length > 0
            ? "les maintenances necessaires ont ete crees ."
            : "Aucune maintenance necessaire pour le moment ",
        total: maintenancesCree.length,
        maintenances: maintenancesCree
    }

}