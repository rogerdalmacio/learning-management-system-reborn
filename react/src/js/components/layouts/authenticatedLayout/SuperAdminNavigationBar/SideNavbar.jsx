import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";

function Navbar({ openSidebar }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);

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
          {/* <Link to="/superAdmin/home" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/superAdmin/home" ? "activeSideBar" : ""
                }`}
              >
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Dashboard</span>
              </span>
              <span className="tooltip">Dashboard</span>
            </li>
          </Link> */}
          <li className={`${openDropdown ? "showMenu" : ""}`}>
            <div
              className="iocn-link arrow"
              onClick={() => {
                setOpenDropdown((prev) => !prev);
              }}
            >
              <a>
                <i className="bx bxs-tag-alt"></i>
                <span className="links_name">Mass Account Creation</span>
              </a>
              <i className="bx bx-chevron-down arrow"></i>
            </div>
            <ul className={`sub-menu pe-0`}>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/superAdmin/studentBulkCreationAccount`}
                      className={`overflow-hidden ${
                        pathName === "/superAdmin/studentBulkCreationAccount"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Student Creation of Accounts
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/superAdmin/teacherBulkCreationAccount`}
                      className={`overflow-hidden ${
                        pathName === "/superAdmin/teacherBulkCreationAccount"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Teacher Creation of Accounts
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
            <span className="tooltip">Mass Account Creation</span>
          </li>
          <li className={`${openDropdown2 ? "showMenu" : ""}`}>
            <div
              className="iocn-link arrow"
              onClick={() => {
                setOpenDropdown2((prev) => !prev);
              }}
            >
              <a>
                <i className="bx bxs-tag-alt"></i>
                <span className="links_name">Single Create Account</span>
              </a>
              <i className="bx bx-chevron-down arrow"></i>
            </div>
            <ul className={`sub-menu pe-0`}>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/superAdmin/studentCreateSingleAccount`}
                      className={`overflow-hidden ${
                        pathName === "/superAdmin/studentCreateSingleAccount"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Student Creation of Account
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/superAdmin/teacherCreateSingleAccount`}
                      className={`overflow-hidden ${
                        pathName === "/superAdmin/teacherCreateSingleAccount"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Teacher Creation of Account
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/superAdmin/adminCreateSingleAccount`}
                      className={`overflow-hidden ${
                        pathName === "/superAdmin/adminCreateSingleAccount"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Admin Creation of Account
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/superAdmin/courseManagerCreateSingleAccount`}
                      className={`overflow-hidden ${
                        pathName ===
                        "/superAdmin/courseManagerCreateSingleAccount"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Course Manager Creation of Account
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/superAdmin/courseDeveloperCreateSingleAccount`}
                      className={`overflow-hidden ${
                        pathName ===
                        "/superAdmin/courseDeveloperCreateSingleAccount"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Course Developer Creation of Account
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
            <span className="tooltip">Mass Account Creation</span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default Navbar;
