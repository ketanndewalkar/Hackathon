import {
  Download,
  Plus,
  AlertTriangle,
  Truck,
  Droplets,
  Building2
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor real-time drought indicators and manage relief operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 shadow-sm hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export Report
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg text-sm shadow-sm hover:bg-blue-900">
            <Plus className="w-4 h-4" />
            New Deployment
          </button>
        </div>

      </div>


      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card
          title="Total Villages Monitored"
          value="248"
          subtitle="Across 14 Blocks"
          icon={<Building2 className="w-5 h-5 text-blue-600" />}
          accent="blue"
        />

        <Card
          title="High Risk Villages"
          value="36"
          subtitle="+5 in last 7 days"
          icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
          accent="red"
        />

        <Card
          title="Available Water Tankers"
          value="18"
          subtitle="5 Active Deployments"
          icon={<Truck className="w-5 h-5 text-orange-500" />}
          accent="orange"
        />

        <Card
          title="Active Water Stress Alerts"
          value="12"
          subtitle="3 Critical Status"
          icon={<Droplets className="w-5 h-5 text-yellow-500" />}
          accent="yellow"
        />

      </div>


      {/* Charts + Alerts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Chart Section */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Rainfall vs Groundwater Trend (Last 12 Months)
            </h2>
            <span className="text-gray-400 text-xl">•••</span>
          </div>

          <div className="h-72 flex items-center justify-center border border-dashed border-gray-300 rounded-lg text-gray-400 text-sm">
            Chart Placeholder
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Recent Water Stress Alerts
            </h2>
            <button className="text-blue-700 text-sm">
              View All
            </button>
          </div>

          <div className="space-y-4">

            <AlertCard
              village="Karkhel"
              level="CRITICAL"
              statusColor="bg-red-100 text-red-600"
              tagColor="bg-red-50 text-red-600"
            />

            <AlertCard
              village="Pimple"
              level="HIGH"
              statusColor="bg-orange-100 text-orange-600"
              tagColor="bg-orange-50 text-orange-600"
            />

          </div>
        </div>
      </div>

    </div>
  );
}



function Card({ title, value, subtitle, icon, accent }) {

  const accentBorder =
    accent === "red"
      ? "border-l-red-500"
      : accent === "orange"
      ? "border-l-orange-500"
      : accent === "yellow"
      ? "border-l-yellow-500"
      : "border-l-blue-500";

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-6 border-l-4 ${accentBorder}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {value}
          </p>
          <p className="text-xs mt-2 text-gray-500">
            {subtitle}
          </p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}



function AlertCard({ village, level, statusColor }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">
          {village}
        </h3>
        <span className={`px-2 py-1 text-xs font-medium rounded ${statusColor}`}>
          {level}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-red-600 font-medium">Emergency</span>
        <button className="text-blue-700 font-medium text-sm">
          Take Action →
        </button>
      </div>
    </div>
  );
}