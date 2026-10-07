import Joi from "joi";

export const createTrajetSchema = Joi.object({

    siteDepart: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Le site de départ est obligatoire",
            "any.required": "Le site de départ est obligatoire"
        }),

    siteArrivee: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Le site d'arrivée est obligatoire",
            "any.required": "Le site d'arrivée est obligatoire"
        }),

    marchandise: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "La marchandise est obligatoire",
            "any.required": "La marchandise est obligatoire"
        }),

    dateDepartPrevu: Joi.date()
        .required()
        .messages({
            "date.base": "La date de départ doit être une date valide",
            "any.required": "La date de départ est obligatoire"
        }),

    dateArriveePrevue: Joi.date()
        .greater(Joi.ref("dateDepartPrevu"))
        .required()
        .messages({
            "date.base": "La date d'arrivée doit être une date valide",
            "date.greater": "La date d'arrivée doit être après la date de départ",
            "any.required": "La date d'arrivée est obligatoire"
        }),

    statut: Joi.string()
        .valid("à faire", "en cours", "terminé")
        .default("à faire")
        .messages({
            "any.only": "Le statut doit être à faire, en cours ou terminé"
        }),

    kiloDepart: Joi.number()
        .min(0)
        .messages({
            "number.base": "Le kilométrage de départ doit être un nombre",
            "number.min": "Le kilométrage de départ ne peut pas être négatif"
        }),

    kiloArrivee: Joi.number()
        .min(0)
        .messages({
            "number.base": "Le kilométrage d'arrivée doit être un nombre",
            "number.min": "Le kilométrage d'arrivée ne peut pas être négatif"
        }),

    volumeGasoil: Joi.number()
        .min(0)
        .messages({
            "number.base": "Le volume de gasoil doit être un nombre",
            "number.min": "Le volume de gasoil ne peut pas être négatif"
        }),

    remarque: Joi.string()
        .trim()
        .allow("")
});


export const updateTrajetSchema = Joi.object({

    siteDepart: Joi.string()
        .trim()
        .messages({
            "string.empty": "Le site de départ ne peut pas être vide"
        }),

    siteArrivee: Joi.string()
        .trim()
        .messages({
            "string.empty": "Le site d'arrivée ne peut pas être vide"
        }),

    marchandise: Joi.string()
        .trim()
        .messages({
            "string.empty": "La marchandise ne peut pas être vide"
        }),

    dateDepartPrevu: Joi.date()
        .messages({
            "date.base": "La date de départ doit être une date valide"
        }),

    dateArriveePrevue: Joi.date()
        .messages({
            "date.base": "La date d'arrivée doit être une date valide"
        }),

    statut: Joi.string()
        .valid("à faire", "en cours", "terminé")
        .messages({
            "any.only": "Le statut doit être à faire, en cours ou terminé"
        }),

    kiloDepart: Joi.number()
        .min(0)
        .messages({
            "number.base": "Le kilométrage de départ doit être un nombre",
            "number.min": "Le kilométrage de départ ne peut pas être négatif"
        }),

    kiloArrivee: Joi.number()
        .min(0)
        .messages({
            "number.base": "Le kilométrage d'arrivée doit être un nombre",
            "number.min": "Le kilométrage d'arrivée ne peut pas être négatif"
        }),

    volumeGasoil: Joi.number()
        .min(0)
        .messages({
            "number.base": "Le volume de gasoil doit être un nombre",
            "number.min": "Le volume de gasoil ne peut pas être négatif"
        }),

    remarque: Joi.string()
        .trim()
        .allow("")
}).min(1);