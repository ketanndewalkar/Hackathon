export default function Navbar({ setSidebarOpen }) {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      <h1 className="text-lg font-semibold text-gray-800">
        
      </h1>

      <div className="flex items-center space-x-4">
        <button className="text-gray-600">🔔</button>
        <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
      </div>

    </header>
  );
}