import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";
import useGetAvailableCourse from "../../../../hooks/CourseDev/useGetAvailableCourse";

function Navbar({ openSidebar }) {
    const { course } = useGetAvailableCourse();

    const [openDropdown, setOpenDropdown] = useState(false);
    const [openChildOneDropdown, setOpenChildOneDropdown] = useState(false);
    const [openChildTwoDropdown, setOpenChildTwoDropdown] = useState(false);

    const pathName = useLocation().pathname;
    const firstFourUrls = pathName.split("/").slice(0, 5);
    const getfirstFourUrls = firstFourUrls.join("/");
    console.log(getfirstFourUrls);

    console.log(pathName);

    // Course Title
    const pathname = window.location.pathname;
    const pathArray = pathname.split("/");
    const courseTitle = pathArray[2];

    const AvailableCourseNavbar = () => {
        if (course) {
            return course.map((courses, i) => {
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
                                        to={`/developer/${courses.course}/modules/week${week.week}`}
                                        className={` ${
                                            getfirstFourUrls ===
                                            `/developer/${courseTitle}/modules/week${week.week}`
                                                ? "firstNavbarChild"
                                                : ""
                                        }`}
                                    >
                                        <p
                                            className={`mb-0 ${
                                                getfirstFourUrls ===
                                                `/developer/${courseTitle}/modules/week${week.week}`
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

                return (
                    <li key={i} className={`${openDropdown ? "showMenu" : ""}`}>
                        <div
                            className="iocn-link"
                            onClick={() => {
                                setOpenDropdown((prev) => !prev);
                            }}
                        >
                            <Link to="/developer/availableCourse">
                                <a
                                    className={`${
                                        pathName ===
                                        "/developer/availableCourse"
                                            ? "activeSideBar"
                                            : ""
                                    }`}
                                >
                                    <i className="bx bx-message-square-error"></i>
                                    <span className="links_name">Course</span>
                                </a>
                            </Link>
                            <i className="bx bx-chevron-down arrow"></i>
                        </div>
                        <ul className="sub-menu pe-0">
                            <li>
                                <div className="firstChildDropdownContainer dropdown">
                                    <div
                                        className={`d-flex firstChildDropdown ${
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
                                        <Link
                                            to={`/developer/${courses.course}/modules`}
                                            className={`overflow-hidden ${
                                                pathName ===
                                                `/developer/${courseTitle}/modules`
                                                    ? "firstNavbarChild"
                                                    : ""
                                            }`}
                                        >
                                            <p
                                                className={`mb-0 NavbarCourseTitle ${
                                                    pathName ===
                                                    `/developer/${courseTitle}/modules`
                                                        ? ".firstNavbarChild"
                                                        : ""
                                                }`}
                                            >
                                                {courses.course}
                                            </p>
                                        </Link>
                                        <i className="bx bx-chevron-down arrow"></i>
                                    </div>
                                    <ul
                                        className={`dropdownChildMenu dropdown-menu border-0 p-0 ps-3 ${
                                            openChildOneDropdown ? "show" : ""
                                        }`}
                                    >
                                        {ModuleWeekHandler()}
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        {/* <!-- <span className="tooltip">Analytics</span> --> */}
                    </li>
                );
            });
        }
    };

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
                    {/* <Link
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
                    </Link> */}
                    {AvailableCourseNavbar()}
                </ul>
            </div>
        </Fragment>
    );
}

export default Navbar;

// This code below is for deep nested link

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { Fragment } from "react";
// import useGetAvailableCourse from "../../../../hooks/CourseDev/useGetAvailableCourse";

// function Navbar({ openSidebar }) {
//     const [openDropdown, setOpenDropdown] = useState(false);
//     const [openChildOneDropdown, setOpenChildOneDropdown] = useState(false);
//     const [openChildTwoDropdown, setOpenChildTwoDropdown] = useState(false);

//     const pathName = useLocation().pathname;

//     const { course } = useGetAvailableCourse();

//     // Course Title
//     const pathname = window.location.pathname;
//     const pathArray = pathname.split("/");
//     const courseTitle = pathArray[2];

//     const AvailableCourseNavbar = () => {
//         if (course) {
//             return course.map((courses, i) => {
//                 const ModuleWeekHandler = () => {
//                     return courses.module
//                         .slice()
//                         .sort((a, b) => {
//                             return a.id.split("-")[1] - b.id.split("-")[1];
//                         })
//                         .map((week, i) => {
//                             return (
//                                 <li key={i}>
//                                     <div className="dropdown">
//                                         <div
//                                             className={`d-flex ${
//                                                 openChildTwoDropdown
//                                                     ? "dumyShow"
//                                                     : ""
//                                             }`}
//                                             onClick={() => {
//                                                 setOpenChildTwoDropdown(
//                                                     (prev) => !prev
//                                                 );
//                                             }}
//                                         >
//                                             <a
//                                                 className="border-0"
//                                                 aria-expanded="false"
//                                             >
//                                                 WEEK {week.week}
//                                             </a>
//                                             <i className="bx bx-chevron-down arrow"></i>
//                                         </div>
//                                         <ul
//                                             className={`dropdownChildMenu dropdown-menu border-0 p-0 ps-3 ${
//                                                 openChildTwoDropdown
//                                                     ? "show"
//                                                     : ""
//                                             }`}
//                                         >
//                                             <li>
//                                                 <a
//                                                     className="dropdown-item"
//                                                     href="#"
//                                                 >
//                                                     Hello
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a
//                                                     className="dropdown-item"
//                                                     href="#"
//                                                 >
//                                                     World
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a
//                                                     className="dropdown-item"
//                                                     href="#"
//                                                 >
//                                                     here
//                                                 </a>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </li>
//                             );
//                         });
//                 };

