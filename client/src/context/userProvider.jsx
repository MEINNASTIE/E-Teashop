import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    let userData = {};

    if (storedData) userData = JSON.parse(storedData);

    console.log("🚀 ~ userData:", userData);

    if (userData._id) setUser({ ...userData });
  }, []);

  const [user, setUser] = useState({
    email: "",
    _id: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}