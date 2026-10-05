import mongoose from "mongoose";

const trajetSchema = new mongoose.Schema(
    {
        siteDepart: {
            type: String,
            required: true,
            trim: true
        },

        siteArrivee: {
            type: String,
            required: true,
            trim: true
        },

        marchandise: {
            type: String,
            required: true,
            trim: true
        },

        dateDepartPrevu: {
            type: Date,
            required: true
        },

        dateArriveePrevue: {
            type: Date,
            required: true
        },

        statut: {
            type: String,
            enum: ["à faire", "en cours", "terminé"],
            default: "à faire"
        },

        kiloDepart: {
            type: Number,
            min: 0
        },

        kiloArrivee: {
            type: Number,
            min: 0
        },

        volumeGasoil: {
            type: Number,
            min: 0
        },

        remarque: {
            type: String,
            trim: true
        },

      
        chauffeur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        camion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Camion"
        },

        remorque: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Remorque"
        }
    },
    {
        timestamps: true
    }
);

const Trajet = mongoose.model("Trajet", trajetSchema);

export default Trajet;