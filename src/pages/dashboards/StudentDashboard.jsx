import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import EventCard from "../../components/event/EventCard";
import { mockEvents, categories } from "../../data/mockData";
import { getFromStorage } from "../../utils/helpers";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [events] = useState(() => getFromStorage("campusEvents") || mockEvents);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = events.filter((e) => {
    const matchCat = activeCategory === "All" || e.category === activeCategory;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <DashboardLayout>
      {/* Hero header */}
      <div className="mb-10">
        <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-2">Lords Institute of Engineering & Technology</p>
        <h1 className="font-display font-extrabold text-white text-4xl md:text-5xl leading-tight">
          Where your <span className="text-violet-400">campus</span><br />comes alive.
        </h1>
        <p className="text-white/40 mt-3 text-base max-w-xl">
          Discover events, workshops, fests and more. Click Register to fill the organizer's form directly.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events, clubs, keywords..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all duration-200"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-900/30"
                  : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex gap-6 mb-8">
        <div className="text-white/40 text-sm">
          <span className="text-white font-bold text-lg">{filtered.length}</span> events found
        </div>
        {activeCategory !== "All" && (
          <button onClick={() => setActiveCategory("All")} className="text-violet-400 text-sm hover:underline">
            Clear filter ×
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🔭</div>
          <h3 className="text-xl font-display font-bold text-white/60">No events found</h3>
          <p className="text-white/30 mt-2 text-sm">Try a different category or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event, i) => (
            <div key={event.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-fade-in">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;