import React, { Fragment, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useStudentContext from "../../../hooks/Student/useStudentContext";
import Loading from "../../../components/layouts/Loading";
import QuizResult from "./QuizResult/QuizResult";
import { toast } from "react-toastify";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

function StudAAE() {
  const { userInfo, token, role } = useAuth();
  const { quizid, quiz, courses, setWeekQuiz, setQuizId, quizResultId } =
    useStudentContext();

  const [quizInfo, setQuizInfo] = useState();
  const [hasAttempt, setHasAttempt] = useState();
  const [getQuizId, setGetQuizId] = useState();
  const [hasAutoSave, setHasAutoSave] = useState(false);
  // these two isloading is responsible for disabling attempt quiz
  const [isloading, setIsloading] = useState();
  const [isloading2, setIsloading2] = useState(false);

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
  const [weekNumber, setWeekNumber] = useState();

  console.log(contentType);

  useEffect(() => {
    if (courses) {
      courses.map((course) => {
        if (course.course == courseTitle) {
          course.module.map((mod) => {
            if (mod.week == weekForModule) {
              setWeekQuiz(mod.id);
              setWeekNumber(mod.id);
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
          console.log(content);
          setQuizInfo(content);
          setQuizId(content.id);
        });
    }

    // this will check if quizId is available
    if (quizid) {
      setQuizIdAvailable(true);
    }
  });
  // checking if AutoSaveProgress has value
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
            console.log(response);
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
  console.log(quizResultId);
  // attempt quiz
  const AttemptQuizHandler = async () => {
    window.open(
      `${window.location.origin}/student/${courseBase}/modules/${weekMod}/aae/quiz`,
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

    window.addEventListener("beforeunload", function (event) {
      // Check if there are multiple tabs open in the same window
      if (window.opener) {
        // Refresh the current tab if another tab is closed
        location.reload();
      }
    });

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
  const GetScoreHandler = () => {
    if (quizResultId.length !== 0 && quizInfo !== undefined) {
      if (quizResultId && quizResultId[0].attempt !== "finished") {
        return null;
      } else {
        // Clearing the logs here after taking the exam
        if (localStorage.getItem("myValue")) {
          localStorage.removeItem("myValue");
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
                    <span className="text-secondary">
                      <span className="fw-bold">Submitted </span>
                      {formattedDate}
                    </span>
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
  console.log(hasAttempt);
  console.log(isHiatus);

  useEffect(() => {
    const hasAttemptHandler = () => {
      if (quizResultId && quizResultId.length == 0 && hasAutoSave == false) {
        setHasAttempt(false);
      } else {
        if (isHiatus == false) {
          setHasAttempt(false);
        } else if (isHiatus == true) {
          setHasAttempt(true);
        }
      }
    };
    hasAttemptHandler();
    setIsloading2(true);
  });

  console.log(isloading);
  const Button = () => {
    if (isloading2 && isloading && hasAttempt && quizInfo !== undefined) {
      return (
        <Fragment>
          {hasAttempt && (
            <button
              className=" smallButtonTemplate text-right sumbit-button btn px-5"
              onClick={AttemptQuizHandler}
              disabled={hasAttempt}
            >
              Attempt Quiz Now
            </button>
          )}
        </Fragment>
      );
    } else if (isloading2 && isloading === undefined) {
      return <p>loading...</p>;
    } else if (
      quizResultId.length !== 0 &&
      quizResultId[0].attempt === "finished"
    ) {
      return (
        <button
          className=" smallButtonTemplate text-right sumbit-button btn px-5"
          disabled={true}
        >
          Attempt Quiz Now
        </button>
      );
    } else {
      return (
        <button
          className=" smallButtonTemplate text-right sumbit-button btn px-5"
          onClick={AttemptQuizHandler}
          disabled={hasAttempt}
        >
          Attempt Quiz Now
        </button>
      );
    }
  };

  console.log(quizResultId);
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
            <h4 className="m-0">
              Analysis, Application, and Exploration for {currentWeek}
            </h4>
          </ArrowNextAndPrevious>

          <div className="d-flex justify-content-center">
            <div className="d-block text-center">
              <p>Attempt allowed: 1</p>
              <p>Time Limit: 1 hour</p>
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
