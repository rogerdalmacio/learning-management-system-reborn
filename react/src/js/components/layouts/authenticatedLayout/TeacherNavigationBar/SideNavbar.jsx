import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";

import CourseContentProvider from "../../../../hooks/CourseContent/useCourseContent";
function Navbar({ openSidebar }) {
  const { courses } = CourseContentProvider();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openChildOneDropdown, setOpenChildOneDropdown] = useState(false);
  const pathName = useLocation().pathname;

  const firstFourUrls = pathName.split("/").slice(0, 5);
  const getfirstFourUrls = firstFourUrls.join("/");
  console.log(getfirstFourUrls);
  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseTitle = pathArray[2];
  const getTitleForvalidation = courseTitle.replace(/%20/g, " ");

  console.warn = function (message) {
    if (/(Invalid .*|validateDOMNesting)/.test(message)) {
      return;
    }
    originalWarn(message);
  };

  const AvailableCourseNavbar = () => {
    if (courses) {
      return courses.map((courses, i) => {
        const ModuleWeekHandler = () => {
          return courses.module
            .slice()
            .sort((a, b) => {
              return a.id.split("-")[1] - b.id.split("-")[1];
            })
            .map((week, i) => {
              return (
                <li key={i}>
                  <Link
                    to={`/teacher/${courses.course}/modules/week${week.week}`}
                    className={` ${
                      getfirstFourUrls ===
                      `/teacher/${courseTitle}/modules/week${week.week}`
                        ? "firstNavbarChild"
                        : ""
                    }`}
                  >
                    <p
                      className={`mb-0 ${
                        getfirstFourUrls ===
                        `/teacher/${courseTitle}/modules/week${week.week}`
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      WEEK {week.week}
                    </p>
                  </Link>
                </li>
              );
            });
        };
        console.log(i);

        return (
          <ul className={`sub-menu pe-0`} key={i}>
            <li className={`${openSidebar ? "" : "d-none"}`}>
              <div className="firstChildDropdownContainer dropdown overflow-hidden">
                <div
                  className={`d-flex firstChildDropdown ${
                    openChildOneDropdown ? "dumyShow" : ""
                  }`}
                  onClick={() => {
                    setOpenChildOneDropdown((prev) => !prev);
                  }}
                >
                  <Link
                    to={`/teacher/${courses.course}/modules`}
                    className={`overflow-hidden ${
                      pathName === `/teacher/${courseTitle}/modules` &&
                      courses.course == getTitleForvalidation
                        ? "firstNavbarChild"
                        : ""
                    }`}
                  >
                    <p
                      className={`mb-0 NavbarCourseTitle ${
                        pathName === `/teacher/${courseTitle}/modules` &&
                        courses.course == getTitleForvalidation
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      {courses.course}
                    </p>
                  </Link>
                  <i
                    className={`bx bx-chevron-down ${
                      courses.course == getTitleForvalidation ? "arrow" : ""
                    }`}
                  ></i>
                </div>
                <ul
                  className={`dropdownChildMenu dropdown-menu border-0 p-0 ps-3 ${
                    openChildOneDropdown &&
                    courses.course == getTitleForvalidation
                      ? "show"
                      : ""
                  }`}
                >
                  {ModuleWeekHandler()}
                </ul>
              </div>
            </li>
          </ul>
        );
      });
    }
  };
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
                <span className="links_name">Dashboard</span>
              </span>
              <span className="tooltip">Dashboard</span>
            </li>
          </Link>
          <Link to="/teacher/quizresult" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/teacher/quizresult" ? "activeSideBar" : ""
                }`}
              >
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Quiz Results</span>
              </span>
              <span className="tooltip">Quiz Results</span>
            </li>
          </Link>
          <Link
            to="/teacher/studentsActivities"
            className="text-decoration-none"
          >
            <li>
              <span
                className={`a ${
                  pathName === "/teacher/studentsActivities"
                    ? "activeSideBar"
                    : ""
                }`}
              >
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Student's Activities</span>
              </span>
              <span className="tooltip">Student's Activities</span>
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
          <Link to="/teacher/resetquizattempt" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/teacher/resetquizattempt"
                    ? "activeSideBar"
                    : ""
                }`}
              >
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Reset Quiz Attempt</span>
              </span>
              <span className="tooltip">Reset Quiz Attempt</span>
            </li>
          </Link>
          <li className={` ${openDropdown ? "showMenu" : ""}`}>
            <div
              className="iocn-link"
              onClick={() => {
                setOpenDropdown((prev) => !prev);
              }}
            >
              <Link to="/teacher/subjects">
                <span
                  className={`a ${
                    pathName === "/teacher/subjects" ? "activeSideBar" : ""
                  }`}
                >
                  <i className="bx bx-message-square-error"></i>
                  <span className="links_name">Course</span>
                </span>
              </Link>
              <i className="bx bx-chevron-down arrow"></i>
            </div>
            <span className="tooltip">Course</span>
            {AvailableCourseNavbar()}
          </li>
          <Link to="/teacher/facultyRequest" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/teacher/facultyRequest" ? "activeSideBar" : ""
                }`}
              >
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Faculty Request</span>
              </span>
              <span className="tooltip">Dashboard</span>
            </li>
          </Link>
        </ul>
      </div>
    </Fragment>
  );
}

export default Navbar;
