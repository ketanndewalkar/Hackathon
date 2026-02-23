import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WaterStress() {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5500/api/water-stress"
      );

      setKpiData(response.data);
    } catch (error) {
      console.error("Error fetching water stress data:", error);
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
            Water Stress Risk Intelligence
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            AI-powered predictive analysis of village drought vulnerability.
          </p>
        </div>

        <div className="flex gap-3">
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option>Last 30 Days</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm">
            <Download className="w-4 h-4" />
            Export Report
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
              title="Average Water Stress Index"
              value={kpiData?.avgIndex ?? "62.4"}
              accent="orange"
            />
            <StatCard
              title="High Risk Villages"
              value={kpiData?.highRisk ?? "36"}
              accent="red"
            />
            <StatCard
              title="Moderate Risk Villages"
              value={kpiData?.moderateRisk ?? "74"}
              accent="yellow"
            />
            <StatCard
              title="Low Risk Villages"
              value={kpiData?.lowRisk ?? "138"}
              accent="green"
            />
          </>
        )}
      </div>

      {/* AI Banner */}
      {loading ? (
        <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
      ) : (
        <div className="bg-blue-50 border-l-4 border-blue-700 p-5 rounded-lg text-sm">
          <strong>AI Early Warning Signal:</strong>{" "}
          {kpiData?.aiInsight ??
            "Based on rainfall deficit (-34%) and declining groundwater (-12%), 8 villages may shift to high-risk."}
        </div>
      )}

      {/* Table + Risk Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Village Water Stress Breakdown</h2>

          {loading ? (
            <SkeletonBox height="h-72" />
          ) : (
            <div className="h-72 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Table Placeholder
            </div>
          )}
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Risk Overview</h2>

          {loading ? (
            <SkeletonBox height="h-64" />
          ) : (
            <div className="h-64 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Pie Chart Placeholder
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
    orange: "border-l-orange-500",
    yellow: "border-l-yellow-500",
    green: "border-l-green-500",
  };

  return (
    <div className={`bg-white border border-gray-200 border-l-4 ${colors[accent]} rounded-xl p-6`}>
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