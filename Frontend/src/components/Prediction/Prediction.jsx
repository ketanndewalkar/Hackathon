import { SlidersHorizontal, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Prediction() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPrediction = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5500/api/prediction"
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching prediction data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Predictive Drought Risk & Early Warning
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            AI-based forecasting of emerging drought stress and optimized tanker demand planning.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm">
            <SlidersHorizontal className="w-4 h-4" />
            Model Parameters
          </button>

          <button
            onClick={fetchPrediction}
            className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg text-sm"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Run Fresh Forecast
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard
              title="Predicted Drought Risk (Next 30 Days)"
              value={data?.predictedRisk ?? "68%"}
              accent="orange"
            />
            <StatCard
              title="Villages at Risk (Within 15 Days)"
              value={data?.villagesAtRisk ?? "5 New"}
              accent="red"
            />
            <StatCard
              title="Tanker Demand Forecast"
              value={data?.tankerForecast ?? "24"}
              accent="green"
            />
            <StatCard
              title="AI Confidence Score"
              value={data?.confidence ?? "87%"}
              accent="blue"
            />
          </>
        )}
      </div>

      {/* Forecast + Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white rounded-xl border p-6">
          <h2 className="text-sm font-semibold mb-4">
            15–30 Day Drought Risk Forecast
          </h2>

          {loading ? (
            <SkeletonBox height="h-72" />
          ) : (
            <div className="h-72 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Line Graph Placeholder
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-sm font-semibold">Early Warning Signals</h2>

          {loading ? (
            <>
              <SkeletonWarning />
              <SkeletonWarning />
            </>
          ) : (
            <>
              <WarningCard
                village={data?.alerts?.[0]?.village ?? "Khandapur"}
                risk={data?.alerts?.[0]?.risk ?? "+42%"}
              />
              <WarningCard
                village={data?.alerts?.[1]?.village ?? "Shirval"}
                risk={data?.alerts?.[1]?.risk ?? "+35%"}
              />
            </>
          )}
        </div>

      </div>

    </div>
  );
}

function StatCard({ title, value, accent }) {
  const colors = {
    red: "border-l-red-500",
    orange: "border-l-orange-500",
    green: "border-l-green-500",
    blue: "border-l-blue-500",
  };

  return (
    <div className={`bg-white border border-gray-200 border-l-4 ${colors[accent]} rounded-xl p-6`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-3">{value}</p>
    </div>
  );
}

function WarningCard({ village, risk }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium">{village}</h3>
        <span className="text-red-600 text-sm font-semibold">
          {risk} Risk
        </span>
      </div>
      <p className="text-sm text-gray-500">
        Action: Pre-position tanker
      </p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-40 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-24"></div>
    </div>
  );
}

function SkeletonBox({ height }) {
  return (
    <div className={`bg-gray-100 rounded-lg ${height} animate-pulse`} />
  );
}

function SkeletonWarning() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-20"></div>
    </div>
  );
}