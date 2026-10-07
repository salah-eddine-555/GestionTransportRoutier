import mongoose from "mongoose";

const pneuAffectationSchema = new mongoose.Schema(
    {
        pneu: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pneu",
            required: true
        },

        camion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Camion",
            required: true
        },

        position: {
            type: String,
            required: true,
            trim: true
        },

        dateInstallation: {
            type: Date,
            required: true
        },

        kilometrageInstallation: {
            type: Number,
            required: true,
            min: 0
        },

        dateRetrait: {
            type: Date,
            default: null
        },

        kilometrageRetrait: {
            type: Number,
            min: 0,
            default: null
        },

        motifRetrait: {
            type: String,
            trim: true,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model(
    "PneuAffectation",
    pneuAffectationSchema
);