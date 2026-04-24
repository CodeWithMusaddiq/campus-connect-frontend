import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardPath =
    user?.role === "admin" ? "/admin" :
    user?.role === "organizer" ? "/organizer" : "/student";

  const roleColors = {
    student: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    organizer: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    admin: "text-rose-400 border-rose-500/30 bg-rose-500/10",
  };

  return (
    <nav className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link to={dashboardPath} className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-violet-900/50">
            <span className="text-white font-display font-bold text-sm">L</span>
          </div>
          <div>
            <span className="font-display font-bold text-white text-base tracking-tight">Campus</span>
            <span className="font-display font-bold text-violet-400 text-base tracking-tight">Connect</span>
          </div>
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            <span className={`hidden md:inline text-xs font-semibold px-3 py-1 rounded-full border ${roleColors[user.role]}`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
            <span className="hidden md:inline text-sm text-white/60 font-medium">{user.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-1.5 rounded-xl border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;