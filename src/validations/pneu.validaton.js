import Joi from "joi";

export const createPneuSchema = Joi.object({
    numeroSerie: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Le numéro de série est obligatoire",
            "any.required": "Le numéro de série est obligatoire"
        }),



    etat: Joi.string()
        .valid("bon", "use", "hors_service")
        .default("bon"),

    kilometrageUsure: Joi.number()
        .min(0)
        .default(0),

    seuilUsure: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.min": "Le seuil d'usure doit être positif",
            "any.required": "Le seuil d'usure est obligatoire"
        }),
});