//                 return (
//                     <li key={i} className={`${openDropdown ? "showMenu" : ""}`}>
//                         <div
//                             className="iocn-link"
//                             onClick={() => {
//                                 setOpenDropdown((prev) => !prev);
//                             }}
//                         >
//                             <Link to="/developer/availableCourse">
//                                 <a
//                                     className={`${
//                                         pathName ===
//                                         "/developer/availableCourse"
//                                             ? "activeSideBar"
//                                             : ""
//                                     }`}
//                                 >
//                                     <i className="bx bx-message-square-error"></i>
//                                     <span className="links_name">Course</span>
//                                 </a>
//                             </Link>
//                             <i className="bx bx-chevron-down arrow"></i>
//                         </div>
//                         <ul className="sub-menu pe-0">
//                             <li>
//                                 <div className="firstChildDropdownContainer dropdown">
//                                     <div
//                                         className={`d-flex firstChildDropdown ${
//                                             openChildOneDropdown
//                                                 ? "dumyShow"
//                                                 : ""
//                                         }`}
//                                         onClick={() => {
//                                             setOpenChildOneDropdown(
//                                                 (prev) => !prev
//                                             );
//                                         }}
//                                     >
//                                         <Link
//                                             to={`/developer/${courses.course}/modules`}
//                                             className={`mb-0 ${
//                                                 pathName ===
//                                                 `/developer/${courseTitle}/modules`
//                                                     ? "firstNavbarChild"
//                                                     : ""
//                                             }`}
//                                         >
//                                             <p
//                                                 className={`mb-0 ${
//                                                     pathName ===
//                                                     `/developer/${courseTitle}/modules`
//                                                         ? ".firstNavbarChild"
//                                                         : ""
//                                                 }`}
//                                             >
//                                                 {courses.course}
//                                             </p>
//                                         </Link>
//                                         <i className="bx bx-chevron-down arrow"></i>
//                                     </div>
//                                     <ul
//                                         className={`dropdownChildMenu dropdown-menu border-0 p-0 ps-3 ${
//                                             openChildOneDropdown ? "show" : ""
//                                         }`}
//                                     >
//                                         {ModuleWeekHandler()}
//                                     </ul>
//                                 </div>
//                             </li>
//                         </ul>
//                         {/* <!-- <span className="tooltip">Analytics</span> --> */}
//                     </li>
//                 );
//             });
//         }
//     };

//     return (
//         <Fragment>
//             <div
//                 className={`sidebar rounded shadow ${
//                     openSidebar ? "open" : "close"
//                 }`}
//             >
//                 <ul className="nav-list p-0 m-0">
//                     <li className="d-block d-lg-none">
//                         <i className="bx bx-search"></i>
//                         <input type="text" placeholder="Search..." />
//                         <span className="tooltip">Search</span>
//                     </li>
//                     <Link to="/developer/home" className="text-decoration-none">
//                         <li>
//                             <a
//                                 className={`${
//                                     pathName === "/developer/home"
//                                         ? "activeSideBar"
//                                         : ""
//                                 }`}
//                             >
//                                 <i className="bx bx-grid-alt"></i>
//                                 <span className="links_name">Dashboard</span>
//                             </a>
//                             <span className="tooltip">Dashboard</span>
//                         </li>
//                     </Link>
//                     {/* <Link
//                         to="/developer/availableCourse"
//                         className="text-decoration-none"
//                     >
//                         <li>
//                             <a
//                                 className={`${
//                                     pathName === "/developer/availableCourse"
//                                         ? "activeSideBar"
//                                         : ""
//                                 }`}
//                             >
//                                 <i className="bx bx-palette"></i>
//                                 <span className="links_name">Course</span>
//                             </a>
//                             <span className="tooltip">Course</span>
//                         </li>
//                     </Link> */}
//                     {AvailableCourseNavbar()}
//                     <li>
//                         <a href="/login/login.html">
//                             <i className="bx bx-log-in"></i>
//                             <span className="links_name">Login UI</span>
//                         </a>
//                         <span className="tooltip">Login UI</span>
//                     </li>

//                     <li>
//                         <a href="/loading/loading.html">
//                             <i className="bx bx-message-dots"></i>
//                             <span className="links_name">Loading UI</span>
//                         </a>
//                         <span className="tooltip">Loading UI</span>
//                     </li>
//                     <li>
//                         <a href="/inputAndButton/inputAndButton.html">
//                             <i className="bx bx-edit-alt"></i>
//                             <span className="links_name">
//                                 Input, btn, & Dropdown
//                             </span>
//                         </a>
//                         <span className="tooltip">
//                             Input, Button, & Dropdown
//                         </span>
//                     </li>
//                     <li>
//                         <a href="/table/table.html">
//                             <i className="bx bx-table"></i>
//                             <span className="links_name">Table</span>
//                         </a>
//                         <span className="tooltip">Table</span>
//                     </li>
//                     <li>
//                         <a href="#">
//                             <i className="bx bx-cog"></i>
//                             <span className="links_name">Setting</span>
//                         </a>
//                         <span className="tooltip">Setting</span>
//                     </li>
//                 </ul>
//             </div>
//         </Fragment>
//     );
// }

// export default Navbar;
