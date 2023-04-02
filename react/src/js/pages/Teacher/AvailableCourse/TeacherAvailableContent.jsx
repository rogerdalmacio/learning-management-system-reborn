import React, { Fragment, useEffect, useState } from "react";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CourseContentProvider from "../../../hooks/CourseContent/useCourseContent";
import Loading from "../../../components/layouts/Loading";
import TeacherValidateCourse from "./TeacherValidateCourse";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

function TeacherAvailableContent() {
  const { courses, module, setWeek, week, setHasChange, hasChange } =
    CourseContentProvider();
  const { token } = useAuth();
  const { id } = useParams();
  const [moduleId, setModuleId] = useState();
  const [comment, setComment] = useState();
  const [isApprove, setIsApprove] = useState();
  const [hasComment, setHasComment] = useState();
  const [alreadySubmitted, setAlreadySubmitted] = useState();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  console.log(courseTitle);
  console.log(module);
  const newWeek = id.replace("week", "WEEK ");
  const weekNumber = newWeek.match(/\d+/)[0];
  console.log(weekNumber);
  console.log(module);
  useEffect(() => {
    if (
      module &&
      module !== null &&
      module.content_validate &&
      module.content_validate.comments
    ) {
      setHasComment(true);
      setComment(module.content_validate.comments);
      setIsApprove(module.content_validate.status);
      console.log(module.content_validate.submitted);
      if (module.content_validate.submitted == 1) {
        setAlreadySubmitted(true);
      } else {
        setAlreadySubmitted(false);
      }
    } else {
      setHasComment(false);
      setAlreadySubmitted(false);
      setIsApprove(false);
      setComment("");
    }
  }, [module, moduleId, week]);

  console.log(isApprove);

  console.log(comment);

  useEffect(() => {
    if (courses !== undefined) {
      const course1 = courses.find((course) => {
        return course.course == courseTitle;
      });
      // .find((week) => week.week == weekNumber);
      console.log(course1);
      const moduleId = course1.module.find((week) => {
        return week.week == weekNumber;
      });
      setWeek(moduleId.id);
      setModuleId(moduleId.id);
    }
  });

  const NameOfExam = () => {
    if (weekNumber == 6) {
      return (
        <Link
          to={`/teacher/${courseTitle}/modules/${id}/preliminaryexamination`}
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
          to={`/teacher/${courseTitle}/modules/${id}/midtermexamination`}
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
          to={`/teacher/${courseTitle}/modules/${id}/finalexamination`}
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
          to={`/teacher/${courseTitle}/modules/${id}/examination`}
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
            to={`/teacher/${courseTitle}/modules/${id}/lesson`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Lesson</h5>
            </div>
          </Link>
          <Link
            to={`/teacher/${courseTitle}/modules/${id}/preliminaryactivity`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Preliminary Activity</h5>
            </div>
          </Link>
          <Link
            to={`/teacher/${courseTitle}/modules/${id}/generalization`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Generalization</h5>
            </div>
          </Link>
          <Link
            to={`/teacher/${courseTitle}/modules/${id}/aae`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Application, Analysis, and Exploration</h5>
            </div>
          </Link>
          <Link
            to={`/teacher/${courseTitle}/modules/${id}/evaluation`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Evaluation</h5>
            </div>
          </Link>
          <Link
            to={`/teacher/${courseTitle}/modules/${id}/assignment`}
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
    if (courses && module) {
      return (
        <Fragment>
          <ArrowNextAndPrevious>
            <h3 className="m-0">{courseTitle}</h3>
          </ArrowNextAndPrevious>
          <div className="d-flex align-items-center mt-3 mb-4">
            <h4 className="ms-sm-3 mb-0 me-3">
              {newWeek} -{" "}
              {module !== undefined && module !== null && module.title}
            </h4>
          </div>
          <div className="ms-sm-3">{ContentCheckHandler()}</div>
          {/* <TeacherValidateCourse
            setComment={setComment}
            HandleSubmit={HandleSubmit}
            HandleEdit={HandleEdit}
            isLoading={isLoading}
            comment={comment}
            hasComment={hasComment}
            alreadySubmitted={alreadySubmitted}
          /> */}
        </Fragment>
      );
    } else {
      return <Loading />;
    }
  };

  return <div>{AvailableModules()}</div>;
}

export default TeacherAvailableContent;
