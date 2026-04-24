import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import StudentDashboard from "../pages/dashboards/StudentDashboard";
import OrganizerDashboard from "../pages/dashboards/OrganizerDashboard";
import AdminDashboard from "../pages/dashboards/AdminDashboard";
import CreateEvent from "../pages/event/CreateEvent";
import EventDetails from "../pages/event/EventDetails";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" />;
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${user.role === "admin" ? "admin" : user.role === "organizer" ? "organizer" : "student"}`} />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/student" />} />

      <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/organizer" element={<ProtectedRoute allowedRoles={["organizer"]}><OrganizerDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />

      <Route path="/create-event" element={<ProtectedRoute allowedRoles={["organizer"]}><CreateEvent /></ProtectedRoute>} />
      <Route path="/event/:id" element={<ProtectedRoute allowedRoles={["student", "organizer", "admin"]}><EventDetails /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to={user ? `/${user.role === "admin" ? "admin" : user.role === "organizer" ? "organizer" : "student"}` : "/login"} />} />
    </Routes>
  );
};

export default AppRoutes;