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

  return (
    <div className="min-h-screen bg-neutral-50 p-6 space-y-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">
            Tanker Deployment Operations
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Priority-based water logistics coordination center.
          </p>
        </div>

        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-full text-sm shadow-sm hover:bg-neutral-800 transition"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Sync Allocation Data
        </button>
      </div>

      {/* OPERATIONS SUMMARY PANEL */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <OperationMetric
            icon={<AlertTriangle />}
            label="Villages Awaiting Allocation"
            value={requireTanker.length}
          />

          <OperationMetric
            icon={<Truck />}
            label="Available Tankers"
            value={availableTankers}
          />

          <OperationMetric
            icon={<MapPin />}
            label="Active Deployments"
            value={requireTanker.length}
          />

        </div>

      </div>

      {/* ALLOCATION WORKFLOW SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* PRIORITY PIPELINE */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">

          <h2 className="text-lg font-medium text-neutral-900 mb-6">
            Priority Allocation Queue
          </h2>

          {requireTanker.length === 0 ? (
            <p className="text-sm text-neutral-400">
              No villages currently require tanker deployment.
            </p>
          ) : (
            <div className="space-y-4">

              {requireTanker.map((v, index) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between p-4 border border-neutral-200 rounded-2xl"
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {index + 1}. {v.name}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {v.district}
                    </p>
                  </div>

                  <span className="text-xs font-medium px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full">
                    {v.riskLevel}
                  </span>
                </div>
              ))}

            </div>
          )}
        </div>

        {/* ALLOCATION STATUS PANEL */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">

          <div>
            <h2 className="text-lg font-medium text-neutral-900 mb-4">
              Allocation Assessment
            </h2>

            <p className="text-sm text-neutral-600 leading-relaxed">
              Based on current high-risk classifications,{" "}
              <strong>{requireTanker.length}</strong> villages require
              operational tanker support. Available fleet capacity stands at{" "}
              <strong>{availableTankers}</strong> units.
            </p>
          </div>

          <div className="mt-6">

            <div className="w-full bg-neutral-200 rounded-full h-2.5">
              <div
                className="bg-neutral-900 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width:
                    availableTankers > 0
                      ? `${Math.min(
                          (requireTanker.length / availableTankers) * 100,
                          100
                        )}%`
                      : "0%",
                }}
              />
            </div>

            <p className="text-xs text-neutral-500 mt-3">
              Fleet utilization projected based on current demand.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


/* SUB COMPONENT */

function OperationMetric({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between p-6 border border-neutral-200 rounded-2xl bg-neutral-50">
      <div>
        <p className="text-xs text-neutral-500">{label}</p>
        <p className="text-2xl font-semibold text-neutral-900 mt-2">
          {value}
        </p>
      </div>
      <div className="text-neutral-400">{icon}</div>
    </div>
  );
}