import { NavLink } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-blue-950 text-white
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300
          md:translate-x-0 md:static md:flex md:flex-col
        `}
      >
        <div className="h-16 flex items-center justify-center font-semibold text-lg border-b border-blue-800">
          JalSaksham
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <SidebarItem label="Dashboard" to="/dashboard"/>
          <SidebarItem label="Analytics" to="/dashboard/risk-analysis"/>
          <SidebarItem label="Prediction" to="/dashboard/prediction"/>
          <SidebarItem label="Tanker Allocation" to="/dashboard/tanker-allocation"/>
          <SidebarItem label="Reports" />
          <SidebarItem label="Settings" />
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({ label,to }) {
  return (
    <NavLink to={to} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-800 transition">
      {label}
    </NavLink>
  );
}