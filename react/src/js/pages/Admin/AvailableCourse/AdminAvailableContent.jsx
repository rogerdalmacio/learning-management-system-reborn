import React, { Fragment, useEffect } from "react";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CourseContentProvider from "../../../hooks/CourseContent/useCourseContent";
import Loading from "../../../components/layouts/Loading";

function AdminAvailableContent() {
  const { courses } = CourseContentProvider();
  const { id } = useParams();

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  console.log(courseTitle);

  const newWeek = id.replace("week", "WEEK ");
  const weekNumber = newWeek.match(/\d+/)[0];

  const NameOfExam = () => {
    if (weekNumber == 6) {
      return (
        <Link
          to={`/admin/${courseTitle}/modules/${id}/preliminaryexamination`}
          className="text-decoration-none"
        >
          <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
            <h5 className="mb-0">Preliminary Examination</h5>
          </div>
        </Link>
      );
    } else if (weekNumber == 12) {
      return (
        <Link
          to={`/admin/${courseTitle}/modules/${id}/midtermexamination`}
          className="text-decoration-none"
        >
          <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
            <h5 className="mb-0">Midterm Examination</h5>
          </div>
        </Link>
      );
    } else if (weekNumber == 18) {
      return (
        <Link
          to={`/admin/${courseTitle}/modules/${id}/finalexamination`}
          className="text-decoration-none"
        >
          <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
            <h5 className="mb-0">Final Examination</h5>
          </div>
        </Link>
      );
    } else {
      return (
        <Link
          to={`/admin/${courseTitle}/modules/${id}/examination`}
          className="text-decoration-none"
        >
          <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
            <h5 className="mb-0">Examination</h5>
          </div>
        </Link>
      );
    }
  };

  const ContentCheckHandler = () => {
    if (weekNumber % 6 === 0) {
      return <Fragment>{NameOfExam()}</Fragment>;
    } else {
      return (
        <Fragment>
          <Link
            to={`/admin/${courseTitle}/modules/${id}/lesson`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Lesson</h5>
            </div>
          </Link>
          <Link
            to={`/admin/${courseTitle}/modules/${id}/preliminaryactivity`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Preliminary Activity</h5>
            </div>
          </Link>
          <Link
            to={`/admin/${courseTitle}/modules/${id}/generalization`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Generalization</h5>
            </div>
          </Link>
          <Link
            to={`/admin/${courseTitle}/modules/${id}/aae`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Application, Analysis, and Exploration</h5>
            </div>
          </Link>
          <Link
            to={`/admin/${courseTitle}/modules/${id}/evaluation`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Evaluation</h5>
            </div>
          </Link>
          <Link
            to={`/admin/${courseTitle}/modules/${id}/assignment`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Assignment</h5>
            </div>
          </Link>
        </Fragment>
      );
    }
  };

  const AvailableModules = () => {
    if (courses) {
      return (
        <Fragment>
          <h3>{courseTitle}</h3>
          <h4 className="ms-3 my-4">{newWeek}</h4>
          <div className="ms-3">{ContentCheckHandler()}</div>
        </Fragment>
      );
    } else {
      return <Loading />;
    }
  };

  return <div>{AvailableModules()}</div>;
}

export default AdminAvailableContent;
