
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.unstable_mockModule("../services/trajet.service.js", () => ({
    getAllTrajets: jest.fn(),
    createTrajet: jest.fn(),
    updateTrajet: jest.fn(),
    getTrajetsParChauffeur: jest.fn(),
    lancerDepart: jest.fn(),
    TermineTrajet: jest.fn()
}));

const service = await import("../services/trajet.service.js");

const {
    getAll,
    create,
    update,
    getTrajetsParChauffeur,
    lancerDepartTrajet,
    FinTrajet

} = await import("../controllers/trajet.controller.js");


describe("Trajet controller getAll", () => {
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

    it("doit retourner la liste des trajets avec status 200", async () => {
        const trajets = [
            { _id: "1", marchandise: "Ciment" },
            { _id: "2", marchandise: "Sable" }
        ];

        service.getAllTrajets.mockResolvedValue(trajets);

        await getAll(req, res, next);

        expect(service.getAllTrajets).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            succes: true,
            messgae: "les trajet est recuperes ",
            data: trajets
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur à next si la récupération échoue", async () => {
        const error = new Error("Erreur serveur");

        service.getAllTrajets.mockRejectedValue(error);

        await getAll(req, res, next);

        expect(service.getAllTrajets).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});

describe("Trajet controller create", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {
                siteDepart: "Youssoufia",
                siteArrivee: "Casablanca",
                marchandise: "Ciment",
                dateDepartPrevu: "2026-11-01T08:00:00.000Z",
                dateArriveePrevue: "2026-11-01T12:00:00.000Z"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit créer un trajet avec succès et retourner status 201", async () => {
        const trajetCree = {
            _id: "123",
            ...req.body
        };

        service.createTrajet.mockResolvedValue(trajetCree);

        await create(req, res, next);

        expect(service.createTrajet).toHaveBeenCalledTimes(1);
        expect(service.createTrajet).toHaveBeenCalledWith(req.body);

        expect(res.status).toHaveBeenCalledWith(201);

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "le trajet est cree avec succes",
            data: trajetCree
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si la création échoue", async () => {
        const error = new Error(
            "La date d'arrivee doit etre apres la date de depart"
        );

        service.createTrajet.mockRejectedValue(error);

        await create(req, res, next);

        expect(service.createTrajet).toHaveBeenCalledTimes(1);
        expect(service.createTrajet).toHaveBeenCalledWith(req.body);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});

describe("Trajet controller update", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: {
                id: "123"
            },
            body: {
                marchandise: "Sable"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit modifier un trajet avec succès", async () => {
        const trajetModifie = {
            _id: "123",
            marchandise: "Sable"
        };

        service.updateTrajet.mockResolvedValue(trajetModifie);

        await update(req, res, next);

        expect(service.updateTrajet).toHaveBeenCalledTimes(1);

        expect(service.updateTrajet).toHaveBeenCalledWith(
            "123",
            req.body
        );

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            succes: true,
            message: "le trajet est modifiee ",
            data: trajetModifie
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si le trajet est introuvable", async () => {
        const error = new Error("ce trajet est introuvable !");

        service.updateTrajet.mockRejectedValue(error);

        await update(req, res, next);

        expect(service.updateTrajet).toHaveBeenCalledWith(
            "123",
            req.body
        );

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si le trajet ne peut pas être modifié", async () => {
        const error = new Error("ne peut oas modifier ce trajet");

        service.updateTrajet.mockRejectedValue(error);

        await update(req, res, next);

        expect(service.updateTrajet).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});


describe("Trajet controller getTrajetsParChauffeur", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            user: {
                userId: "chauffeur123"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit retourner les trajets assignés au chauffeur", async () => {
        const trajets = [
            {
                _id: "1",
                chauffeur: "chauffeur123",
                marchandise: "Ciment"
            },
            {
                _id: "2",
                chauffeur: "chauffeur123",
                marchandise: "Sable"
            }
        ];

        service.getTrajetsParChauffeur.mockResolvedValue(trajets);

        await getTrajetsParChauffeur(req, res, next);

        expect(service.getTrajetsParChauffeur).toHaveBeenCalledTimes(1);

        expect(service.getTrajetsParChauffeur).toHaveBeenCalledWith(
            "chauffeur123"
        );

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            succes: true,
            message: "votre trajets est recuperers",
            data: trajets
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit retourner une liste vide si aucun trajet n'est assigné", async () => {
        service.getTrajetsParChauffeur.mockResolvedValue([]);

        await getTrajetsParChauffeur(req, res, next);

        expect(service.getTrajetsParChauffeur).toHaveBeenCalledWith(
            "chauffeur123"
        );

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            succes: true,
            message: "acune trajet assigne pour vous jusqu'a maintenant",
            data: []
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur à next si la récupération échoue", async () => {
        const error = new Error("Erreur serveur");

        service.getTrajetsParChauffeur.mockRejectedValue(error);

        await getTrajetsParChauffeur(req, res, next);

        expect(service.getTrajetsParChauffeur).toHaveBeenCalledWith(
            "chauffeur123"
        );

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});


describe("Trajet controller lancerDepartTrajet", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { id: "123" },
            user: { userId: "chauffeur123" },
            body: { kiloDepart: 12000 }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit enregistrer le départ du trajet avec succès", async () => {
        const depart = {
            _id: "123",
            chauffeur: "chauffeur123",
            kiloDepart: 12000,
            statut: "en cours"
        };

        service.lancerDepart.mockResolvedValue(depart);

        await lancerDepartTrajet(req, res, next);

        expect(service.lancerDepart).toHaveBeenCalledTimes(1);

        expect(service.lancerDepart).toHaveBeenCalledWith(
            "123",
            "chauffeur123",
            req.body
        );

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            succes: true,
            message: "Le départ du trajet a été enregistré avec succès",
            data: depart
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si le trajet est introuvable", async () => {
        const error = new Error("ce trajet est introuvable");

        service.lancerDepart.mockRejectedValue(error);

        await lancerDepartTrajet(req, res, next);

        expect(service.lancerDepart).toHaveBeenCalledWith(
            "123",
            "chauffeur123",
            req.body
        );

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si le chauffeur n'est pas autorisé", async () => {
        const error = new Error(
            "vous n'etes pas le droit de demarer ce trajet"
        );

        service.lancerDepart.mockRejectedValue(error);

        await lancerDepartTrajet(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si le trajet a déjà commencé", async () => {
        const error = new Error(
            "ce trajet est deja en cour ou teminee"
        );

        service.lancerDepart.mockRejectedValue(error);

        await lancerDepartTrajet(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});


describe("Trajet controller FinTrajet", () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { id: "123" },
            user: { userId: "chauffeur123" },
            body: {
                kiloArrivee: 12500,
                volumeGasoil: 100,
                remarque: "Trajet terminé"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("doit terminer le trajet avec succès", async () => {
        const trajet = {
            _id: "123",
            chauffeur: "chauffeur123",
            kiloDepart: 12000,
            kiloArrivee: 12500,
            volumeGasoil: 100,
            distanceParcourue: 500,
            consommationMoyenne: "20.00",
            statut: "terminé"
        };

        service.TermineTrajet.mockResolvedValue(trajet);

        await FinTrajet(req, res, next);

        expect(service.TermineTrajet).toHaveBeenCalledTimes(1);

        expect(service.TermineTrajet).toHaveBeenCalledWith(
            "123",
            "chauffeur123",
            req.body
        );

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            succes: true,
            message: "le trajet est terminee avec succes",
            data: trajet
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si le chauffeur n'est pas autorisé", async () => {
        const error = new Error(
            "vous n'etes pas le droit de termine ce trajet"
        );

        service.TermineTrajet.mockRejectedValue(error);

        await FinTrajet(req, res, next);

        expect(service.TermineTrajet).toHaveBeenCalledWith(
            "123",
            "chauffeur123",
            req.body
        );

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si le trajet n'est pas en cours", async () => {
        const error = new Error(
            "ce trajet est pas encore demaerer ou deja terminee"
        );

        service.TermineTrajet.mockRejectedValue(error);

        await FinTrajet(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur si le kilométrage d'arrivée est invalide", async () => {
        const error = new Error(
            "kilometrage d'arrivee doit superieur a kilometrage de depart"
        );

        service.TermineTrajet.mockRejectedValue(error);

        await FinTrajet(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});



