import React, { Fragment, useEffect, useState, useRef } from "react";
import Loading from "../../../../components/layouts/Loading";
import useStudentContext from "../../../../hooks/Student/useStudentContext";
// import Camera from "../Camera/Camera";
import { ToastContainer } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Navigate, useLocation } from "react-router-dom";

function StudQuizAAE() {
  const {
    courses,
    officialQuiz,
    quiz,
    setWeekQuiz,
    setQuizId,
    quizResultId,
    setQuizDone,
  } = useStudentContext();
  const { token, role, userInfo } = useAuth();
  const [content, setContent] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [getAnswer, setGetAnswer] = useState();

  const [getLogs, setGetLogs] = useState();
  const [altTabCount, setAltTabCount] = useState(
    getLogs !== undefined ? getLogs : 0
  );
  const [logChange, setLogChange] = useState(false);
  console.log(getLogs);
  const [localstorageValue, setLocalstorageValue] = useState(
    parseInt(localStorage.getItem("myValue")) || 0
  );

  useEffect(() => {
    localStorage.setItem("myValue", localstorageValue);
  }, [localstorageValue]);
  // const location = useLocation();
  // console.log(location.pathname);
  // const currentLocation = location.pathname;
  // const newPathname = currentLocation.split("/").slice(0, -1).join("/");
  // console.log(newPathname);

  // useEffect(() => {
  //     if (getAnswer) {
  //         const newArray = getAnswer.map((item) =>
  //             typeof item === "undefined" ? "@$#" : item
  //         );
  //         console.log(newArray);
  //     }
  // });

  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  const weekMod = pathArray[4];
  const currentWeek = weekMod.replace("week", "Week ");
  const weekForModule = weekMod.match(/\d+/)[0];
  const contentType = pathArray[5];
  console.log(contentType);
  console.log(quizResultId);
  const [closeCount, setCloseCount] = useState(0);
  console.log(closeCount);

  console.log(getLogs);
  console.log(altTabCount);
  // getting the logs in autosave
  useEffect(() => {
    const fetchLogs = async () => {
      if (role === "student") {
        await axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/student/fetchlogs`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log(response.data.logs);
            setGetLogs(parseInt(response.data.logs.split(",")[1]));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    fetchLogs();
  }, [logChange, altTabCount]);

  // Count if window.close()
  useEffect(() => {
    const handleClose = () => {
      const logs = localStorage.getItem("count");
      localStorage.setItem("countofLogs", logs);

      if (!localStorage.getItem("count")) {
        localStorage.setItem("logs", getLogs);
      } else {
        const previousCount = parseInt(localStorage.getItem("logs")) || 0;
        // Add the current count to the previous count
        const updatedCount = previousCount + altTabCount;
        // Store the updated count in localStorage
        localStorage.setItem("count", updatedCount.toString());
      }

      // handleNext();
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    window.addEventListener("beforeunload", handleClose);

    return () => {
      window.removeEventListener("beforeunload", handleClose);
    };
  }, []);

  //Submit every logs
  // useEffect(() => {
  //   if (altTabCount === 0) {
  //     return null;
  //   } else {
  //     handleNext();
  //   }
  // }, [altTabCount]);
  // Count if blurr or AFK or alt+tab
  useEffect(() => {
    const logsHandler = () => {
      window.addEventListener("focus", () => {
        console.log("not afk");
      });
      window.addEventListener("blur", () => {
        setAltTabCount((altTabCount) => altTabCount + 1);
        setLocalstorageValue((prevValue) => prevValue + 1);

        toast.warning("Please don not press any keys");
      });
    };
    logsHandler();
  }, []);
  console.log(getLogs);
  useEffect(() => {
    if (!localStorage.getItem("logs")) {
      localStorage.setItem("logs", getLogs);
    } else {
      const previousCount = parseInt(localStorage.getItem("logs")) || 0;
      // Add the current count to the previous count
      const updatedCount = previousCount + altTabCount;
      // Store the updated count in localStorage
      localStorage.setItem("count", updatedCount.toString());
    }
  }, [altTabCount]);

  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === "count") {
        console.log("localStorage count has been updated!");
        console.log("New count value: " + e.newValue);
      }
    }

    window.addEventListener("storage", handleStorageChange);

    // Access the current value of 'count' from localStorage
    const currentCount = localStorage.getItem("count");
    console.log("Current count value: " + currentCount);
  });

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, [altTabCount]);

  const detectKeyDown = (e) => {
    console.log("clicked key: ", e.key);
  };

  //Check if logs exceed to 3
  useEffect(() => {
    const AltTabCountHandler = () => {
      if (altTabCount >= 3) {
        // SubmitQuizHandler();
      }
    };

    AltTabCountHandler();
  }, []);

  // Implementing Auto Save Progress
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
            setGetAnswer(response.data.request);
            if (response.data.request) {
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    progressHandler();
  }, []);

  //getting module_id for modules
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

    if (quiz) {
      const act = quiz.quiz
        .filter((qui) => qui.quiz_type == contentType)
        .map((content) => {
          setQuizId(content.id);
        });
    }
  });

  useEffect(() => {
    if (officialQuiz) {
      const firstArray = officialQuiz[0];
      const secondArray = officialQuiz[1];

      const newArray = [];

      for (let i = 0; i < firstArray.length; i++) {
        const startIndex = i * 4;
        const endIndex = startIndex + 4;
        const subArray = secondArray.slice(startIndex, endIndex);
        newArray.push({
          question: firstArray[i],
          options: subArray,
        });
      }

      setContent(newArray);
    }
  }, [officialQuiz]);

  console.log(content);

  const OptionsContentHandler = () => {
    return content[currentQuestionIndex].options.map((opt, index) => {
      const OptionLetter = ["A", "B", "C", "D"];

      const handleClick = (questionIndex, answer) => {
        setGetAnswer((prevAnswers) => {
          const newAnswers = [...prevAnswers];
          if (newAnswers[questionIndex] === undefined) {
            newAnswers[questionIndex] = answer;
          } else {
            newAnswers[questionIndex] = answer;
          }
          return newAnswers;
        });
      };

      return (
        <Fragment key={index}>
          <button
            value={opt}
            onClick={(e) => handleClick(currentQuestionIndex, e.target.value)}
            className={`quizOption p-2 w-100 mb-2 d-flex justify-content-left ${
              opt == getAnswer[currentQuestionIndex] ? "quizOptionAnswer" : ""
            }`}
          >
            {OptionLetter[index]}. {opt}
          </button>
        </Fragment>
      );
    });
  };

  const QuizContent = () => {
    return (
      <div className="QuizContentCont shadow p-3 mb-4">
        <div>
          <div className="quizQuestionCon p-3 mb-3">
            <h5>Question {currentQuestionIndex + 1}</h5>
            <p>{content[currentQuestionIndex].question}</p>
          </div>
          <div>{OptionsContentHandler()}</div>
        </div>
      </div>
    );
  };
  console.log(quizResultId);
  // Next and Previous Button
  console.log(getAnswer);

  const handleNext = async () => {
    // console.log(getLogs);
    // console.log(getLogs + logCount);
    setCurrentQuestionIndex(currentQuestionIndex + 1);

    const logCount = JSON.stringify(altTabCount);

    const item = {
      student_id: userInfo.id,
      quiz_result_id: quizResultId[0].id,
      answers: getAnswer.join("|"),
      snapshot: false,
      start_time: quizResultId[0].start_time,
      end_time: quizResultId[0].end_time,
      logs: logCount,
    };
    console.log(getAnswer);

    // console.log(item);

    await axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/student/autosave`, item, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setLogChange(!logChange);
        if (response.status >= 200 && response.status <= 300) {
        } else {
          throw new Error(response.status || "Something Went Wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  // Content of Navigation Container
  const NavigationContent = () => {
    return content.map((cont, i) => {
      const numberOfItem = i + 1;
      return (
        <div key={i} className="py-2 px-1">
          <button
            value={i}
            className={`${
              getAnswer[i] == undefined || getAnswer[i] == "@$#"
                ? "QuizNavItemNone"
                : "QuizNavItem"
            } ${
              numberOfItem == currentQuestionIndex + 1
                ? "border border-dark border-2"
                : ""
            } m-auto text-center d-flex align-items-center justify-content-center`}
            onClick={(e) => {
              setCurrentQuestionIndex(i);
            }}
          >
            <p className="m-0 p-0 ">{numberOfItem}</p>
          </button>
        </div>
      );
    });
  };

  // for setting up camera
  let contentArrayLength;
  let dynamicNumberLength;
  if (content) {
    contentArrayLength = content.length;
    dynamicNumberLength = currentQuestionIndex + 1;
  }

  const SubmitQuizHandler = async () => {
    let quizResultIdItem;
    if (quizResultId) {
      console.log(quizResultId[0].id);
      quizResultIdItem = quizResultId[0].id;
    }

    const data = getAnswer.join("|");
    console.log(data);
    const logs = localStorage.getItem("myValue");

    const item = {
      answers: data,
      logs: logs,
      attempt: "finished",
    };
    let toastId;

    toastId = toast.info("Sending Request...");

    await axios
      .patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/student/quizresult/${quizResultIdItem}`,
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
        console.log(response);
        if (response.status >= 200 && response.status <= 300) {
          toast.update(toastId, {
            render: "Request Successfully",
            type: toast.TYPE.SUCCESS,
            autoClose: 2000,
          });
          localStorage.removeItem("image");
          localStorage.removeItem("ranNumber");
          localStorage.removeItem("myValue");
          // window.location.href = newPathname;
          window.opener.location.reload();
          window.close();
        } else {
          throw new Error(response.status || "Something Went Wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.update(toastId, {
          render: `${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 2000,
        });
      });
  };
  console.log(currentQuestionIndex);
  const LastNumberHandler = () => {
    if (currentQuestionIndex == content.length - 1) {
      return (
        <button
          onClick={SubmitQuizHandler}
          className="smallButtonTemplate text-right sumbit-button btn px-4 px-sm-5"
        >
          Submit <i className="bi bi-arrow-right-short"></i>
        </button>
      );
    } else {
      return (
        <button
          className="QuizSmallButtonTemplate text-right sumbit-button btn px-4 px-sm-5"
          onClick={handleNext}
          disabled={currentQuestionIndex === content.length - 1}
        >
          Next <i className="bi bi-arrow-right-short"></i>
        </button>
      );
    }
  };

  const MainContent = () => {
    if (quizResultId && quizResultId.length !== 0) {
      if (quizResultId && content && quizResultId[0].attempt == "finished") {
        return <Navigate replace to="/unauthorized" />;
      } else {
        if (content) {
          return (
            <div className="py-4 px-3 py-sm-5 px-sm-5 position-relative">
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <h4 className="text-center mb-3 mb-sm-5">
                Analysis, Application, and Exploration
              </h4>
              <div className="row g-3">
                <div className="col-12 col-md-8 col-lg-9">
                  {QuizContent()}
                  <div className="d-flex justify-content-end">
                    <button
                      className="QuizSmallButtonTemplate text-right sumbit-button btn px-4 px-sm-5 me-3 me-sm-5"
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                    >
                      <i className="bi bi-arrow-left-short"></i> Prev
                    </button>
                    {LastNumberHandler()}
                  </div>
                </div>
                <div className="col-12 col-md-4 col-lg-3">
                  <div className="QuizContentCont Quizcontainer2 shadow p-3 mb-3">
                    <p>
                      Question {currentQuestionIndex + 1}/{content.length}
                    </p>
                    <div className="QuizNavItemContainer d-flex flex-wrap">
                      {NavigationContent()}
                    </div>
                  </div>
                  {/* <Camera
                                contentArrayLength={contentArrayLength}
                                dynamicNumberLength={dynamicNumberLength}
                                content
                            /> */}
                </div>
              </div>
            </div>
          );
        } else {
          return <Loading />;
        }
      }
    } else if (quizResultId === undefined) {
      return <Loading />;
    } else {
      return <Navigate replace to="/unauthorized" />;
    }
  };

  return <div>{MainContent()}</div>;
}

export default StudQuizAAE;
