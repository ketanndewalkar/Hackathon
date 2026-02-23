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
    <div className="min-h-screen bg-neutral-50 p-8 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">
            Water Governance Dashboard
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Real-time drought intelligence & operational monitoring.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-full text-sm shadow-sm hover:bg-neutral-800 transition"
        >
          <Plus className="w-4 h-4" />
          Add Village
        </button>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <InteractiveCard
          title="Total Villages"
          value={villageList.length}
          icon={<Building2 />}
          percentage={100}
        />

        <InteractiveCard
          title="Risk Villages"
          value={riskVillagesCount}
          icon={<AlertTriangle />}
          percentage={
            villageList.length
              ? (riskVillagesCount / villageList.length) * 100
              : 0
          }
        />

        <InteractiveCard
          title="Available Tankers"
          value="18"
          icon={<Truck />}
          percentage={75}
        />

        <InteractiveCard
          title="Active Alerts"
          value={riskVillagesCount + 3}
          icon={<Droplets />}
          percentage={60}
        />
      </div>

      {/* VISUAL BREAKDOWN SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* RISK DISTRIBUTION */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">

          <h2 className="text-lg font-medium text-neutral-900 mb-6">
            Risk Distribution Overview
          </h2>

          <ProgressBar
            label="High / Critical"
            value={riskVillagesCount}
            total={villageList.length}
          />

          <ProgressBar
            label="Safe / Moderate"
            value={safeCount}
            total={villageList.length}
          />
        </div>

        {/* ALERT FEED */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">

          <h2 className="text-lg font-medium text-neutral-900 mb-6">
            Recent Stress Alerts
          </h2>

          {villageList.length === 0 ? (
            <p className="text-sm text-neutral-400">
              No alerts available.
            </p>
          ) : (
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {villageList.slice().reverse().map((v) => (
                <div
                  key={v.id}
                  className="p-4 border border-neutral-200 rounded-2xl hover:shadow-sm transition"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-neutral-900">
                        {v.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {v.district}
                      </p>
                    </div>
                    <span className="text-xs px-3 py-1 bg-neutral-100 rounded-full">
                      {v.riskLevel}
                    </span>
                  </div>
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


/* ---------- Interactive KPI Card ---------- */

function InteractiveCard({ title, value, icon, percentage }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group">

      <div className="flex justify-between items-start mb-6">
        <p className="text-sm text-neutral-500">{title}</p>
        <div className="text-neutral-400">{icon}</div>
      </div>

      <div className="text-3xl font-semibold text-neutral-900">
        {value}
      </div>

      <div className="mt-6">
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className="bg-neutral-900 h-2 rounded-full transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}


/* ---------- Progress Component ---------- */

function ProgressBar({ label, value, total }) {
  const percent =
    total > 0 ? ((value / total) * 100).toFixed(0) : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-neutral-700 mb-2">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full bg-neutral-200 rounded-full h-3">
        <div
          className="bg-neutral-900 h-3 rounded-full transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}


/* ---------- Modal ---------- */

function AddVillageModal({
  villageData,
  handleChange,
  handleSubmit,
  loading,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-md relative shadow-lg">

        <button onClick={onClose} className="absolute right-5 top-5">
          <X className="w-5 h-5 text-neutral-500" />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-neutral-900">
          Add New Village
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Village Name"
            value={villageData.name}
            onChange={handleChange}
            className="w-full border border-neutral-200 rounded-xl px-4 py-2 text-sm"
            required
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            value={villageData.district}
            onChange={handleChange}
            className="w-full border border-neutral-200 rounded-xl px-4 py-2 text-sm"
            required
          />

          <input
            type="number"
            name="population"
            placeholder="Population"
            value={villageData.population}
            onChange={handleChange}
            className="w-full border border-neutral-200 rounded-xl px-4 py-2 text-sm"
            required
          />

          <select
            name="riskLevel"
            value={villageData.riskLevel}
            onChange={handleChange}
            className="w-full border border-neutral-200 rounded-xl px-4 py-2 text-sm"
          >
            <option value="LOW">LOW</option>
            <option value="MODERATE">MODERATE</option>
            <option value="HIGH">HIGH</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white py-3 rounded-full hover:bg-neutral-800 transition"
          >
            {loading ? "Saving..." : "Save Village"}
          </button>
        </form>
      </div>
    </div>
  );
}