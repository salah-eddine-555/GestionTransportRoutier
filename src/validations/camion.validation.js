import joi from 'joi';


export const createCamionSchema = joi.object({
    kilometrage: joi.number().min(0),
    etat: joi.string().valid("disponible", "maintenance").required()
})