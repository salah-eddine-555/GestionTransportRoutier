import { jest, describe, it, expect, beforeEach } from '@jest/globals';


jest.unstable_mockModule("../services/pneuAffectation.service.js", () => ({
    affecterPneu: jest.fn(),
    retierePneu: jest.fn(),
    historiques: jest.fn()
}));

const service = await import("../services/pneuAffectation.service.js");


const {
    createAffectation,
    retiererPneu,
    historiquesAffecations
} = await import("../controllers/pneuAffectation.controller.js");

describe("Tests unitaires du controller PneuAffectation", () => {

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

    describe("createAffectation", () => {

        it("devrait affecter un pneu à un camion avec succès", async () => {
            const affectation = {
                _id: "affectation123",
                pneu: "pneu123",
                camion: "camion123",
                position: "avant_gauche",
                dateInstallation: "2026-10-25",
                kilometrageInstallation: 50000
            };

            req.params = {
                pneuId: "pneu123",
                camionId: "camion123"
            };

            req.body = {
                position: "avant_gauche",
                dateInstallation: "2026-10-25",
                kilometrageInstallation: 50000
            };

            service.affecterPneu.mockResolvedValue(affectation);

            await createAffectation(req, res, next);

            expect(service.affecterPneu).toHaveBeenCalledWith(
                "pneu123",
                "camion123",
                req.body
            );

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Pneu affecté au camion avec succès",
                affectation
            });

            expect(next).not.toHaveBeenCalled();
        });

        it("devrait transmettre l'erreur si l'affectation échoue", async () => {
            const error = new Error("cette pneu est deja affectue a un camion");

            req.params = {
                pneuId: "pneu123",
                camionId: "camion123"
            };

            req.body = {
                position: "avant_gauche"
            };

            service.affecterPneu.mockRejectedValue(error);

            await createAffectation(req, res, next);

            expect(service.affecterPneu).toHaveBeenCalledWith(
                "pneu123",
                "camion123",
                req.body
            );

            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe("retiererPneu", () => {

        it("devrait retirer un pneu avec succès", async () => {
            const affectation = {
                _id: "affectation123",
                pneu: "pneu123",
                camion: "camion123",
                dateInstallation: "2026-10-01",
                dateRetrait: "2026-10-25",
                kilometrageInstallation: 50000,
                kilometrageRetrait: 55000,
                motifRetrait: "Usure"
            };

            req.params = {
                id: "affectation123"
            };

            req.body = {
                dateRetrait: "2026-10-25",
                kilometrageRetrait: 55000,
                motifRetrait: "Usure"
            };

            service.retierePneu.mockResolvedValue(affectation);

            await retiererPneu(req, res, next);

            expect(service.retierePneu).toHaveBeenCalledWith(
                "affectation123",
                req.body
            );

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                succes: true,
                message: "le pneu est retiere sans probleme",
                data: affectation
            });

            expect(next).not.toHaveBeenCalled();
        });

        it("devrait transmettre l'erreur si le retrait échoue", async () => {
            const error = new Error("cette affectation n'existe pas");

            req.params = {
                id: "affectation123"
            };

            req.body = {
                dateRetrait: "2026-10-25",
                kilometrageRetrait: 55000
            };

            service.retierePneu.mockRejectedValue(error);

            await retiererPneu(req, res, next);

            expect(service.retierePneu).toHaveBeenCalledWith(
                "affectation123",
                req.body
            );

            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe("historiquesAffecations", () => {

        it("devrait retourner l'historique des affectations d'un pneu", async () => {
            const affectations = [
                {
                    _id: "affectation123",
                    pneu: "pneu123",
                    camion: "camion123",
                    position: "avant_gauche"
                },
                {
                    _id: "affectation456",
                    pneu: "pneu123",
                    camion: "camion456",
                    position: "arriere_droit"
                }
            ];

            req.params = {
                pneuId: "pneu123"
            };

            service.historiques.mockResolvedValue(affectations);

            await historiquesAffecations(req, res, next);

            expect(service.historiques).toHaveBeenCalledWith("pneu123");

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                succes: true,
                message: "historique des affectations pour ce pneu",
                data: affectations
            });

            expect(next).not.toHaveBeenCalled();
        });

        it("devrait retourner une liste vide si le pneu n'a aucun historique", async () => {
            req.params = {
                pneuId: "pneu123"
            };

            service.historiques.mockResolvedValue([]);

            await historiquesAffecations(req, res, next);

            expect(service.historiques).toHaveBeenCalledWith("pneu123");

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                succes: true,
                message: "historique des affectations pour ce pneu",
                data: []
            });

            expect(next).not.toHaveBeenCalled();
        });

        it("devrait transmettre l'erreur si la récupération de l'historique échoue", async () => {
            const error = new Error("Erreur lors de la récupération de l'historique");

            req.params = {
                pneuId: "pneu123"
            };

            service.historiques.mockRejectedValue(error);

            await historiquesAffecations(req, res, next);

            expect(service.historiques).toHaveBeenCalledWith("pneu123");

            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });
});