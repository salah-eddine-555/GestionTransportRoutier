import mongoose from "mongoose";

const regleMaintenanceSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["vidange", "revision"],
            required: true
        },

        intervalleKm: {
            type: Number,
            required: true,
            min: 1
        },

        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const RegleMaintenance = mongoose.model(
    "RegleMaintenance",
    regleMaintenanceSchema
);
    
export default RegleMaintenance;