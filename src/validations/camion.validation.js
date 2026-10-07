import joi from 'joi';


export const createCamionSchema = joi.object({
    kilometrage: joi.number().min(0),
    etat: joi.string().valid("disponible", "maintenance").required()
    .messages({
        'any.only': "l'etat doite etre disponible ou en maintenance"
    }),
    archive: joi.boolean().default(false)
});


export const updateCamionSchema = joi.object({
    kilometrage: joi.number().min(0).messages({
        "number.base": "le kilometrage doit etre un nombre",
    }),
    etat: joi.string().valid("disponible", "maintenance").messages({"any.only": "l'etat doit etre disponible ou en maintenance"}),
    archive: joi.boolean()
}).min(1)