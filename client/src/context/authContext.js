import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("user") || "");

  // stores current user info to local storage
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/poi/auth/login", inputs); // check user info
    setCurrentUser(res.data);
    setToken(res.token);
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:8800/poi/auth/logout"); // clear cookies
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ token, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
