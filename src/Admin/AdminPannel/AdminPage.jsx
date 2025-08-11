import React, { useState } from "react";

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const sections = ["Dashboard", "Adoption List", "Rescue List"];

  const icons = {
    "Dashboard": "🛡️",
    "Adoption List": "📜",
    "Rescue List": "🏠"
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 transition-all">
      {/* Sidebar */}
      <div
        className={`bg-blue-100 shadow-lg transition-all duration-300 ease-in-out
        ${sidebarOpen ? "w-64" : "w-16"} flex flex-col`}
      >
        {/* Header with toggle button */}
        <div className="flex items-center justify-between p-4 border-b">
          {sidebarOpen && (
            <h2 className="text-lg font-bold text-black">Admin section</h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-purple-100 transition"
          >
            <div className="flex flex-col space-y-[3px]">
              <div className="w-5 h-[2px] bg-purple-700" />
              <div className="w-5 h-[2px] bg-purple-700" />
              <div className="w-5 h-[2px] bg-purple-700" />
            </div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded transition
              ${activeSection === section
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "hover:bg-purple-50"
                }`}
            >
              <span>{icons[section]}</span>
              {sidebarOpen && <span>{section}</span>}
            </button>
          ))}
        </nav>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 transition-all duration-300">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6">
          {icons[activeSection]} {activeSection}
        </h1>

        {activeSection === "Dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Users", value: 218 },
              { label: "Total Adoptions", value: 12 },
              { label: "Total Rescuers", value: 3450 },
              { label: "New Messages", value: 5 },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
              >
                <p className="text-gray-500">{item.label}</p>
                <p className="text-2xl font-bold text-purple-700">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {activeSection === "Adoption List" && (
          <div className="bg-white p-6 rounded-2xl shadow mt-4">
            <p className="text-gray-800 font-semibold">Adoption List section placeholder.</p>
          </div>
        )}

        {activeSection === "Rescue List" && (
          <div className="bg-white p-6 rounded-2xl shadow mt-4">
            <p className="text-gray-700">Rescue List section placeholder.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;