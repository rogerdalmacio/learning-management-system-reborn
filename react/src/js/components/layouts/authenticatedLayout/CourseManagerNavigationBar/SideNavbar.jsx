import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";

function Navbar({ openSidebar }) {
    const [openDropdown, setOpenDropdown] = useState(false);

    const pathName = useLocation().pathname;

    console.log(pathName);

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
                    <Link
                        to="/courseManager/home"
                        className="text-decoration-none"
                    >
                        <li>
                            <a
                                className={`${
                                    pathName === "/courseManager/home"
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
                    <Link
                        to="/courseManager/course"
                        className="text-decoration-none"
                    >
                        <li>
                            <a
                                className={`${
                                    pathName === "/courseManager/course"
                                        ? "activeSideBar"
                                        : ""
                                }`}
                            >
                                <i className="bx bx-palette"></i>
                                <span className="links_name">Course</span>
                            </a>
                            <span className="tooltip">Course</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </Fragment>
    );
}

export default Navbar;
