import React, { Fragment, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Loading from "../../../components/layouts/Loading";
import CourseContentProvider from "../../../hooks/CourseContent/useCourseContent";

function AdminAvailableSubjects() {
  const { courses } = CourseContentProvider();
  console.log(courses);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentColumnCount, setCurrentColumnCount] = useState();
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (courses) {
      const filtered = courses.filter((item) =>
        item.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, courses]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // Get the first and last number of current page
  useEffect(() => {
    if (currentPageData.length !== 0) {
      const length = currentPageData.length - 1;
      const isFirst = currentPageData[0].id;
      const isLast = currentPageData[length].id;
      setCurrentColumnCount(`${isFirst}-${isLast} of ${courses.length}`);
      console.log(`${isFirst}-${isLast} of ${courses.length}`);
      console.log(isLast);
    }
  }, [currentPageData]);
  console.log(currentPageData);
  const AvailableCourseHandler = () => {
    // const isFirst = currentPageData[0].id;
    // const isLast = currentPageData[0].id;
    // console.log(isFirst);
    // console.log(isLast);

    return currentPageData.map((item, index) => {
      const count = item.module.reduce((acc, curr) => acc + 1, 0);

      const date = new Date(item.created_at);

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      const formattedDate = `${month} ${day}, ${year}`;
      return (
        <div key={item.id}>
          <Link
            to={`/admin/${item.course}/modules`}
            className="text-decoration-none"
          >
            <div className="DevCourseContainer py-3 px-2 mb-3 shadow p-3">
              <h2 className="DevCourseHeader mb-0 me-3 pe-3">{item.course}</h2>
              <div className="d-block d-sm-flex mt-2 justify-content-between align-items-center fst-italic">
                <p className="mb-0">Contains {count} Modules</p>
                <p className="m-0">Created at: {formattedDate}</p>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  };

  console.log(currentPage);
  const AvailableSubjects = () => {
    if (courses) {
      return (
        <Fragment>
          <h2>Subject/s</h2>
          <div className="ms-sm-4">
            <div>
              <input
                type="search"
                className="form-control search-box text-dark mb-3"
                placeholder="Search courses"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              {AvailableCourseHandler()}
              <div className="d-flex justify-content-end align-items-center h-100">
                <div className="dropdown d-flex">
                  <div className="d-flex align-items-center">
                    <p className="mb-0 me-3 paginationLightGray">
                      Rows per Page
                    </p>
                    <button
                      className="border-none border-0 bg-light paginationLightGray fw-bold dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {pageSize}
                    </button>
                  </div>
                  <div className="d-flex align-items-center">
                    <ul className="dropdown-menu py-0 paginationDropdownMenu">
                      <li>
                        <button
                          value={5}
                          className="dropdown-item"
                          onClick={() => {
                            setPageSize(5);
                          }}
                        >
                          5
                        </button>
                      </li>
                      <li>
                        <button
                          value={10}
                          className="dropdown-item"
                          onClick={() => {
                            setPageSize(10);
                          }}
                        >
                          10
                        </button>
                      </li>
                      <li>
                        <button
                          value={15}
                          className="dropdown-item"
                          onClick={() => {
                            setPageSize(15);
                          }}
                        >
                          15
                        </button>
                      </li>
                      <li>
                        <button
                          value={20}
                          className="dropdown-item"
                          onClick={() => {
                            setPageSize(20);
                          }}
                        >
                          20
                        </button>
                      </li>
                      <li>
                        <button
                          value={25}
                          className="dropdown-item"
                          onClick={() => {
                            setPageSize(25);
                          }}
                        >
                          25
                        </button>
                      </li>
                      <li>
                        <button
                          value={30}
                          className="dropdown-item"
                          onClick={() => {
                            setPageSize(30);
                          }}
                        >
                          30
                        </button>
                      </li>
                      <li>
                        <button
                          value={50}
                          className="dropdown-item"
                          onClick={() => {
                            setPageSize(50);
                          }}
                        >
                          50
                        </button>
                      </li>
                      <li>
                        <button
                          value={100}
                          className="dropdown-item"
                          onClick={() => {
                            setPageSize(100);
                          }}
                        >
                          100
                        </button>
                      </li>
                    </ul>
                  </div>
                  <p className="mb-0 d-flex align-items-center fs-6 mx-4">
                    {currentColumnCount}
                  </p>
                  <div>
                    <button
                      className={`border-none border-0 bg-light fw-bold `}
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(1);
                      }}
                    >
                      <i
                        className={`bx bx-chevrons-left pt-1 fs-2 ${
                          currentPage === 1
                            ? "paginationGray"
                            : "paginationLightGray"
                        }`}
                      ></i>
                    </button>
                    <button
                      className="border-none border-0 bg-light fw-bold"
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                      }}
                    >
                      <i
                        className={`bx bx-chevron-left fs-2 ${
                          currentPage === 1
                            ? "paginationGray"
                            : "paginationLightGray"
                        }`}
                      ></i>
                    </button>
                    <button
                      className="border-none border-0 bg-light fw-bold"
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                      }}
                    >
                      <i
                        className={`bx bx-chevron-right fs-2 ${
                          currentPage === totalPages
                            ? "paginationGray"
                            : "paginationLightGray"
                        }`}
                      ></i>
                    </button>
                    <button
                      className="border-none border-0 bg-light fw-bold"
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage(totalPages);
                      }}
                    >
                      <i
                        className={`bx bx-chevrons-right fs-2 ${
                          currentPage === totalPages
                            ? "paginationGray"
                            : "paginationLightGray"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return <Loading />;
    }
  };

  return <div>{AvailableSubjects()}</div>;
}

export default AdminAvailableSubjects;
