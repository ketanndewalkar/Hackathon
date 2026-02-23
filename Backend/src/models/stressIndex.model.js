import mongoose from "mongoose";

const stressIndexSchema = new mongoose.Schema(
  {
    village: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Village",
      required: true,
      index: true
    },

    date: {
      type: Date,
      required: true,
      index: true
    },

    rainfallScore: {
      type: Number,
      min: 0,
      max: 1
    },

    groundwaterScore: {
      type: Number,
      min: 0,
      max: 1
    },

    populationScore: {
      type: Number,
      min: 0,
      max: 1
    },

    finalWSI: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    }
  },
  { timestamps: true }
);

const StressIndex = mongoose.model("StressIndex", stressIndexSchema);

export default StressIndex;