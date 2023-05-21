import React, { useState, useEffect } from "react";
import { LogoutHandler } from "./LogoutHandler";
import useAuth from "../../hooks/useAuth";

const AutoLogout = ({ logoutTime }) => {
  const { userInfo, token, role } = useAuth();

  const [logoutTimer, setLogoutTimer] = useState(null);

  // function to check for inactivit and logout
  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    if (expireTime < Date.now()) {
      console.log("Logout");
      LogoutHandler(token);
    }
  };
  // function to update expire time
  const updateExpireTime = () => {
    const expireTime = Date.now() + 600000;

    localStorage.setItem("expireTime", expireTime);
  };

  // useEffect to set interval to check for inactivity
  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateExpireTime();

    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      window.addEventListener("click", updateExpireTime);
      window.addEventListener("keypress", updateExpireTime);
      window.addEventListener("scroll", updateExpireTime);
      window.addEventListener("mousemove", updateExpireTime);
    };
  }, []);
  return null; // You can customize this component if needed
};

export default AutoLogout;
