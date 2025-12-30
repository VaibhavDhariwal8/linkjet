import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");

    if (!stored || stored === "undefined") {
      return null;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!token) return;

    getMe(token).then((user) => {
      setUser({
        name: `${user.firstname} ${user.lastname}`,
        initials: user.firstname[0] + user.lastname[0],
        email: user.email,
      });
    });
  }, [token]);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
