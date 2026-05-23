import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

  const { user, loading } = useContext(AuthContext);

  const location = useLocation();


  // LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1220] text-white">
        Loading...
      </div>
    );
  }


  // NOT LOGGED IN
  if (!user) {

    // SAVE CURRENT PATH
    localStorage.setItem(
      "redirectAfterLogin",
      location.pathname
    );

    return <Navigate to="/login" replace />;
  }


  return children;
};

export default ProtectedRoute;