import React, { Fragment, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Loading from "../../../components/layouts/Loading";
import CourseContentProvider from "../../../hooks/CourseContent/useCourseContent";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

function ManagerAvailableSubjects() {
  const { courses } = CourseContentProvider();
  console.log(courses);

  const [approve, setApprove] = useState(false);

  const handleToggle = async (e) => {
    setApprove(!approve);

    await axios
      .patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/core/batchmoduleupdatestatus/${weekNumber}`,
        status,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status >= 200 && response.status <= 300) {
          toast.success("Module state successfully changed");
        } else {
          throw new Error(response.status || "Something Went Wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const ApproveHandler = () => {
    // const approveNumber = approve.match(/\d+/)[0];
    return (
      <div
        className={`switch-button2 ${
          approve ? "switchButtonColor" : "switchButtonColorFalse"
        }`}
      >
        <input
          className="switch-button-checkbox"
          type="checkbox"
          name={approve}
          value={approve}
          checked={approve}
          onChange={(e) => {
            handleToggle(e);
            // handleChange(e);
          }}
        ></input>
        <label className="switch-button-label">
          <span className="switch-button-label-span">Disapprove</span>
        </label>
      </div>
    );
  };
  console.log(approve);

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
            to={`/courseManager/${item.course}/modules`}
            className="text-decoration-none"
          >
            <div className="DevCourseContainer py-3 px-2 mb-3 shadow p-3">
              <div className="d-xl-flex justify-content-between">
                <h2 className="DevCourseHeader mb-2 mb-xl-0 me-3 pe-3">
                  {item.course}
                </h2>
                <div className="my-auto">{ApproveHandler()}</div>
              </div>
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
          <ArrowNextAndPrevious>
            <h2 className="mb-0">Subject/s</h2>
          </ArrowNextAndPrevious>
          <div className="ms-sm-4">{AvailableCourseHandler()}</div>
        </Fragment>
      );
    } else {
      return <Loading />;
    }
  };

  return <div>{AvailableSubjects()}</div>;
}

export default ManagerAvailableSubjects;
