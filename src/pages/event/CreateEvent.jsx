import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getFromStorage, setToStorage } from "../../utils/helpers";
import { mockEvents, categories } from "../../data/mockData";

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", date: "",
    category: "Technology", venue: "", formLink: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const events = getFromStorage("campusEvents") || mockEvents;
    const newEvent = {
      id: Date.now(),
      ...form,
      image: imagePreview || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&auto=format&fit=crop",
      organizerId: user.id,
      organizerName: user.name,
    };
    setToStorage("campusEvents", [...events, newEvent]);
    setSuccess(true);
    setTimeout(() => navigate("/organizer"), 1500);
  };

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all duration-200";
  const labelClass = "block text-sm font-semibold text-white/60 mb-1.5";

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate("/organizer")} className="text-white/40 hover:text-white text-sm mb-6 transition-colors">← Back</button>
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-2">Organizer</p>
          <h1 className="font-display font-extrabold text-white text-3xl">Post a New Event</h1>
          <p className="text-white/40 mt-1 text-sm">Students will register via your Google Form link.</p>
        </div>

        {success && (
          <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-2xl p-4 mb-6 text-center font-semibold">
            ✅ Event posted successfully! Redirecting...
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Event Title</label>
              <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Google I/O Extended 2025" required />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea className={`${inputClass} resize-none`} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the event..." required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Date</label>
                <input type="date" className={inputClass} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select className={`${inputClass} cursor-pointer`} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.filter((c) => c !== "All").map((c) => <option key={c} className="bg-gray-900">{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Venue</label>
              <input className={inputClass} value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="e.g. Main Auditorium, Block A" required />
            </div>

            <div>
              <label className={labelClass}>Google Form Registration Link</label>
              <input type="url" className={inputClass} value={form.formLink} onChange={(e) => setForm({ ...form, formLink: e.target.value })} placeholder="https://docs.google.com/forms/..." required />
              <p className="text-white/25 text-xs mt-1.5">Students will be redirected here when they click Register.</p>
            </div>

            <div>
              <label className={labelClass}>Event Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange}
                className="text-sm text-white/40 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-500 cursor-pointer" />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-3 w-full h-40 object-cover rounded-xl border border-white/10" />
              )}
            </div>

            <div className="flex gap-3 mt-2">
              <button type="submit" className="flex-1 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-violet-900/40">
                Post Event
              </button>
              <button type="button" onClick={() => navigate("/organizer")} className="flex-1 py-3 border border-white/20 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateEvent;