import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useStudentContext from "../../../hooks/Student/useStudentContext";

function StudPrelimExam() {
    const { userInfo, token } = useAuth();
    const { quizid, quiz, courses, setWeekQuiz, setQuizId } =
        useStudentContext();

    const [quizInfo, setQuizInfo] = useState();
    const [allow, setAllow] = useState(true);

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
        console.log(quiz);
        if (quiz) {
            const act = quiz.quiz
                .filter((qui) => qui.quiz_type == contentType)
                .map((content) => {
                    setQuizInfo(content);
                    console.log(content.id);
                    setQuizId(content.id);
                });
        }
    });

    const AttemptQuizHandler = async () => {
        window.open(
            `${window.location.origin}/student/${courseBase}/modules/${weekMod}/preliminaryexamination/quiz`,
            "_blank"
            // ,
            // `toolbar=0,location=0,menubar=0,resizable=no,height=${10000},width=${10000},top=0,left=0,fullscreen=yes`
        );

        const item = {
            student_id: userInfo.id,
            quiz_id: quizid,
            module_id: quizInfo.module_id,
            preliminaries: quizInfo.preliminaries,
            quiz_type: quizInfo.quiz_type,
            attempt: true,
            score: 0,
            logs: "x",
            snapshot: false,
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
            .catch((error) => {
                console.log(error);
            });
    };

    console.log(allow);

    const AllowCameraHandler = () => {
        setAllow(!allow);
    };

    return (
        <div>
            <h4 className="mb-3">Preliminary Examination {currentWeek}</h4>

            <div className="d-flex justify-content-center">
                <div className="d-block text-center">
                    <p>Attempt allowed: 1</p>
                    <p>Time Limit: 1 hour</p>
                    <div className="quizNoteBeforeQuiz form-check d-flex justify-content-start mb-3">
                        <input
                            className="quizInputChecker form-check-input"
                            type="checkbox"
                            onClick={AllowCameraHandler}
                            id="flexCheckDefault"
                        />
                        <label
                            className="quizInputCheckerLabel form-check-label"
                            htmlFor="flexCheckDefault"
                        >
                            Note:{" "}
                            <span className="fst-italic">
                                by allowing this site to access your camera and
                                take a random snapshot while taking the quiz,
                                you are eligible to take this examination.
                            </span>
                        </label>
                    </div>
                    <button
                        className=" smallButtonTemplate text-right sumbit-button btn px-5"
                        disabled={allow}
                        onClick={AttemptQuizHandler}
                    >
                        Attempt Quiz Now
                    </button>
                </div>
            </div>
        </div>
    );
}
export default StudPrelimExam;
