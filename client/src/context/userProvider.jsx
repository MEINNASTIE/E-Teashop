import { createContext, useState, useEffect } from "react";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();


export default function UserProvider({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    let userData = {};

    if (storedData) userData = JSON.parse(storedData);

    console.log("userData:", userData);

    if (userData._id) setUser({ ...userData });
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");

    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const [user, setUser] = useState({
    email: "",
    _id: "",
  });

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
        navigate('/');
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
    navigate('/');
  };

  console.log('IsLoggedIn:', isLoggedIn);

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}