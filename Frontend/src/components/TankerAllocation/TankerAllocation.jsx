import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TankerAllocation() {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5500/api/tanker-allocation"
      );

      setKpiData(response.data);
    } catch (error) {
      console.error("Error fetching tanker allocation data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm"
          >
            <RefreshCcw
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh Live Data
          </button>
        </div>
      </div>

      {/* KPI Section */}
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
              title="Villages Requiring Tankers"
              value={kpiData?.villagesRequiring ?? "12"}
              accent="red"
            />
            <StatCard
              title="High Priority Villages"
              value={kpiData?.highPriority ?? "5"}
              accent="red"
            />
            <StatCard
              title="Available Tankers"
              value={kpiData?.availableTankers ?? "18"}
              accent="green"
            />
            <StatCard
              title="Active Deployments"
              value={kpiData?.activeDeployments ?? "7"}
              accent="blue"
            />
          </>
        )}
      </div>

      {/* Table + Smart Engine */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Villages Pending Tanker Allocation
          </h2>

          {loading ? (
            <SkeletonBox height="h-72" />
          ) : (
            <div className="h-72 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Allocation Table Placeholder
            </div>
          )}
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Smart Tanker Assignment Engine
          </h2>

          {loading ? (
            <SkeletonBox height="h-64" />
          ) : (
            <div className="h-64 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Assignment Engine Panel
            </div>
          )}
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
    <div
      className={`bg-white border border-gray-200 border-l-4 ${colors[accent]} rounded-xl p-6`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-3">{value}</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-20"></div>
    </div>
  );
}

function SkeletonBox({ height }) {
  return (
    <div className={`bg-gray-100 rounded-lg ${height} animate-pulse`} />
  );
}