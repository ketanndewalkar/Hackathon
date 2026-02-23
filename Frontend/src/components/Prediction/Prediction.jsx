import { SlidersHorizontal, RefreshCcw, AlertTriangle, Truck, Activity } from "lucide-react";
import { useState } from "react";

const STORAGE_KEY = "mock_villages";

export default function Prediction() {

  const [villages, setVillages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  const fetchPrediction = () => {
    setLoading(true);
    setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      setVillages(stored ? JSON.parse(stored) : []);
      setLoading(false);
    }, 500);
  };

  const atRisk = villages.filter(
    v => v.riskLevel === "HIGH" || v.riskLevel === "CRITICAL"
  );

  const highRiskOnly = villages.filter(v => v.riskLevel === "HIGH");
  const criticalOnly = villages.filter(v => v.riskLevel === "CRITICAL");

  const tankerForecast = atRisk.length * 2;

  const predictedRisk =
    villages.length > 0
      ? ((atRisk.length / villages.length) * 100).toFixed(0)
      : "0";

  const safeVillages = villages.length - atRisk.length;

  const dangerLevel =
    predictedRisk > 70
      ? "SEVERE"
      : predictedRisk > 40
      ? "ELEVATED"
      : "STABLE";

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Predictive Drought Risk Console
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time forecast modeling for proactive water crisis mitigation.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={fetchPrediction}
            className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded-lg text-sm"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Run Fresh Forecast
          </button>
        </div>
      </div>

      {/* FORECAST INTENSITY BANNER */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-gray-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">30-Day Drought Projection</h3>
            <p className="text-sm text-gray-600">
              Overall Regional Risk Level: 
              <span className="ml-2 font-semibold text-red-600">
                {dangerLevel}
              </span>
            </p>
          </div>
          <Activity className="text-red-500" />
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-red-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${predictedRisk}%` }}
          ></div>
        </div>

        <div className="mt-3 text-sm text-gray-600">
          {predictedRisk}% of monitored villages show elevated stress.
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          icon={<AlertTriangle />}
          title="Predicted Drought Risk"
          value={`${predictedRisk}%`}
        />

        <StatCard
          icon={<AlertTriangle />}
          title="Villages at Immediate Risk"
          value={atRisk.length}
        />

        <StatCard
          icon={<Truck />}
          title="Tanker Demand Forecast"
          value={tankerForecast}
        />

        <StatCard
          icon={<Activity />}
          title="Safe Villages"
          value={safeVillages}
        />

      </div>

      {/* RISK BREAKDOWN SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Risk Distribution Breakdown</h3>

          <RiskBar label="Critical" value={criticalOnly.length} color="bg-red-600" />
          <RiskBar label="High" value={highRiskOnly.length} color="bg-orange-500" />
          <RiskBar label="Safe" value={safeVillages} color="bg-green-500" />

        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold mb-4">High Priority Villages</h3>

          {atRisk.length === 0 ? (
            <p className="text-sm text-gray-400">No high-risk villages detected.</p>
          ) : (
            atRisk.map(v => (
              <div key={v.id} className=" py-2 flex justify-between text-sm">
                <span>{v.name}</span>
                <span className="text-red-600 font-medium">
                  {v.riskLevel}
                </span>
              </div>
            ))
          )}

        </div>
      </div>

      {/* IMPACT SUMMARY */}
      <div className="bg-green-50 border border-gray-200-l-4 border border-gray-200-green-700 p-5 rounded-lg text-sm">
        <strong>AI Strategic Insight:</strong> If intervention is delayed,
        {atRisk.length} villages may require emergency water logistics.
        Immediate tanker mobilization of approximately {tankerForecast} units
        is recommended.
      </div>

    </div>
  );
}


/* COMPONENTS */

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
      <div className="text-gray-600">{icon}</div>
    </div>
  );
}

function RiskBar({ label, value, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`${color} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${value * 10}px` }}
        ></div>
      </div>
    </div>
  );
}