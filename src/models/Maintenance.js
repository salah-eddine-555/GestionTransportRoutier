
  import mongoose from "mongoose";

  const maintenanceSchema = new mongoose.Schema(
    {
      camion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Camion",
        required: true
      },

      type: {
        type: String,
        enum: ["vidange", "revision"],
        required: true,
        trim: true
      },

      description: {
        type: String,
        trim: true,
        required: true
      },

      dateDebut: {
        type: Date,
        default: null
      },

      dateFin: {
        type: Date,
        default: null
      },

      kilometrage: {
        type: Number,
        required: true,
        min: 0
      },

      statut: {
        type: String,
        enum: ["en_attente", "en_cours", "terminée"],
        default: "en_attente"
      },
    },
    { timestamps: true }
  );

  const Maintenance = mongoose.model(
    "Maintenance",
    maintenanceSchema
  );

  export default Maintenance;