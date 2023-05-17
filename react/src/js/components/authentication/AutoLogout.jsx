import React, { useState, useEffect } from "react";
import { LogoutHandler } from "./LogoutHandler";
import useAuth from "../../hooks/useAuth";

const AutoLogout = ({ logoutTime }) => {
  const { userInfo, token, role } = useAuth();

  const [logoutTimer, setLogoutTimer] = useState(null);
  console.log(logoutTimer);
  useEffect(() => {
    const resetTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      setLogoutTimer(setTimeout(logout, logoutTime));
    };

    const logout = () => {
      // Perform logout action here (e.g., calling an API endpoint)
      console.log("LOGOUT");
      LogoutHandler(token);
      // Redirect the user to the login page
      // window.location.href = "/login";
    };

    const handleUserActivity = () => {
      resetTimer();
    };

    const handlePageVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resetTimer();
      } else {
        clearTimeout(logoutTimer);
      }
    };

    // Attach the event listeners
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    document.addEventListener("visibilitychange", handlePageVisibilityChange);

    // Reset the timer whenever the component mounts or the logoutTime prop changes
    resetTimer();

    // Clean up the event listeners and the timer
    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      document.removeEventListener(
        "visibilitychange",
        handlePageVisibilityChange
      );
    };
  }, [logoutTime]);

  return null; // You can customize this component if needed
};

export default AutoLogout;
