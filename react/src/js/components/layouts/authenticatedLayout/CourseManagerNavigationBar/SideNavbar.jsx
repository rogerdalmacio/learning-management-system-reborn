import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";

function Navbar({ openSidebar }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const pathName = useLocation().pathname;
  console.warn = function (message) {
    if (/(Invalid .*|validateDOMNesting)/.test(message)) {
      return;
    }
    originalWarn(message);
  };

  console.log(pathName);

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
          <Link to="/courseManager/home" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/courseManager/home" ? "activeSideBar" : ""
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
        </ul>
      </div>
    </Fragment>
  );
}

export default Navbar;
