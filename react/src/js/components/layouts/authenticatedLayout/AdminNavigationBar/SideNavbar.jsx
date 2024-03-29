import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";

function Navbar({ openSidebar }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);
  const [openDropdown3, setOpenDropdown3] = useState(false);

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
          <Link to="/admin/home" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/admin/home" ? "activeSideBar" : ""
                }`}
              >
                <i className="bx bxs-pie-chart-alt-2"></i>
                <span className="links_name">Dashboard</span>
              </span>
              <span className="tooltip">Dashboard</span>
            </li>
          </Link>
          <Link to="/admin/subjects" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/admin/subjects" ? "activeSideBar" : ""
                }`}
              >
                <i className="bx bxs-book"></i>
                <span className="links_name">Courses</span>
              </span>
              <span className="tooltip">Courses</span>
            </li>
          </Link>
          <Link to="/admin/createAnnouncement" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/admin/createAnnouncement"
                    ? "activeSideBar"
                    : ""
                }`}
              >
                <i className="bx bxs-note"></i>
                <span className="links_name">Announcement</span>
              </span>
              <span className="tooltip">Announcement</span>
            </li>
          </Link>
          <Link to="/admin/weekGrant" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/admin/weekGrant" ? "activeSideBar" : ""
                }`}
              >
                <i className="bx bxs-calendar-week"></i>
                <span className="links_name">Week Grant</span>
              </span>
              <span className="tooltip">Week Grant</span>
            </li>
          </Link>
          <li className={`${openDropdown ? "showMenu" : ""}`}>
            <div
              className="iocn-link arrow"
              onClick={() => {
                setOpenDropdown((prev) => !prev);
              }}
            >
              <a>
                <i className="bx bxs-tag-alt"></i>
                <span className="links_name">Bulk Subject Tagging</span>
              </a>
              <i className="bx bx-chevron-down arrow"></i>
            </div>
            <ul className={`sub-menu pe-0`}>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/admin/studentSubjectTagging`}
                      className={`overflow-hidden ${
                        pathName === "/admin/studentSubjectTagging"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Student Subject Tagging
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/admin/teacherSubjectTagging`}
                      className={`overflow-hidden ${
                        pathName === "/admin/teacherSubjectTagging"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Teacher Subject Tagging
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
            <span className="tooltip">Bulk Subject Tagging</span>
          </li>
          <li className={`${openDropdown2 ? "showMenu" : ""}`}>
            <div
              className="iocn-link arrow"
              onClick={() => {
                setOpenDropdown2((prev) => !prev);
              }}
            >
              <a>
                <i className="bx bx-tag-alt"></i>
                <span className="links_name">Ind. Subject Tagging</span>
              </a>
              <i className="bx bx-chevron-down arrow"></i>
            </div>
            <ul className={`sub-menu pe-0`}>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/admin/studentIndividualSubjectTagging`}
                      className={`overflow-hidden ${
                        pathName === "/admin/studentIndividualSubjectTagging"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Student Individual Subject Tagging
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/admin/teacherIndividualSubjectTagging`}
                      className={`overflow-hidden ${
                        pathName === "/admin/teacherIndividualSubjectTagging"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Teacher Individual Subject Tagging
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
            <span className="tooltip">Individual Subject Tagging</span>
          </li>
          <li className={`${openDropdown3 ? "showMenu" : ""}`}>
            <div
              className="iocn-link arrow"
              onClick={() => {
                setOpenDropdown3((prev) => !prev);
              }}
            >
              <a>
                <i className="bx bx-check-square"></i>
                <span className="links_name">Grant Exam</span>
              </a>
              <i className="bx bx-chevron-down arrow"></i>
            </div>
            <ul className={`sub-menu pe-0`}>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/admin/requestGrantExam`}
                      className={`overflow-hidden ${
                        pathName === "/admin/requestGrantExam"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Request Grant Exam
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/admin/batchgrantexam`}
                      className={`overflow-hidden ${
                        pathName === "/admin/batchgrantexam"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Batch Grant Exam
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li className={`${openSidebar ? "" : "d-none"}`}>
                <div className="firstChildDropdownContainer dropdown overflow-hidden">
                  <div>
                    <Link
                      to={`/admin/singleGrantExam`}
                      className={`overflow-hidden ${
                        pathName === "/admin/singleGrantExam"
                          ? "firstNavbarChild"
                          : ""
                      }`}
                    >
                      <p className={`mb-0 NavbarCourseTitle `}>
                        Single Grant Exam
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
            <span className="tooltip">Grant Exam</span>
          </li>
          <Link to="/admin/requestSubjects" className="text-decoration-none">
            <li>
              <span
                className={`a ${
                  pathName === "/admin/requestSubjects" ? "activeSideBar" : ""
                }`}
              >
                <i className="bx bxs-pie-chart-alt-2"></i>
                <span className="links_name">Request Subjects</span>
              </span>
              <span className="tooltip">Request Subjects</span>
            </li>
          </Link>
        </ul>
      </div>
    </Fragment>
  );
}

export default Navbar;
