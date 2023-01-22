import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import useAuth from "../../../../hooks/useAuth";
import logoImg from "/images/newLogin/logo.png";
import userProfile from "/images/man.png";
import { Link } from "react-router-dom";

function TopNavbar({ openSidebar, setOpenSidebar, children }) {
    const { userInfo } = useAuth();

    const LogoutHandler = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("token")
                )}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (response.ok) {
            localStorage.clear();
            window.location.reload();
        } else {
            console.log("errror shit");
            console.log(response);
        }

        // localStorage.clear();
        // window.location.reload();
    };

    return (
        <Fragment>
            <div className="topbarChild d-flex justify-content-between align-items-center">
                <li className="topBarLogo text-dark">
                    <div className="logo-details d-flex align-items-center">
                        <i
                            className={`bx rounded-circle ${
                                openSidebar ? "bx-menu-alt-right" : "bx-menu"
                            }`}
                            id="btn"
                            onClick={() => {
                                setOpenSidebar((prev) => !prev);
                            }}
                        ></i>

                        <img
                            className="ms-2 ms-sm-3 my-auto"
                            src={logoImg}
                            width="35"
                            height="35"
                            alt="bcp-logo"
                        />
                        <div className="logo_name text-dark ms-1 ms-sm-3">
                            BESTLINK
                        </div>
                        <div className="my-auto search-boxContainer d-none d-lg-block">
                            <input
                                className="form-control search-box"
                                type="search"
                                placeholder="Search..."
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                            />
                        </div>
                    </div>
                </li>
                <div className="d-flex align-items-center justify-content-end">
                    <li>
                        <i className="bx bxs-message-dots fs-4 me-3 mt-1 m-0"></i>
                        <i className="bx bxs-bell fs-4 mt-1 m-0"></i>
                    </li>
                    <li>
                        <div className="nav-item dropdown my-auto ms-4">
                            <a
                                id="dropdownmenu"
                                className="nav-link dropdown-toggle d-flex align-items-center"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <h5 className="m-0 d-none d-sm-block">
                                    {userInfo.name}
                                </h5>
                                <img
                                    className="ms-0 ms-sm-3"
                                    src={userProfile}
                                    width="32"
                                    height="32"
                                    alt="profile-picture"
                                />
                            </a>
                            <ul className="dropdown-menu border shadow dropdownContainer">
                                <Link
                                    className="text-decoration-none"
                                    to="/developer/editprofile"
                                >
                                    <li>
                                        <button
                                            type="button"
                                            className="dropdown-item"
                                        >
                                            Edit Profile
                                        </button>
                                    </li>
                                </Link>
                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                    >
                                        Settings
                                    </button>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={LogoutHandler}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>
                </div>
            </div>
        </Fragment>
    );
}

export default TopNavbar;
