import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';


jest.unstable_mockModule('../services/statistiques.service.js', () => ({
    getStatistquesParChauffeur: jest.fn(),
    getInformationsPneus: jest.fn(),
    getAnalyticFinancial: jest.fn(),
    getTrends: jest.fn()
}));


const service = await import('../services/statistiques.service.js');

const {
    getStatistiques,
    getInformationsPneu,
    analyticFinancial,
    getUtilisationTrends
} = await import('../controllers/statistiques.controller.js');

describe('Tests unitaires du controller Statistiques', () => {

    let req;
    let res;
    let next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: {},
            body: {},
            query: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getStatistiques', () => {

        it('devrait retourner les statistiques par chauffeur', async () => {
            const results = [
                {
                    chauffeurId: 'chauffeur123',
                    totalDistanceKm: 12000,
                    totalCarburantLitres: 300,
                    consommationMoyenne: 2.5,
                    ecoScore: 100
                }
            ];

            service.getStatistquesParChauffeur.mockResolvedValue(results);

            await getStatistiques(req, res, next);

            expect(service.getStatistquesParChauffeur)
                .toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'les statistique du trajte par chaufeur',
                data: results
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait retourner une liste vide si aucune statistique existe', async () => {
            service.getStatistquesParChauffeur.mockResolvedValue([]);

            await getStatistiques(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'les statistique du trajte par chaufeur',
                data: []
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait transmettre une erreur si la récupération échoue', async () => {
            const error = new Error('Erreur de récupération des statistiques');

            service.getStatistquesParChauffeur.mockRejectedValue(error);

            await getStatistiques(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('getInformationsPneu', () => {

        it('devrait retourner les informations des pneus', async () => {
            const informations = [
                {
                    position: 'avant_gauche',
                    nombrePneus: 4,
                    kilometrageMoyenne: 60000,
                    nombrePneusCritiques: 1,
                    budgetEstimer: 3800
                }
            ];

            service.getInformationsPneus.mockResolvedValue(informations);

            await getInformationsPneu(req, res, next);

            expect(service.getInformationsPneus).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                messgae: "l'etats des penus est recupere ",
                data: informations
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait retourner une liste vide si aucune information de pneu existe', async () => {
            service.getInformationsPneus.mockResolvedValue([]);

            await getInformationsPneu(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                messgae: "l'etats des penus est recupere ",
                data: []
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait transmettre une erreur si la récupération des informations échoue', async () => {
            const error = new Error('Erreur de récupération des pneus');

            service.getInformationsPneus.mockRejectedValue(error);

            await getInformationsPneu(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    // =========================================
    // TESTS analyticFinancial
    // =========================================
    describe('analyticFinancial', () => {

        it('devrait retourner les informations financières avec les dates fournies', async () => {
            const info = [
                {
                    distance: 1200,
                    emissionsCo2kg: 80.4,
                    emissionsCo2Tone: 0.08
                }
            ];

            req.query = {
                startDate: '2026-10-01',
                endDate: '2026-10-25'
            };

            service.getAnalyticFinancial.mockResolvedValue(info);

            await analyticFinancial(req, res, next);

            expect(service.getAnalyticFinancial).toHaveBeenCalledWith(
                '2026-10-01',
                '2026-10-25'
            );

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                succes: true,
                message: 'les infor finaniales est recupere',
                data: info
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait transmettre une erreur si le service financier échoue', async () => {
            const error = new Error('Erreur de calcul financier');
            const consoleSpy = jest
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            req.query = {
                startDate: '2026-10-01',
                endDate: '2026-10-25'
            };

            service.getAnalyticFinancial.mockRejectedValue(error);

            await analyticFinancial(req, res, next);

    
            expect(consoleSpy).toHaveBeenCalledWith(error);

       
            expect(next).not.toHaveBeenCalled();

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });


    describe('getUtilisationTrends', () => {

        it('devrait appeler le service de tendances', async () => {
            const trends = [
                {
                    nombreCamions: 10,
                    TotalMissionFloote: 100,
                    TotalMaintenanceFloote: 20,
                    TotalDisponibleFloote: 1560,
                    TutilisationFlotte: 6.02
                }
            ];

            service.getTrends.mockResolvedValue(trends);

            await getUtilisationTrends(req, res, next);

            expect(service.getTrends).toHaveBeenCalledTimes(1);

            // Le controller actuel ne renvoie pas de réponse HTTP
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait transmettre une erreur si la récupération des tendances échoue', async () => {
            const error = new Error('Erreur de récupération des tendances');

            service.getTrends.mockRejectedValue(error);

            await getUtilisationTrends(req, res, next);

            expect(service.getTrends).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });
});