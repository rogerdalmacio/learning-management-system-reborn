import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";

import CourseContentProvider from "../../../../hooks/CourseContent/useCourseContent";

function Navbar({ openSidebar }) {
  const { courses } = CourseContentProvider();
  console.log(courses);

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
                    to={`/courseManager/${courses.course}/modules/week${week.week}`}
                    className={` ${
                      getfirstFourUrls ===
                      `/courseManager/${courseTitle}/modules/week${week.week}`
                        ? "firstNavbarChild"
                        : ""
                    }`}
                  >
                    <p
                      className={`mb-0 ${
                        getfirstFourUrls ===
                        `/courseManager/${courseTitle}/modules/week${week.week}`
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
                    to={`/courseManager/${courses.course}/modules`}
                    className={`overflow-hidden ${
                      pathName === `/courseManager/${courseTitle}/modules` &&
                      courses.course == getTitleForvalidation
                        ? "firstNavbarChild"
                        : ""
                    }`}
                  >
                    <p
                      className={`mb-0 NavbarCourseTitle ${
                        pathName === `/courseManager/${courseTitle}/modules` &&
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
  console.log(getTitleForvalidation);

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
          <Link to="/courseManager/home" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/courseManager/home" ? "activeSideBar" : ""
                }`}
              >
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Dashboard</span>
              </span>
              <span className="tooltip">Dashboard</span>
            </li>
          </Link>
          <Link
            to="/courseManager/listOfStudents"
            className="text-decoration-none"
          >
            <li>
              <span
                className={`a ${
                  pathName === "/courseManager/listOfStudents"
                    ? "activeSideBar"
                    : ""
                }`}
              >
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">List of Students</span>
              </span>
              <span className="tooltip">List of Students</span>
            </li>
          </Link>
          <Link
            to="/courseManager/taggingSubjectForCourseDev"
            className="text-decoration-none"
          >
            <li>
              <span
                className={`a ${
                  pathName === "/courseManager/taggingSubjectForCourseDev"
                    ? "activeSideBar"
                    : ""
                }`}
              >
                <i className="bx bx-tag-alt"></i>
                <span className="links_name">Tagging Subj for CourseDev.</span>
              </span>
              <span className="tooltip">Tagging Subj for CourseDev.</span>
            </li>
          </Link>
          <Link
            to="/courseManager/createCourse"
            className="text-decoration-none"
          >
            <li>
              <span
                className={`a ${
                  pathName === "/courseManager/createCourse"
                    ? "activeSideBar"
                    : ""
                }`}
              >
                <i className="bx bx-palette"></i>
                <span className="links_name">Create Course</span>
              </span>
              <span className="tooltip">Create Course</span>
            </li>
          </Link>
          <Link
            to="/courseManager/createsyllabus"
            className="text-decoration-none"
          >
            <li>
              <span
                className={`a ${
                  pathName === "/courseManager/createsyllabus"
                    ? "activeSideBar"
                    : ""
                }`}
              >
                <i className="bx bx-palette"></i>
                <span className="links_name">Create Syllabus</span>
              </span>
              <span className="tooltip">Create Syllabus</span>
            </li>
          </Link>
          <li className={` ${openDropdown ? "showMenu" : ""}`}>
            <div
              className="iocn-link"
              onClick={() => {
                setOpenDropdown((prev) => !prev);
              }}
            >
              <Link to="/courseManager/subjects">
                <span
                  className={`a ${
                    pathName === "/courseManager/subjects"
                      ? "activeSideBar"
                      : ""
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
        </ul>
      </div>
    </Fragment>
  );
}

export default Navbar;
