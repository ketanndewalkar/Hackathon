import mongoose from "mongoose";

const villageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    district: {
      type: String,
      required: true,
      index: true
    },

    population: {
      type: Number,
      required: true,
      min: 0
    },
    severity:{
      type:String,
      enum: ["low", "medium", "high"],
      required: true
    },

    predictedTankers: {
      type: Number,
      default: 0,
      min: 0
    },

    priorityScore: {
      type: Number,
      default: 0,
      min: 0
    },
    stressType:{
      type:String,
      enum: ["healthy", "moderate", "drought"],
      default: "healthy"
    },

    lastComputedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

const Village = mongoose.model("Village", villageSchema);   

export default Village;