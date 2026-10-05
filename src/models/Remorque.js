import mongoose from "mongoose";

const remorqueSchema = new mongoose.Schema(
    {
        immatriculation: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        type: {
            type: String,
            required: true,
            trim: true
        },

        kilometrage: {
            type: Number,
            default: 0,
            min: 0
        },

        etat: {
            type: String,
            enum: ["disponible", "maintenance"],
            default: "disponible"
        },

        archive: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Remorque = mongoose.model("Remorque", remorqueSchema);

export default Remorque;