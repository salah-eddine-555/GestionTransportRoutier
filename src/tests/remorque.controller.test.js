import { jest, describe, it, expect, beforeEach } from '@jest/globals';


jest.unstable_mockModule('../services/remorque.service.js', () => ({
    findAllRemorques: jest.fn(),
    findRemorqueById: jest.fn(),
    createRemorque: jest.fn(),
    updateRemorque: jest.fn(),
    deleteRemorque: jest.fn()
}));


const service = await import('../services/remorque.service.js');


const {
    getAllRemorque,
    getRemorqueById,
    createRemorque,
    updateRemorque,
    deleteRemorque
} = await import('../controllers/remorque.controller.js');

describe('Tests unitaires du controller Remorque', () => {

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


    describe('getAllRemorque', () => {

        it('devrait retourner toutes les remorques avec succès', async () => {
            const remorques = [
                {
                    _id: 'remorque123',
                    immatriculation: '12345-A-1',
                    archive: false
                },
                {
                    _id: 'remorque456',
                    immatriculation: '67890-B-2',
                    archive: false
                }
            ];

            service.findAllRemorques.mockResolvedValue(remorques);

            await getAllRemorque(req, res, next);

            expect(service.findAllRemorques).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'les remorques sont recuperes avec succes',
                data: remorques
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait retourner un message si aucune remorque existe', async () => {
            service.findAllRemorques.mockResolvedValue([]);

            await getAllRemorque(req, res, next);

            expect(service.findAllRemorques).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "Aucune  remorque cree jusqu'a maintenant "
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait transmettre une erreur si la récupération échoue', async () => {
            const error = new Error('Erreur lors de la récupération des remorques');

            service.findAllRemorques.mockRejectedValue(error);

            await getAllRemorque(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('getRemorqueById', () => {

        it('devrait retourner une remorque par son ID', async () => {
            const remorque = {
                _id: 'remorque123',
                immatriculation: '12345-A-1',
                archive: false
            };

            req.params.id = 'remorque123';

            service.findRemorqueById.mockResolvedValue(remorque);

            await getRemorqueById(req, res, next);

            expect(service.findRemorqueById).toHaveBeenCalledWith('remorque123');

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'Remorque récupérée avec succès',
                data: remorque
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait transmettre une erreur si la remorque est introuvable', async () => {
            const error = new Error('Remorque introuvable');

            req.params.id = 'id-inexistant';

            service.findRemorqueById.mockRejectedValue(error);

            await getRemorqueById(req, res, next);

            expect(service.findRemorqueById).toHaveBeenCalledWith('id-inexistant');
            expect(next).toHaveBeenCalledWith(error);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });


    describe('createRemorque', () => {

        it('devrait créer une remorque avec succès', async () => {
            const donnees = {
                immatriculation: '12345-A-1'
            };

            const remorque = {
                _id: 'remorque123',
                immatriculation: '12345-A-1',
                archive: false
            };

            req.body = donnees;

            service.createRemorque.mockResolvedValue(remorque);

            await createRemorque(req, res, next);

            expect(service.createRemorque).toHaveBeenCalledWith(donnees);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'Remorque créée avec succès',
                data: remorque
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait transmettre une erreur si la création échoue', async () => {
            const error = new Error('Erreur lors de la création');

            req.body = {
                immatriculation: '12345-A-1'
            };

            service.createRemorque.mockRejectedValue(error);

            await createRemorque(req, res, next);

            expect(service.createRemorque).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith(error);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('updateRemorque', () => {

        it('devrait modifier une remorque avec succès', async () => {
            const donnees = {
                immatriculation: '99999-C-3'
            };

            const remorque = {
                _id: 'remorque123',
                immatriculation: '99999-C-3',
                archive: false
            };

            req.params.id = 'remorque123';
            req.body = donnees;

            service.updateRemorque.mockResolvedValue(remorque);

            await updateRemorque(req, res, next);

            expect(service.updateRemorque).toHaveBeenCalledWith(
                'remorque123',
                donnees
            );

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'Remorque modifiée avec succès',
                data: remorque
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait transmettre une erreur si la remorque à modifier est introuvable', async () => {
            const error = new Error('Remorque introuvable');

            req.params.id = 'id-inexistant';
            req.body = {
                immatriculation: '99999-C-3'
            };

            service.updateRemorque.mockRejectedValue(error);

            await updateRemorque(req, res, next);

            expect(service.updateRemorque).toHaveBeenCalledWith(
                'id-inexistant',
                req.body
            );

            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('deleteRemorque', () => {

        it('devrait archiver une remorque avec succès', async () => {
            const resultat = {
                message: 'Remorque archivée avec succès'
            };

            req.params.id = 'remorque123';

            service.deleteRemorque.mockResolvedValue(resultat);

            await deleteRemorque(req, res, next);

            expect(service.deleteRemorque).toHaveBeenCalledWith('remorque123');

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'Remorque archivée avec succès'
            });

            expect(next).not.toHaveBeenCalled();
        });

        it('devrait transmettre une erreur si la remorque à archiver est introuvable', async () => {
            const error = new Error('Remorque introuvable');

            req.params.id = 'id-inexistant';

            service.deleteRemorque.mockRejectedValue(error);

            await deleteRemorque(req, res, next);

            expect(service.deleteRemorque).toHaveBeenCalledWith('id-inexistant');
            expect(next).toHaveBeenCalledWith(error);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });
});