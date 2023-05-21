import React, { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AutoLogout from "../authentication/AutoLogout";

const RequireAuth = ({ allowedRoles }) => {
  const { role, userInfo } = useAuth();
  const [type, setType] = useState(localStorage.getItem("role"));
  const logoutTime = 10 * 60 * 1000;

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole && type !== storedRole) {
      setType(storedRole);
    }
  }, []);

  const location = useLocation();
  function HandlerUser() {
    <AutoLogout logoutTime={logoutTime} />;
    if (role === allowedRoles) {
      return (
        <>
          <Outlet />
          <AutoLogout logoutTime={logoutTime} />
        </>
      );
    } else if (userInfo?.email) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    } else {
      return (
        <Navigate
          to={`${type == "student" ? "/" : "/staff"}`}
          state={{ from: location }}
          replace
        />
      );
    }
  }

  return HandlerUser();
};

export default RequireAuth;
