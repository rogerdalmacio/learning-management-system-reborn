import React, { Fragment, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Loading from "../../../components/layouts/Loading";
import useStudentContext from "../../../hooks/Student/useStudentContext";

function StudAvailableSubjects() {
  const { courses } = useStudentContext();

  const AvailableCourseHandler = () => {
    return courses.map((item) => {
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
            to={`/student/${item.course}/modules`}
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

  const AvailableSubjects = () => {
    if (courses) {
      return (
        <Fragment>
          <h2>Subject/s</h2>
          <div className="ms-sm-4">{AvailableCourseHandler()}</div>
        </Fragment>
      );
    } else {
      return <Loading />;
    }
  };

  return <div>{AvailableSubjects()}</div>;
}

export default StudAvailableSubjects;
