import Village from "../models/village.model.js";

export const getDashboardData = async (req, res) => {
  try {
    const villages = await Village.find();

    const totalVillages = villages.length;

    const avgWSI =
      villages.reduce((sum, v) => sum + (v.currentWSI || 0), 0) /
      (totalVillages || 1);

    let safe = 0;
    let moderate = 0;
    let high = 0;
    let critical = 0;

    villages.forEach((v) => {
      if (v.currentWSI < 0.3) safe++;
      else if (v.currentWSI < 0.6) moderate++;
      else if (v.currentWSI < 0.8) high++;
      else critical++;
    });

    const topCritical = villages
      .sort((a, b) => b.currentWSI - a.currentWSI)
      .slice(0, 5);

    res.json({
      summary: {
        totalVillages,
        avgWSI: Number(avgWSI.toFixed(3)),
        safeCount: safe,
        moderateCount: moderate,
        highCount: high,
        criticalCount: critical,
      },
      villages,
      topCritical,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard Error" });
  }
};