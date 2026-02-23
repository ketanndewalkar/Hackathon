import mongoose from "mongoose";

const rainfallRecordSchema = new mongoose.Schema(
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

    rainfallMM: {
      type: Number,
      required: true,
      min: 0
    },

    source: {
      type: String,
      enum: ["api", "synthetic"],
      default: "synthetic"
    }
  },
  { timestamps: true }
);

const RainfallRecord = mongoose.model("RainfallRecord", rainfallRecordSchema);

export default RainfallRecord;