import React, { Fragment } from "react";
import useAuth from "../../../hooks/useAuth";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import { Link } from "react-router-dom";

function GetActivitiesSortByAct() {
  const { userInfo } = useAuth();

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[3];
  const courseSection = pathArray[4];

  const TeacherAct = ["preliminaryactivity", "generalization"];
  console.log(TeacherAct);
  console.log(userInfo);
  const AvailableCourseHandler = () => {
    return TeacherAct.map((activity, i) => {
      console.log(activity);
      return (
        <div key={i}>
          <Link
            to={`/teacher/studentsActivities/${courseBase}/${courseSection}/${activity}`}
            className="text-decoration-none"
          >
            <div className="DevCourseContainer py-3 px-2 mb-3 shadow p-3">
              <h2 className="DevCourseHeader mb-0 me-3 pe-3">{activity}</h2>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <ArrowNextAndPrevious>
        <h2 className="mb-0">Student's Activities - Activities</h2>
      </ArrowNextAndPrevious>
      <div className="ms-sm-4">{AvailableCourseHandler()}</div>
    </Fragment>
  );
}

export default GetActivitiesSortByAct;
