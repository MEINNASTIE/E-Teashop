import { createContext, useState, useEffect } from "react";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();


export default function UserProvider({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: "",
    _id: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    const storedToken = localStorage.getItem("jwt_token");

    if (storedData) {
      setUser(JSON.parse(storedData));
    }

    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      console.log('Response data:', response.data);

      if (response.data.success) {
        localStorage.setItem('jwt_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
        setUser(response.data.user); // Update user state
        setIsLoggedIn(true);
        navigate('/');
      }

      return response.data; 
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'Login failed' }; 
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user'); // Remove user data from localStorage
    setIsLoggedIn(false);
    setUser({ email: "", _id: "" }); // Clear user state
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
