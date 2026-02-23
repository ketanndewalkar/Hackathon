import mongoose from "mongoose";

const groundwaterLevelSchema = new mongoose.Schema(
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

    levelMeters: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);


const GroundwaterLevel = mongoose.model("GroundwaterLevel", groundwaterLevelSchema);

export default GroundwaterLevel