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
                className={`sidebar rounded shadow ${
                    openSidebar ? "open" : "close"
                }`}
            >
                <ul className="nav-list p-0 m-0">
                    <li className="d-block d-lg-none">
                        <i className="bx bx-search"></i>
                        <input type="text" placeholder="Search..." />
                        <span className="tooltip">Search</span>
                    </li>
                    <Link to="/admin/home" className="text-decoration-none">
                        <li>
                            <a
                                className={`${
                                    pathName === "/admin/home"
                                        ? "activeSideBar"
                                        : ""
                                }`}
                            >
                                <i className="bx bx-grid-alt"></i>
                                <span className="links_name">Dashboard</span>
                            </a>
                            <span className="tooltip">Dashboard</span>
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
                                <span className="links_name">
                                    Bulk Subject Tagging
                                </span>
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
                                                pathName ===
                                                "/admin/studentSubjectTagging"
                                                    ? "firstNavbarChild"
                                                    : ""
                                            }`}
                                        >
                                            <p
                                                className={`mb-0 NavbarCourseTitle `}
                                            >
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
                                                pathName ===
                                                "/admin/teacherSubjectTagging"
                                                    ? "firstNavbarChild"
                                                    : ""
                                            }`}
                                        >
                                            <p
                                                className={`mb-0 NavbarCourseTitle `}
                                            >
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
                                <span className="links_name">
                                    Ind. Subject Tagging
                                </span>
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
                                                pathName ===
                                                "/admin/studentIndividualSubjectTagging"
                                                    ? "firstNavbarChild"
                                                    : ""
                                            }`}
                                        >
                                            <p
                                                className={`mb-0 NavbarCourseTitle `}
                                            >
                                                Student Individual Subject
                                                Tagging
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
                                                pathName ===
                                                "/admin/teacherIndividualSubjectTagging"
                                                    ? "firstNavbarChild"
                                                    : ""
                                            }`}
                                        >
                                            <p
                                                className={`mb-0 NavbarCourseTitle `}
                                            >
                                                Teacher Individual Subject
                                                Tagging
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <span className="tooltip">
                            Individual Subject Tagging
                        </span>
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
                                            to={`/admin/batchgrantexam`}
                                            className={`overflow-hidden ${
                                                pathName ===
                                                "/admin/batchgrantexam"
                                                    ? "firstNavbarChild"
                                                    : ""
                                            }`}
                                        >
                                            <p
                                                className={`mb-0 NavbarCourseTitle `}
                                            >
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
                                                pathName ===
                                                "/admin/singleGrantExam"
                                                    ? "firstNavbarChild"
                                                    : ""
                                            }`}
                                        >
                                            <p
                                                className={`mb-0 NavbarCourseTitle `}
                                            >
                                                Single Grant Exam
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <span className="tooltip">Grant Exam</span>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}

export default Navbar;
