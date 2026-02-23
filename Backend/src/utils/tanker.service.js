export const predictTankers = (population, severity) => {
  const baseTankers = population / 2500;

  let multiplier = 1;

  if (severity === "moderate") {
    multiplier = 1.5;
  } else if (severity === "drought") {
    multiplier = 2.5;
  }

  const predicted = baseTankers * multiplier;

  return Math.max(1, Math.round(predicted));
};