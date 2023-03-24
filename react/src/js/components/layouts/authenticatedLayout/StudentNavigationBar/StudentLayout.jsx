import React, { useState, useEffect } from "react";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
const Layout = () => {
  const { userInfo } = useAuth();

  const [openSidebar, setOpenSidebar] = useState(true);
  const [imageExisting, setImageExisting] = useState();

  const navigate = useNavigate();

  function handleClickLeft() {
    navigate(-1); // Navigate back to the previous page
  }

  function handleClickRight() {
    navigate(+1); // Navigate back to the previous page
  }
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 960) {
        console.log(window.innerWidth <= 960);

        setOpenSidebar(false);
      } else {
        setOpenSidebar(true);
      }
    }

    handleResize();
  }, []);

  const userImageJpg = `${
    import.meta.env.VITE_API_BASE_URL
  }/storage/Student/Student${userInfo.id}.jpg`;

  // CHECK IF IMAGE EXISTS
  useEffect(() => {
    function checkIfImageExists(url, callback) {
      const img = new Image();
      img.src = url;

      if (img.complete) {
        callback(true);
      } else {
        img.onload = () => {
          callback(true);
        };

        img.onerror = () => {
          callback(false);
        };
      }
    }

    // USAGE
    checkIfImageExists(userImageJpg, (exists) => {
      if (exists) {
        setImageExisting(true);
      } else {
        setImageExisting(false);
      }
    });
  });

  return (
    <main>
      <div className="container-lg container-xl container-xxl" id="app">
        <ul className="topbar m-0 list-unstyled">
          <TopNavbar
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
            imageExisting={imageExisting}
            userImagePng={userImageJpg}
          />
        </ul>
        <div className="px-0 d-xl-flex position-relative d-flex" id="app">
          <SideNavbar openSidebar={openSidebar} />
          <main className="home-section mx-3 bg-light rounded shadow w-100">
            <div className="position-absolute handleClickLeftButton">
              <button className="bg-light border-0" onClick={handleClickLeft}>
                <i class=" fs-1 text-secondary py-2 bx bxs-chevron-left"></i>
              </button>
            </div>
            <div className="position-absolute handleClickRightButton">
              <button className="bg-light border-0" onClick={handleClickRight}>
                <i class=" fs-1 text-secondary py-2 bx bxs-chevron-right"></i>
              </button>
            </div>
            <div className="px-3 p-sm-5 py-5 w-100">
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <Outlet
                context={[userImageJpg, imageExisting, setImageExisting]}
              />
            </div>
          </main>
        </div>
      </div>
    </main>
  );
};

export default Layout;
