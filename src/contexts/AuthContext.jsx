import { createContext, useEffect, useState } from "react";
import { loginService, registerService } from "../services/authService";
import { customToast } from '../utils/toast.jsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children}) => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore Authentication when application start
  useEffect( () => {
    const token = localStorage.getItem('token');
    const userStored = localStorage.getItem('user');

    if (token && userStored) {
      setUser(JSON.parse(userStored));
    }

    setIsLoading(false);
  },[])

  const login = async (credentials) => {
    const response = await loginService(credentials);
    const userData = response.body;
    
    // store JWT token
    localStorage.setItem('token',userData.token);

    // store user information
    localStorage.setItem('user', JSON.stringify({
      email: userData.email,
      phone: userData.phone, 
      role: userData.role
    }))

    setUser({
      email: userData.email,
      phone: userData.phone,
      role: userData.role
    })
    return response;
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);

    customToast.success("Logout successfully.")
  }

  const register = async (data) => {
      const response = await registerService(data);
      return response;
  };

  const values = {
    user, 
    isLoading, 
    login,
    register,
    logout
  }

  return(
    <AuthContext.Provider value={values}
      >
      {children}
    </AuthContext.Provider>
  )
}