import React, { Fragment } from "react";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import { Link } from "react-router-dom";

function SortByYear() {
  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[3];

  const StudentYear = ["1", "2", "3", "4"];
  const AvailableCourseHandler = () => {
    return StudentYear.map((year, i) => {
      console.log(year);
      return (
        <div key={i}>
          <Link
            to={`/courseManager/listOfStudents/${year}`}
            className="text-decoration-none"
          >
            <div className="DevCourseContainer py-3 px-2 mb-3 shadow p-3">
              <h2 className="DevCourseHeader mb-0 me-3 pe-3">
                {year == 1
                  ? `${year}st`
                  : year == 2
                  ? `${year}nd`
                  : year == 3
                  ? `${year}rd`
                  : year == 4
                  ? `${year}th`
                  : ``}
                {` `}
                Year Students
              </h2>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <ArrowNextAndPrevious>
        <h2 className="mb-0">List of Students - Year/s</h2>
      </ArrowNextAndPrevious>
      <div className="ms-sm-4">{AvailableCourseHandler()}</div>
    </Fragment>
  );
}

export default SortByYear;
