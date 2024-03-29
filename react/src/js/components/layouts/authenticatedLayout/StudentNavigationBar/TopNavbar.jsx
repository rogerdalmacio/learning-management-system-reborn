import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import useAuth from "../../../../hooks/useAuth";
import logoImg from "/images/newLogin/logo.png";
import dummyProfile from "/images/man.png";
import { Link } from "react-router-dom";
import { LogoutHandler } from "../../../authentication/LogoutHandler";

function TopNavbar({
  openSidebar,
  setOpenSidebar,
  imageExisting,
  userImagePng,
}) {
  const { userInfo, token, role } = useAuth();
  const [notifDetails, setNotifDetails] = useState();
  const [notification, setNotification] = useState(false);
  const [notifCLicked, setNotifClicked] = useState(
    localStorage.getItem("notificationCount") === "true" ? true : false
  );
  const notificationRef = useRef(null);
  console.log(notification);
  console.log(notifCLicked);
  console.log(localStorage.getItem("notificationCount"));

  useEffect(() => {
    if (notifCLicked) {
      localStorage.setItem("notificationCount", "true");
    }
  }, [notifCLicked]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotification(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  const handleLogout = async () => {
    await LogoutHandler(token);
    localStorage.setItem("role", "student");
  };

  useEffect(() => {
    const renderModule = async () => {
      if (role === "student") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/student/notification`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
            setNotifDetails(response.data);
          });
      }
    };

    renderModule();
  }, []);

  const setTheUserProfile = () => {
    if (imageExisting === true) {
      return (
        <Fragment>
          <img
            className="profilePicture ms-0 ms-sm-3"
            src={userImagePng}
            width="32"
            height="32"
            alt="profile-picture"
          />
        </Fragment>
      );
    } else {
      return (
        <div>
          <img
            className="profilePicture ms-0 ms-sm-3"
            src={dummyProfile}
            width="32"
            height="32"
            alt="profile-picture"
          />
        </div>
      );
    }
  };
  console.log(notifDetails);
  const NotificationBodyHandler = () => {
    if (notification && notifDetails !== undefined && notifDetails !== null) {
      return notifDetails.data.map((notif, index) => {
        console.log(notif);
        return (
          <Fragment key={index}>
            <p className="notificationItem mb-0 px-2 py-2">
              <span className="fw-semibold NotifTitle">{notif.title}</span>{" "}
              <br />
              {notif.body}
            </p>
          </Fragment>
        );
      });
    } else {
      return null;
    }
  };
  return (
    <Fragment>
      <div className="topbarChild d-flex justify-content-between align-items-center">
        <li className="topBarLogo text-dark">
          <div className="logo-details d-flex align-items-center">
            <i
              className={`bx rounded-circle ${
                openSidebar ? "bx-menu-alt-right" : "bx-menu"
              }`}
              id="btn"
              onClick={() => {
                setOpenSidebar((prev) => !prev);
              }}
            ></i>

            <img
              className="ms-2 ms-sm-3 my-auto"
              src={logoImg}
              width="35"
              height="35"
              alt="bcp-logo"
            />
            <div className="logo_name text-dark ms-1 ms-sm-3">BESTLINK</div>
            <div className="my-auto search-boxContainer d-none d-lg-block">
              <input
                className="form-control search-box"
                type="search"
                placeholder="Search..."
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
            </div>
          </div>
        </li>
        <div className="d-flex align-items-center justify-content-end">
          <li>
            <div className="NotifButtonContainer" ref={notificationRef}>
              <button
                className="border border-0 NotificationBellButton "
                onClick={() => {
                  setNotification(!notification);
                  setNotifClicked(true);
                }}
              >
                <i className="bx bxs-bell fs-2 mt-1 m-0"></i>

                <div className="notificationCount">
                  {!notification &&
                    !notifCLicked &&
                    notifDetails !== undefined &&
                    notifDetails !== null && (
                      <p className="bg-danger rounded-circle notificationPara">
                        {notifCLicked ? "0" : notifDetails.data.length}
                      </p>
                    )}
                </div>
              </button>
              {notification && (
                <div
                  ref={notificationRef}
                  className="NotificationContainer p-1 border-1 shadow"
                >
                  <h5 className="m-0 p-2">Notifications</h5>
                  {NotificationBodyHandler()}
                </div>
              )}
            </div>
          </li>
          <li>
            <div className="nav-item dropdown my-auto ms-4">
              <a
                id="dropdownmenu"
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="m-0 d-none d-sm-block">
                  {userInfo.first_name} {userInfo.last_name}
                </h5>
                {setTheUserProfile()}
              </a>
              <ul className="dropdown-menu border shadow dropdownContainer">
                <Link
                  className="text-decoration-none"
                  to="/student/editprofile"
                >
                  <li>
                    <button type="button" className="dropdown-item">
                      Edit Profile
                    </button>
                  </li>
                </Link>
                <li>
                  <button type="button" className="dropdown-item">
                    Settings
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </div>
      </div>
    </Fragment>
  );
}

export default TopNavbar;
