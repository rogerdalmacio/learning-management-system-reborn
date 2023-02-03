import React, { Fragment, useEffect, useState } from "react";
import Loading from "../../../../components/layouts/Loading";
import useStudentContext from "../../../../hooks/Student/useStudentContext";
import Camera from "../Camera/Camera";
import { ToastContainer } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";

function StudQuizAAE() {
    const {
        courses,
        officialQuiz,
        quiz,
        setWeekQuiz,
        setQuizId,
        quizResultId,
    } = useStudentContext();
    const { token } = useAuth();
    const [content, setContent] = useState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [getAnswer, setGetAnswer] = useState([
        "@$#",
        "@$#",
        "@$#",
        "@$#",
        "@$#",
        "@$#",
        "@$#",
        "@$#",
        "@$#",
        "@$#",
    ]);

    // useEffect(() => {
    //     if (getAnswer) {
    //         const newArray = getAnswer.map((item) =>
    //             typeof item === "undefined" ? "@$#" : item
    //         );
    //         console.log(newArray);
    //     }
    // });
    console.log(getAnswer);

    const pathname = window.location.pathname;
    const pathArray = pathname.split("/");
    const courseBase = pathArray[2];
    const courseTitle = courseBase.replace(/%20/g, " ");
    const weekMod = pathArray[4];
    const currentWeek = weekMod.replace("week", "Week ");
    const weekForModule = weekMod.match(/\d+/)[0];
    const contentType = pathArray[5];
    console.log(contentType);

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
            console.log(opt);
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
                        onClick={(e) =>
                            handleClick(currentQuestionIndex, e.target.value)
                        }
                        className={`quizOption p-2 w-100 mb-2 d-flex justify-content-left ${
                            opt == getAnswer[currentQuestionIndex]
                                ? "quizOptionAnswer"
                                : ""
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

    // Next and Previous Button
    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    // Content of Navigation Container
    const NavigationContent = () => {
        return content.map((cont, i) => {
            console.log(i);
            const numberOfItem = i + 1;
            return (
                <div key={i} className="py-2 px-1">
                    <button
                        value={i}
                        className={`${
                            getAnswer[i] == undefined || getAnswer[i] == "@$#"
                                ? "QuizNavItemNone"
                                : "QuizNavItem"
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

        const item = {
            answers: data,
            logs: "x",
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

    const LastNumberHandler = () => {
        if (currentQuestionIndex == 9) {
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
                                    <i class="bi bi-arrow-left-short"></i> Prev
                                </button>
                                {LastNumberHandler()}
                            </div>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="QuizContentCont Quizcontainer2 shadow p-3 mb-3">
                                <p>Question {currentQuestionIndex + 1}/10</p>
                                <div className="QuizNavItemContainer d-flex flex-wrap">
                                    {NavigationContent()}
                                </div>
                            </div>
                            <Camera
                                contentArrayLength={contentArrayLength}
                                dynamicNumberLength={dynamicNumberLength}
                                content
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Loading />;
        }
    };

    return <div>{MainContent()}</div>;
}

export default StudQuizAAE;