import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import EventCard from "../../components/event/EventCard";
import { getFromStorage, setToStorage } from "../../utils/helpers";
import { mockEvents, categories } from "../../data/mockData";

const OrganizerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState(() => getFromStorage("campusEvents") || mockEvents);
  const [activeCategory, setActiveCategory] = useState("All");

  const myEvents = events.filter((e) => e.organizerId === user.id);
  const filtered = activeCategory === "All" ? myEvents : myEvents.filter((e) => e.category === activeCategory);

  const handleDelete = (id) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    setToStorage("campusEvents", updated);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-2">Organizer Panel</p>
          <h1 className="font-display font-extrabold text-white text-4xl">My Events</h1>
          <p className="text-white/40 mt-2">Post events — students register via your Google Form.</p>
        </div>
        <button
          onClick={() => navigate("/create-event")}
          className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-violet-900/40 whitespace-nowrap"
        >
          + Post New Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Events", value: myEvents.length, color: "from-violet-600 to-indigo-700" },
          { label: "Categories", value: [...new Set(myEvents.map((e) => e.category))].length, color: "from-blue-600 to-cyan-700" },
          { label: "Registrations Open", value: myEvents.length, color: "from-emerald-600 to-teal-700" },
        ].map((s) => (
          <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 shadow-xl`}>
            <p className="text-3xl font-display font-extrabold text-white">{s.value}</p>
            <p className="text-white/70 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Category filter */}
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

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-display font-bold text-white/60">No events yet</h3>
          <p className="text-white/30 mt-2 text-sm">Post your first event to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <div key={event.id} className="relative">
              <EventCard event={event} />
              <button
                onClick={() => handleDelete(event.id)}
                className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-500 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm transition-all duration-200 z-10"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default OrganizerDashboard;