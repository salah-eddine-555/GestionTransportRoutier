import mongoose from "mongoose";

const pneuSchema = new mongoose.Schema(
    {
        numeroSerie: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        etat: {
            type: String,
            enum: ["bon", "use", "hors_service"],
            default: "bon"
        },

        kilometrageUsure: {
            type: Number,
            default: 0,
            min: 0
        },

        seuilUsure: {
            type: Number,
            required: true,
            min: 0
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Pneu", pneuSchema);