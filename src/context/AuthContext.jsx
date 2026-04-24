import { createContext, useContext, useState, useEffect } from "react";
import { getFromStorage, setToStorage } from "../utils/helpers";
import { mockUsers } from "../data/mockData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getFromStorage("campusUser"));
  const [users, setUsers] = useState(() => getFromStorage("campusUsers") || mockUsers);

  useEffect(() => {
    setToStorage("campusUsers", users);
  }, [users]);

  const login = (email, password) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      setToStorage("campusUser", found);
      return { success: true, role: found.role };
    }
    return { success: false };
  };

  const signup = (name, email, password, role) => {
    const exists = users.find((u) => u.email === email);
    if (exists) return { success: false, message: "Email already registered." };
    const newUser = { id: Date.now(), name, email, password, role };
    const updated = [...users, newUser];
    setUsers(updated);
    setUser(newUser);
    setToStorage("campusUser", newUser);
    return { success: true, role };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("campusUser");
  };

  return (
    <AuthContext.Provider value={{ user, users, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);