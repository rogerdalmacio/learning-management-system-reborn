import React, { Fragment, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useStudentContext from "../../../hooks/Student/useStudentContext";
import Loading from "../../../components/layouts/Loading";
import { toast } from "react-toastify";
import QuizResult from "./QuizResult/QuizResult";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

function StudAAE() {
  const { userInfo, token, role } = useAuth();
  const { quizid, quiz, courses, setWeekQuiz, setQuizId, quizResultId } =
    useStudentContext();

  const [quizInfo, setQuizInfo] = useState();
  const [allow, setAllow] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(true);
  const [hasAttempt, setHasAttempt] = useState();
  const [disableBut, setDisableBut] = useState(true);
  const [getQuizId, setGetQuizId] = useState();
  const [hasAutoSave, setHasAutoSave] = useState(false);
  // these two isloading is responsible for disabling attempt quiz
  const [isloading, setIsloading] = useState();
  const [isloading2, setIsloading2] = useState(false);
  const [weekNumber, setWeekNumber] = useState();

  const [hasAutoSaveChange, setHasAutoSaveChange] = useState(false);
  const [quizIdAvailable, setQuizIdAvailable] = useState(false);
  const [isHiatus, setIsHiatus] = useState();

  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  const weekMod = pathArray[4];
  const currentWeek = weekMod.replace("week", "Week ");
  const weekForModule = weekMod.match(/\d+/)[0];
  const contentType = pathArray[5];
  console.log(contentType);

  console.log(weekNumber);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setPermissionGranted(false);
        // You can use the stream to display the camera feed
        // ...
      })
      .catch((err) => {
        toast.error("Please Allow the permission before taking the exam");
        console.error(err);
      });
  }, []);

  console.log(disableBut);
  // useEffect(() => {
  //     if (allow == true && allowCam == true) {
  //         setDisableBut(false);
  //     }
  // });

  //getting module_id for modules
  useEffect(() => {
    if (courses) {
      courses.map((course) => {
        if (course.course == courseTitle) {
          course.module.map((mod) => {
            if (mod.week == weekForModule) {
              setWeekNumber(mod.id);
              setWeekQuiz(mod.id);
            }
          });
        }
      });
    }
    console.log(quiz);
    if (quiz) {
      const act = quiz.quiz
        .filter((qui) => qui.quiz_type == contentType)
        .map((content) => {
          setQuizInfo(content);
          setQuizId(content.id);
        });
    }

    if (quizid) {
      setQuizIdAvailable(true);
    }
  });

  useEffect(() => {
    const progressHandler = async () => {
      if (role === "student") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/student/fetchautosave`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            if (response.data.request) {
              setGetQuizId(response.data);
              setHasAutoSave(true);
              setIsloading(true);
            }
          })
          .catch((error) => {
            if (error) {
              setIsloading(false);
            }
            console.log(error);
          });
      }
    };

    progressHandler();
  }, [hasAutoSaveChange]);

  // checking if there is existing autosave
  useEffect(() => {
    if (hasAutoSave == true) {
      toast.error(`Please! Finish your Quiz`);
    }

    if (quizIdAvailable == true && getQuizId !== undefined) {
      if (getQuizId && quiz) {
        if (quizid === getQuizId.quiz_id) {
          setIsHiatus(false);
        } else {
          setIsHiatus(true);
        }
      }
    } else {
      setIsHiatus(false);
    }
  }, [quizResultId, quizIdAvailable, getQuizId]);

  // attempt quiz
  const AttemptQuizHandler = async () => {
    window.open(
      `${window.location.origin}/student/${courseBase}/modules/${weekMod}/evaluation/quiz`,
      "_blank"
      // `toolbar=0,location=0,menubar=0,resizable=no,height=${10000},width=${10000},top=0,left=0,fullscreen=yes`
    );

    //what if the autosaveprogress is changing
    setHasAutoSaveChange(true);

    let newString = "";

    if (quizInfo !== undefined) {
      console.log(quizInfo.answers);
      for (let i = 0; i < quizInfo.answers.split("|").length; i++) {
        newString += "@$#"; // Concatenate "@$#" to the new string
        if (i !== quizInfo.answers.split("|").length - 1) {
          newString += "|"; // Add "|" delimiter except for the last element
        }
      }
    }

    const item = {
      student_id: userInfo.id,
      quiz_id: quizid,
      module_id: quizInfo.module_id,
      preliminaries: quizInfo.preliminaries,
      quiz_type: quizInfo.quiz_type,
      attempt: "inProgress",
      score: 0,
      logs: "x",
      snapshot: false,
      answers: newString,
    };

    await axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/student/quizresult`,
        item,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
        } else {
          throw new Error(response.status || "Something Went Wrong!");
        }
      })
      .then(() => {
        if (quizResultId && quizResultId.length !== 0) {
          let newString = "";

          if (quizInfo !== undefined) {
            console.log(quizInfo.answers);
            for (let i = 0; i < quizInfo.answers.split("|").length; i++) {
              newString += "@$#"; // Concatenate "@$#" to the new string
              if (i !== quizInfo.answers.split("|").length - 1) {
                newString += "|"; // Add "|" delimiter except for the last element
              }
            }
          }

          const item2 = {
            student_id: userInfo.id,
            quiz_result_id: quizResultId[0].id,
            answers: newString,
            snapshot: false,
            start_time: quizResultId[0].start_time,
            end_time: quizResultId[0].end_time,
          };

          // console.log(item);

          axios
            .post(
              `${import.meta.env.VITE_API_BASE_URL}/api/student/autosave`,
              item2,
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
              } else {
                throw new Error(response.status || "Something Went Wrong!");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
  };

  console.log(allow);

  const AllowCameraHandler = () => {
    setAllow(!allow);
  };

  const GetScoreHandler = () => {
    if (quizResultId.length !== 0 && quizInfo !== undefined) {
      if (quizResultId && quizResultId[0].attempt !== "finished") {
        return null;
      } else {
        if (localStorage.getItem("myValue")) {
          localStorage.removeItem("myValue");
        }
        if (localStorage.getItem("ranNumber")) {
          localStorage.removeItem("ranNumber");
        }
        if (localStorage.getItem("image")) {
          localStorage.removeItem("image");
        }
        if (localStorage.getItem("remainingTime")) {
          localStorage.removeItem("remainingTime");
        }
        const percentage =
          quizResultId[0].score * (100 / quizInfo.answers.split("|").length);
        const percentage2 = quizResultId[0].score;

        const date = new Date(quizResultId[0].end_time);
        const options = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          date
        );
        return (
          <div className="container mt-5">
            <table className="table rounded-2 overflow-hidden shadow-sm">
              <thead className="fw-normal">
                <tr className="tableRowHeader align-top  fw-normal">
                  <th scope="col-3">State</th>
                  <th scope="col-3">
                    Marks / {quizInfo.answers.split("|").length}.00
                  </th>
                  <th scope="col-3">Grade / 100.00</th>
                </tr>
              </thead>
              <tbody className="tableBodyColor">
                <tr scope="row">
                  <td>
                    <div className="d-block">
                      <span className="text-secondary">
                        Submitted {formattedDate}
                      </span>
                      <span className="text-secondary">
                        {quizResultId[0].attempt}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="text-secondary">
                      <QuizResult
                        percentage2={Math.floor(percentage2)}
                        percentage2Text={quizInfo.answers.split("|").length}
                      />
                    </span>
                  </td>
                  <td>
                    <span className="text-secondary">
                      <QuizResult
                        percentage={Math.floor(percentage)}
                        percentageText={quizInfo.answers.split("|").length}
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
    }
  };

  useEffect(() => {
    const hasAttemptHandler = () => {
      if (quizResultId && quizResultId.length == 0 && hasAutoSave == false) {
        setHasAttempt(false);
      } else {
        if (isHiatus == false) {
          setHasAttempt(false);
        } else {
          setHasAttempt(true);
        }
      }
    };
    hasAttemptHandler();
    setIsloading2(true);
  });
  console.log(quizInfo);

  const Button = () => {
    if (isloading2 && isloading && hasAttempt && quizInfo !== undefined) {
      return (
        <Fragment>
          {hasAttempt && (
            <button
              className=" smallButtonTemplate text-right sumbit-button btn px-5"
              onClick={AttemptQuizHandler}
              disabled={permissionGranted || (hasAttempt && allow == true)}
            >
              Attempt Quiz Now
            </button>
          )}
        </Fragment>
      );
    } else if (isloading2 && isloading === undefined) {
      return <p>loading...</p>;
    } else if (
      isloading2 &&
      quizResultId.length !== 0 &&
      quizResultId[0].attempt === "finished" &&
      allow == true
    ) {
      return (
        <button
          className=" smallButtonTemplate text-right sumbit-button btn px-5"
          disabled={true}
        >
          Attempt Quiz Now
        </button>
      );
    } else if (allow == true) {
      return (
        <button
          className=" smallButtonTemplate text-right sumbit-button btn px-5"
          onClick={AttemptQuizHandler}
          disabled={permissionGranted || hasAttempt}
        >
          Attempt Quiz Now
        </button>
      );
    } else if (allow == false) {
      return (
        <button
          className=" smallButtonTemplate text-right sumbit-button btn px-5"
          onClick={AttemptQuizHandler}
          disabled={true}
        >
          Attempt Quiz Now
        </button>
      );
    }
  };
  console.log(quizInfo);
  const MainContent = () => {
    if (
      quizResultId &&
      // quizResultId.length !== 0 &&
      // quizResultId[0].module_id == weekNumber &&
      isloading2 &&
      isloading !== undefined &&
      quizInfo !== undefined &&
      quizInfo.module_id == weekNumber
    ) {
      return (
        <div>
          <ArrowNextAndPrevious>
            <h4 className="m-0">Evaluation {currentWeek}</h4>
          </ArrowNextAndPrevious>
          <div className="d-flex justify-content-center">
            <div className="d-block text-center">
              <p>Attempt allowed: 1</p>
              <p>Time Limit: 1 hour</p>
              <div className="quizNoteBeforeQuiz form-check d-flex justify-content-start mb-3">
                <input
                  className="quizInputChecker form-check-input"
                  type="checkbox"
                  checked={allow}
                  onChange={AllowCameraHandler}
                  id="flexCheckDefault"
                />
                <label
                  className="quizInputCheckerLabel form-check-label"
                  htmlFor="flexCheckDefault"
                >
                  Note:{" "}
                  <span className="fst-italic">
                    by allowing this site to access your camera and take a
                    random snapshot while taking the quiz, you are eligible to
                    take this examination.
                  </span>
                </label>
              </div>
              {Button()}
            </div>
          </div>
          {GetScoreHandler()}
        </div>
      );
    } else {
      return <Loading />;
    }
  };

  return <div>{MainContent()}</div>;
}
export default StudAAE;
