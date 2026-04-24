import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import EventCard from "../../components/event/EventCard";
import { getFromStorage, setToStorage } from "../../utils/helpers";
import { mockEvents, categories } from "../../data/mockData";

const AdminDashboard = () => {
  const { users } = useAuth();
  const [events, setEvents] = useState(() => getFromStorage("campusEvents") || mockEvents);
  const [activeTab, setActiveTab] = useState("events");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? events : events.filter((e) => e.category === activeCategory);

  const handleDelete = (id) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    setToStorage("campusEvents", updated);
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <p className="text-rose-400 text-sm font-semibold uppercase tracking-widest mb-2">Admin Panel</p>
        <h1 className="font-display font-extrabold text-white text-4xl">Dashboard</h1>
        <p className="text-white/40 mt-2">Manage all events and users across the platform.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: users.length, icon: "👥", color: "border-blue-500/30 bg-blue-500/10" },
          { label: "Total Events", value: events.length, icon: "📅", color: "border-violet-500/30 bg-violet-500/10" },
          { label: "Categories", value: [...new Set(events.map((e) => e.category))].length, icon: "🏷️", color: "border-amber-500/30 bg-amber-500/10" },
          { label: "Organizers", value: users.filter((u) => u.role === "organizer").length, icon: "🎤", color: "border-emerald-500/30 bg-emerald-500/10" },
        ].map((s) => (
          <div key={s.label} className={`border rounded-2xl p-5 ${s.color}`}>
            <span className="text-2xl">{s.icon}</span>
            <p className="text-3xl font-display font-extrabold text-white mt-2">{s.value}</p>
            <p className="text-white/40 text-sm mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["events", "users"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all ${
              activeTab === tab
                ? "bg-violet-600 text-white border-violet-500"
                : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tab === "events" ? "All Events" : "Users"}
          </button>
        ))}
      </div>

      {activeTab === "events" && (
        <>
          <div className="flex gap-2 mb-6 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white border-violet-500"
                    : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <div key={event.id} className="relative">
                <EventCard event={event} />
                <button
                  onClick={() => handleDelete(event.id)}
                  className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-500 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm transition-all z-10"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "users" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 font-semibold text-white/40 text-xs uppercase tracking-widest">#</th>
                <th className="text-left px-6 py-4 font-semibold text-white/40 text-xs uppercase tracking-widest">Name</th>
                <th className="text-left px-6 py-4 font-semibold text-white/40 text-xs uppercase tracking-widest">Email</th>
                <th className="text-left px-6 py-4 font-semibold text-white/40 text-xs uppercase tracking-widest">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => {
                const roleStyle = u.role === "admin" ? "text-rose-400 bg-rose-500/10 border-rose-500/30" : u.role === "organizer" ? "text-violet-400 bg-violet-500/10 border-violet-500/30" : "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
                return (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white/20">{i + 1}</td>
                    <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                    <td className="px-6 py-4 text-white/40">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${roleStyle}`}>{u.role}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;