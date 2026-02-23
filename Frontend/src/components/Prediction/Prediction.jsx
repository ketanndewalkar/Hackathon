import { SlidersHorizontal, RefreshCcw } from "lucide-react";

export default function Prediction() {
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

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg text-sm">
            <RefreshCcw className="w-4 h-4" />
            Run Fresh Forecast
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Predicted Drought Risk (Next 30 Days)" value="68%" accent="orange" />
        <StatCard title="Villages at Risk (Within 15 Days)" value="5 New" accent="red" />
        <StatCard title="Tanker Demand Forecast" value="24" accent="green" />
        <StatCard title="AI Confidence Score" value="87%" accent="blue" />
      </div>

      {/* Forecast + Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white rounded-xl border p-6">
          <h2 className="text-sm font-semibold mb-4">
            15–30 Day Drought Risk Forecast
          </h2>

          <div className="h-72 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Line Graph Placeholder
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-sm font-semibold">Early Warning Signals</h2>

          <WarningCard village="Khandapur" risk="+42%" />
          <WarningCard village="Shirval" risk="+35%" />
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