import { RefreshCcw } from "lucide-react";

export default function TankerAllocation() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Tanker Allocation Control Center
          </h1>
          <p className="text-sm text-gray-500">
            AI-prioritized water tanker deployment for emerging drought zones.
          </p>
        </div>

        <div className="flex gap-3">
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option>All Blocks</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm">
            <RefreshCcw className="w-4 h-4" />
            Refresh Live Data
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Villages Requiring Tankers" value="12" accent="red" />
        <StatCard title="High Priority Villages" value="5" accent="red" />
        <StatCard title="Available Tankers" value="18" accent="green" />
        <StatCard title="Active Deployments" value="7" accent="blue" />
      </div>

      {/* Table + Smart Engine */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Villages Pending Tanker Allocation
          </h2>

          <div className="h-72 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Allocation Table Placeholder
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Smart Tanker Assignment Engine
          </h2>

          <div className="h-64 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Assignment Engine Panel
          </div>
        </div>

      </div>

    </div>
  );
}

function StatCard({ title, value, accent }) {
  const colors = {
    red: "border-l-red-500",
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