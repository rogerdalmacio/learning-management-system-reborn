import React, { Fragment } from "react";
import useAuth from "../../../hooks/useAuth";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import { Link } from "react-router-dom";

function ClearAttemptSortBySection() {
  const { userInfo } = useAuth();

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[3];

  const TeacherSection = userInfo.year_and_sections.split(",");
  console.log(TeacherSection);
  console.log(userInfo);
  const AvailableCourseHandler = () => {
    return TeacherSection.map((section, i) => {
      console.log(section);
      return (
        <div key={i}>
          <Link
            to={`/teacher/resetquizattempt/${courseBase}/${section}`}
            className="text-decoration-none"
          >
            <div className="DevCourseContainer py-3 px-2 mb-3 shadow p-3">
              <h2 className="DevCourseHeader mb-0 me-3 pe-3">{section}</h2>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <ArrowNextAndPrevious>
        <h2 className="mb-0">Reset Quiz Attempt - Section/s</h2>
      </ArrowNextAndPrevious>
      <div className="ms-sm-4">{AvailableCourseHandler()}</div>
    </Fragment>
  );
}

export default ClearAttemptSortBySection;
