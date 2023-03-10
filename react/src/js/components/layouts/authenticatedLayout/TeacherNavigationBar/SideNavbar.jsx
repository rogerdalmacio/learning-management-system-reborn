import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";

function Navbar({ openSidebar }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const pathName = useLocation().pathname;

  return (
    <Fragment>
      <div
        className={`sidebar rounded shadow ${openSidebar ? "open" : "close"}`}
      >
        <ul className="nav-list p-0 m-0">
          <li className="d-block d-lg-none">
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li>
          <Link to="/teacher/home" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/teacher/home" ? "activeSideBar" : ""
                }`}
              >
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Quiz Results</span>
              </span>
              <span className="tooltip">Quiz Results</span>
            </li>
          </Link>
          <Link to="/teacher/validatesnapshot" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/teacher/validatesnapshot"
                    ? "activeSideBar"
                    : ""
                }`}
              >
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Validate Snapshot</span>
              </span>
              <span className="tooltip">Validate Snapshot</span>
            </li>
          </Link>
        </ul>
      </div>
    </Fragment>
  );
}

export default Navbar;
