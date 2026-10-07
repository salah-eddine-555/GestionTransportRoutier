import joi from "joi";

export const createRemorqueSchema = joi.object({

    immatriculation: joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "L'immatriculation est obligatoire",
            "any.required": "L'immatriculation est obligatoire"
        }),

    type: joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Le type de remorque est obligatoire",
            "any.required": "Le type de remorque est obligatoire"
        }),

    kilometrage: joi.number()
        .min(0)
        .default(0)
        .messages({
            "number.base": "Le kilométrage doit être un nombre",
            "number.min": "Le kilométrage ne peut pas être négatif"
        }),

    etat: joi.string()
        .valid("disponible", "maintenance")
        .default("disponible")
        .messages({
            "any.only": "L'état doit être disponible ou maintenance"
        }),

    archive: joi.boolean()
        .default(false)
        .messages({
            "boolean.base": "Le champ archive doit être un booléen"
        })
});


export const updateRemorqueSchema = joi.object({

    immatriculation: joi.string()
        .trim()
        .messages({
            "string.empty": "L'immatriculation ne peut pas être vide"
        }),

    type: joi.string()
        .trim()
        .messages({
            "string.empty": "Le type de remorque ne peut pas être vide"
        }),

    kilometrage: joi.number()
        .min(0)
        .messages({
            "number.base": "Le kilométrage doit être un nombre",
            "number.min": "Le kilométrage ne peut pas être négatif"
        }),

    etat: joi.string()
        .valid("disponible", "maintenance")
        .messages({
            "any.only": "L'état doit être disponible ou maintenance"
        }),

    archive: joi.boolean()
        .messages({
            "boolean.base": "Le champ archive doit être un booléen"
        })
}).min(1);


