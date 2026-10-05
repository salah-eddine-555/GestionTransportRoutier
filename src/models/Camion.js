import mongoose from 'mongoose';



const CamionSchema = new mongoose.Schema({
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
    },
    
},
    {
        timestamps: true 
    }
);

const Camion = mongoose.model("Camion", CamionSchema);

export default Camion;
