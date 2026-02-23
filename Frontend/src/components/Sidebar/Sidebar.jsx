import { useLayoutEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import gsap from "gsap";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const sidebarRef = useRef(null);
  const itemRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (sidebarOpen) {
        gsap.fromTo(
          sidebarRef.current,
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
        );

        gsap.fromTo(
          itemRefs.current,
          { x: -15, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.3,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      }
    }, sidebarRef);

    return () => ctx.revert();
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-green-800 text-white
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300
        md:translate-x-0 md:static md:flex md:flex-col`}
      >
        
        <div className="flex items-center pt-2">
            <Link to="/" className="pl-5">{"<"}</Link>
        <img
          src="./logo.png"
          alt="Logo"
          className="
      h-12 
      sm:h-9 
      md:h-15 
      w-auto 
      object-contain
    "
        />
        <h1 className="text-white font-bold">
            JalSaksham
        </h1>
      </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">

          <SidebarItem
            label="Dashboard"
            to="/dashboard"
            index={0}
            itemRefs={itemRefs}
            end
          />

          <SidebarItem
            label="Analytics"
            to="/dashboard/risk-analysis"
            index={1}
            itemRefs={itemRefs}
          />

          <SidebarItem
            label="Prediction"
            to="/dashboard/prediction"
            index={2}
            itemRefs={itemRefs}
          />

          <SidebarItem
            label="Tanker Allocation"
            to="/dashboard/tanker-allocation"
            index={3}
            itemRefs={itemRefs}
          />

          

        </nav>
      </aside>
    </>
  );
}

function SidebarItem({ label, to, index, itemRefs, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      ref={(el) => (itemRefs.current[index] = el)}
      className={({ isActive }) =>
        `relative block w-full text-left px-4 py-2 rounded-lg transition-all duration-300
        ${
          isActive
            ? "bg-green-700 text-white font-medium"
            : "text-white/80 hover:bg-green-700 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}

          {/* Active Indicator Bar */}
          <span
            className={`absolute left-0 top-0 h-full w-1 bg-lime-400 rounded-r-full transition-all duration-300 ${
              isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            }`}
          />
        </>
      )}
    </NavLink>
  );
}