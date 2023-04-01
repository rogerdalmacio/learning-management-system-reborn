import React, { Fragment, useEffect, useState } from "react";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CourseContentProvider from "../../../hooks/CourseContent/useCourseContent";
import Loading from "../../../components/layouts/Loading";
import ManagerValidateCourse from "./ManagerValidateCourse";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

function ManagerAvailableContent() {
  const { courses, module, setWeek, setHasChange, hasChange } =
    CourseContentProvider();
  const { token } = useAuth();
  const { id } = useParams();
  const [moduleId, setModuleId] = useState();
  const [comment, setComment] = useState();
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

  const newWeek = id.replace("week", "WEEK ");
  const weekNumber = newWeek.match(/\d+/)[0];
  console.log(weekNumber);

  useEffect(() => {
    if (
      module &&
      module !== null &&
      module.content_validate &&
      module.content_validate.comments
    ) {
      setHasComment(true);
      setComment(module.content_validate.comments);
      console.log(module.content_validate.submitted);

      if (module.content_validate.submitted == 1) {
        setAlreadySubmitted(true);
      } else {
        setAlreadySubmitted(false);
      }
    } else {
      setHasComment(false);
      setComment("");
    }
  }, [module]);
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
  }, [courses, weekNumber, module]);
  console.log(module);

  const HandleSubmit = async () => {
    //put your validation logic here
    let toastId;
    if (comment == null || comment == "") {
      setHasError(true);
      toast.error("Please fill out the blank area");
    } else {
      setIsLoading(true);
      setHasError(false);

      const userInformation = {
        module_id: moduleId,
        status: "inProgress",
        comments: comment,
      };

      toastId = toast.info("Sending Request...");
      await axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/coursemanager/createtodo`,
          userInformation,
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
            // if (response.data.length !== 0) {
            //     toast.update(toastId, {
            //         render: `Student ID is ${response.data[0]}`,
            //         type: toast.TYPE.ERROR,
            //         autoClose: 2000,
            //     });
            // } else {
            toast.update(toastId, {
              render: "Request Successfully",
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
            // }]
            setHasChange(!hasChange);
            setModuleId("");
            setComment("");
            setIsLoading(false);
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.errors) {
            // to access the subject itself you can use this : error.response.data.SubjectAlreadyExists[1]
            toast.update(toastId, {
              render: error.response.data.errors.id[0],
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
            setIdAlreadyTaken(error.response.data.errors.id[0]);
          } else {
            toast.update(toastId, {
              render: `${error.message}`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          }
          setIsLoading(false);
        });
    }
  };

  const HandleEdit = async () => {
    //put your validation logic here
    let toastId;
    if (comment == null || comment == "") {
      setHasError(true);
      toast.error("Please fill out the blank area");
    } else {
      setIsLoading(true);
      setHasError(false);

      const userInformation = {
        module_id: moduleId,
        status: "inProgress",
        comments: comment,
      };

      toastId = toast.info("Sending Request...");
      await axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/coursemanager/edittodo/${
            module.content_validate.id
          }`,
          userInformation,
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
            // if (response.data.length !== 0) {
            //     toast.update(toastId, {
            //         render: `Student ID is ${response.data[0]}`,
            //         type: toast.TYPE.ERROR,
            //         autoClose: 2000,
            //     });
            // } else {
            toast.update(toastId, {
              render: "Request Successfully",
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
            // }]
            setHasChange(!hasChange);
            setModuleId("");
            setComment("");
            setIsLoading(false);
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.errors) {
            // to access the subject itself you can use this : error.response.data.SubjectAlreadyExists[1]
            toast.update(toastId, {
              render: error.response.data.errors.id[0],
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
            setIdAlreadyTaken(error.response.data.errors.id[0]);
          } else {
            toast.update(toastId, {
              render: `${error.message}`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          }
          setIsLoading(false);
        });
    }
  };

  const HandleApprove = async (e) => {
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

  const NameOfExam = () => {
    if (weekNumber == 6) {
      return (
        <Link
          to={`/courseManager/${courseTitle}/modules/${id}/preliminaryexamination`}
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
          to={`/courseManager/${courseTitle}/modules/${id}/midtermexamination`}
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
          to={`/courseManager/${courseTitle}/modules/${id}/finalexamination`}
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
          to={`/courseManager/${courseTitle}/modules/${id}/examination`}
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
            to={`/courseManager/${courseTitle}/modules/${id}/lesson`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Lesson</h5>
            </div>
          </Link>
          <Link
            to={`/courseManager/${courseTitle}/modules/${id}/preliminaryactivity`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Preliminary Activity</h5>
            </div>
          </Link>
          <Link
            to={`/courseManager/${courseTitle}/modules/${id}/generalization`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Generalization</h5>
            </div>
          </Link>
          <Link
            to={`/courseManager/${courseTitle}/modules/${id}/aae`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Application, Analysis, and Exploration</h5>
            </div>
          </Link>
          <Link
            to={`/courseManager/${courseTitle}/modules/${id}/evaluation`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Evaluation</h5>
            </div>
          </Link>
          <Link
            to={`/courseManager/${courseTitle}/modules/${id}/assignment`}
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
  console.log(hasComment);
  const AvailableModules = () => {
    if (courses) {
      return (
        <Fragment>
          <ArrowNextAndPrevious>
            <h3 className="m-0">{courseTitle}</h3>
          </ArrowNextAndPrevious>
          <div className="d-flex align-items-center mt-3 mb-4">
            <h4 className="ms-sm-3 mb-0 me-3">{newWeek}</h4>
            <button
              className="taggingSubjectButton smallButtonTemplate sumbit-button btn rounded-2"
              onClick={HandleApprove}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
          <div className="ms-sm-3">{ContentCheckHandler()}</div>
          <ManagerValidateCourse
            setComment={setComment}
            HandleSubmit={HandleSubmit}
            HandleEdit={HandleEdit}
            isLoading={isLoading}
            comment={comment}
            hasComment={hasComment}
            alreadySubmitted={alreadySubmitted}
          />
        </Fragment>
      );
    } else {
      return <Loading />;
    }
  };

  return <div>{AvailableModules()}</div>;
}

export default ManagerAvailableContent;
