import mongoose from "mongoose";

const allocationDecisionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true
    },

    village: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Village",
      required: true,
      index: true
    },

    wsi: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    },

    priorityScore: {
      type: Number,
      required: true,
      min: 0
    },

    allocatedTankers: {
      type: Number,
      required: true,
      min: 0
    },

    reasoning: {
      type: String
    }
  },
  { timestamps: true }
);

const AllocationDecision = mongoose.model("AllocationDecision", allocationDecisionSchema);

export default AllocationDecision;