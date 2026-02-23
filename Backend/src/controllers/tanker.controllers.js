import Village from "../models/village.model.js";
import { predictTankers } from "../utils/tanker.service.js";

export const predictTankerRequirement = async (req, res) => {
  try {
    const { name, population, severity } = req.body;

    if (!name || !population || !severity) {
      return res.status(400).json({
        message: "name, population and severity required",
      });
    }

    const predictedTankers = predictTankers(
      population,
      severity
    );

    // Optionally save in DB
    const village = await Village.findOne({ name });
    if(severity === "low"){
        const stress = "healthy"
    }
        else if(severity === "medium"){ 
            const stress = "moderate"
        }
        else{
            const stress = "drought"
        }
    if (village) {
      village.predictedTankers = predictedTankers;
      village.stressType = severity;
      await village.save();
    }

    res.json({
      name,
      population,
      severity,
      predictedTankers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Prediction failed",
    });
  }
};

 