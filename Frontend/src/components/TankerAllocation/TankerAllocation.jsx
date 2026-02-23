import { RefreshCcw, Truck, AlertTriangle, MapPin } from "lucide-react";
import { useState } from "react";

const STORAGE_KEY = "mock_villages";

export default function TankerAllocation() {

  const [villages, setVillages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      setVillages(stored ? JSON.parse(stored) : []);
      setLoading(false);
    }, 500);
  };

  const requireTanker = villages.filter(
    (v) => v.riskLevel === "HIGH" || v.riskLevel === "CRITICAL"
  );

  const availableTankers = 18;
  const utilization =
    availableTankers > 0
      ? Math.min((requireTanker.length / availableTankers) * 100, 100)
      : 0;

  const utilizationColor =
    utilization > 80
      ? "bg-red-500"
      : utilization > 50
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8 space-y-12">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Tanker Deployment Command Center
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            AI-prioritized logistics coordination for water relief distribution.
          </p>
        </div>

        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full text-sm shadow-md hover:bg-teal-700 transition"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Sync Allocation Data
        </button>

      </div>

      {/* OPERATIONS SUMMARY */}
      <div className="bg-white/80 backdrop-blur-lg border border-slate-200 rounded-3xl p-10 shadow-lg">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <OperationMetric
            icon={<AlertTriangle />}
            label="Villages Awaiting Allocation"
            value={requireTanker.length}
            accent="red"
          />

          <OperationMetric
            icon={<Truck />}
            label="Available Tankers"
            value={availableTankers}
            accent="blue"
          />

          <OperationMetric
            icon={<MapPin />}
            label="Active Deployments"
            value={requireTanker.length}
            accent="emerald"
          />

        </div>

      </div>

      {/* WORKFLOW SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* PRIORITY QUEUE */}
        <div className="bg-white/80 backdrop-blur-lg border border-slate-200 rounded-3xl p-8 shadow-lg">

          <h2 className="text-lg font-medium text-slate-900 mb-8">
            Priority Allocation Queue
          </h2>

          {requireTanker.length === 0 ? (
            <p className="text-sm text-slate-400">
              No villages currently require tanker deployment.
            </p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">

              {requireTanker.map((v, index) => (
                <div
                  key={v.id}
                  className="flex justify-between items-center p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {index + 1}. {v.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {v.district}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 text-xs font-semibold rounded-full ${
                      v.riskLevel === "CRITICAL"
                        ? "bg-red-100 text-red-700"
                        : v.riskLevel === "HIGH"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {v.riskLevel}
                  </span>
                </div>
              ))}

            </div>
          )}
        </div>

        {/* CAPACITY ASSESSMENT PANEL */}
        <div className="bg-white/80 backdrop-blur-lg border border-slate-200 rounded-3xl p-8 shadow-lg flex flex-col justify-between">

          <div>
            <h2 className="text-lg font-medium text-slate-900 mb-6">
              Fleet Capacity Assessment
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Current demand indicates <strong>{requireTanker.length}</strong> villages
              require tanker support. Fleet strength is <strong>{availableTankers}</strong> units.
              Deployment pressure is currently at <strong>{utilization.toFixed(0)}%</strong>.
            </p>
          </div>

          <div className="mt-10">

            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className={`${utilizationColor} h-3 rounded-full transition-all duration-700`}
                style={{ width: `${utilization}%` }}
              />
            </div>

            <p className="text-xs text-slate-500 mt-4">
              {utilization > 80
                ? "Critical fleet strain detected."
                : utilization > 50
                ? "Moderate operational pressure."
                : "Fleet capacity sufficient."}
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}


/* OPERATION METRIC COMPONENT */

function OperationMetric({ icon, label, value, accent }) {

  const accentStyles = {
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600"
  };

  return (
    <div className="flex justify-between items-center p-8 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition">

      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-3xl font-semibold text-slate-900 mt-2">
          {value}
        </p>
      </div>

      <div className={`p-4 rounded-2xl ${accentStyles[accent]}`}>
        {icon}
      </div>

    </div>
  );
}