import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signup(name, email, password, role);
    if (result.success) {
      navigate(result.role === "organizer" ? "/organizer" : "/student");
    } else {
      setError(result.message);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/60 transition-all duration-200";

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-violet-700/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-violet-900/50">
            <span className="text-white font-display font-bold text-xl">L</span>
          </div>
          <h1 className="font-display font-extrabold text-white text-3xl">Create account</h1>
          <p className="text-white/40 mt-1 text-sm">Join Lords Campus Connect</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-white/50 mb-1.5">Full Name</label>
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/50 mb-1.5">Email</label>
              <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@lords.ac.in" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/50 mb-1.5">Password</label>
              <input type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/50 mb-1.5">Role</label>
              <div className="flex gap-3">
                {["student", "organizer"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                      role === r
                        ? "border-violet-500 bg-violet-500/20 text-violet-300"
                        : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"
                    }`}
                  >
                    {r === "student" ? "🎓 Student" : "🎤 Organizer"}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 py-2 rounded-xl">{error}</p>}

            <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl mt-2 transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-violet-900/40">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/30 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;