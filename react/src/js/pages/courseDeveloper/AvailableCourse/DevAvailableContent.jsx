import React, { Fragment, useEffect, useState } from "react";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../../components/layouts/Loading";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import useCourseDevContext from "../../../hooks/CourseDev/useCourseDevContext";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

function DevAvailableContent() {
  const { token } = useAuth();
  const { course } = useGetAvailableCourse();
  const { courses, module, setWeekQuiz, quiz, hasChange, setHasChange } =
    useCourseDevContext();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");

  // Course Title
  const weekMod = pathArray[4];
  const currentWeek = weekMod.replace("week", "Week ");
  const weekForModule = weekMod.match(/\d+/)[0];
  const contentType = pathArray[5];
  console.log(quiz);

  useEffect(() => {
    if (courses) {
      courses.map((course) => {
        if (course.course == courseTitle) {
          course.module.map((mod) => {
            if (mod.week == weekForModule) {
              setWeekQuiz(mod.id);
            }
          });
        }
      });
    }

    // this will check if quizId is available
  });
  console.log(course);
  console.log(module);

  const newWeek = id.replace("week", "WEEK ");
  const weekNumber = newWeek.match(/\d+/)[0];

  const HandleSubmit = async () => {
    //put your validation logic here
    let toastId;

    const userInformation = {};
    setIsLoading(true);
    toastId = toast.info("Sending Request...");
    await axios
      .patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/coursedeveloper/submittodo/${
          quiz.content_validate.id
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
  };

  const NameOfExam = () => {
    if (weekNumber == 6) {
      return (
        <Link
          to={`/developer/${courseTitle}/modules/${id}/preliminaryexamination`}
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
          to={`/developer/${courseTitle}/modules/${id}/midtermexamination`}
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
          to={`/developer/${courseTitle}/modules/${id}/finalexamination`}
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
          to={`/developer/${courseTitle}/modules/${id}/examination`}
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
            to={`/developer/${courseTitle}/modules/${id}/inserttitle`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Insert Title</h5>
            </div>
          </Link>
          <Link
            to={`/developer/${courseTitle}/modules/${id}/lesson`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Lesson</h5>
            </div>
          </Link>
          <Link
            to={`/developer/${courseTitle}/modules/${id}/preliminaryactivity`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Preliminary Activity</h5>
            </div>
          </Link>
          <Link
            to={`/developer/${courseTitle}/modules/${id}/generalization`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Generalization</h5>
            </div>
          </Link>
          <Link
            to={`/developer/${courseTitle}/modules/${id}/aae`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Application, Analysis, and Exploration</h5>
            </div>
          </Link>
          <Link
            to={`/developer/${courseTitle}/modules/${id}/evaluation`}
            className="text-decoration-none"
          >
            <div className="DevAvailContent shadow-sm py-3 px-2 mb-2">
              <h5 className="mb-0">Evaluation</h5>
            </div>
          </Link>
          <Link
            to={`/developer/${courseTitle}/modules/${id}/assignment`}
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
  console.log(quiz);
  const AvailableContentHandler = () => {
    if (course) {
      return (
        <Fragment>
          <ArrowNextAndPrevious>
            <h3 className="m-0">{courseTitle}</h3>
          </ArrowNextAndPrevious>
          <h4 className="ms-3 my-4">{newWeek}</h4>
          <div className="ms-3">{ContentCheckHandler()}</div>
          {quiz !== undefined &&
            quiz !== null &&
            quiz.content_validate !== null &&
            quiz.content_validate.submitted == 0 && (
              <div>
                <h4 className="ms-sm-3 my-4">Comments: </h4>
                <div className="ms-sm-3 ">
                  <div style={{ maxWidth: "700px" }}>
                    <div className="todoCDborderComment">
                      {quiz && (
                        <p
                          className="p-2"
                          dangerouslySetInnerHTML={{
                            __html: quiz.content_validate.comments
                              .replace(/(?:\r\n|\r|\n)/g, "<br>")
                              .trim(),
                          }}
                        ></p>
                      )}
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="taggingSubjectButton smallButtonTemplate sumbit-button btn rounded-2 mt-3"
                        onClick={HandleSubmit}
                        disabled={isLoading}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </Fragment>
      );
    } else {
      return <Loading />;
    }
  };

  return <div>{AvailableContentHandler()}</div>;
}

export default DevAvailableContent;
