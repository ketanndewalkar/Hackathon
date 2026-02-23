import { Download, TrendingUp, AlertTriangle } from "lucide-react";
import { useState } from "react";

const STORAGE_KEY = "mock_villages";

export default function WaterStress() {

  const [villageList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const highRisk = villageList.filter(
    v => v.riskLevel === "HIGH" || v.riskLevel === "CRITICAL"
  ).length;

  const moderateRisk = villageList.filter(
    v => v.riskLevel === "MODERATE"
  ).length;

  const lowRisk = villageList.filter(
    v => v.riskLevel === "LOW"
  ).length;

  const avgIndex =
    villageList.length > 0
      ? (
          villageList.reduce(
            (acc, v) => acc + (v.stressIndex || 0),
            0
          ) / villageList.length
        ).toFixed(2)
      : "0";

  const total = villageList.length;

  return (
    <div className="min-h-screen bg-neutral-50 p-6 space-y-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">
            Water Stress Intelligence
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Consolidated assessment of groundwater vulnerability.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm shadow-sm hover:bg-neutral-50">
          <Download className="w-4 h-4" />
          Export Assessment
        </button>
      </div>

      {/* OVERVIEW PANEL */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT — BIG INDEX DISPLAY */}
          <div className="flex flex-col justify-center space-y-6">

            <div>
              <p className="text-sm text-neutral-500">
                Average Water Stress Index
              </p>
              <p className="text-5xl font-bold text-neutral-900 mt-2">
                {avgIndex}%
              </p>
            </div>

            <div className="w-full bg-neutral-200 rounded-full h-3">
              <div
                className="bg-neutral-800 h-3 rounded-full transition-all duration-500"
                style={{ width: `${avgIndex}%` }}
              />
            </div>

            <div className="text-sm text-neutral-500">
              Based on {total} monitored villages
            </div>
          </div>

          {/* RIGHT — RISK DISTRIBUTION */}
          <div className="space-y-6">

            <SectionRow
              label="High Risk"
              value={highRisk}
              total={total}
              color="bg-red-500"
            />

            <SectionRow
              label="Moderate Risk"
              value={moderateRisk}
              total={total}
              color="bg-yellow-500"
            />

            <SectionRow
              label="Low Risk"
              value={lowRisk}
              total={total}
              color="bg-green-500"
            />

          </div>

        </div>
      </div>

      {/* GRID CONTENT AREA */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* RISK RANKING TABLE */}
        <div className="xl:col-span-2 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              Stress Ranking Overview
            </h2>
            <TrendingUp className="text-neutral-400" />
          </div>

          {villageList.length === 0 ? (
            <p className="text-sm text-neutral-400">
              No village data available.
            </p>
          ) : (
            <div className="space-y-3">

              {[...villageList]
                .sort((a, b) => b.stressIndex - a.stressIndex)
                .map((v, index) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between px-4 py-3 border border-neutral-200 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-neutral-900">
                        {v.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {v.district}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-neutral-800">
                        {v.stressIndex}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {v.riskLevel}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}

        </div>

        {/* INSIGHT PANEL */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-neutral-600" />
            <h3 className="font-semibold text-neutral-900">
              Strategic Insight
            </h3>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed">
            {highRisk} villages are currently categorized under elevated
            drought stress conditions. Continued rainfall deviation and
            groundwater depletion indicators suggest localized intervention
            may be required in the coming monitoring cycle.
          </p>

          <div className="mt-6 text-xs text-neutral-400">
            This assessment is dynamically derived from recorded
            village-level stress inputs.
          </div>

        </div>

      </div>

    </div>
  );
}


/* SUB COMPONENT */

function SectionRow({ label, value, total, color }) {

  const percent =
    total > 0 ? ((value / total) * 100).toFixed(0) : 0;

  return (
    <div className="space-y-2">

      <div className="flex justify-between text-sm text-neutral-700">
        <span>{label}</span>
        <span>{value} ({percent}%)</span>
      </div>

      <div className="w-full bg-neutral-200 rounded-full h-3">
        <div
          className={`${color} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>

    </div>
  );
}