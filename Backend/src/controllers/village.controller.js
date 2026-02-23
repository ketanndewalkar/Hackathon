import Village from "../models/village.model.js";

export const postVillageInfo = async (req, res) => {
  const { name, district, population} = req.body;
  if (!name || !district || !population) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newVillage = await Village.create({
    name,
    district,
    population,
    
  });
  if(!newVillage){
    return res.status(500).json({ message: "Failed to create village" });
  }
  return res.status(201).json({ message: "Village created successfully", village: newVillage });
};

export const addPredictedTankers = async (req, res) => {
  const { villageId } = req.params;
  const { predictedTankers } = req.body;
if (predictedTankers === undefined) {   
  return res.status(400).json({ message: "predictedTankers is required" });
}
    const village = await Village.findById(villageId);  
    if (!village) { 
        return res.status(404).json({ message: "Village not found" });
    }
    village.predictedTankers = predictedTankers;
    village.lastComputedAt = new Date();
    await village.save();
    return res.status(200).json({ message: "Predicted tankers updated successfully", village });
};
