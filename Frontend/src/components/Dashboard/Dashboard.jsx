import {
  Plus,
  AlertTriangle,
  Truck,
  Droplets,
  Building2,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const STORAGE_KEY = "mock_villages";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentRiskAdded, setRecentRiskAdded] = useState(0);

  const [villageList, setVillageList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [villageData, setVillageData] = useState({
    name: "",
    district: "",
    population: "",
    riskLevel: "LOW",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(villageList));
  }, [villageList]);

  const riskVillagesCount = villageList.filter(
    (v) => v.riskLevel === "HIGH" || v.riskLevel === "CRITICAL"
  ).length;

  const safeCount = villageList.length - riskVillagesCount;

  const handleChange = (e) => {
    setVillageData({
      ...villageData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newVillage = {
        id: Date.now(),
        rainfallDeviation: Math.floor(Math.random() * 60) - 30,
        groundwaterTrend: Math.floor(Math.random() * 40) - 20,
        stressIndex: Math.floor(Math.random() * 100),
        ...villageData,
      };

      setVillageList((prev) => [...prev, newVillage]);

      if (
        villageData.riskLevel === "HIGH" ||
        villageData.riskLevel === "CRITICAL"
      ) {
        setRecentRiskAdded((prev) => prev + 1);
      }

      setVillageData({
        name: "",
        district: "",
        population: "",
        riskLevel: "LOW",
      });

      setShowModal(false);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8 space-y-12">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Water Governance Command Center
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            AI-assisted drought intelligence and operational oversight.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full text-sm shadow-md hover:bg-teal-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Village
        </button>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

        <KpiCard
          title="Total Villages"
          value={villageList.length}
          icon={<Building2 />}
          accent="blue"
        />

        <KpiCard
          title="At Risk"
          value={riskVillagesCount}
          icon={<AlertTriangle />}
          accent="red"
        />

        <KpiCard
          title="Tankers Available"
          value="18"
          icon={<Truck />}
          accent="emerald"
        />

        <KpiCard
          title="Active Alerts"
          value={riskVillagesCount + 3}
          icon={<Droplets />}
          accent="amber"
        />

      </div>

      {/* VISUAL SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        <div className="bg-white/70 backdrop-blur-lg border border-slate-200 rounded-3xl p-8 shadow-lg">

          <h2 className="text-lg font-medium text-slate-900 mb-8">
            Risk Distribution
          </h2>

          <SoftProgress
            label="High / Critical"
            value={riskVillagesCount}
            total={villageList.length}
            color="bg-red-500"
          />

          <SoftProgress
            label="Safe / Moderate"
            value={safeCount}
            total={villageList.length}
            color="bg-emerald-500"
          />
        </div>

        <div className="bg-white/70 backdrop-blur-lg border border-slate-200 rounded-3xl p-8 shadow-lg">

          <h2 className="text-lg font-medium text-slate-900 mb-8">
            Live Alert Stream
          </h2>

          {villageList.length === 0 ? (
            <p className="text-sm text-slate-400">
              No stress signals detected.
            </p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {villageList.slice().reverse().map((v) => (
                <div
                  key={v.id}
                  className="flex justify-between items-center p-4 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {v.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {v.district}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-medium ${
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

      </div>

      {showModal && (
        <AddVillageModal
          villageData={villageData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

/* KPI CARD */
function KpiCard({ title, value, icon, accent }) {
  const accentColors = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-7 hover:shadow-lg transition-all">

      <div className="flex justify-between mb-6">
        <p className="text-sm text-slate-500">{title}</p>
        <div className={`p-3 rounded-xl ${accentColors[accent]}`}>
          {icon}
        </div>
      </div>

      <div className="text-3xl font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}

/* Soft Progress */
function SoftProgress({ label, value, total, color }) {
  const percent =
    total > 0 ? ((value / total) * 100).toFixed(0) : 0;

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-slate-600 mb-3">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <div
          className={`${color} h-3 transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

/* Modal */
function AddVillageModal({
  villageData,
  handleChange,
  handleSubmit,
  loading,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-xl relative">

        <button onClick={onClose} className="absolute right-6 top-6">
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Add Village
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Village Name"
            value={villageData.name}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-400 outline-none"
            required
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            value={villageData.district}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-400 outline-none"
            required
          />

          <input
            type="number"
            name="population"
            placeholder="Population"
            value={villageData.population}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-400 outline-none"
            required
          />

          <select
            name="riskLevel"
            value={villageData.riskLevel}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-400 outline-none"
          >
            <option value="LOW">LOW</option>
            <option value="MODERATE">MODERATE</option>
            <option value="HIGH">HIGH</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-full hover:bg-teal-700 transition"
          >
            {loading ? "Saving..." : "Save Village"}
          </button>

        </form>
      </div>
    </div>
  );
}