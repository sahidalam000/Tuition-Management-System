import { createContext, useEffect, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
);

  const [loading, setLoading] = useState(true);


  // LOAD CURRENT USER
  const loadUser = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      const response = await API.get(
        "/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);

localStorage.setItem(
  "user",
  JSON.stringify(response.data)
);

    } catch (error) {

      console.log(error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    setLoading(false);
  };


  useEffect(() => {

  loadUser();

  window.addEventListener(
    "storage",
    loadUser
  );

  return () => {
    window.removeEventListener(
      "storage",
      loadUser
    );
  };

}, []);


  // LOGOUT
  const logout = () => {

    localStorage.clear();

    setUser(null);
  };


  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;