import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";

function Navbar({ openSidebar }) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openChildOneDropdown, setOpenChildOneDropdown] = useState(false);
    const [openChildTwoDropdown, setOpenChildTwoDropdown] = useState(false);

    const pathName = useLocation().pathname;

    const getToken = window.localStorage.getItem("token");
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
                    <Link to="/developer/home" className="text-decoration-none">
                        <li>
                            <a
                                className={`${
                                    pathName === "/developer/home"
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
                        to="/developer/availableCourse"
                        className="text-decoration-none"
                    >
                        <li>
                            <a
                                className={`${
                                    pathName === "/developer/availableCourse"
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
                    <li>
                        <a href="/login/login.html">
                            <i className="bx bx-log-in"></i>
                            <span className="links_name">Login UI</span>
                        </a>
                        <span className="tooltip">Login UI</span>
                    </li>
                    <li className={`${openDropdown ? "showMenu" : ""}`}>
                        <div
                            className="iocn-link"
                            onClick={() => {
                                setOpenDropdown((prev) => !prev);
                            }}
                        >
                            <a>
                                <i className="bx bx-message-square-error"></i>
                                <span className="links_name">Errors</span>
                            </a>
                            <i className="bx bx-chevron-down arrow"></i>
                        </div>
                        <ul className="sub-menu">
                            <li>
                                <a href="#">Errors UI</a>
                            </li>
                            <li>
                                <div className="dropdown">
                                    <div
                                        className={`d-flex ${
                                            openChildOneDropdown
                                                ? "dumyShow"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            setOpenChildOneDropdown(
                                                (prev) => !prev
                                            );
                                        }}
                                    >
                                        <a
                                            className="border-0"
                                            aria-expanded="false"
                                        >
                                            Dropdown button
                                        </a>
                                        <i className="bx bx-chevron-down arrow"></i>
                                    </div>
                                    <ul
                                        className={`dropdownChildMenu dropdown-menu border-0 p-0 ps-3 ${
                                            openChildOneDropdown ? "show" : ""
                                        }`}
                                    >
                                        <li>
                                            <div className="dropdown">
                                                <div
                                                    className={`d-flex ${
                                                        openChildTwoDropdown
                                                            ? "dumyShow"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        setOpenChildTwoDropdown(
                                                            (prev) => !prev
                                                        );
                                                    }}
                                                >
                                                    <a
                                                        className="border-0"
                                                        aria-expanded="false"
                                                    >
                                                        Dropdown button2
                                                    </a>
                                                    <i className="bx bx-chevron-down arrow"></i>
                                                </div>
                                                <ul
                                                    className={`dropdownChildMenu dropdown-menu border-0 p-0 ps-3 ${
                                                        openChildTwoDropdown
                                                            ? "show"
                                                            : ""
                                                    }`}
                                                >
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Hello
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            World
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            here
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Another action
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Something else here
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <a href="/error/500.html">500 Error</a>
                            </li>
                        </ul>
                        {/* <!-- <span className="tooltip">Analytics</span> --> */}
                    </li>
                    <li>
                        <a href="/loading/loading.html">
                            <i className="bx bx-message-dots"></i>
                            <span className="links_name">Loading UI</span>
                        </a>
                        <span className="tooltip">Loading UI</span>
                    </li>
                    <li>
                        <a href="/inputAndButton/inputAndButton.html">
                            <i className="bx bx-edit-alt"></i>
                            <span className="links_name">
                                Input, btn, & Dropdown
                            </span>
                        </a>
                        <span className="tooltip">
                            Input, Button, & Dropdown
                        </span>
                    </li>
                    <li>
                        <a href="/table/table.html">
                            <i className="bx bx-table"></i>
                            <span className="links_name">Table</span>
                        </a>
                        <span className="tooltip">Table</span>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bx-cog"></i>
                            <span className="links_name">Setting</span>
                        </a>
                        <span className="tooltip">Setting</span>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}

export default Navbar;
