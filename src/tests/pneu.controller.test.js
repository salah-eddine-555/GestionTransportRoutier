import {jest , describe, it, expect, beforeEach} from '@jest/globals';



jest.unstable_mockModule("../services/pneu.service.js", () => ({
    getAllPneus: jest.fn(),
    getPneuById: jest.fn(),
    createPneu: jest.fn(),
    updatePneu: jest.fn(),
    deletePneu: jest.fn()
}));

const pneuService = await import("../services/pneu.service.js");

const { getAllPneus, getPneuById }  = await import("../controllers/pneu.controller.js");

describe("Pneu controller getAll", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {};

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn()
    });

    it("doit retouner la liste de pneus avec status 200", async () => {
        const pneus = [
            {numeroSerie: "PNEU001"},
            {numeroSerie: "MGUY009"}
        ]
        pneuService.getAllPneus.mockResolvedValue(pneus);

        await getAllPneus(req, res, next);

        expect(pneuService.getAllPneus).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: pneus
        });

        expect(next).not.toHaveBeenCalled();
    })
})
describe("pneu controller getPneuById", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
            jest.clearAllMocks();

            req = { params: {id: '123'}}

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            next = jest.fn();
    });
    it("doit retouner un pneu avec status 200", async() => {
        const pneu = {
            _id: "123",
            numeroSerie: "RNU8765"
        };
        pneuService.getPneuById.mockResolvedValue(pneu);
        await getPneuById(req, res, next);

        expect(pneuService.getPneuById).toHaveBeenCalledWith("123"),
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: pneu
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("doit transmettre l'erreur  a next ", async() => {
        const error = new Error("Erreur serveur");

        pneuService.getPneuById.mockRejectedValue(error);

        await getPneuById(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    })


})