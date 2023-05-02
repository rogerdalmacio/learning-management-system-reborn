import React, { Fragment } from "react";
import useAuth from "../../../hooks/useAuth";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import { Link } from "react-router-dom";

function SortByTerm() {
  const { userInfo } = useAuth();

  const TeacherSubjects = ["Prelim", "Midterm", "Finals"];
  console.log(TeacherSubjects);
  console.log(userInfo);
  const AvailableCourseHandler = () => {
    return TeacherSubjects.map((term, i) => {
      console.log(term);
      return (
        <div key={i}>
          <Link
            to={`/teacher/studentsGrade/${term}`}
            className="text-decoration-none"
          >
            <div className="DevCourseContainer py-3 px-2 mb-3 shadow p-3">
              <h2 className="DevCourseHeader mb-0 me-3 pe-3">{term}</h2>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <ArrowNextAndPrevious>
        <h2 className="mb-0">Quiz Results - Term</h2>
      </ArrowNextAndPrevious>
      <div className="ms-sm-4">{AvailableCourseHandler()}</div>
    </Fragment>
  );
}

export default SortByTerm;
