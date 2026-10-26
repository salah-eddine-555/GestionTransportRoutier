import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.unstable_mockModule('../services/maintenance.service.js', () => ({
    getAllMaintenances: jest.fn(),
    VerifierMaintenance: jest.fn()
}));

const service = await import('../services/maintenance.service.js');

const {
    getAll,
    verfierMaintenance
} = await import('../controllers/maintenance.controller.js');

describe('Tests unitaires du controller Maintenance', () => {

    let req;
    let res;
    let next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: {},
            body: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    describe('getAll', () => {

        it('devrait retourner toutes les maintenances avec succès', async () => {
            const maintenances = [
                {
                    _id: 'maintenance123',
                    camion: 'camion123',
                    type: 'vidange',
                    kilometrage: 50000,
                    statut: 'en_attente'
                },
                {
                    _id: 'maintenance456',
                    camion: 'camion456',
                    type: 'revision',
                    kilometrage: 80000,
                    statut: 'terminée'
                }
            ];

            service.getAllMaintenances.mockResolvedValue(maintenances);

            await getAll(req, res, next);

            expect(service.getAllMaintenances).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                succes: true,
                message: 'tous les maintenaces est recupere',
                data: maintenances
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait retourner une liste vide si aucune maintenance existe', async () => {
            service.getAllMaintenances.mockResolvedValue([]);

            await getAll(req, res, next);

            expect(service.getAllMaintenances).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                succes: true,
                message: 'tous les maintenaces est recupere',
                data: []
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait transmettre une erreur si la récupération échoue', async () => {
            const error = new Error(
                'Erreur lors de la récupération des maintenances'
            );

            service.getAllMaintenances.mockRejectedValue(error);

            await getAll(req, res, next);

            expect(next).toHaveBeenCalledWith(error);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
});


describe('verfierMaintenance', () => {

        it('devrait retourner le résultat si des maintenances sont créées', async () => {
            const resultat = {
                message: 'les maintenances necessaires ont ete crees .',
                total: 2,
                maintenances: [
                    {
                        _id: 'maintenance123',
                        camion: 'camion123',
                        type: 'vidange',
                        kilometrage: 50000,
                        statut: 'en_attente'
                    },
                    {
                        _id: 'maintenance456',
                        camion: 'camion456',
                        type: 'revision',
                        kilometrage: 80000,
                        statut: 'en_attente'
                    }
                ]
            };

            service.VerifierMaintenance.mockResolvedValue(resultat);

            await verfierMaintenance(req, res, next);

            expect(service.VerifierMaintenance).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                succes: true,
                ...resultat
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait retourner le résultat si aucune maintenance n’est nécessaire', async () => {
            const resultat = {
                message: 'Aucune maintenance necessaire pour le moment ',
                total: 0,
                maintenances: []
            };

            service.VerifierMaintenance.mockResolvedValue(resultat);

            await verfierMaintenance(req, res, next);

            expect(service.VerifierMaintenance).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                succes: true,
                ...resultat
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait transmettre une erreur si la vérification échoue', async () => {
            const error = new Error(
                'Erreur lors de la vérification des maintenances'
            );

            service.VerifierMaintenance.mockRejectedValue(error);

            await verfierMaintenance(req, res, next);

            expect(service.VerifierMaintenance).toHaveBeenCalledTimes(1);

            expect(next).toHaveBeenCalledWith(error);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });
});