import React, { Fragment } from "react";
import useAuth from "../../../hooks/useAuth";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import { Link } from "react-router-dom";

function ClearAttemptSortBySubjects() {
  const { userInfo } = useAuth();

  const TeacherSubjects = userInfo.subjects.split(",");
  console.log(TeacherSubjects);
  console.log(userInfo);
  const AvailableCourseHandler = () => {
    return TeacherSubjects.map((subject, i) => {
      console.log(subject);
      return (
        <div key={i}>
          <Link
            to={`/teacher/resetquizattempt/${subject}`}
            className="text-decoration-none"
          >
            <div className="DevCourseContainer py-3 px-2 mb-3 shadow p-3">
              <h2 className="DevCourseHeader mb-0 me-3 pe-3">{subject}</h2>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <ArrowNextAndPrevious>
        <h2 className="mb-0">Reset Quiz Attempt - Subject/s</h2>
      </ArrowNextAndPrevious>
      <div className="ms-sm-4">{AvailableCourseHandler()}</div>
    </Fragment>
  );
}

export default ClearAttemptSortBySubjects;
