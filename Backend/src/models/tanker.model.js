import mongoose from "mongoose";

const tankerLogSchema = new mongoose.Schema(
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

    tankersSent: {
      type: Number,
      required: true,
      min: 0
    },

    routeId: {
      type: String
    },

    status: {
      type: String,
      enum: ["scheduled", "dispatched", "completed"],
      default: "scheduled"
    }
  },
  { timestamps: true }
);

const TankerLog = mongoose.model("TankerLog", tankerLogSchema);

export default TankerLog;