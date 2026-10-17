import Trajet from '../models/Trajet.js';
import PneuAffectation from '../models/PneuAffectation.js';
import Pneu from '../models/Pneu.js';
import { CONSOMMATION_REFERENCE } from '../config/ecoScore.js';




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
                totalCarburantLitres: 1,
                consommationMoyenne: {

                    $multiply: [{
                        $divide: ["$totalCarburantLitres", "$totalDistanceKm"]
                    }, 100]
                },
                ecoScore: {
                    $min: [100,
                        {
                            $multiply: [
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


export const getAnalyticFinancial = async (startDate, endDate) => {


    const info = await Trajet.aggregate([
        {
            $match: {
                statut: 'terminé',
                dateDepartPrevu: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        },
        {
            $addFields: {
                distance: {
                    $subtract: ['$kiloArrivee', '$kiloDepart']

                },
                emissionsCo2kg: {
                    $round: [
                        { $multiply: ['$volumeGasoil', 2.68] }, 2
                    ]

                },
                emissionsCo2Tone: {
                    $round: [
                        {
                            $divide: [
                                {
                                    $multiply: ['$volumeGasoil', 2.68]
                                }, 1000]
                        }, 3
                    ]
                }
            }
        }
    ])

    // console.log(info);

    return info;
}

export const getInformationsPneus = async () => {

    const infoPneuParPosition = await Pneu.aggregate([
        {
            $lookup: {
                from: "pneuaffectations",
                localField: '_id',
                foreignField: "pneu",
                as: 'affectations'
            }
        },
        {
            $unwind: "$affectations"
        },
        {
            $match: {
                etat: { $ne: "hors_service" },
                'affectations.dateRetrait': null
            }
        },
        {
            $addFields: {
                remainingKm: {
                    $max: [0,
                        {
                            $subtract: [
                                { $ifNull: ['$seuilUsure', 80000] }, '$kilometrageUsure'
                            ]
                        }
                    ]
                },
            }
        },
        {
            $addFields: {
                isCritical: {
                    $lt: ['$remainingKm', 5000]
                }
            }
        },
        {
            $group: {
                _id: '$affectations.position',
                nombrePneus: {
                    $sum: 1
                },
                kilometrageMoyenne: {
                    $avg: "$kilometrageUsure"
                },
                nombrePneusCritiques: {
                    $sum: {
                        $cond: ["$isCritical", 1, 0]
                    }
                },
                budgetEstimer: {
                    $sum: {
                        $cond: ["$isCritical", 3800, 0]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                position: "$_id",
                nombrePneus: 1,
                kilometrageMoyenne: 1,
                nombrePneusCritiques: 1,
                budgetEstimer: 1
            }
        }
    ])

    // console.log(infoPneu); return;

    return infoPneuParPosition
}


