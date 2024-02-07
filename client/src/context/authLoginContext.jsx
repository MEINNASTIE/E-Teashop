// UNUSED CODE


import { createContext, useContext, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      console.log('Response data:', response.data);

      // If login is successful, set isLoggedIn to true and store token locally
      if (response.data.success) {
        localStorage.setItem('jwt_token', response.data.token);
        console.log('JWT token stored:', response.data.token);

        setIsLoggedIn(true);
        console.log('User logged in successfully');
        navigate.push('/');
      }

      return response.data; 
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'Login failed' }; 
    }
  };

  const logout = () => {
    // Clear token from localStorage and set isLoggedIn to false
    localStorage.removeItem('jwt_token');
    setIsLoggedIn(false);
    console.log('User logged out'); 
    navigate.push('/');
  };

  console.log('IsLoggedIn:', isLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

