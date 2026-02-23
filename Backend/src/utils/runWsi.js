import mongoose from "mongoose";
import dotenv from "dotenv";
import { runWSIComputation } from "../ml services/agentService.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Connected");

    await runWSIComputation();

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();