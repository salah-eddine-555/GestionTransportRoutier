
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.unstable_mockModule("../services/ReglesMaintenance.service.js", () => ({
    createRegle: jest.fn(),
    getAllRegles: jest.fn(),
    getRegleById: jest.fn(),
    updateRegle: jest.fn(),
    deleteRegle: jest.fn()
}));

const service = await import("../services/ReglesMaintenance.service.js");

const {
    createRegleController,
    getAllReglesController,
    getRegleByIdController,
    updateRegleController,
    deleteRegleController
} = await import("../controllers/regleMaintenance.controller.js");

describe("RegleMaintenance controller createRegleController", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {
                nom: "Vidange",
                intervalleKm: 10000,
                active: true
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit créer une règle de maintenance avec succès", async () => {
        const regle = {
            _id: "regle123",
            ...req.body
        };

        service.createRegle.mockResolvedValue(regle);

        await createRegleController(req, res, next);

        expect(service.createRegle).toHaveBeenCalledTimes(1);
        expect(service.createRegle).toHaveBeenCalledWith(req.body);

        expect(res.status).toHaveBeenCalledWith(201);

        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            message: "Règle de maintenance créée avec succès",
            data: regle
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la règle existe déjà", async () => {
        const error = new Error(
            "Cette règle de maintenance existe déjà"
        );

        service.createRegle.mockRejectedValue(error);

        await createRegleController(req, res, next);

        expect(service.createRegle).toHaveBeenCalledWith(req.body);
        expect(next).toHaveBeenCalledWith(error);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});


describe("RegleMaintenance controller getAllReglesController", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {};

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit retourner la liste des règles avec succès", async () => {
        const regles = [
            {
                _id: "1",
                nom: "Vidange",
                intervalleKm: 10000
            },
            {
                _id: "2",
                nom: "Révision",
                intervalleKm: 20000
            }
        ];

        service.getAllRegles.mockResolvedValue(regles);

        await getAllReglesController(req, res, next);

        expect(service.getAllRegles).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            results: 2,
            data: regles
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit retourner une liste vide si aucune règle n'existe", async () => {
        service.getAllRegles.mockResolvedValue([]);

        await getAllReglesController(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            results: 0,
            data: []
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la récupération échoue", async () => {
        const error = new Error("Erreur serveur");

        service.getAllRegles.mockRejectedValue(error);

        await getAllReglesController(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});


describe("RegleMaintenance controller getRegleByIdController", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: {
                id: "regle123"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit retourner une règle par son identifiant", async () => {
        const regle = {
            _id: "regle123",
            nom: "Vidange",
            intervalleKm: 10000
        };

        service.getRegleById.mockResolvedValue(regle);

        await getRegleByIdController(req, res, next);

        expect(service.getRegleById).toHaveBeenCalledTimes(1);
        expect(service.getRegleById).toHaveBeenCalledWith("regle123");

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: regle
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la règle est introuvable", async () => {
        const error = new Error("Règle de maintenance introuvable");

        service.getRegleById.mockRejectedValue(error);

        await getRegleByIdController(req, res, next);

        expect(service.getRegleById).toHaveBeenCalledWith("regle123");
        expect(next).toHaveBeenCalledWith(error);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});


describe("RegleMaintenance controller updateRegleController", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: {
                id: "regle123"
            },
            body: {
                nom: "Vidange moteur",
                intervalleKm: 12000,
                active: true
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit modifier une règle de maintenance avec succès", async () => {
        const regle = {
            _id: "regle123",
            ...req.body
        };

        service.updateRegle.mockResolvedValue(regle);

        await updateRegleController(req, res, next);

        expect(service.updateRegle).toHaveBeenCalledTimes(1);

        expect(service.updateRegle).toHaveBeenCalledWith(
            "regle123",
            req.body
        );

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            message: "Règle de maintenance modifiée avec succès",
            data: regle
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la règle est introuvable", async () => {
        const error = new Error("Règle de maintenance introuvable");

        service.updateRegle.mockRejectedValue(error);

        await updateRegleController(req, res, next);

        expect(service.updateRegle).toHaveBeenCalledWith(
            "regle123",
            req.body
        );

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si le nom est déjà utilisé", async () => {
        const error = new Error("Ce nom est déjà utilisé");

        service.updateRegle.mockRejectedValue(error);

        await updateRegleController(req, res, next);

        expect(service.updateRegle).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});


describe("RegleMaintenance controller deleteRegleController", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: {
                id: "regle123"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit supprimer une règle de maintenance avec succès", async () => {
        service.deleteRegle.mockResolvedValue({
            _id: "regle123",
            nom: "Vidange"
        });

        await deleteRegleController(req, res, next);

        expect(service.deleteRegle).toHaveBeenCalledTimes(1);
        expect(service.deleteRegle).toHaveBeenCalledWith("regle123");

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            message: "Règle de maintenance supprimée avec succès"
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la règle est introuvable", async () => {
        const error = new Error("Règle de maintenance introuvable");

        service.deleteRegle.mockRejectedValue(error);

        await deleteRegleController(req, res, next);

        expect(service.deleteRegle).toHaveBeenCalledWith("regle123");
        expect(next).toHaveBeenCalledWith(error);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la suppression échoue", async () => {
        const error = new Error("Erreur lors de la suppression");

        service.deleteRegle.mockRejectedValue(error);

        await deleteRegleController(req, res, next);

        expect(service.deleteRegle).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
