import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/helpers";

const DEFAULT_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSfxDxlEcjUGUeyWMZDgHv2NlPSlxEIIjXtHlA6rUXOwdFmHeA/viewform";

const categoryColors = {
  Technology: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Cultural: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Career: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Sports: "bg-green-500/20 text-green-300 border-green-500/30",
  Workshop: "bg-violet-500/20 text-violet-300 border-violet-500/30",
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const colorClass =
    categoryColors[event.category] ||
    "bg-gray-500/20 text-gray-300 border-gray-500/30";

  const handleRegister = () => {
    const link = event?.formLink || DEFAULT_LINK;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleDetails = () => {
    if (!event?.id) {
      alert("Event ID missing");
      return;
    }
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 hover:bg-white/8 transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 flex flex-col">
      
      <div className="relative overflow-hidden h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full border ${colorClass}`}>
          {event.category}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-white font-bold">{event.title}</h3>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleDetails}
            className="flex-1 py-2 border border-white/20 rounded-xl text-white"
          >
            Details
          </button>

          <button
            onClick={handleRegister}
            className="flex-1 py-2 bg-violet-600 rounded-xl text-white"
          >
            Register →
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;