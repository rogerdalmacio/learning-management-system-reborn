import React, { Fragment, useEffect, useState } from "react";
import Loading from "../../../../components/layouts/Loading";
import useStudentContext from "../../../../hooks/Student/useStudentContext";

function StudQuizAAE() {
    const { courses, officialQuiz, quiz, setWeekQuiz, setQuizId } =
        useStudentContext();
    const [content, setContent] = useState();

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

    const QuizContent = () => {
        return content.map((cont, i) => {
            const QuestionNumber = i + 1;

            const OptionsContent = () => {
                return cont.options.map((opt, index) => {
                    const OptionLetter = ["A", "B", "C", "D"];

                    return (
                        <Fragment key={index}>
                            <p className="quizOption p-2">
                                {OptionLetter[index]}. {opt}
                            </p>
                        </Fragment>
                    );
                });
            };

            return (
                <div key={i} className="QuizContentCont shadow p-3 mb-4">
                    <div>
                        <div className="quizQuestionCon p-3 mb-3">
                            <h5>Question {QuestionNumber}</h5>
                            <p>{cont.question}</p>
                        </div>
                        <div>{OptionsContent()}</div>
                    </div>
                </div>
            );
        });
    };

    const MainContent = () => {
        if (content) {
            return (
                <div className="py-4 px-3 py-sm-5 px-sm-5">
                    <h4 className="text-center mb-3 mb-sm-5">
                        Analysis, Application, and Exploration
                    </h4>
                    <div className="row g-3">
                        <div className="col-12 col-md-8 col-lg-9">
                            {QuizContent()}
                            <div className="d-flex justify-content-end">
                                <button className="QuizSmallButtonTemplate text-right sumbit-button btn px-4 px-sm-5 me-3 me-sm-5">
                                    <i class="bi bi-arrow-left-short"></i> Prev
                                </button>
                                <button className="QuizSmallButtonTemplate text-right sumbit-button btn px-4 px-sm-5">
                                    Next <i class="bi bi-arrow-right-short"></i>
                                </button>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="QuizContentCont Quizcontainer2 shadow p-3">
                                <p>Question 1/10</p>
                                <div className="QuizNavItemContainer d-flex flex-wrap">
                                    <div className="py-2 px-1">
                                        <div className="QuizNavItem m-auto text-center d-flex align-items-center justify-content-center">
                                            <p className="m-0 p-0">1</p>
                                        </div>
                                    </div>
                                    <div className="py-2 px-1">
                                        <div className="QuizNavItemSkip m-auto text-center d-flex align-items-center justify-content-center">
                                            <p className="m-0 p-0">2</p>
                                        </div>
                                    </div>
                                    <div className="py-2 px-1">
                                        <div className="QuizNavItem m-auto text-center d-flex align-items-center justify-content-center">
                                            <p className="m-0 p-0">3</p>
                                        </div>
                                    </div>
                                    <div className="py-2 px-1">
                                        <div className="QuizNavItem m-auto text-center d-flex align-items-center justify-content-center">
                                            <p className="m-0 p-0">4</p>
                                        </div>
                                    </div>
                                    <div className="py-2 px-1">
                                        <div className="QuizNavItem m-auto text-center d-flex align-items-center justify-content-center">
                                            <p className="m-0 p-0">5</p>
                                        </div>
                                    </div>
                                    <div className="py-2 px-1">
                                        <div className="QuizNavItem m-auto text-center d-flex align-items-center justify-content-center">
                                            <p className="m-0 p-0">6</p>
                                        </div>
                                    </div>
                                    <div className="py-2 px-1">
                                        <div className="QuizNavItem m-auto text-center d-flex align-items-center justify-content-center">
                                            <p className="m-0 p-0">7</p>
                                        </div>
                                    </div>
                                    <div className="py-2 px-1">
                                        <div className="QuizNavItem m-auto text-center d-flex align-items-center justify-content-center">
                                            <p className="m-0 p-0">8</p>
                                        </div>
                                    </div>
                                    <div className="py-2 px-1">
                                        <div className="QuizNavItemNone m-auto text-center d-flex align-items-center justify-content-center">
                                            <p className="m-0 p-0">9</p>
                                        </div>
                                    </div>
                                    <div className="py-2 px-1">
                                        <div className="QuizNavItemNone m-auto text-center d-flex align-items-center justify-content-center">
                                            <p className="m-0 p-0">10</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
