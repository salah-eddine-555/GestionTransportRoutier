import Trajet from '../models/Trajet.js';
import {CONSOMMATION_REFERENCE}  from '../config/ecoScore.js';




export const getStatistquesParChauffeur = async () => {

    const statistques = await Trajet.aggregate([
        {
            $match: {
                statut: 'terminé',
                chauffeur: { $ne: null },
                volumeGasoil: { $exists: true },
            }
        },

        {
            $group: {
                _id: '$chauffeur',
                totalDistanceKm: { $sum: { $subtract: ['$kiloArrivee', '$kiloDepart'] } },
                totalCarburantLitres: { $sum: '$volumeGasoil' }
            }
        },
        {
            $project: {
                _id: 0,
                chauffeurId: '$_id',
                totalDistanceKm: 1,
                totalCarburantLitres : 1,
                consommationMoyenne: {

                    $multiply: [{
                        $divide: ["$totalCarburantLitres", "$totalDistanceKm"]
                    }, 100]
                },
                ecoScore : {
                    $min: [100,
                    {$multiply: [
                        {
                            $divide: [CONSOMMATION_REFERENCE, "$consommationMoyenne"]
                        },
                    100
                    ]
                }]
            }
        }
        }

    ]);
    // console.log(statistques) || []; return
    return statistques;
}   