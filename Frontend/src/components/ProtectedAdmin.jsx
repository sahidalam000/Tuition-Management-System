import React, { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const ProtectedAdmin = ({ children }) => {

  const { user, loading } =
    useContext(AuthContext);

const adminToken =
  localStorage.getItem("adminToken");
    
  const savedUser = JSON.parse(
  localStorage.getItem("adminUser")
);

  const currentUser =
    user || savedUser;


  // LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1220] text-white">
        Loading...
      </div>
    );
  }


  // NOT LOGGED IN
 if (!currentUser || !adminToken) {

    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );
  }


  // NOT ADMIN
  if (currentUser.role !== "admin") {

    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );
  }


  return children;
};

export default ProtectedAdmin;