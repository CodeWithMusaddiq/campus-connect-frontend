import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getFromStorage, formatDate } from "../../utils/helpers";
import { mockEvents } from "../../data/mockData";

const DEFAULT_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSfxDxlEcjUGUeyWMZDgHv2NlPSlxEIIjXtHlA6rUXOwdFmHeA/viewform";

const categoryColors = {
  Technology: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Cultural: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Career: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Sports: "bg-green-500/20 text-green-300 border-green-500/30",
  Workshop: "bg-violet-500/20 text-violet-300 border-violet-500/30",
};

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const storedEvents = getFromStorage("campusEvents") || [];

  // ✅ Merge + remove duplicates by id
  const allEvents = [...mockEvents, ...storedEvents].filter(
    (event, index, self) =>
      index === self.findIndex((e) => String(e.id) === String(event.id))
  );

  const event = allEvents.find((e) => String(e.id) === id);

  const handleRegister = () => {
    const link = event?.formLink || DEFAULT_LINK;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (!event) {
    return (
      <DashboardLayout>
        <div className="text-center py-24">
          <h3 className="text-white text-xl">Event not found</h3>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const colorClass =
    categoryColors[event.category] ||
    "bg-gray-500/20 text-gray-300 border-gray-500/30";

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="text-white mb-4"
        >
          ← Back
        </button>

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-72 object-cover rounded-xl"
        />

        <h1 className="text-white text-3xl mt-4">{event.title}</h1>
        <p className="text-white/60 mt-2">{event.description}</p>

        <div className="mt-4 text-white/70">
          <p>📅 {formatDate(event.date)}</p>
          <p>📍 {event.venue}</p>
          <p>🎤 {event.organizerName}</p>
        </div>

        {user?.role === "student" && (
          <button
            onClick={handleRegister}
            className="mt-6 w-full py-3 bg-violet-600 text-white rounded-xl"
          >
            Register →
          </button>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EventDetails;