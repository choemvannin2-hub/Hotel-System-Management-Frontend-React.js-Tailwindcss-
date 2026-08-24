import { createContext, useContext, useState } from "react";
import { login as loginService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials) => {
    // 1. Call backend service directly
    const res = await loginService(credentials);
    const data = res?.data || res; // Handles axios wrapper differences

    const userData = {
      email: data.email,
      phone: data.phone,
      role: data.role,
    };

    // 2. Save token and normalized user info
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);