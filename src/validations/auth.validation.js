import joi from 'joi';

export const registerSchema = joi.object({
    firstname: joi.string().min(2).max(50).required()
        .messages({
            "string.empty": "le firstname est oblegatoire",
            "string.min": "le firstname doit contenire plus de 2 caracteres ",
            "string.max": "le firstname doit etre depasser 50 caracteres",
            "string.required": "first name est oblegatoire a saisie"
        }),
    lastname: joi.string().min(2).max(50).required()
        .messages({
            "string.empty": " lastname est oblegatoire",
            "string.min": "lastname doit contenire plus de 2 caracteres ",
            "string.max": "lastname doit etre depasser 50 caracteres",
            "string.required": "first name est oblegatoire a saisie"
        }),
    email: joi.string().email().trim().required()
    .messages({
        "string.email": "le champs doit respecter le format email",
        "string.empty": "email est oblegee",
    }),
    password: joi.string().min(6).required(),
    role: joi.string().trim().valid("admin", "chauffeur").required()
     .messages({
            "string.empty": "Le rôle est obligatoire",
            "any.only": "Le rôle doit être admin ou chauffeur",
            "any.required": "Le rôle est obligatoire"
        }),
    status: joi.string().valid("active", "inactive").default("active").messages({
            "any.only": "Le statut doit être active ou inactive"
        })
});