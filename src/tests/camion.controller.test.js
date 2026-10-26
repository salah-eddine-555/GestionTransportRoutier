
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.unstable_mockModule("../services/camion.service.js", () => ({
    createCamion: jest.fn(),
    getAllCamion: jest.fn(),
    getCamionById: jest.fn(),
    updateCamion: jest.fn(),
    removeCamion: jest.fn()
}));

const service = await import("../services/camion.service.js");

const {
    create,
    getAll,
    getById,
    update,
    remove
} = await import("../controllers/camion.controller.js");

describe("Camion controller create", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {
                immatriculation: "12345-A-6",
                marque: "Mercedes",
                modele: "Actros",
                kilometrage: 0,
                etat: "disponible"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit créer un camion avec succès", async () => {
        const camion = {
            _id: "camion123",
            ...req.body
        };

        service.createCamion.mockResolvedValue(camion);

        await create(req, res, next);

        expect(service.createCamion).toHaveBeenCalledTimes(1);
        expect(service.createCamion).toHaveBeenCalledWith(req.body);

        expect(res.status).toHaveBeenCalledWith(201);

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "le camion est cree avec succes",
            data: camion
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la création échoue", async () => {
        const error = new Error("Erreur lors de la création du camion");

        service.createCamion.mockRejectedValue(error);

        await create(req, res, next);

        expect(service.createCamion).toHaveBeenCalledWith(req.body);
        expect(next).toHaveBeenCalledWith(error);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});

describe("Camion controller getAll", () => {
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

    it("doit retourner la liste des camions avec status 200", async () => {
        const camions = [
            { _id: "1", immatriculation: "12345-A-6" },
            { _id: "2", immatriculation: "67890-B-6" }
        ];

        service.getAllCamion.mockResolvedValue(camions);

        await getAll(req, res, next);

        expect(service.getAllCamion).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "les camions recuperes avec succes",
            data: camions
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la récupération échoue", async () => {
        const error = new Error("Erreur serveur");

        service.getAllCamion.mockRejectedValue(error);

        await getAll(req, res, next);

        expect(service.getAllCamion).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});


describe("Camion controller getById", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { id: "camion123" }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit retourner un camion avec succès", async () => {
        const camion = {
            _id: "camion123",
            immatriculation: "12345-A-6"
        };

        service.getCamionById.mockResolvedValue(camion);

        await getById(req, res, next);

        expect(service.getCamionById).toHaveBeenCalledWith("camion123");

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "le camion est recupere avec succes",
            data: camion
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit retourner 404 si le camion n'existe pas", async () => {
        service.getCamionById.mockResolvedValue(null);

        await getById(req, res, next);

        expect(service.getCamionById).toHaveBeenCalledWith("camion123");

        expect(res.status).toHaveBeenCalledWith(404);

        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "cette camion n'est pas existe ! "
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la récupération échoue", async () => {
        const error = new Error("Erreur serveur");

        service.getCamionById.mockRejectedValue(error);

        await getById(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});


describe("Camion controller update", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { id: "camion123" },
            body: {
                kilometrage: 15000,
                etat: "maintenance"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit modifier un camion avec succès", async () => {
        const camion = {
            _id: "camion123",
            ...req.body
        };

        service.updateCamion.mockResolvedValue(camion);

        await update(req, res, next);

        expect(service.updateCamion).toHaveBeenCalledTimes(1);

        expect(service.updateCamion).toHaveBeenCalledWith(
            "camion123",
            req.body
        );

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "le camion ete modifier avec succes",
            data: camion
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit retourner 404 si le camion est introuvable", async () => {
        service.updateCamion.mockResolvedValue(null);

        await update(req, res, next);

        expect(service.updateCamion).toHaveBeenCalledWith(
            "camion123",
            req.body
        );

        expect(res.status).toHaveBeenCalledWith(404);

        expect(res.json).toHaveBeenCalledWith({
            success: false,
            messsage: "cette camion n'est pas existe "
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la modification échoue", async () => {
        const error = new Error("Erreur lors de la modification");

        service.updateCamion.mockRejectedValue(error);

        await update(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});

describe("Camion controller remove", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { id: "camion123" }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit supprimer un camion avec succès", async () => {
        const camion = {
            _id: "camion123",
            immatriculation: "12345-A-6"
        };

        service.removeCamion.mockResolvedValue(camion);

        await remove(req, res, next);

        expect(service.removeCamion).toHaveBeenCalledTimes(1);
        expect(service.removeCamion).toHaveBeenCalledWith("camion123");

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "cette camion est supprimee avec succes "
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit retourner 404 si le camion à supprimer n'existe pas", async () => {
        service.removeCamion.mockResolvedValue(null);

        await remove(req, res, next);

        expect(service.removeCamion).toHaveBeenCalledWith("camion123");

        expect(res.status).toHaveBeenCalledWith(404);

        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: " cette camion n'est pas existe !"
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la suppression échoue", async () => {
        const error = new Error("Erreur lors de la suppression");

        service.removeCamion.mockRejectedValue(error);

        await remove(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
